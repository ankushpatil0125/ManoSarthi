package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "doctor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//@JsonFilter("Doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

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
    private int patient_count;

    @Column(name = "gender")
    private String gender;

//    @Column(name = "dob")
//    private Date dob;

    @Column(name = "active")
    private boolean active;

}
