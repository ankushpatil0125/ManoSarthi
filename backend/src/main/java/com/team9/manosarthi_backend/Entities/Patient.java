package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team9.manosarthi_backend.Config.AesEncryptor;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

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
    private int patient_id;

    @Convert(converter = AesEncryptor.class)
    @Column(name = "aabha_id",unique = true)
    @NotBlank(message = "aabhaId cannot be blank")
//    @Pattern(regexp="[0-9]+", message="Only numbers are allowed")
    private String aabhaId;

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

    @NotBlank(message = "Gender cannot be blank")
    @Column(name = "gender")
    private String gender;

    @NotNull(message = "DOB cannot be null")
    @Column(name = "age")
    private int age;

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

    @Column(name = "status")
    private String status="NEW";


    @Column(name = "follow_up_Number")
    private int followUpNumber=0;

    @Column(name = "referred_during_follow_up")
    private boolean referred;

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference
    private List<FollowUpDetails> followUpDetailsList;

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference
    private List<MedicalQueAns> medicalQueAnsList;

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference(value = "patient_pre")
    private List<Prescription> prescription;
}
