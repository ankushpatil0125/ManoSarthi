package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionarrieServImpl implements QuestionarrieService {
    private QuestionarrieRepo questionarrieRepo;
    private Questionarrie_ansRepo questionarrie_ansRepo;
    private MedicalQueRepo medicalQueRepo;
    private MedicalQueAnsRepo medicalQueAnsRepo;
    private PatientRepository patientRepository;

    @Override
    public List<Questionarrie> getquestions()
    {
        return questionarrieRepo.getques();
    }

    @Override
    public Questionarrie_ans postqueans(Questionarrie_ans questionarrie_ans)
    {
        // Retrieve the Questionarrie entity using the question_id from the request
        Questionarrie questionarrie = questionarrieRepo.findById(questionarrie_ans.getQuestionarrie().getQuestion_id()).orElse(null);

        // Check if the Questionarrie entity exists
        if (questionarrie == null) {
            // Handle the case where the Questionarrie entity does not exist
            throw new RuntimeException("Questionarrie entity not found for question_id: " + questionarrie_ans.getQuestionarrie().getQuestion_id());
        }

        // Set the retrieved Questionarrie entity to the Questionarrie_ans entity
        questionarrie_ans.setQuestionarrie(questionarrie);
        return questionarrie_ansRepo.save(questionarrie_ans);

    }
    @Override
    public MedicalQueAns postmedicalqueans(MedicalQueAns medquestionarrie_ans)
    {
        // Retrieve the Questionarrie entity using the question_id from the request
        MedicalQue medquestionarrie = medicalQueRepo.findById(medquestionarrie_ans.getMedicalquest().getQuestion_id()).orElse(null);
        Patient patient=patientRepository.findByAabha(medquestionarrie_ans.getPatient().getAabhaId());
        // Check if the Questionarrie entity exists
        if (medquestionarrie == null) {
            // Handle the case where the Questionarrie entity does not exist
            throw new RuntimeException("Questionarrie entity not found for question_id: " + medquestionarrie_ans.getMedicalquest().getQuestion_id());
        }

        // Set the retrieved Questionarrie entity to the Questionarrie_ans entity
        medquestionarrie_ans.setMedicalquest(medquestionarrie);
        medquestionarrie_ans.setPatient(patient);
        return medicalQueAnsRepo.save(medquestionarrie_ans);

    }
    @Override
    public List<MedicalQue> getmedicalquestions()
    {
        return medicalQueRepo.getques();
    }


}
