package com.Backend.Handler.Authentication;

import com.Backend.Entity.Authentication.Token;
import com.Backend.Repository.Authentication.TokenRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;


/*
 ** Simple JWT Logout Success Handler class
 ** for Authentication, clear SecurityContext and
 ** flag the JWT token as logged-out
 */
@Component
public class JwtLogoutSuccessHandler implements LogoutSuccessHandler {

    private String REFRESH_TOKEN = "X-REFRESH-TOKEN";
    private final TokenRepository tokenRepository;

    @Autowired
    public JwtLogoutSuccessHandler(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void onLogoutSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        if(authentication != null) {
            String refreshToken = extraRefreshToken(request);

            if(refreshToken != null) {
                Optional<Token> storeToken = tokenRepository.findByRefreshToken(refreshToken);

                storeToken.ifPresent(t -> {
                    t.setLoggedOut(true);
                    tokenRepository.save(t);
                });
            }
        }

        SecurityContextHolder.clearContext();

        Cookie refreshToken = new Cookie(REFRESH_TOKEN, null);
        refreshToken.setHttpOnly(true);
        refreshToken.setSecure(false);
        refreshToken.setPath("/");
        refreshToken.setMaxAge(0);
        response.addCookie(refreshToken);

        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String extraRefreshToken(HttpServletRequest request) {
        if(request.getCookies() != null)  {
            for(Cookie cookie : request.getCookies()) {
                if(REFRESH_TOKEN.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
