package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
public class JobDTO {
    private Long jobId;
    private String userId;
    private String jobTitle;
    private Date jobDate;
    private String jobTime;
    private String jobSalary;
    private String jobLocation;
    private String jobDescription;
}
