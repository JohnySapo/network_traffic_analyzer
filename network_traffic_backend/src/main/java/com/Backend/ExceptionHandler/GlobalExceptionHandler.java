package com.Backend.ExceptionHandler;

import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.Backend.Model.Exception.ErrorResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomExceptionHandler.class)
    public ResponseEntity<ErrorResponse> handleCustomException(
            CustomExceptionHandler exception
    ) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getMessage(),
                        "Validation error!")
                );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse>handleBadCredentialsException(
            BadCredentialsException exception
    ) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(
                        HttpStatus.UNAUTHORIZED.value(),
                        "Invalid username or password!",
                        "Authentication has failed.")
                );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(
            UsernameNotFoundException exception
    ) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(
                        HttpStatus.NOT_FOUND.value(),
                        exception.getMessage(),
                        "User has not been found!")
                );
    }

    @ExceptionHandler(IllegalIdentifierException.class)
    public ResponseEntity<ErrorResponse> handleIllegalIdentifierException(
            IllegalArgumentException exception
    ) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), "Password & Confirm Password does not match!"));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException exception
    ) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        exception.getMessage(),
                        "Check the information and try again!")
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception
    ) {

        List<String> errors = exception.getBindingResult()
                .getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        String message = String.join("; ", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        message,
                        "Form validation error!")
                );
    }
}
