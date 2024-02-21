package com.team9.manosarthi_backend.models;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class JwtResponse {
    private String jwtToken;
    private String username;
    private String role;
    private  int user_id;
    private boolean changepass;
}
