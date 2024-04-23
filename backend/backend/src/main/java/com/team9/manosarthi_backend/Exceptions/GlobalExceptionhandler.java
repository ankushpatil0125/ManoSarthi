package com.team9.manosarthi_backend.Exceptions;

import com.team9.manosarthi_backend.models.ApiException;
import jakarta.validation.ConstraintViolationException;
import org.hibernate.TransientPropertyValueException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionhandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgsNotValidException(MethodArgumentNotValidException ex)
    {
        StringBuilder errorMessageBuilder = new StringBuilder();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String message= error.getDefaultMessage();
            errorMessageBuilder.append(message).append(", ");

        });
        String errorMessage = errorMessageBuilder.toString();
        ApiException apiException= new  ApiException(errorMessage, null,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {

        StringBuilder errorMessageBuilder = new StringBuilder();
        ex.getConstraintViolations().forEach(violation->{
            String message= violation.getMessage();
            errorMessageBuilder.append(message).append(", ");

        });
        String errorMessage = errorMessageBuilder.toString();


        ApiException apiException= new  ApiException(errorMessage, null,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(TransientPropertyValueException.class)
    public ResponseEntity<Object> handleTransientPropertyValueException(TransientPropertyValueException ex) {
        String errorMessage = "Error: " + "You are trying to save an entity that references another entity which hasn't been saved yet\n" +ex.getMessage();
        ApiException apiException= new  ApiException(errorMessage, null,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

}
