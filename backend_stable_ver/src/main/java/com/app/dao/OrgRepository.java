package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojo.Organisation;

public interface OrgRepository extends JpaRepository<Organisation, Integer> {
	Organisation findByAccnameAndPassword(String accname, String password);

	Organisation findByAccname(String accname);

	List<Organisation> findByCity(String city);

	@Query("select DISTINCT(org.city) from Organisation org")
	List<String> fetchAllCities();

}