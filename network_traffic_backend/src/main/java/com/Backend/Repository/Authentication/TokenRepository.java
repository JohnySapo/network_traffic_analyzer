package com.Backend.Repository.Authentication;

import com.Backend.Entity.Authentication.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*
 ** Token Repository using Spring JPA data
 ** which implements data access layers via
 ** PostgresSQL Database
*/
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query("""
            Select t from Token t inner join UserEntity u
            on t.user.id = u.id where t.user.id = :userId and t.isLoggedOut = false
    """)

    List<Token> findAllAccessTokensByUser(Integer userId);
    Optional<Token> findByAccessToken(String token);
    Optional<Token> findByRefreshToken(String token);
}
