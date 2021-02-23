package com.app.pojo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "org_tbl")
@JsonIgnoreProperties(value={"password"}, allowSetters= true)
public class Organisation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(length = 50)
	private String fullname;
	@Column(length = 100)
	private String address;
	@Column(name = "lat")
	private double latitude;
	@Column(name = "lng")
	private double longitude;
	@Column(length = 500)
	private String description;
	@Column(length = 15)
	private String type;
	@Column(length = 15)
	private String city;
	//@OneToOne(mappedBy = "org")
	//private OrgAdmin admin;
	@Column(length = 20)
	private String accname;
	private String password;
	@Transient
	private String jwtToken;

	@OneToMany(mappedBy = "assocOrg", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("assocOrg")
	@JsonIgnore
	private List<Requirement> requirements = new ArrayList<>();
	
	//distance from user location
	@Transient
	private int distance;            

	public Organisation() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Requirement> getRequirements() {
		return requirements;
	}

	public void setRequirements(List<Requirement> requirements) {
		this.requirements = requirements;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	// helper methods
	public void addRequirement(Requirement req) {
		this.requirements.add(req);
		req.setAssocOrg(this);
	}

	public void removeRequirement(Requirement req) {
		this.requirements.remove(req);
		req.setAssocOrg(null);
	}

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}
	
	public String getAccname() {
		return accname;
	}

	public void setAccname(String accname) {
		this.accname = accname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
	
	

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	@Override
	public String toString() {
		return "Organisation [id=" + id + ", fullname=" + fullname + ", address=" + address + ", latitude=" + latitude
				+ ", longitude=" + longitude + ", type=" + type + "]";
	}

}
