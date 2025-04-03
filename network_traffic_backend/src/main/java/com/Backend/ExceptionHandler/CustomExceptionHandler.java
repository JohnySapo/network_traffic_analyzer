package com.Backend.ExceptionHandler;

public class CustomExceptionHandler extends RuntimeException{
    public CustomExceptionHandler(String message) {
        super(message);
    }
}
