package com.Backend.Service.Authentication;

import com.Backend.Entity.Authentication.Token;
import com.Backend.Entity.Authentication.Role;
import com.Backend.Entity.Authentication.UserEntity;
import com.Backend.ExceptionHandler.CustomExceptionHandler;
import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.Authentication.LoginRequest;
import com.Backend.Model.Authentication.RegisterRequest;
import com.Backend.Repository.Authentication.TokenRepository;
import com.Backend.Repository.User.UserRepository;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Value("${security.jwt.token.refresh-token-expiration}")
    private long REFRESH_TOKEN_EXPIRE;
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

    /*
     ** Login service layer to manage username & password
     ** authenticating and authorizing via JWT and Authority
     ** also allowing HTTP response from backend to frontend
    */
    public ResponseEntity<AuthenticationResponse> login(LoginRequest body) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));

        User userDetails = (User) authentication.getPrincipal();

        UserEntity user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username has not been registered yet!"));

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        jwtService.revokeAllTokenByUser(user);
        jwtService.saveUserToken(accessToken, refreshToken, user);
        ResponseCookie cookie = jwtService.setRefreshTokenCookie(refreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(accessToken, "Login successful!"));
    }

    /*
     ** Register service layer to register email, username, password & confirm password,
     ** authenticating and authorizing via JWT and Authority
     ** also allowing HTTP response from backend to frontend
     */
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest body) {
        Optional<UserEntity> verifyUser = userRepository.findByUsername(body.getUsername());
        Optional<UserEntity> verifyUserEmail = userRepository.findByEmail(body.getEmail());

        if (verifyUser.isPresent()) {
            throw new UsernameNotFoundException("Username is unavailable!");
        }

        if (verifyUserEmail.isPresent()) {
            throw new UsernameNotFoundException("Email is unavailable!");
        }

        if (!body.getPassword().equals(body.getConfirmPassword())) {
            throw new IllegalIdentifierException("Password & Confirm password do not match!");
        }

        UserEntity user = new UserEntity();
        user.setUsername(body.getUsername());
        user.setEmail(body.getEmail());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(body.getPassword()));

        UserEntity savedUser = userRepository.save(user);
        String accessToken = jwtService.generateAccessToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);

        jwtService.saveUserToken(accessToken, refreshToken, savedUser);
        ResponseCookie cookie = jwtService.setRefreshTokenCookie(refreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(accessToken, "Register successful!"));
    }

    /*
     ** Refresh token service layer to manage user's
     ** authenticating and authorizing via Access & Refresh JWT Token
     ** also allowing HTTP response from backend to frontend
    */
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        String refreshToken = jwtService.extraRefreshToken(request);

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
                .orElseThrow(() -> new CustomExceptionHandler("User has not been found!"));

        if (jwtService.isRefreshTokenValid(refreshToken, user)) {
            String accessToken = jwtService.generateAccessToken(user);
            String newRefreshToken = jwtService.generateRefreshToken(user);

            jwtService.revokeAllTokenByUser(user);
            jwtService.saveUserToken(accessToken, newRefreshToken, user);
            ResponseCookie cookie = jwtService.setRefreshTokenCookie(newRefreshToken);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthenticationResponse(accessToken, "Token renewed successfully"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new AuthenticationResponse(null, "Invalid refresh token"));
    }

}