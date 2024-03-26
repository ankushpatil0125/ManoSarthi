package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "questionarrie_ans")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("QuestionAnsJSONFilter")
public class Questionarrie_ans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answer_id;

    //Add mapping afterwards
    private int followup_id;

    @NotBlank(message = "ans cannot be blank")
    @Pattern(regexp="[a-zA-Z]+", message="Only characters are allowed")
    private String question_ans;

    @OneToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id")
    private Questionarrie questionarrie;


}
