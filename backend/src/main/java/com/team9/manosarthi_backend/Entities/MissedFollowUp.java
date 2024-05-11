package com.team9.manosarthi_backend.Entities;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "missed_followup")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MissedFollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @Column(name = "followup_date")
    private Date followUpDate;

    @Column(name = "completed_date")
    private Date completedDate;


}
