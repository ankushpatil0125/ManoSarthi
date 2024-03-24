package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "subervisor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("SupervisorJSONFilter")
public class Supervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "first_name cannot be blank")
    @Pattern(regexp="[a-zA-Z]+", message="Only characters are allowed")
    @Column(name = "first_name")
    private String firstname;

    @NotBlank(message = "last_name cannot be blank")
    @Pattern(regexp="[a-zA-Z]+", message="Only characters are allowed")
    @Column(name = "last_name")
    private String lastname;

    @Email(message = "Enter valid email")
    @Column(name = "email",unique = true)
    private String email;

    @OneToOne(cascade = CascadeType.ALL)        // check for cascade type see all parameters
    @JoinColumn(name = "username")
    private User user;

    @OneToOne
    @JoinColumn(name = "subdistrictcode")
    private SubDistrict subdistrictcode;

    @Column(name = "gender")
    private String gender;

//    @NotNull(message = "DOB cannot be null")
//    @Column(name = "dob")
//    private Date dob;

    @Column(name = "active")
    private boolean active=true;
}
