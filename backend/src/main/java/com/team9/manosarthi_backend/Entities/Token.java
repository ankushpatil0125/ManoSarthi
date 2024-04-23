package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue
    private Integer id;

    @NotBlank(message = "Token cannot be blank")
    @Column(name = "token")
    private String token;

    @Column(name = "expired")
    private boolean expired;

//    @Column(name = "revoked")
//    private boolean revoked;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;
}
