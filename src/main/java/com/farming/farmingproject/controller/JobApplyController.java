package com.farming.farmingproject.controller;

import com.farming.farmingproject.dto.AddJobApplyRequest;
import com.farming.farmingproject.service.JobApplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/jobapply")
public class JobApplyController {

    private JobApplyService jobApplyService;

    //생성자를 통한 의존성 주입
    public JobApplyController(JobApplyService jobApplyService) {
        this.jobApplyService = jobApplyService;
    }

    //구인 공구에 지원하는 API 엔드포인트
    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@RequestBody AddJobApplyRequest request) {
        jobApplyService.applyForJob(request);  // 서비스 메소드 호출
        return ResponseEntity.ok().body("지원이 성공적으로 완료되었습니다.");
    }

    // 특정 구인 공고에 대한 모든 지원서 조회 API
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobAppliesByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok().body(jobApplyService.getJobAppliesByJob(jobId));  // 지원서 목록 반환
    }

    // 특정 사용자가 지원한 모든 지원서 조회 API
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getJobAppliesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok().body(jobApplyService.getJobAppliesByUser(userId));  // 사용자의 지원서 목록 반환
    }

    // 특정 지원서 ID로 지원서 조회 API
    @GetMapping("/{jobApplyId}")
    public ResponseEntity<?> getJobApplyById(@PathVariable Long jobApplyId) {
        return ResponseEntity.ok().body(jobApplyService.getJobApplyById(jobApplyId));  // 지원서 상세 정보 반환
    }
}
