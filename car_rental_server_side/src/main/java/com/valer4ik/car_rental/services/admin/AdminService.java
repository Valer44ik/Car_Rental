package com.valer4ik.car_rental.services.admin;

import com.valer4ik.car_rental.dto.CarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
	
	boolean postCar(CarDto carDto) throws IOException;
	
	List<CarDto> getAllCars();
	
	void deleteCar(Long id);
	
	CarDto getCarById(Long id);
	
	boolean updateCar(Long carId, CarDto carDto) throws IOException;
}
