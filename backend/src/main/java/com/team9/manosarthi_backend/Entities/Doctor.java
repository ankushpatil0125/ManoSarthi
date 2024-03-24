package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.Date;
//import javax.validation.Valid;

@Entity
@Table(name = "doctor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("DoctorJSONFilter")
public class Doctor {

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
    @Column(name = "email")
    private String email;


    @OneToOne(cascade = CascadeType.ALL)        // check for cascade type see all parameters
    @JoinColumn(name = "username")
    @JsonIgnore                                 //ignore while fetching the data
    private User user;


    @ManyToOne
    @JoinColumn(name = "subdistrictcode")
    private SubDistrict subdistrictcode;


    @Column(name = "patient_count")
    private int patient_count=0;


    @Column(name = "gender")
    private String gender;

    @NotBlank(message = "DOB cannot be blank")
    @Column(name = "dob")
    private Date dob;

    @Column(name = "active")
    private boolean active=true;

}
