package com.team9.manosarthi_backend.Config;

import com.team9.manosarthi_backend.Repositories.DoctorRepository;
import com.team9.manosarthi_backend.Repositories.SupervisorRepository;
import com.team9.manosarthi_backend.models.JwtRequest;
import com.team9.manosarthi_backend.models.JwtResponse;
import com.team9.manosarthi_backend.security.JwtHelper;
import com.team9.manosarthi_backend.security.TokenGenerationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalTime;
import java.util.stream.Collectors;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {


        @Autowired
        private UserDetailsServiceImpl userDetailsService;

        @Autowired
        private AuthenticationManager manager;


        @Autowired
        private JwtHelper helper;

        @Autowired
        private DoctorRepository doctorRepository;

        @Autowired
        private SupervisorRepository supervisorRepository;


        private Logger logger = LoggerFactory.getLogger(AuthController.class);


        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody JwtRequest request) {

            this.doAuthenticate(request.getUsername(), request.getPassword());


            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            //String token = this.helper.generateToken(userDetails);
            // Given time
            LocalTime givenTime = LocalTime.of(23, 59, 59); // 2:30 PM

            // Current system time
            LocalTime currentTime = LocalTime.now();

            // Calculate the time difference
            Duration difference = Duration.between(currentTime, givenTime);

            // Convert to milliseconds
            long milliseconds = difference.toMillis();

            System.out.println(milliseconds);
            try {
                if (milliseconds < 0) {
                    System.out.println("Timeout!!!");
                    throw new TokenGenerationException("Timeout");
                } else {

                    int id=-1;

                    if (userDetails.getAuthorities().stream()
                            .anyMatch(authority -> authority.getAuthority().equals("ROLE_DOCTOR"))) {
                        System.out.println("Hello Doctor here");
                        id = doctorRepository.findDoctorByUsername(userDetails.getUsername());
                        System.out.println(id);

                    }
                    else if(userDetails.getAuthorities().stream()       // check for supervisor role
                            .anyMatch(authority -> authority.getAuthority().equals("ROLE_SUPERVISOR"))){

                        System.out.println("Hello ROLE_SUPERVISOR here");
                        id = supervisorRepository.findSupervisorByUsername(userDetails.getUsername());
                        System.out.println(id);

                    }
                    else if(userDetails.getAuthorities().stream()
                            .anyMatch(authority -> authority.getAuthority().equals("ROLE_WORKER"))) {

                        //like above do for all role to get id
                        System.out.println("Not Doctor");
                    }
                    System.out.println("userDetails.getAuthorities() = "+userDetails.getAuthorities());

                    String userid=Integer.toString(id);
                    String token = this.helper.generateToken(userDetails, milliseconds,userid);

                    JwtResponse response = JwtResponse.builder()
                            .jwtToken(token)
                           .username(userDetails.getUsername()).role(userDetails.getAuthorities().toString()).build();


                    return new ResponseEntity<>(response, HttpStatus.OK);
                }
            }
            catch (TokenGenerationException e) {
                // Handle the exception and return an appropriate response
                return new ResponseEntity<>("Token generation failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }

        private void doAuthenticate(String username, String password) {

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
            try {
                manager.authenticate(authentication);


            } catch (BadCredentialsException e) {
                throw new BadCredentialsException(" Invalid Username or Password  !!");
            }

        }


@ExceptionHandler(BadCredentialsException.class)
public ResponseEntity<?> exceptionHandler() {

            return new ResponseEntity<>("CREDENTIALS INVALID ! " , HttpStatus.BAD_REQUEST);
}



}
