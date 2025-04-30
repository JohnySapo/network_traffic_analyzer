package com.Backend.ExceptionHandler;

/*
 ** Custom Exception handler class manages
 ** the error message from a service
 ** to be displayed in the frontend
*/
public class CustomExceptionHandler extends RuntimeException{
    public CustomExceptionHandler(String message) {
        super(message);
    }
}
