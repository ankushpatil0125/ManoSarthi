package com.team9.manosarthi_backend.DTO;

import com.team9.manosarthi_backend.Entities.FollowUpSchedule;
import com.team9.manosarthi_backend.Entities.Village;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;

@Getter
@Setter
@ToString
public class WorkerDetailsDTO {
    private Integer workerId;
    private String workerName;
    private String workerEmail;
    private Pair<String,Integer> CurrentMissedFollowupsCounts; //village name and count
    private List<Pair<String,Integer>> PrevMissedFollowupsCounts;
    private Integer totalmissedcount;
    private List<MissedFollowupsSupDTO> CurrentMissedFollowups;
    private List<MissedFollowupsSupDTO> PrevMissedFollowups;

}
