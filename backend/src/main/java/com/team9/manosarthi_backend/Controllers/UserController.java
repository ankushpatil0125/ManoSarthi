package com.team9.manosarthi_backend.Controllers;

import com.team9.manosarthi_backend.DTO.OtpDTO;
import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import com.team9.manosarthi_backend.ServicesImpl.UserServiceImpl;
import com.team9.manosarthi_backend.models.ChangePassword;
import com.team9.manosarthi_backend.security.JwtHelper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@PreAuthorize("permitAll()")
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtHelper helper;



    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        userService.addUser(user);
        return "user_success";
    }

    @Validated
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassword request, Principal principal)
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

    @Validated
    @PostMapping("/verify-email/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email)
    {
        try {

                if (userService.verifyEmail(email)) {
                    return new ResponseEntity<>("Email verified Successfully", HttpStatus.OK);
                } else
                    return new ResponseEntity<>("Error in verifying email", HttpStatus.BAD_REQUEST);

        }
        catch (Exception ex) {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while verifying email.", ex.getMessage());
        }

    }

    @Validated
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody OtpDTO otpDTO)
    {
        try {

                if (userService.verifyOTP(otpDTO.getEmail(), otpDTO.getOtp())) {
                    return new ResponseEntity<>("OTP verified Successfully", HttpStatus.OK);
                } else
                    return new ResponseEntity<>("Invalid OTP", HttpStatus.EXPECTATION_FAILED);

        }
        catch (Exception ex) {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while verifying otp.", ex.getMessage());
        }
    }

    @Validated
    @PostMapping("/setPassword/{email}")
    public ResponseEntity<?> setPassword(@PathVariable String email, @RequestBody ChangePassword changePassword)
    {
        try {
            System.out.println("inside set password");
                //here old password and new password means entered and reentered password
                if (userService.setNewPassword(changePassword.getOldPassword(),changePassword.getNewPassword(),email)) {
                    return new ResponseEntity<>("Password Set Successfully", HttpStatus.OK);
                } else
                    return new ResponseEntity<>("Error in setting new password", HttpStatus.BAD_REQUEST);

        }
        catch (Exception ex) {
            if(ex instanceof APIRequestException)
            {
                throw new APIRequestException(ex.getMessage());
            }
            else
                throw new APIRequestException("Error while adding the doctor.", ex.getMessage());
        }
    }




}
