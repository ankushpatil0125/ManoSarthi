package com.team9.manosarthi_backend.DTO;

import com.team9.manosarthi_backend.Entities.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@ToString
public class PatientFollowUpPrescriptionDTO {

//    private Patient patient;
//    private FollowUpDetails followUpDetails;
    private Prescription prescription;
    private List<Medicine> medicineList;
    private FollowUpSchedule followUpSchedule;  //set null if schedule is not to be updated
    private List<Disease> diseaseList;

}
