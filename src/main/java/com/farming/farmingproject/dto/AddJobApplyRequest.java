package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class AddJobApplyRequest {
    private Long jobId;//지원하려는 구인 공고의 ID
    private Long userId;//지원자의 사용자 ID
    private String applyBirth;//지원자의 생년월일
    private String applyContent;//지원 내용

    //생성자
    public AddJobApplyRequest(Long jobId, Long userId, String applyBirth, String applyContent) {
        this.jobId = jobId;
        this.userId = userId;
        this.applyBirth = applyBirth;
        this.applyContent = applyContent;
    }
}
