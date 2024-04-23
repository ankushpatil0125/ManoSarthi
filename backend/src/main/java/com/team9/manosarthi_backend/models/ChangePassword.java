package com.team9.manosarthi_backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChangePassword {
    @NotBlank(message = "Old Password cannot be blank")
    private String oldPassword;

    @NotBlank(message = "New Password cannot be blank")
    private String newPassword;
}
