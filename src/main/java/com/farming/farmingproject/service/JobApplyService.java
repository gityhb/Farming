package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.domain.JobApply;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddJobApplyRequest;
import com.farming.farmingproject.repository.JobApplyRepository;
import com.farming.farmingproject.repository.JobRepository;
import com.farming.farmingproject.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplyService {
    private final JobApplyRepository jobApplyRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    //생성자를 통한 의존성 주입
    public JobApplyService(JobApplyRepository jobApplyRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.jobApplyRepository = jobApplyRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    //새로운 구인 공고 지원 처리 로직
    @Transactional
    public void applyForJob(AddJobApplyRequest request){
        //Job ID로 해당 구인 공고 조회
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(()->new IllegalArgumentException("해당 ID의 구인 공고를 찾을 수 없습니다."));

        //User ID로 지원자 정보 조회
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(()->new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다."));

        //이미 지원한 이력이 있는지 확인
        Optional<JobApply> existingApplicatoin = jobApplyRepository.findByJobAndUser(job,user);
        if(existingApplicatoin.isPresent()){
            throw new IllegalArgumentException("이미 이 구인 공고에 지원하셨습니다.");
        }

        //JobApply 엔티티 생성 후 저장
        JobApply jobApply = JobApply.builder()
                .job(job)
                .user(user)
                .applyBirth(request.getApplyBirth())
                .applyContent(request.getApplyContent())
                .build();
        jobApplyRepository.save(jobApply);
    }

    // 특정 구인 공고에 대한 모든 지원서 조회
    @Transactional(readOnly = true)
    public List<JobApply> getJobAppliesByJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 구인 공고를 찾을 수 없습니다."));
        return jobApplyRepository.findByJob(job);
    }

    // 특정 사용자가 지원한 모든 지원서 조회
    @Transactional(readOnly = true)
    public List<JobApply> getJobAppliesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다."));
        return jobApplyRepository.findByUser(user);
    }

    // 특정 지원서 ID로 지원서 조회
    @Transactional(readOnly = true)
    public JobApply getJobApplyById(Long jobApplyId) {
        return jobApplyRepository.findById(jobApplyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 지원서를 찾을 수 없습니다."));
    }
}
