package com.team9.manosarthi_backend.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DoctorDto {
    private String Name;
    private String DistrictName;
    private String SubDistrictName;

}
