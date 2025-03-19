package com.valer4ik.car_rental.repository;

import com.valer4ik.car_rental.entity.User;
import com.valer4ik.car_rental.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{
	
	Optional<User> findFirstByEmail(String email);
	
	User findByUserRole(UserRole userRole);
}
