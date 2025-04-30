package com.Backend.Entity.Authentication;

import org.springframework.security.core.GrantedAuthority;

/*
 ** Pre-defining of Role/Authorities of USER & ADMIN
 ** for authorization level using GrantedAuthority Interface
*/
public enum Role implements GrantedAuthority {
    ADMIN,
    USER;

    @Override
    public String getAuthority() {
        return this.name();
    }
}
