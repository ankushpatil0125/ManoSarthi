package com.team9.manosarthi_backend.DTO;

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
    private int followup_id;

    private String patient_fname;

    private String patient_lname;

    private String patient_address;

    //Date when followup has to take
    private Date FollowUpDate;

    //missed or regular follow up
    private String type;

    public void FollowupScheduleToDTO(FollowUpSchedule followUpSchedule)
    {
        this.followup_id=followUpSchedule.getId();
        this.patient_fname=followUpSchedule.getPatient().getFirstname();
        this.patient_lname=followUpSchedule.getPatient().getLastname();
        this.patient_address=followUpSchedule.getPatient().getAddress();
        this.FollowUpDate=followUpSchedule.getNextFollowUpDate(); //until followup get complete this date remain the date when it has to taken
        this.type=null;
    }
}
