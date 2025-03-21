package com.valer4ik.car_rental.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.valer4ik.car_rental.dto.BookACarDto;
import com.valer4ik.car_rental.enums.BookCarStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
public class BookACar {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Date fromDate;
	
	private Date toDate;
	
	private Long days;
	
	private Long price;
	
	private BookCarStatus bookCarStatus;
	
	private BookACarDto bookACarDto;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "car_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Car car;
	
	public BookACarDto getBookACarDto() {
		BookACarDto bookACarDto = new BookACarDto();
		bookACarDto.setId(id);
		bookACarDto.setDays(days);
		bookACarDto.setBookCarStatus(bookCarStatus);
		bookACarDto.setPrice(price);
		bookACarDto.setFromDate(fromDate);
		bookACarDto.setToDate(toDate);
		bookACarDto.setEmail(user.getEmail());
		bookACarDto.setUsername(user.getUsername());
		bookACarDto.setCarId(car.getId());
		return bookACarDto;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Date getFromDate() {
		return fromDate;
	}
	
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	
	public Date getToDate() {
		return toDate;
	}
	
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	
	public Long getDays() {
		return days;
	}
	
	public void setDays(Long days) {
		this.days = days;
	}
	
	public Long getPrice() {
		return price;
	}
	
	public void setPrice(Long price) {
		this.price = price;
	}
	
	public BookCarStatus getBookCarStatus() {
		return bookCarStatus;
	}
	
	public void setBookCarStatus(BookCarStatus bookCarStatus) {
		this.bookCarStatus = bookCarStatus;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public Car getCar() {
		return car;
	}
	
	public void setCar(Car car) {
		this.car = car;
	}
}
