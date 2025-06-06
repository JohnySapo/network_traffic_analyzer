package com.Backend.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

/*
 ** The Authentication events only serve to log information
 ** when a user has logged in to the application via frontend
 ** or any error occurred during the authentication
*/
@Component
public class AuthenticationEvents {

    private final Logger log = LoggerFactory.getLogger(AuthenticationEvents.class);

    @EventListener
    public void onSuccess(AuthenticationSuccessEvent successEvent) {
        log.info("Login successfully for the user: {}", successEvent.getAuthentication().getName());
    }

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failureEvent) {
        log.error("Login failed for the user: {} due to: {}",
                failureEvent.getAuthentication().getName(),
                failureEvent.getException().getMessage()
        );
    }
}
