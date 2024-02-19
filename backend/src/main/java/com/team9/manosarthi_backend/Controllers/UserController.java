package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('USER')")
    @RequestMapping("/index")
    public String dashboard()
    {
        System.out.println("step1");
        return "user_dashboard";
    }



}
