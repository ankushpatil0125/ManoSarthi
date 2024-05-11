package com.team9.manosarthi_backend.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class AdminDashboardDTO {
    List<Object[]> DiseaseStats;
    List<Object[]> DistrictStats;
    int RefferedCount;
    int NonRefferedCount;
    int TotalSurveysTaken;
}
