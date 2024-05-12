package com.team9.manosarthi_backend.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;

@Getter
@Setter
@ToString
public class SupDashboardDTO {
    int VillagesCount;
    int VillSurveyedCount;
    List<Pair<String,Integer>> villagewithpatient;
    List<Pair<String,Integer>> villwithmissedc;
}
