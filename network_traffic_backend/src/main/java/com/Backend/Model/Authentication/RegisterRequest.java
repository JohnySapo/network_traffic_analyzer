package com.Backend.Model.Authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/*
 ** Register Model Request
 ** to manage register process API from frontend.
*/
public class RegisterRequest {

    @NotBlank(message = "Username is required!")
    @Size(max = 9,  message = "Username must be max of 09 characters.")
    private String username;

    @NotBlank(message = "Email is required!")
    @Email(message = "Email must be in in its format: email@domain.com")
    private String email;

    @NotBlank(message = "Password is required!")
    @Size(min = 12, message = "Password must be a minimum of 12 characters.")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$",
            message = "Example: 'Password@5678'"
    )
    private String password;

    @NotBlank(message = "Confirm Password is required!")
    @Size(min = 12, message = "Confirm password must be a minimum of 12 characters.")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$",
            message = "Example: 'Password@5678'"
    )
    private String confirmPassword;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

}
