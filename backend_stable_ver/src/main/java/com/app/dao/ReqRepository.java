package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.Requirement;

public interface ReqRepository extends JpaRepository<Requirement, Integer> {
	
	@Query("select req from Requirement req where req.assocOrg.id=:oid and req.status=true")
	List<Requirement> fetchReqListByOrgId(@Param("oid") int orgId);
	
	@Query("select req from Requirement req where req.assocOrg.id=:oid")
	List<Requirement> fetchAllReqByOrgId(@Param("oid") int orgId);


}
