package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.DonationRequest;

public interface DonReqRepository extends JpaRepository<DonationRequest, Integer> {
	@Query("select dreq from DonationRequest dreq where dreq.assocReq.assocOrg.id=:oid and dreq.approved=false")
	List<DonationRequest> getDonRequestByOrgId(@Param("oid") int orgId);

	@Query("select dreq from DonationRequest dreq where dreq.assocUser.uid=:uid and dreq.approved=true")
	List<DonationRequest> getDonRequestByUserId(@Param("uid") int userId);

	@Query("select dreq from DonationRequest dreq where dreq.assocReq.id=:rid and dreq.approved=true")
	List<DonationRequest> getRequestByReqId(@Param("rid") int rid);

}
