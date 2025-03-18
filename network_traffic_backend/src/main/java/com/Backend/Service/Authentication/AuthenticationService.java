package com.Backend.Service.Authentication;

import com.Backend.Entity.Authentication.Token;
import com.Backend.Entity.Role;
import com.Backend.Entity.UserEntity;
import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.Authentication.LoginRequest;
import com.Backend.Model.Authentication.RegisterRequest;
import com.Backend.Repository.Authentication.TokenRepository;
import com.Backend.Repository.User.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AuthenticationService {

    @Value("${security.jwt.token.refresh-token-expiration}")
    private long REFRESH_TOKEN_EXPIRE;
    private String REFRESH_TOKEN = "X-REFRESH-TOKEN";
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(
            JwtService jwtService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            TokenRepository tokenRepository,
            AuthenticationManager authenticationManager
    ) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    public ResponseEntity<AuthenticationResponse> login(LoginRequest body) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));

        User userDetails = (User) authentication.getPrincipal();
        String username = userDetails.getUsername();

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);
        ResponseCookie cookie = setRefreshTokenCookie(refreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(accessToken, "Login successful!"));
    }

    public ResponseEntity<AuthenticationResponse> register(RegisterRequest body) {
        Optional<UserEntity> verifyUser = userRepository.findByUsername(body.getUsername());

        if (verifyUser.isPresent()) {
            throw new IllegalArgumentException("Username already exist!");
        }

        if (!body.getPassword().equals(body.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match!");
        }

        UserEntity user = new UserEntity();
        user.setUsername(body.getUsername());
        user.setEmail(body.getEmail());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(body.getPassword()));

        UserEntity savedUser = userRepository.save(user);
        String accessToken = jwtService.generateAccessToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);

        saveUserToken(accessToken, refreshToken, savedUser);
        ResponseCookie cookie = setRefreshTokenCookie(refreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(accessToken, "Register successful!"));
    }

    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        String refreshToken = extraRefreshToken(request);

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new AuthenticationResponse(null, "Refresh token is missing"));
        }

        Optional<Token> storedToken = tokenRepository.findByRefreshToken(refreshToken);

        if (storedToken.isEmpty() || storedToken.get().isLoggedOut()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new AuthenticationResponse(null, "Invalid or expired refresh token"));
        }

        String username = jwtService.extractUsername(refreshToken);
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (jwtService.isRefreshTokenValid(refreshToken, user)) {
            String accessToken = jwtService.generateAccessToken(user);
            String newRefreshToken = jwtService.generateRefreshToken(user);

            revokeAllTokenByUser(user);
            saveUserToken(accessToken, newRefreshToken, user);
            ResponseCookie cookie = setRefreshTokenCookie(newRefreshToken);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthenticationResponse(accessToken, "Token renewed successfully"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new AuthenticationResponse(null, "Invalid refresh token"));
    }

    private ResponseCookie setRefreshTokenCookie(String refreshToken) {
        int setMaxToken = (int) (REFRESH_TOKEN_EXPIRE / 1000);
        return ResponseCookie.from(REFRESH_TOKEN, refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(setMaxToken)
                .sameSite("Strict")
                .build();
    }

    private String extraRefreshToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (REFRESH_TOKEN.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private void saveUserToken(String accessToken, String refreshToken, UserEntity user) {
        Token token = new Token(
                accessToken,
                refreshToken,
                false,
                user
        );
        tokenRepository.save(token);
    }

    private void revokeAllTokenByUser(UserEntity user) {
        List<Token> validTokens = tokenRepository.findAllAccessTokensByUser(user.getId());

        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach( token ->
                token.setLoggedOut(true)
        );

        tokenRepository.saveAll(validTokens);
    }
}