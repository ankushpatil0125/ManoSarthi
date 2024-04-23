package com.team9.manosarthi_backend.Exceptions;


import lombok.Getter;
import org.springframework.http.HttpStatus;

public class APIRequestException extends RuntimeException{
    @Getter
    private String message;
    @Getter
    private String details;

    // Constructor for custom message only
    public APIRequestException(String message) {
        super(message);
        this.message = message;

    }

    // Constructor for custom message and original exception message
    public APIRequestException(String message, String details) {
        super(message);
        this.message = message;
        this.details = details;
    }

    //    public APIRequestException(String message,String details)
//    {
//        super(message,details);
//    }
}
