package com.team9.manosarthi_backend.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.tuple.Pair;

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
    List<Pair<Integer,Integer>> AgeStats; //1 for 1-20, 2 for 20-40, 3 for 40-60, 4 for 60 above
    int TotalTreated;
}
