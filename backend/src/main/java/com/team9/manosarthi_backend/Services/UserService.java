package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User addUser(User user) {
        // Encode the password before saving to the database
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public Boolean changePassword(String oldPassword,String newPassword,Principal principal)
    {

        System.out.println(oldPassword);
        System.out.println(newPassword);
        String userName= principal.getName();
        User currentuser=this.userRepository.findByUsername(userName);

        if(this.bCryptPasswordEncoder.matches(oldPassword, currentuser.getPassword()))
        {
            //change password
            currentuser.setPassword(this.bCryptPasswordEncoder.encode(newPassword));
            currentuser.setChangepass(true);
            this.userRepository.save(currentuser);
            return true;
        }
        else {
            return false;
        }

    }
}
