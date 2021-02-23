package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.AuthenticateUsers;

public interface AuthRepository extends JpaRepository<AuthenticateUsers, Integer> {
	
	AuthenticateUsers findByUsername(String uname);

}
