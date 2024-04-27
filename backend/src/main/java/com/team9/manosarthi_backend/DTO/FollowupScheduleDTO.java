package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team9.manosarthi_backend.Entities.FollowUpSchedule;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Village;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class FollowupScheduleDTO {
//    private int followup_id;
    private int patientId;

    private String patient_fname;

    private String patient_lname;

    private String patient_address;

    private int age;

    //Date when followup has to take
//    @JsonFormat(pattern="dd-MM-yyyy")
    private Date followUpDate;

    //missed or regular follow up
    private String type;

    public void FollowupScheduleToDTO(FollowUpSchedule followUpSchedule,String type)
    {
//        this.followup_id=followUpSchedule.getId();
        this.patientId=followUpSchedule.getPatient().getPatient_id();
        this.patient_fname=followUpSchedule.getPatient().getFirstname();
        this.patient_lname=followUpSchedule.getPatient().getLastname();
        this.patient_address=followUpSchedule.getPatient().getAddress();
        this.age=followUpSchedule.getPatient().getAge();
        this.followUpDate=followUpSchedule.getNextFollowUpDate(); //until followup get complete this date remain the date when it has to taken
        this.type=type;
    }
}
