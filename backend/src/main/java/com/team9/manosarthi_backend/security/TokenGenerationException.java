package com.team9.manosarthi_backend.security;

public class TokenGenerationException extends RuntimeException {
    public TokenGenerationException(String message)  {
        super(message);
    }
}
