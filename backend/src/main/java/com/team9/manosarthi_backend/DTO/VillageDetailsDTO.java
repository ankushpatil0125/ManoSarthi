package com.team9.manosarthi_backend.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class VillageDetailsDTO {
    private String villageName;
    private Integer villageCode;
    private Integer missedFollowupsCount;
    private Integer workerId;
    private String workerName;
    private String workerEmail;
    private List<MissedFollowupsSupDTO> missedFollowupsSupDTOList;
}
