package com.mysite.mysite.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        System.out.println("=== GLOBAL ERROR: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(500)
                .body(Map.of("error", e.getMessage() != null ? e.getMessage() : "Unknown error"));
    }
}