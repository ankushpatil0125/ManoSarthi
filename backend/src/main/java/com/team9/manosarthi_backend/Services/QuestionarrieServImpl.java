package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Questionarrie;
import com.team9.manosarthi_backend.Entities.Questionarrie_ans;
import com.team9.manosarthi_backend.Repositories.QuestionarrieRepo;
import com.team9.manosarthi_backend.Repositories.Questionarrie_ansRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionarrieServImpl implements QuestionarrieService {
    private QuestionarrieRepo questionarrieRepo;
    private Questionarrie_ansRepo questionarrie_ansRepo;
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
}
