package com.Backend.Controller.Authentication;

import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.Authentication.LoginRequest;
import com.Backend.Model.Authentication.RegisterRequest;
import com.Backend.Service.Authentication.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authService;

    @Autowired
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request){
        return authService.refreshToken(request);
    }

}
