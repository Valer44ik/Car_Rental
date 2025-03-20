package com.valer4ik.car_rental.services.customer;

import com.valer4ik.car_rental.dto.BookACarDto;
import com.valer4ik.car_rental.dto.CarDto;
import com.valer4ik.car_rental.entity.BookACar;
import com.valer4ik.car_rental.entity.Car;
import com.valer4ik.car_rental.entity.User;
import com.valer4ik.car_rental.enums.BookCarStatus;
import com.valer4ik.car_rental.repository.BookACarRepository;
import com.valer4ik.car_rental.repository.CarRepository;
import com.valer4ik.car_rental.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
 public class CustomerServiceImpl implements CustomerService {
	
	private final CarRepository carRepository;
	
	private final UserRepository userRepository;
	
	private final BookACarRepository bookACarRepository;
	
	public CustomerServiceImpl(CarRepository carRepository, UserRepository userRepository, BookACarRepository bookACarRepository) {
		this.carRepository = carRepository;
		this.userRepository = userRepository;
		this.bookACarRepository = bookACarRepository;
	}
	
	@Override
	public List<CarDto> getAllCars() {
		return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
	}
	
	@Override
	public boolean bookACar(BookACarDto bookACarDto) {
		Optional<Car> optionalCar = carRepository.findById(bookACarDto.getCarId());
		Optional<User> optionalUser = userRepository.findById(bookACarDto.getUserId());
		if (optionalCar.isPresent() && optionalUser.isPresent()) {
			Car existingCar = optionalCar.get();
			BookACar bookACar = new BookACar();
			bookACar.setUser(optionalUser.get());
			bookACar.setCar(existingCar);
			bookACar.setBookCarStatus(BookCarStatus.PENDING);
			long difInMilliseconds = bookACarDto.getToDate().getTime() - bookACarDto.getFromDate().getTime();
			long days = TimeUnit.MICROSECONDS.toDays(difInMilliseconds);
			bookACar.setDays(existingCar.getPrice() * days);
			bookACarRepository.save(bookACar);
			return true;
		}
		return false;
	}
	
	@Override
	public CarDto getCarById(Long carId) {
		Optional<Car> optionalCar = carRepository.findById(carId);
		return optionalCar.map(Car::getCarDto).orElse(null);
	}
}
