package com.Backend.Service.Authentication;

import com.Backend.Entity.UserEntity;
import com.Backend.Repository.Authentication.TokenRepository;
import com.Backend.Repository.User.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JwtService {

    @Value("${security.jwt.token.secret-key}")
    private String SECRET_KEY;
    @Value("${security.jwt.token.access-token-expiration}")
    private long ACCESS_TOKEN_EXPIRE;
    @Value("${security.jwt.token.refresh-token-expiration}")
    private long REFRESH_TOKEN_EXPIRE;


    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public JwtService(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    @PostConstruct
    protected void init() {
        SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY.getBytes());
    }

    public String generateAccessToken(UserDetails user) {
        return createToken(user, ACCESS_TOKEN_EXPIRE);
    }

    public String generateRefreshToken(UserDetails user) {
        return createToken(user, REFRESH_TOKEN_EXPIRE);
    }

    public String createToken(UserDetails user, long expireTime) {

        // Current time
        Date now = new Date(System.currentTimeMillis());

        //Access Token Expiration ## 01 Hour
        //Refresh Token Expiration ## 01 Day
        Date validity = new Date(now.getTime() + expireTime);
        String role = user.getAuthorities().iterator().next().getAuthority();

        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        return JWT.create()
                .withSubject(user.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("role", role)
                .sign(algorithm);
    }

    public String extractUsername(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET_KEY))
                .build()
                .verify(token)
                .getSubject();
    }

    public boolean isAccessTokenValid(String token, UserDetails user) {
        String username = extractUsername(token);
        boolean validToken = tokenRepository
                .findByAccessToken(token)
                .map(t -> !t.isLoggedOut())
                .orElse(false);

        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validToken;
    }

    public boolean isRefreshTokenValid(String token, UserEntity user) {
        String username = extractUsername(token);
        boolean validRefreshToken = tokenRepository
                .findByRefreshToken(token)
                .map(t -> !t.isLoggedOut())
                .orElse(false);

        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validRefreshToken;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token).getExpiresAt();
    }

    private DecodedJWT extractClaim(String token) {
        return JWT
                .require(Algorithm.HMAC256(SECRET_KEY))
                .build()
                .verify(token);
    }
}
