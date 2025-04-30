package com.Backend.Repository.User;

import com.Backend.Entity.Authentication.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
 ** User Repository using Spring JPA data
 ** which implements data access layers via
 ** PostgresSQL Database
*/
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);
}
