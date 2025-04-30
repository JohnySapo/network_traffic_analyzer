package com.Backend.Controller.Authentication;

import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.Authentication.LoginRequest;
import com.Backend.Model.Authentication.RegisterRequest;
import com.Backend.Service.Authentication.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authService;

    @Autowired
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }


    /*
     ** CSRF Token endpoint generation for each request
     ** URL endpoint: localhost:port/auth/csrf-token
    */
    @GetMapping("/csrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    }

    /*
     ** Login endpoint request to access application
     ** URL endpoint: localhost:port/auth/login
    */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    /*
     ** Register endpoint request to register via application
     ** URL endpoint: localhost:port/auth/register
    */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    /*
     ** JWT Refresh Token endpoint request to continue logged-in to application
     ** URL endpoint: localhost:port/auth/login
    */
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request){
        return authService.refreshToken(request);
    }

}
