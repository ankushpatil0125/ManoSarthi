package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import com.team9.manosarthi_backend.Services.UserService;
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
        //System.out.println("userRepository"+userRepository.findByUsername(username).isChangepass());
        return  userRepository.findByUsername(username).isChangepass();
    }

}
