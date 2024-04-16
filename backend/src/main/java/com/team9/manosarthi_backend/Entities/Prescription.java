package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "prescription")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("PrescriptionJSONFilter")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescription_id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
//    @JsonBackReference
    private Patient patient;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "follow_up_id")
    private FollowUpDetails followUpDetails;

//    @OneToMany
//    @JoinColumn(name="disease_code")
    @ManyToMany
    @JoinTable(name = "patient_disease",
    joinColumns = @JoinColumn(name = "prescription_id"),
    inverseJoinColumns = @JoinColumn(name = "disease_code")
    )
    private Set<Disease> disease_code;

    @NotBlank(message = "treatement cannot be blank")
    @Column(name = "treatement")
    private String treatement;

    @OneToMany(mappedBy = "prescription")
    @JsonManagedReference
    private List<Medicine> medicine;

    //to see this is last prescription or not
    @Column(name = "active")
    private boolean active=true;

    @Column(name="Date")
    private Date date;


}
