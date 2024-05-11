package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "follow_up_schedule")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class FollowUpSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JoinColumn(name = "patient_id")
    @OneToOne
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "village_code")
    private Village village;

    @Column(name = "next_follow_up_date")
    private Date nextFollowUpDate;

    //follow_up_count to store number of follow up remaining
    @Column(name = "follow_up_remaining")
    private int followUpRemaining;

    @Column(name = "type")      //weekly or monthly follow up
    private String type;

    @ManyToOne
    @JoinColumn(name="worker_id")
    private Worker worker;
}
