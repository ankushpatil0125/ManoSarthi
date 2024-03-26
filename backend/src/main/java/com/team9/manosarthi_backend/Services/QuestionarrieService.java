package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.Entities.Questionarrie;
import com.team9.manosarthi_backend.Entities.Questionarrie_ans;

import java.util.List;

public interface QuestionarrieService {
    List<Questionarrie> getquestions();
    Questionarrie_ans postqueans(Questionarrie_ans questionarrie_ans);
}
