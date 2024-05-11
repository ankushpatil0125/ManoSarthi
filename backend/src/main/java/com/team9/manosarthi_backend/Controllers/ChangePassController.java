package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("permitAll()")
@RequestMapping("/passwordstatus")
@CrossOrigin(origins = "*")
public class ChangePassController {

    private User user;

    @Autowired
    private UserRepository userRepository;
    @PreAuthorize("permitAll()")
    @GetMapping("/")
    @CrossOrigin(origins = "*")
    public Boolean getpassstatus(@RequestParam("username") String username)
    {
        try {
            return userRepository.findByUsername(username).isChangepass();
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting password status",ex.getMessage());
        }
    }

}
