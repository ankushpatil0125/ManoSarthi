package com.team9.manosarthi_backend.DTO;


import com.team9.manosarthi_backend.Entities.Questionarrie_ans;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RegisterFollowUpDetailsDTO {

    private int patientID;
    private List<Questionarrie_ans> questionarrieAnsList;
    private boolean referredDuringFollowUp;

}
