package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.User;

import java.security.Principal;

public interface UserService {
    User addUser(User user);
    Boolean verifyEmail(String email);
    Boolean verifyOTP(String email,String otp);
    Boolean changePassword(String oldPassword, String newPassword, Principal principal);

    Boolean setNewPassword(String password,String reenteredPassword,String email);
//    Boolean resendOTP(String email);
}
