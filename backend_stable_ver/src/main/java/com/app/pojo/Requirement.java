package com.app.pojo;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "req_tbl")
public class Requirement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "cr_time")
	private LocalDate creationDate;
	@Column(name = "item_mx_cnt")
	private int itemMaxCount;
	@Column(name = "item_curr_cnt")
	private int itemCurrentCount;
	@Column(name = "don_mx_amt")
	private double donationMaxAmount;
	@Column(name = "don_curr_amt")
	private double donationCurrAmount;

	@ManyToOne
	@JoinColumn(name = "org_id")
	@JsonIgnoreProperties("requirements")
	@JsonProperty("assocOrg")
	private Organisation assocOrg;

	@OneToOne
	@JsonProperty("categoryId")
	private Category category;

	private boolean status=true;
	@Column(name = "req_dsc", length = 500)
	private String description;

	public Requirement() {

	}

	public Requirement(int itemMaxCount, double donationMaxAmount, boolean status, String description) {
		this.itemMaxCount = itemMaxCount;
		this.donationMaxAmount = donationMaxAmount;
		this.status = status;
		this.description = description;
		this.creationDate = LocalDate.now();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getItemMaxCount() {
		return itemMaxCount;
	}

	public void setItemMaxCount(int itemMaxCount) {
		this.itemMaxCount = itemMaxCount;
	}

	public int getItemCurrentCount() {
		return itemCurrentCount;
	}

	public void setItemCurrentCount(int itemCurrentCount) {
		this.itemCurrentCount = itemCurrentCount;
	}

	public double getDonationMaxAmount() {
		return donationMaxAmount;
	}

	public void setDonationMaxAmount(double donationMaxAmount) {
		this.donationMaxAmount = donationMaxAmount;
	}

	public double getDonationCurrAmount() {
		return donationCurrAmount;
	}

	public void setDonationCurrAmount(double donationCurrAmount) {
		this.donationCurrAmount = donationCurrAmount;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public LocalDate getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDate creationDate) {
		this.creationDate = creationDate;
	}

	@JsonIgnore
	public Organisation getAssocOrg() {
		return assocOrg;
	}

	public void setAssocOrg(Organisation assocOrg) {
		this.assocOrg = assocOrg;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Requirement [id=" + id + ", creationTime=" + creationDate + ", itemMaxCount=" + itemMaxCount
				+ ", itemCurrentCount=" + itemCurrentCount + ", donationMaxAmount=" + donationMaxAmount
				+ ", donationCurrAmount=" + donationCurrAmount + ", status=" + status + ", description=" + description
				+ "]";
	}
}
