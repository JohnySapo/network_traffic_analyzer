package com.Backend.Model.Authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    @NotBlank(message = "Username is required!")
    @Size(max = 9,  message = "Username must be max of 09 characters.")
    private String username;

    @NotBlank(message = "Password is required!")
    @Size(max = 12, message = "Password must be a maximum of 12 characters.")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,12}$",
            message = "Example: 'Password@5678'"
    )
    private String password;

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
