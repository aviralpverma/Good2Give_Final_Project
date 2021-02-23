package com.app.pojo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "don_requests_tbl")
public class DonationRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private LocalDate timestamp;
	@Column(name = "don_count")
	private int itemDonationCount;
	@OneToOne
	private Users assocUser;
	@OneToOne
	private Requirement assocReq;
	
	private boolean approved;
	
	public DonationRequest() {
		
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public LocalDate getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDate timestamp) {
		this.timestamp = timestamp;
	}
	public Users getAssocUser() {
		return assocUser;
	}
	public void setAssocUser(Users assocUser) {
		this.assocUser = assocUser;
	}
	public Requirement getAssocReq() {
		return assocReq;
	}
	public void setAssocReq(Requirement assocReq) {
		this.assocReq = assocReq;
	}
	public int getItemDonationCount() {
		return itemDonationCount;
	}
	
	public void setItemDonationCount(int itemDonationCount) {
		this.itemDonationCount = itemDonationCount;
	}
	
	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	@Override
	public String toString() {
		return "DonationRequest [id=" + id + ", timestamp=" + timestamp + "]";
	}
	
}
