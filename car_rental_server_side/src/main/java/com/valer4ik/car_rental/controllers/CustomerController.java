package com.valer4ik.car_rental.controllers;

import com.valer4ik.car_rental.dto.BookACarDto;
import com.valer4ik.car_rental.dto.CarDto;
import com.valer4ik.car_rental.services.customer.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	private final CustomerService customerService;
	
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}
	
	@GetMapping("/cars")
	public ResponseEntity<List<CarDto>> getAllCars() {
		List<CarDto> carDtoList = customerService.getAllCars();
		return ResponseEntity.ok(carDtoList);
	}
	
	@PostMapping("/car/book")
	public ResponseEntity<Void> bookACar(@RequestBody BookACarDto bookACarDto) {
		boolean success = customerService.bookACar(bookACarDto);
		if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
	
	@GetMapping("/car/{carId")
	public ResponseEntity<CarDto> getCarById(@PathVariable Long carId) {
		CarDto carDto = customerService.getCarById(carId);
		if (carDto == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(carDto);
	}
}
