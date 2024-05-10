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

        private Integer villageCode;
        private String patient_fname;
        private String patient_lname;
        private Integer workerId;
        @JsonFormat(pattern = "dd-MMMM-yyyy", timezone = "Asia/Kolkata")
        private Date followup_date;

}
