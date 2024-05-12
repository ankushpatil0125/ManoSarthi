package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "followup_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class FollowUpDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Patient patient;

    @Column(name = "followup_date")
    @JsonFormat(pattern = "dd-MMMM-yyyy", timezone = "Asia/Kolkata")
    private Date followupDate;

    @Column(name = "follow_up_no")
    private int followUpNo;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @OneToMany(mappedBy = "followUpDetails")
    @JsonManagedReference
    private List<Questionarrie_ans> questionarrieAnsList;

    @OneToOne(mappedBy = "followUpDetails")
    @JsonManagedReference
    private Prescription prescription;

    @Column(name = "image")
    private String image;   // store image file name during follow up
}





