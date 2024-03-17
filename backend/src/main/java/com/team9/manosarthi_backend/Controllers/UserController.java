package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.Services.UserService;
import com.team9.manosarthi_backend.models.ChangePassword;
import com.team9.manosarthi_backend.models.JwtRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    //@PreAuthorize("hasRole('USER')")
    @PreAuthorize("permitAll()")
    @RequestMapping("/index")
    public String dashboard()
    {
        System.out.println("step1");
        return "user_dashboard";
    }



//    @PreAuthorize("hasRole('USER')")
    @PreAuthorize("permitAll()")
    @RequestMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword request, Principal principal)
    {
        String oldPassword= request.getOldPassword();
        String newPassword= request.getNewPassword();
        if(userService.changePassword(oldPassword,newPassword,principal))
        {
            return new ResponseEntity<>("Successfully Changed ! ", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Wrong Credentials !", HttpStatus.BAD_REQUEST);
        }


    }


}
