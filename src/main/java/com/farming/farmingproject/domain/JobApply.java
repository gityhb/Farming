package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name="jobapply")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class JobApply {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="jobapply_id",updatable = false)
    private Long jobApplyId;

    //Job테이블과의 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="job_id",nullable = false)//공고 ID 외래키
    private Job job;

    //User 테이블과의 관계 (지원자 정보)
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false) //지원자 ID 외래키
    private User user;

    //지원자의 이름 (User 테이블에서 가져옴)
    @Transient //DB에 저장하지 않고 User 테이블에서 가져옴
    private String applyName;

    //지원자의 주소 (User 테이블에서 가져옴)
    @Transient
    private String applyAddress;

    //지원자의 핸드폰 번호(User 테이블에서 가져옴)
    @Transient
    private String applyPhoneNumber;

    //지원자의 생년월일
    @Column(name="apply_birth",nullable = false)
    private  String applyBirth;

    //지원 내용
    @Column(name="apply_content",nullable = false)
    private String applyContent;

    @Builder
    public JobApply(Job job, User user,String applyBirth,String applyContent){
        this.job=job;
        this.user=user;
        this.applyName=user.getName();//User 테이블에서 이름 가져옴
        this.applyAddress=user.getAddress(); //User 테이블에서 주소 가져옴
        this.applyPhoneNumber=user.getPhoneNumber();//User 테이블에서 핸드폰 번호 가져옴
        this.applyBirth=applyBirth;
        this.applyContent=applyContent;

    }


}
