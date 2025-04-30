package com.Backend.Controller.User;

import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.User.ChangePasswordRequest;
import com.Backend.Model.User.UserModel;
import com.Backend.Service.User.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
     ** Account endpoint to provider user's data from database
     ** URL endpoint: localhost:port/user/account
    */
    @GetMapping("/account")
    public ResponseEntity<UserModel> userAccount() {
        return ResponseEntity.ok(userService.getUserAccount());
    }

    /*
     ** Update Account endpoint to update user's data from database
     ** URL endpoint: localhost:port/user/update-account
    */
    @PutMapping("/update-account")
    public ResponseEntity<AuthenticationResponse> updateUserAccount(@Valid @RequestBody UserModel body) {
        return userService.updateUserAccount(body);
    }

    /*
     ** Update password endpoint to update  user's password from database
     ** URL endpoint: localhost:port/user/update-password
    */
    @PutMapping("/update-password")
    public ResponseEntity<AuthenticationResponse> updateUserPassword(@Valid @RequestBody ChangePasswordRequest body) {
        return  userService.changeUserPassword(body);
    }
}
