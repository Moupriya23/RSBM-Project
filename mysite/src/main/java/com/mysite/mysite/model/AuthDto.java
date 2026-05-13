package com.mysite.mysite.model;

import lombok.Data;

public class AuthDto {

    @Data
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String name;
        private String email;
        private String role; // returns "USER" or "ADMIN"

        public AuthResponse(String token, String name, String email, Role role) {
            this.token = token;
            this.name = name;
            this.email = email;
            this.role = role.name(); // converts enum to string
        }
    }
}