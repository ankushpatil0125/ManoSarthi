package com.team9.manosarthi_backend.ServicesImpl;

import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.*;
import com.team9.manosarthi_backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.time.Instant;
import java.util.Optional;
import java.util.Random;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public User addUser(User user) {
        // Encode the password before saving to the database
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    @Override
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

    @Override
    public Boolean verifyEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null)
            throw new APIRequestException("User not found");


        String otp = Integer.toString(otpGenerator());
        //for sending email
        String subject = "OTP for Forgot Password Request";
        String msg = "Hello " + "\nThis is OTP for forgot password request from Manosarthi Application. Please enter this in your system  " + otp;
        String to = email;
        if (emailService.sendEmail(subject, msg, to)) {
            System.out.println("mail success");
        } else {
            System.out.println("mail failed");
            throw new APIRequestException("Sending mail failed");
        }
        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .ExpirationTime(new Date(System.currentTimeMillis() + 30 * 1000))
                .user(user)
                .build();
        forgotPasswordRepository.save(fp);
        return true;
    }


    private Integer otpGenerator()
    {
        Random random=new Random();
        return random.nextInt(100_000,999_999);//Generates 6 digit number
    }
    /*
    @Override
    public Boolean resendOTP(String email)
    {
        User user=userRepository.findByEmail(email);
        if(user==null)
            throw new APIRequestException("User not found");
        ForgotPassword fp=forgotPasswordRepository.findByUser(email).orElseThrow(() -> new APIRequestException("Invalid OTP"));
        String otp = Integer.toString(otpGenerator());
        //for sending email
        String subject = "OTP for Forgot Password Request";
        String msg = "Hello " + "\nThis is OTP for forgot password request from Manosarthi Application. Please enter this in your system  " + otp;
        String to = email;
        if (emailService.sendEmail(subject, msg, to)) {
            System.out.println("mail success");
        } else {
            System.out.println("mail failed");
            throw new APIRequestException("Sending mail failed");
        }
        fp.setOtp(otp);
        fp.setExpirationTime(new Date(System.currentTimeMillis() + 30 * 1000));
        forgotPasswordRepository.save(fp);
        return true;
    }
    */

    @Override
    public Boolean verifyOTP(String email,String otp)
    {
        System.out.println("email got"+email);
        User user=userRepository.findByEmail(email);
        if(user==null)
            throw new APIRequestException("User not found");
        ForgotPassword fp=forgotPasswordRepository.findByUserAndOtp(otp,email).orElseThrow(() -> new APIRequestException("Invalid OTP"));
        if(fp.getExpirationTime().before(Date.from(Instant.now())))
        {
            System.out.println("exp time"+fp.getExpirationTime());
            System.out.println("After expiry");
            forgotPasswordRepository.deleteById(fp.getFpid());
            return false;
        }
        forgotPasswordRepository.deleteById(fp.getFpid());
        return true;
    }

    @Override
    public Boolean setNewPassword(String password,String reenteredPassword,String email)
    {
        User user=userRepository.findByEmail(email);
        if(user==null)
            throw new APIRequestException("User not found");
        System.out.println("user found");
        if (!password.equals(reenteredPassword)) {
            throw new APIRequestException("Passwords do not match. Please enter them again.");
        }

        String encodedPassword= bCryptPasswordEncoder.encode(password);
        userRepository.UpdatePassword(encodedPassword,email);
        user.setChangepass(true);
        userRepository.save(user);
        return true;
    }
}

