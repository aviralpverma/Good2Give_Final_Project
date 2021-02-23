package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.Images;

public interface ImagesRepository extends JpaRepository<Images, Integer> {

	@Query("select imgs from Images imgs where imgs.assocOrg.id=:oid")
	List<Images> getImagesByOrgId(@Param("oid") int orgId);
	
	@Query(value = "select * from org_images where org_images.assoc_org_id=:oid Limit 0,1",nativeQuery = true)
	Images getImageByOrgId(@Param("oid") int orgId);
}
