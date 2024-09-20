package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddJobRequest;
import com.farming.farmingproject.repository.JobRepository;
import com.farming.farmingproject.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository,UserRepository userRepository){
        this.jobRepository=jobRepository;
        this.userRepository=userRepository;

    }

    //Job 저장
    @Transactional
    public Job saveJob(AddJobRequest jobDTO){
        // userId가 null인 경우 예외 처리
        if (jobDTO.getUserId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        //UserRepository를 이용해 userID로 User 엔티티 조회
        User user = userRepository.findByUserId(jobDTO.getUserId())
                .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // Job 엔티티를 빌드할 때 User 객체를 할당
        Job job = Job.builder()
                .user(user) //user 필드에 User 엔티티를 할당
                .jobTitle(jobDTO.getJobTitle())
                .jobDate((jobDTO.getJobDate()))
                .jobTime((jobDTO.getJobTime()))
                .jobSalary(jobDTO.getJobSalary())
                .jobLocation(jobDTO.getJobLocation())
                .jobDescription(jobDTO.getJobDescription())
                .build();
        return jobRepository.save(job);
    }

    //특정 Job ID로 Job 조회
    @Transactional(readOnly = true)
    public Optional<Job> findJobById(Long id){
        return jobRepository.findById(id);//JobRepository의 findById 메서드 사용해 조회
    }
    
    //모든 Job 조회
    @Transactional(readOnly = true)
    public List<Job> findAllJobs(){
        return jobRepository.findAll(); //모든 Job 목록 조회
    }
    
    //특정 Job ID로 Job 삭제
}
