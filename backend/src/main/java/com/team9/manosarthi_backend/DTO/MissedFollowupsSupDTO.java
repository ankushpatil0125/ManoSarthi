package com.team9.manosarthi_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class MissedFollowupsSupDTO {

        private String villageName;
        private String patientName;
        private String workerName;
        @JsonFormat(pattern = "dd-MMMM-yyyy", timezone = "Asia/Kolkata")
        private Date followup_date;
        @JsonFormat(pattern = "dd-MMMM-yyyy", timezone = "Asia/Kolkata")
        private Date completed_date=null;

}
