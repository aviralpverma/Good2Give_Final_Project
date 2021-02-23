package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.OrgAdmin;

public interface OrgAdminRepository extends JpaRepository<OrgAdmin, Integer>{
	OrgAdmin findByAccnameAndPassword(String accname,String password);
	OrgAdmin findByAccname(String accname);
}
