package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;


@Getter
@Setter
public class AddJobRequest {
    private Long jobId;
    private Long userId;
//    private String userId;
    private String jobTitle;
    private Date jobDateStart;
    private Date jobDateEnd;
    private String jobTime;
    private String jobSalary;
    private String jobLocation;
    private String jobDescription;
    private MultipartFile jobPhoto; //사진 업로드 위한 필드 추가
}
