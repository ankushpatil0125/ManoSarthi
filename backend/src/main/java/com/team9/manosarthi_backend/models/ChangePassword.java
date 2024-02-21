package com.team9.manosarthi_backend.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChangePassword {
    private String oldPassword;
    private String newPassword;
}
