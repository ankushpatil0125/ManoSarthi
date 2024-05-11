package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team9.manosarthi_backend.Entities.FollowUpDetails;
import com.team9.manosarthi_backend.Entities.Prescription;
import com.team9.manosarthi_backend.Entities.Questionarrie_ans;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class FollowUpDetailsDTO {

    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date followupDate;

    private int followUpNo;

    private String workerFname;  //worker who have taken followup
    private String workerLname;  //worker who have taken followup


    private String doctorFname;  //doctor who have taken followup
    private String doctorLname;  //doctor who have taken followup


    private List<Questionarrie_ans> questionarrieAnsList;

    private Prescription prescription;

    public void followup(FollowUpDetails followUpDetails)
    {
        this.followupDate=followUpDetails.getFollowupDate();
        this.followUpNo=followUpDetails.getFollowUpNo();
        this.workerFname=followUpDetails.getWorker().getFirstname();
        this.workerLname=followUpDetails.getWorker().getLastname();
        this.doctorFname=followUpDetails.getDoctor().getFirstname();
        this.doctorLname=followUpDetails.getDoctor().getLastname();
        this.questionarrieAnsList=followUpDetails.getQuestionarrieAnsList();
        this.prescription=followUpDetails.getPrescription();
    }
}
