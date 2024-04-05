package com.team9.manosarthi_backend.DTO;

import com.team9.manosarthi_backend.Entities.MedicalQueAns;
import com.team9.manosarthi_backend.Entities.Patient;
import com.team9.manosarthi_backend.Entities.Questionarrie_ans;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RegisterPatientDTO {
    private Patient patient;

    private List<MedicalQueAns> medicalQueAnsList;

    private List<Questionarrie_ans> questionarrieAnsList;
}
