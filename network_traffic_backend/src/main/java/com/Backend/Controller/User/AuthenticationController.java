package com.Backend.Controller.User;

import com.Backend.Model.AuthenticationResponse;
import com.Backend.Model.LoginRequest;
import com.Backend.Model.RegisterRequest;
import com.Backend.Service.JwtService;
import com.Backend.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthenticationController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        AuthenticationResponse loginUser = userService.login(request);
        loginUser.setToken(jwtService.createToken(loginUser));
        return ResponseEntity.ok(loginUser);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        AuthenticationResponse createUser = userService.register(request);
        createUser.setToken(jwtService.createToken(createUser));
        return ResponseEntity.created(URI.create("/user/" + createUser.getUsername())).body(createUser);
    }
}
