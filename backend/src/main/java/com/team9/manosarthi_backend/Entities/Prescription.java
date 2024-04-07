package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "prescription")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("PrescriptionDetails")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescription_id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Patient patient;

    @OneToMany
    @JoinColumn(name="disease_code")
    @JsonManagedReference
    private List<Disease> disease_code;

    @NotBlank(message = "treatement cannot be blank")
    @Column(name = "treatement")
    private String treatement;

    @OneToMany
    @JoinColumn(name="medicine")
    @JsonManagedReference
    private List<Medicine> medicine;

    //to see this is last prescription or not
    @Column(name = "active")
    private boolean active=true;

    @Column(name="Date")
    private Date date;


}
