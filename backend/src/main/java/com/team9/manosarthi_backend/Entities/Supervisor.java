package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "subervisor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Supervisor {

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
    private User user;

    @OneToOne
    @JoinColumn(name = "subdistrictcode")
    private SubDistrict subdistrictcode;

    @Column(name = "gender")
    private String gender;

//    @Column(name = "dob")
//    private Date dob;

    @Column(name = "active")
    private boolean active;
}
