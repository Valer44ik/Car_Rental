package com.valer4ik.car_rental.dto;

import lombok.Data;

public class SignupRequest {
	
	private String email;
	private String name;
	private String password;
	
	// Getters
	public String getEmail() {
		return email;
	}
	
	public String getName() {
		return name;
	}
	
	public String getPassword() {
		return password;
	}
	
	// Setters
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	// toString Method
	@Override
	public String toString() {
		return "SignupRequest{" +
				"email='" + email + '\'' +
				", name='" + name + '\'' +
				", password='" + password + '\'' +
				'}';
	}
}
