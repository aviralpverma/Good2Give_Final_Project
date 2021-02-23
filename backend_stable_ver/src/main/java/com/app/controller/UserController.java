package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.AuthRepository;
import com.app.dao.OrgRepository;
import com.app.dao.UserRepository;
import com.app.jwtconfig.JwtTokenUtil;
import com.app.pojo.AuthenticateUsers;
import com.app.pojo.JwtResponse;
import com.app.pojo.Organisation;
import com.app.pojo.Users;
import com.app.service.JwtUserDetailsService;

@RestController
@RequestMapping("/")
@CrossOrigin
public class UserController {
	
	
	@Autowired
	private JavaMailSender sender;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private OrgRepository adminRepo;
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	@Autowired
	private AuthRepository authRepo;
	
	
	public UserController() {
		System.out.println("In user Controller");
	}

	@PostMapping("login/user")
	public ResponseEntity<?> authenticateUser(@RequestParam String username, @RequestParam String password) {
		try {
			String token=testjwt(username, password);
			Users u = userRepo.findByUname(username);
			u.setJwtToken(token);
			if (bcryptEncoder.matches(password, u.getPassword())) {
				System.out.println(u);
				return new ResponseEntity<>(u, HttpStatus.OK);
			}
			return new ResponseEntity<>(null, HttpStatus.OK);

		} catch (Exception e) {
			throw new RuntimeException("Invalid username and Password");

		}
	}

	
	
	@PostMapping("login/admin")
	public ResponseEntity<?> authenticateAdmin1(@RequestParam String username, @RequestParam String password) {
		try {
			System.out.println("In authadmin");
			String token=testjwt(username, password);
			Organisation admin = adminRepo.findByAccname(username);
			admin.setJwtToken(token);
			
			if (bcryptEncoder.matches(password, admin.getPassword())) {
				return new ResponseEntity<>(admin, HttpStatus.OK);
			}
			return new ResponseEntity<>(null, HttpStatus.OK);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Invalid username and Password");
		}

	}

	@PostMapping("add/user")
	public ResponseEntity<?> addUser(@RequestBody Users user) {
		try {
			String pass=user.getPassword();
			System.out.println(user);
			user.setPassword(bcryptEncoder.encode(user.getPassword()));
			Users u = userRepo.save(user);
			
			AuthenticateUsers authUser=new AuthenticateUsers();
			authUser.setUsername(user.getUname());
			authUser.setPassword(user.getPassword());
			authRepo.save(authUser);
			SimpleMailMessage mesg = new SimpleMailMessage();
			mesg.setTo(user.getEmail());
			mesg.setSubject("Welcome " + user.getName() + " Registration Successful");
			mesg.setText("Welcome Mail from Good2Give\n\n Your Credential :\nUsername:" + user.getUname()
					+ "\nPassowrd :" + pass);
			sender.send(mesg);
			return new ResponseEntity<>(u, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>("Email exist", HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@PostMapping("test/awt")
	public ResponseEntity<?> test(@RequestBody AuthenticateUsers user) throws Exception {
		System.out.println("in user login" + user);
		authenticate(user.getUsername(), user.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

		String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
		// return ResponseEntity.ok("token");

	}
	
	public String testjwt(String username,String password) throws Exception {
		System.out.println("in user login" + username+" "+password);
		authenticate(username, password);

		UserDetails userDetails = userDetailsService.loadUserByUsername(username);

		String token = jwtTokenUtil.generateToken(userDetails);

		return token;
		// return ResponseEntity.ok("token");

	}

	private void authenticate(String username, String password) throws Exception {
		try {
			System.out.println("n auh");
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

}
