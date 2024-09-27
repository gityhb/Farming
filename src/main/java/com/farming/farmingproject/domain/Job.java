package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "job")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)


public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id", updatable = false)
    private Long jobId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")  // 공고 작성자와의 관계
    private User user;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "job_date", nullable = false)
    private Date jobDate;

    @Column(name = "job_time", nullable = false)
    private String jobTime;

    @Column(name = "job_salary", nullable = false)
    private String jobSalary;

    @Column(name = "job_location", nullable = false)
    private String jobLocation;

    @Column(name = "job_description", nullable = false)
    private String jobDescription;

    @Column (name="job_photo") //사진 경로 저장하기 위한 필드 추가
    private String jobPhoto;

    @Builder
    public Job(User user, String jobTitle, Date jobDate, String jobTime, String jobSalary, String jobLocation, String jobDescription, String jobPhoto) {
        this.user = user;
        this.jobTitle = jobTitle;
        this.jobDate = jobDate;
        this.jobTime = jobTime;
        this.jobSalary = jobSalary;
        this.jobLocation = jobLocation;
        this.jobDescription = jobDescription;
        this.jobPhoto = jobPhoto; //사진 경로 설정
    }
}