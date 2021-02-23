package com.app.controller;

import static com.app.utils.Utils.calculateDistanceInKilometer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.AuthRepository;
import com.app.dao.ImagesRepository;
import com.app.dao.OrgRepository;
import com.app.dto.ResponseDTO;
import com.app.pojo.AuthenticateUsers;
import com.app.pojo.Images;
import com.app.pojo.Organisation;

@RestController
@RequestMapping("/org")
@CrossOrigin
public class OrgController {

	@Autowired
	private OrgRepository orepo;
	@Autowired
	private AuthRepository authRepo;
	@Autowired
	private PasswordEncoder bcryptEncoder;
	@Autowired
	private ImagesRepository irepo;



	@GetMapping("/all")
	public List<Organisation> getAllOrganisations() {
		System.out.println("in getAllOrganisations of OrgController");
		return orepo.findAll();
	}

	@GetMapping("/nearest")
	public List<Organisation> getNearestOrganisations(@RequestParam double userLat, @RequestParam double userLng) {
		System.out.println("in getNearestOrganisations of OrgController " + userLat + " " + userLng);
		List<Organisation> nearOrgs = new ArrayList<>();
		for (Organisation org : orepo.findAll()) {
			int distance = calculateDistanceInKilometer(userLat, userLng, org.getLatitude(), org.getLongitude());
			System.out.println("Org : " + org.getId() + ", Distance(km) : " + distance);
			org.setDistance(distance);
			if (distance < 50)
				nearOrgs.add(org);
		}
		return nearOrgs;
	}

	@PostMapping("/add")
	public ResponseEntity<?> saveNewOrganisation(@RequestBody Organisation org) {
		System.out.println("in saveNewOrganisation of OrgController");
		org.setPassword(bcryptEncoder.encode(org.getPassword()));
		System.out.println("Org Data recvd : " + org);
		Organisation newOrg = orepo.save(org);

		AuthenticateUsers authUser=new AuthenticateUsers();
		authUser.setUsername(org.getAccname());
		authUser.setPassword(org.getPassword());
		authRepo.save(authUser);
		return new ResponseEntity<>(newOrg, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getOrganisationById(@PathVariable int id) {
		System.out.println("in getOrganisationById of OrgController, data recvd " + id);
		Organisation org = null;
		Optional<Organisation> opOrg = orepo.findById(id);
		if (opOrg.isPresent()) {
			org = opOrg.get();
		}
		return new ResponseEntity<>(org, HttpStatus.OK);
	}
	
	
	
	
	
	
	@PostMapping("/upload_image")
	public ResponseEntity<?> uploadImageByOrgId(@RequestParam int orgId, @RequestBody MultipartFile imageFile) {
		try {
			System.out.println("in uploadImageByOrgId of getAllOrganisations data : " + imageFile.getOriginalFilename() + orgId);
			Images image = new Images();
			Organisation org = new Organisation();
//			org.setId(orgId);
			image.setAssocOrg(org);
			image.setImage(imageFile.getBytes());
			image.setImageContentType(imageFile.getContentType());
//			image.setId(4);
			image.getAssocOrg().setId(orgId);

			irepo.save(image);

			return new ResponseEntity<>(
					new ResponseDTO("File uploaded :" + imageFile.getOriginalFilename() + " @ ", LocalDateTime.now()),
					HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/download/{orgId}")
	public ResponseEntity<?> downloadImage(@PathVariable int orgId) throws IOException {

		System.out.println("in img download " + orgId);
		List<Images> images = irepo.getImagesByOrgId(orgId);

		if (images.isEmpty()) {
			return new ResponseEntity<>(new ResponseDTO("No images found for this org!", LocalDateTime.now()),
					HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(images, HttpStatus.OK);

	}
	
	@GetMapping("/download_one/{orgId}")
	public ResponseEntity<?> downloadOneImage(@PathVariable int orgId) throws IOException {

		System.out.println("in img download " + orgId);
		Images image = irepo.getImageByOrgId(orgId);

		if (image == null) {
			return new ResponseEntity<>(new ResponseDTO("No image found for this org!", LocalDateTime.now()),
					HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(image, HttpStatus.OK);

	}
	
	
	@GetMapping("/search_city/{cityName}")
	public ResponseEntity<?> fetchOrgByCity(@PathVariable String cityName) {
		System.out.println("in fetchOrgByCity of OrgController");
		List<Organisation> orgList = orepo.findByCity(cityName.toUpperCase());
		if(orgList.isEmpty()) {
			return new ResponseEntity<>(new ResponseDTO("No org found in this city!", LocalDateTime.now()), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(orgList, HttpStatus.OK);
	}
	
	@GetMapping("/all_cities")
	public ResponseEntity<?> fetchAllCities() {
		System.out.println("in fetchAllCities of OrgController");
		List<String> cities = orepo.fetchAllCities();
		if(cities.isEmpty()) {
			return new ResponseEntity<>(new ResponseDTO("No cities found!", LocalDateTime.now()), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(cities, HttpStatus.OK);
	}

}
