package com.team9.manosarthi_backend.Services;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
@Service
public class PasswordGeneratorService {
    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
//    private static final String OTHER_CHAR = "!@#$%&*()_+-=[]|,./?><";

    //    private static final String PASSWORD_ALLOW = CHAR_LOWER + CHAR_UPPER + NUMBER + OTHER_CHAR;
    private static final String PASSWORD_ALLOW = CHAR_LOWER + CHAR_UPPER + NUMBER;
    private static SecureRandom random = new SecureRandom();
    public static String generatePassword() {
        int passwordLength = 12; // Password length
        StringBuilder password = new StringBuilder(passwordLength);
        for (int i = 0; i < passwordLength; i++) {
            int index = random.nextInt(PASSWORD_ALLOW.length());
            password.append(PASSWORD_ALLOW.charAt(index));
        }
        return password.toString();
    }
}
