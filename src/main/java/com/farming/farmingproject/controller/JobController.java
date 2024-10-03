package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.dto.AddJobRequest;
import com.farming.farmingproject.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/job") //들어오는 요청 처리 기본 URL
@CrossOrigin(origins = "http://localhost:3000") //프론트 도메인 허용

public class JobController {
    private final JobService jobService;

    //생성자 통해 JobService 주입받아 사용(의존성 주입)
    public JobController(JobService jobService){
        this.jobService=jobService;
    }

    //1.Job 생성(POST 요청)
    //새로운 Job 공고 생성메서드 /api/job/create로 들어오는 요청 매핑
    @PostMapping("/create")
    public ResponseEntity<Job> createJob(
            @ModelAttribute AddJobRequest jobDTO,  // @RequestBody 대신 @ModelAttribute 사용
            @RequestParam("jobPhoto") MultipartFile jobPhoto // 파일을 직접 받기 위한 부분 추가
    ) {
        jobDTO.setJobPhoto(jobPhoto);  // AddJobRequest에 jobPhoto 설정
        Job job = jobService.saveJob(jobDTO);  // jobDTO 사용해 Job 객체 생성하고 저장
        return ResponseEntity.ok(job);  // 저장된 Job 객체 응답으로 반환
    }

    //2. 특정 Job ID로 Job 조회(GET 요청)
    //특정 Job 공고를 ID로 조회하는 메서드 /api/job/{id}로 들어오는 요청 매핑
    @GetMapping("/{jobId}")
    public ResponseEntity<Job> getJobById(@PathVariable("jobId") Long jobId) {
        Optional<Job> job = jobService.findJobById(jobId);
        return job.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //모든 Job 공고를 조회하는 메서드
    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllJobs(){
        List<Job> jobs = jobService.findAllJobs(); //모든 Job 목록을 조회
        return ResponseEntity.ok(jobs); // 조회된 리스트 응답으로 반환
    }

    //userId로 Job 목록 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Job>> getJobsByUserId(@PathVariable("userId") String userId){
        List<Job> jobs = jobService.findJobsByUserId(userId); //userId로 Job목록 조회
        return ResponseEntity.ok(jobs); //조회된 Job 목록을 응답으로 반환
    }

}
