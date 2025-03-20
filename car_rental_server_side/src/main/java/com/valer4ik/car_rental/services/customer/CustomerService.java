package com.valer4ik.car_rental.services.customer;

import com.valer4ik.car_rental.dto.BookACarDto;
import com.valer4ik.car_rental.dto.CarDto;

import java.util.List;

public interface CustomerService {

	List<CarDto> getAllCars();
	
	boolean bookACar(BookACarDto bookACarDto);
	
	CarDto getCarById(Long carId);
}
