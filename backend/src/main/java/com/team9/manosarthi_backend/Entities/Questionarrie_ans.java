package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

public class Questionarrie_ans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answer_id;

    //Add mapping afterwards
//    private int followup_id;

    @ManyToOne()
    @JoinColumn(name = "follow_up_id")
    @JsonBackReference
    private FollowUpDetails followUpDetails;

    @NotBlank(message = "ans cannot be blank")
    @Pattern(regexp="[a-zA-Z0-9]+", message="Only characters are allowed")
    private String question_ans;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Questionarrie questionarrie;


}
