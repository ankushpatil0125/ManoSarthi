package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "questionarrie")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonFilter("QuestionJSONFilter")
public class Questionarrie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int question_id;

    @NotNull(message = "min age cannot be null")
    private int minage;

    @NotNull(message = "max age cannot be null")
    private int maxage;

    @NotBlank(message = "question cannot be blank")
    @Pattern(regexp="[a-zA-Z0-9]+", message="Only characters are allowed")
    private String question;

    @NotBlank(message = "default_ans cannot be blank")
    @Pattern(regexp="[a-zA-Z0-9]+", message="Only characters are allowed")
//    @Pattern(regexp = "^(yes|no)$", message = "Type must be either 'yes' or 'no'")
    private String default_ans;

    @NotBlank(message = "type cannot be blank")
    @Pattern(regexp = "^(followup|normal)$", message = "Type must be either 'followup' or 'normal'")
    private String type;

    private boolean active=true;


}
