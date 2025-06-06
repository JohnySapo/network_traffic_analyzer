package com.Backend.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authorization.event.AuthorizationEvent;
import org.springframework.stereotype.Component;

/*
 ** The Authorization events only serve to log information
 ** when a user has logged in to the application via frontend
 ** or any error occurred during the Authorization
 */

@Component
public class AuthorizationEvents {

    private final Logger log = LoggerFactory.getLogger(AuthorizationEvents.class);

    @EventListener
    public void onSuccess(AuthorizationEvent successEvent) {
        log.error("Authorization success for the user: {}",
                successEvent.getAuthentication().get().getName()
        );
    }

    @EventListener
    public void onFailure(AuthorizationEvent deniedEvent) {
        log.error("Authorization failed for the user: {} due to: {}",
                deniedEvent.getAuthentication().get().getName(),
                deniedEvent.getAuthorizationResult().toString()
        );
    }
}
