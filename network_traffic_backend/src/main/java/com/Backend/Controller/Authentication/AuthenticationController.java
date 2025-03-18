package com.Backend.Controller.Authentication;

import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.Authentication.LoginRequest;
import com.Backend.Model.Authentication.RegisterRequest;
import com.Backend.Service.Authentication.AuthenticationService;
import com.Backend.Service.Authentication.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authService;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationController(AuthenticationService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request){
        return authService.refreshToken(request);
    }

}
