package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")

public class User {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int user_id;
    @Id
    @NotBlank (message = "Username cannot be blank")
    @Column(name= "username",nullable = false)
    private String username;

    @NotBlank (message = "Password cannot be blank")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message = "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit")
    @Column(name="password",nullable = false)
    private String password;

    @NotBlank (message = "Role cannot be blank")
    @Column(name= "role",nullable = false)
    private String role;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Enter valid email")
    @Column(name = "email",unique = true)
    private String email;


    @Column(name= "changepass",columnDefinition = "boolean default false")
    private boolean changepass=false;
}
