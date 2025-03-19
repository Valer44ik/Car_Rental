package com.valer4ik.car_rental.dto;

import com.valer4ik.car_rental.enums.UserRole;

public class AuthenticationResponse {
	
	public String getJwt() {
		return jwt;
	}
	
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	
	public UserRole getUserRole() {
		return userRole;
	}
	
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	
	public long getUserId() {
		return userId;
	}
	
	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	private String jwt;
	private UserRole userRole;
	private long userId;
	
	
}
