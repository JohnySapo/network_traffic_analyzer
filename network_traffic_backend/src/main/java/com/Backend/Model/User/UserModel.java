package com.Backend.Model.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/*
 ** User Data Model Request
 ** to manage user update account info
 **  process API from frontend.
*/
public class UserModel {

    @NotBlank(message = "Username is required!")
    @Size(max = 9,  message = "Username must be max of 09 characters.")
    private String username;

    @NotBlank(message = "Email is required!")
    @Email(message = "Email must be in in its format: email@domain.com")
    private String email;

    @Size(max = 12, message = "First name must be max of 12 characters.")
    private String firstname;

    @Size(max = 12, message = "Last name must be max of 12 characters.")
    private String lastname;

    public UserModel(String username, String email, String firstname, String lastname) {
        this.username = username;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
