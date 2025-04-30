package com.Backend.Service.User;

import com.Backend.Entity.Authentication.UserEntity;
import com.Backend.ExceptionHandler.CustomExceptionHandler;
import com.Backend.Model.Authentication.AuthenticationResponse;
import com.Backend.Model.User.ChangePasswordRequest;
import com.Backend.Model.User.UserModel;
import com.Backend.Repository.User.UserRepository;
import com.Backend.Service.Authentication.JwtService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class UserService  {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /*
     ** User Account information service layer
     ** populating user's account once authenticated
     ** from Security Context Holder
    */
    public UserModel getUserAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity userData = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new CustomExceptionHandler("User has not been found!"));

        return new UserModel(
                userData.getUsername(),
                userData.getEmail(),
                userData.getFirstname(),
                userData.getLastname()
        );
    }

    /*
     ** User Update Account information service layer
     ** updating the user's account once authenticated
     ** using the Security Context Holder and HTTP Response
     ** for controller layer (URL API)
    */
    public ResponseEntity<AuthenticationResponse> updateUserAccount(UserModel body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new CustomExceptionHandler("User has not been found!"));

        Optional<UserEntity> verifyUsername = userRepository.findByUsername(user.getUsername());
        Optional<UserEntity> verifyUserEmail = userRepository.findByEmail(user.getEmail());

        if(verifyUsername.isPresent() && !verifyUsername.get().getId().equals(user.getId())) {
            throw new UsernameNotFoundException("Username is unavailable! Please, select another username.");
        }

        if(verifyUserEmail.isPresent() && !verifyUserEmail.get().getId().equals(user.getId())) {
            throw new UsernameNotFoundException("Email is unavailable! Please, select another email.");
        }

        user.setUsername(body.getUsername());
        user.setEmail(body.getEmail());
        user.setFirstname(body.getFirstname());
        user.setLastname(body.getLastname());

        userRepository.save(user);

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        jwtService.revokeAllTokenByUser(user);
        jwtService.saveUserToken(newAccessToken, newRefreshToken, user);
        ResponseCookie cookie = jwtService.setRefreshTokenCookie(newRefreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(newAccessToken,"Token renewed successfully."));
    }

    /*
     ** User Change Password information service layer
     ** updating the user's password once authenticated
     ** using the Security Context Holder and HTTP Response
     ** for controller layer (URL API)
    */
    public ResponseEntity<AuthenticationResponse> changeUserPassword(ChangePasswordRequest body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new CustomExceptionHandler("User has not been found!"));

        if(!passwordEncoder.matches(body.getCurrentPassword(), user.getPassword())) {
            throw new BadCredentialsException("Current password is incorrect.");
        }

        if(!body.getNewPassword().equals(body.getConfirmNewPassword())) {
            throw new CustomExceptionHandler("Password & Confirm password does not match.");
        }

        user.setPassword(passwordEncoder.encode(body.getNewPassword()));
        userRepository.save(user);

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        jwtService.revokeAllTokenByUser(user);
        jwtService.saveUserToken(newAccessToken, newRefreshToken, user);
        ResponseCookie cookie = jwtService.setRefreshTokenCookie(newRefreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(newAccessToken, "Token renewed successfully."));
    }
}
