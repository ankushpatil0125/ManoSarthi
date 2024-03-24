package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

//import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Table(name = "worker")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("WorkerJSONFilter")
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "email", unique = true)
    private String email;

    @OneToOne(cascade = CascadeType.ALL)        // check for cascade type see all parameters
    @JoinColumn(name = "username")
    private User user;

    @OneToOne
    @JoinColumn(name = "villagecode")
    private Village villagecode;

    @Column(name = "patient_count")
    private int patient_count;

    @Column(name = "gender")
    private String gender;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "active")
    private boolean active=true;

}
