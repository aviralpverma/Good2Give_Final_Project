package com.app.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.AuthRepository;
import com.app.dao.OrgAdminRepository;
import com.app.dao.OrgRepository;
import com.app.dao.UserRepository;
import com.app.pojo.AuthenticateUsers;
import com.app.pojo.Organisation;
import com.app.pojo.Users;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository urepo;
	@Autowired
	private OrgRepository adminRepo;
	@Autowired
	private AuthRepository authRepo;
	
	
	@Override
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("in user data");
		AuthenticateUsers user = authRepo.findByUsername(username);
		if (user != null) {
			return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
		}
		throw new UsernameNotFoundException("User not found with username: " + username);

	}
}