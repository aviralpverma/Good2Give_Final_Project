package com.app.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

import com.app.dao.DonReqRepository;
import com.app.dao.ReqRepository;
import com.app.pojo.DonationRequest;
import com.app.pojo.Requirement;

@RestController
@RequestMapping("/don_req")
@CrossOrigin
public class DonReqController {

	@Autowired
	DonReqRepository drepo;

	@Autowired
	ReqRepository rrepo;

	@GetMapping("/all")
	public List<DonationRequest> fetchAllDonReq() {
		System.out.println("in fetchAllDonReq of DonReqController");
		return drepo.findAll();
	}

	@GetMapping("/orgid/{oid}")
	public ResponseEntity<?> fetchDonRequestByOrgId(@PathVariable int oid) {
		System.out.println("in fetchDonRequestByOrgId of DonReqController data recvd " + oid);
		List<DonationRequest> dList = drepo.getDonRequestByOrgId(oid);
//		System.out.println(dList);
		return new ResponseEntity<>(dList, HttpStatus.OK);
	}
	
	@GetMapping("/userid/{uid}")
	public ResponseEntity<?> fetchDonByUserId(@PathVariable int uid) {
		System.out.println("data recvd " + uid);
		List<DonationRequest> dList = drepo.getDonRequestByUserId(uid);
		System.out.println(dList);
		for (DonationRequest donationRequest : dList) {
			System.out.println(donationRequest.getTimestamp());
		}
		return new ResponseEntity<>(dList, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> addNewDonRequest(@RequestBody DonationRequest donReq) {
		System.out.println("in addNewDonRequest of DonReqController data recvd " + donReq);
		donReq.setTimestamp(LocalDate.now());
		DonationRequest newDonReq = drepo.save(donReq);
		return new ResponseEntity<>(newDonReq, HttpStatus.CREATED);
	}

	@GetMapping("/approve/{id}")
	public ResponseEntity<?> approveDonRequest(@PathVariable int id) {
		try {
			System.out.println("in approveDonRequest of DonReqController data recvd " + id);
			DonationRequest donReq = null;
			Requirement requirement = null;
			Optional<DonationRequest> opt = drepo.findById(id);
			if (opt.isPresent()) {
				donReq = opt.get();
				Optional<Requirement> opt2 = rrepo.findById(donReq.getAssocReq().getId());
				if (opt2.isPresent()) {
					requirement = opt2.get();
				}
			}
			if ((requirement.getItemCurrentCount() + donReq.getItemDonationCount()) <= requirement.getItemMaxCount()) {
				System.out.println("before updation " + requirement.getItemCurrentCount());
				requirement.setItemCurrentCount(requirement.getItemCurrentCount() + donReq.getItemDonationCount());
				System.out.println("after updation " + requirement.getItemCurrentCount());
				if (requirement.getItemCurrentCount() == requirement.getItemMaxCount()) {
					requirement.setStatus(false);
				}
				donReq.setApproved(true);
				rrepo.save(requirement);
				return new ResponseEntity<>(drepo.save(donReq), HttpStatus.OK);
			} else {
				throw new RuntimeException("Item donation count exceeded than max count");
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to approve " + e, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

@GetMapping("/reqid/{rid}")
	public ResponseEntity<?> fetchRequestByOrgId(@PathVariable int rid) {
		System.out.println("in fetchDonRequestByOrgId of DonReqController data recvd " + rid);
		List<DonationRequest> dList = drepo.getRequestByReqId(rid);
//		System.out.println(dList);
		return new ResponseEntity<>(dList, HttpStatus.OK);
	}

//	@GetMapping("/approve/{id}")
//	public ResponseEntity<?> approveDonRequest(@PathVariable int id) {
//		try {
//			System.out.println("in approveDonRequest of DonReqController data recvd " + id);
//			DonationRequest persistantDonReq = null;
//			Optional<DonationRequest> opt = drepo.findById(id);
//			if (opt.isPresent()) {
//				persistantDonReq = opt.get();
//			}
//			if ((persistantDonReq.getItemDonationCount()) <= persistantDonReq.getAssocReq().getItemMaxCount()) {
//				System.out.println("before updation "+persistantDonReq.getAssocReq().getItemCurrentCount());
//				persistantDonReq.getAssocReq().setItemCurrentCount(persistantDonReq.getAssocReq().getItemCurrentCount() + persistantDonReq.getItemDonationCount());
//				System.out.println("after updation "+persistantDonReq.getAssocReq().getItemCurrentCount());
//				if(persistantDonReq.getAssocReq().getItemCurrentCount() == persistantDonReq.getAssocReq().getItemMaxCount()) {
//					persistantDonReq.getAssocReq().setStatus(false);
//				}
////				persistantDonReq.setApproved(true);
//				return new ResponseEntity<>(drepo.save(persistantDonReq), HttpStatus.OK);
//			} else {
//				throw new RuntimeException("Item donation count exceeded than max count");
//			}
//		} catch (Exception e) {
//			return new ResponseEntity<>("Failed to approve "+e, HttpStatus.INTERNAL_SERVER_ERROR);
//		}

}
