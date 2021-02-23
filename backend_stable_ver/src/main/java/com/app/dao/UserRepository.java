package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojo.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	
	Users findByUnameAndPassword(String username,String password);
	

	Users findByUname(String username);

}
