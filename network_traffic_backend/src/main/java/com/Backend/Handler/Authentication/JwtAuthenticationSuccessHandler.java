package com.Backend.Handler.Authentication;

import com.Backend.Entity.UserEntity;
import com.Backend.Service.Authentication.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final Logger logger = LoggerFactory.getLogger(JwtAuthenticationSuccessHandler.class);

    public JwtAuthenticationSuccessHandler(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        UserEntity user = (UserEntity) authentication.getPrincipal();
        String accessToken = jwtService.generateAccessToken(user);

        response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        response.setHeader("Access-Control-Expose-Headers", HttpHeaders.AUTHORIZATION);
        logger.info("Authentication successful. JWT token added to headers.");
    }
}
