package com.valer4ik.car_rental.services.auth;

import com.valer4ik.car_rental.dto.SignupRequest;
import com.valer4ik.car_rental.dto.UserDto;
import org.springframework.stereotype.Service;

public interface AuthService
{
	UserDto createCustomer (SignupRequest signupRequest);
	
	boolean hasCustomerWithEmail (String email);
}
