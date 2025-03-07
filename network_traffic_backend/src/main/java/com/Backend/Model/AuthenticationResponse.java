package com.Backend.Model;

import com.Backend.Entity.Role;

public class AuthenticationResponse {
    private String username;
    private String firstname;
    private String email;
    private String token;
    private Role role;

    public AuthenticationResponse() {}

    public AuthenticationResponse(
            String username,
            String firstname,
            String email,
            String token,
            Role role
    ) {
        this.username = username;
        this.firstname = firstname;
        this.email = email;
        this.token = token;
        this.role = role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
