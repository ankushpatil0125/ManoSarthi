package com.team9.manosarthi_backend.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "forgot_password")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ForgotPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fpid;

    @Column(name="otp",nullable = false)
    private String otp;

    @Column(name="ExpirationTime",nullable = false)
    private Date ExpirationTime;

    @OneToOne
    @JoinColumn(name = "username",nullable = false)
    private User user;
}
