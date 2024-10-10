package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.JobApply;
import com.farming.farmingproject.dto.AddJobApplyRequest;
import com.farming.farmingproject.service.JobApplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // **모든 지원서를 조회하는 API 추가**
    @GetMapping("/all")
    public ResponseEntity<List<JobApply>> getAllJobApplications() {
        List<JobApply> allApplications = jobApplyService.getAllJobApplications();
        return ResponseEntity.ok(allApplications);  // 모든 지원 내역 반환
    }

    // 사용자가 올린 구인 공고에 대해 지원한 모든 지원서 조회 API
    @GetMapping("/user/{userId}/applications")
    public ResponseEntity<List<JobApply>> getApplicationsForUserJobs(@PathVariable("userId") String userId) {
        List<JobApply> applications = jobApplyService.getApplicationsForUserJobs(userId);
        return ResponseEntity.ok(applications);  // 지원 내역 반환
    }

}
