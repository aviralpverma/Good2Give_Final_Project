package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.ReqRepository;
import com.app.pojo.Requirement;

@RestController
@RequestMapping("/req")
@CrossOrigin
public class ReqController { 

	@Autowired
	private ReqRepository rrepo;

	@GetMapping("/all")
	public List<Requirement> getAllRequirements() {
		return rrepo.findAll();
	}

	@PostMapping("/add")
	public ResponseEntity<?> addNewRequirement(@RequestBody Requirement req) {
		System.out.println("Data recvd : " + req);
		System.out.println("in addNewRequirement of ReqController");
		System.out.println("Data recvd : " + req);
		Requirement newReq = rrepo.save(req);
		return new ResponseEntity<>(newReq, HttpStatus.CREATED);
	}

	@GetMapping("/orgid/{oid}")
	public ResponseEntity<?> getReqByOrgId(@PathVariable int oid) {
		System.out.println("in getReqByOrgId of ReqController data recvd " + oid);
		List<Requirement> reqList = rrepo.fetchReqListByOrgId(oid);
		System.out.println(reqList);
		return new ResponseEntity<>(reqList, HttpStatus.OK);
	}
	
	@GetMapping("/orgidr/{oid}")
	public ResponseEntity<?> getallReqByOrgId(@PathVariable int oid) {
		System.out.println("in getReqByOrgId of ReqController data recvd " + oid);
		List<Requirement> reqList = rrepo.fetchAllReqByOrgId(oid);
		System.out.println(reqList);
		return new ResponseEntity<>(reqList, HttpStatus.OK);
	}

}
