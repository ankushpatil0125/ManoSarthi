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
@Table(name = "patient")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("PatientJSONFilter")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "aabha_id",unique = true)
    private int aabhaId;

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

    @Column(name = "gender")
    private String gender;

    @NotNull(message = "DOB cannot be null")
    @Column(name = "dob")
    private Date dob;

    @ManyToOne
    @JoinColumn(name = "doctor")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "village")
    private Village village;

    @ManyToOne
    @JoinColumn(name = "register_worker")     //worker who registered the patient
    private Worker register_worker;

    @Column(name = "address")
    private String address;

    @Column(name = "new_patient")
    private boolean new_patient=true;

    @Column(name = "treated")
    private boolean treated=false;
}
