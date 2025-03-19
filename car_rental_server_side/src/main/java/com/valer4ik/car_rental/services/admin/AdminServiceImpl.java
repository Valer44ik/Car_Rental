package com.valer4ik.car_rental.services.admin;

import com.valer4ik.car_rental.dto.CarDto;
import com.valer4ik.car_rental.entity.Car;
import com.valer4ik.car_rental.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService{
	
	private final CarRepository carRepository;
	
	@Autowired
	public AdminServiceImpl(CarRepository carRepository) {
		this.carRepository = carRepository;
	}
	
	@Override
	public boolean postCar(CarDto carDto) throws IOException {
		try {
			Car car = new Car();
			car.setName(carDto.getName());
			car.setBrand(carDto.getBrand());
			car.setColor(carDto.getColor());
			car.setPrice(carDto.getPrice());
			car.setDescription(carDto.getDescription());
			car.setTransmission(carDto.getTransmission());
			car.setYear(carDto.getYear());
			car.setType(carDto.getType());
			car.setImage(carDto.getImage().getBytes());
			carRepository.save(car);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	@Override
	public List<CarDto> getAllCars() {
		return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
	}
	
	@Override
	public void deleteCar(Long id) {
		carRepository.deleteById(id);
	}
	
	@Override
	public CarDto getCarById(Long id) {
		Optional<Car> optionalCar = carRepository.findById(id);
		return optionalCar.map(Car::getCarDto).orElse(null);
	}
	
	@Override
	public boolean updateCar(Long carId, CarDto carDto) throws IOException {
		Optional<Car> optionalCar = carRepository.findById(carId);
		if (optionalCar.isPresent()) {
			Car existingCar = optionalCar.get();
			if (carDto.getImage() != null) {
				existingCar.setImage(carDto.getImage().getBytes());
			}
			existingCar.setPrice(carDto.getPrice());
			existingCar.setYear(carDto.getYear());
			existingCar.setType(carDto.getType());
			existingCar.setName(carDto.getName());
			existingCar.setTransmission(carDto.getTransmission());
			existingCar.setColor(carDto.getColor());
			existingCar.setBrand(carDto.getBrand());
			existingCar.setDescription(carDto.getDescription());
			carRepository.save(existingCar);
			return true;
		}
		return false;
	}
}
