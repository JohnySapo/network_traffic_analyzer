package com.Backend.Model.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/*
 ** Change Password Model Request
 ** to manage password change process API from frontend.
*/
public class ChangePasswordRequest {

    @NotBlank(message = "Current Password is required!")
    @Size(min = 12, message = "Password must be a minimum of 12 characters.")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$",
            message = "Example: 'Password@5678'"
    )
    private String currentPassword;

    @NotBlank(message = "New Password is required!")
    @Size(min = 12, message = "New password must be a minimum of 12 characters.")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$",
            message = "Example: 'Password@5678'"
    )
    private String newPassword;

    @NotBlank(message = "Confirm Password is required!")
    @Size(min = 12, message = "Confirm password must be a minimum of 12 characters.")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$",
            message = "Example: 'Password@5678'"
    )
    private String confirmNewPassword;

    public ChangePasswordRequest(String currentPassword, String newPassword, String confirmNewPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String oldPassword) {
        this.currentPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmNewPassword() {
        return confirmNewPassword;
    }

    public void setConfirmNewPassword(String confirmNewPassword) {
        this.confirmNewPassword = confirmNewPassword;
    }
}
