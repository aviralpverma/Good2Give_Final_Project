package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class UserAddress {
	private double latitute;
	private double longitude;
	@Column(length = 20)
	private String city;
	@Column(length = 20)
	private String state;
	@Column(length = 10)
	private String phoneNo;
	
	public UserAddress() {
		// TODO Auto-generated constructor stub
	}

	public double getLatitute() {
		return latitute;
	}

	public void setLatitute(double latitute) {
		this.latitute = latitute;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	@Override
	public String toString() {
		return "UserAddress [latitute=" + latitute + ", longitude=" + longitude + ", city=" + city + ", state=" + state
				+ ", phoneNo=" + phoneNo + "]";
	}
	
	
}
