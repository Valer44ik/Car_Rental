package com.valer4ik.car_rental.controllers;

import com.valer4ik.car_rental.dto.CarDto;
import com.valer4ik.car_rental.services.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	private final AdminService adminService;
	
	@Autowired
	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}
	
	@PostMapping("/car")
	public ResponseEntity<?> postCar(@ModelAttribute CarDto carDto) throws IOException {
		boolean success = adminService.postCar(carDto);
		
		if (success) {
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@GetMapping("/cars")
	public ResponseEntity<?> getAllCars() {return ResponseEntity.ok(adminService.getAllCars());}
	
	@DeleteMapping("/car/{id}")
	public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
		adminService.deleteCar(id);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/car/{id}")
	public ResponseEntity<CarDto> getCarById(@PathVariable Long id) {
		CarDto carDto = adminService.getCarById(id);
		return ResponseEntity.ok(carDto);
	}
	
	@PutMapping("/car/{carId}")
	public ResponseEntity<Void> updateCar(@PathVariable Long carId, @ModelAttribute CarDto carDto) throws IOException {
		try {
			boolean success = adminService.updateCar(carId, carDto);
			if (success){
				return ResponseEntity.status(HttpStatus.OK).build();
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
