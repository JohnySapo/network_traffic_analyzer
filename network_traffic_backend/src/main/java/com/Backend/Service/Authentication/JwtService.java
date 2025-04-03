package com.Backend.Service.Authentication;

import com.Backend.Entity.Authentication.Token;
import com.Backend.Entity.Authentication.UserEntity;
import com.Backend.Repository.Authentication.TokenRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JwtService {

    private String REFRESH_TOKEN = "X-REFRESH-TOKEN";
    @Value("${security.jwt.token.secret-key}")
    private String SECRET_KEY;
    @Value("${security.jwt.token.access-token-expiration}")
    private long ACCESS_TOKEN_EXPIRE;
    @Value("${security.jwt.token.refresh-token-expiration}")
    private long REFRESH_TOKEN_EXPIRE;


    private final TokenRepository tokenRepository;

    @Autowired
    public JwtService(TokenRepository tokenRepository) {
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
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        String role = user.getAuthorities().iterator().next().getAuthority();

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

    public void saveUserToken(String accessToken, String refreshToken, UserEntity user) {
        Token token = new Token(
                accessToken,
                refreshToken,
                false,
                user
        );

        tokenRepository.save(token);
    }

    public void revokeAllTokenByUser(UserEntity user) {
        List<Token> validTokens = tokenRepository.findAllAccessTokensByUser(user.getId());

        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach( token ->
                token.setLoggedOut(true)
        );

        tokenRepository.saveAll(validTokens);
    }

    public ResponseCookie setRefreshTokenCookie(String refreshToken) {
        int setMaxToken = (int) (REFRESH_TOKEN_EXPIRE / 1000);
        return ResponseCookie.from(REFRESH_TOKEN, refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(setMaxToken)
                .sameSite("Strict")
                .build();
    }

    public String extraRefreshToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (REFRESH_TOKEN.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
