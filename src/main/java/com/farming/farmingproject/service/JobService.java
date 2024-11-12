package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddJobRequest;
import com.farming.farmingproject.repository.JobRepository;
import com.farming.farmingproject.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    // 실제 파일이 저장될 경로 (서버 파일 시스템 상의 경로)
    private final String uploadDirectory = new File("src/main/resources/static/uploads/job_photos/").getAbsolutePath();

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // Job 저장
    @Transactional
    public Job saveJob(AddJobRequest jobDTO) {
        // userId가 null인 경우 예외 처리
        if (jobDTO.getUserId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        // UserRepository를 이용해 userID로 User 엔티티 조회
        User user = userRepository.findById(jobDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 파일 업로드 처리
        String photoPath = null;
        if (jobDTO.getJobPhoto() != null && !jobDTO.getJobPhoto().isEmpty()) {
            photoPath = saveFile(jobDTO.getJobPhoto()); // 파일 저장하고 경로 받음
        }

        // Job 엔티티를 빌드할 때 User 객체를 할당
        Job job = Job.builder()
                .user(user) // user 필드에 User 엔티티를 할당
                .jobTitle(jobDTO.getJobTitle())
                .jobDateStart(jobDTO.getJobDateStart())
                .jobDateEnd(jobDTO.getJobDateEnd())
                .jobTime((jobDTO.getJobTime()))
                .jobSalary(jobDTO.getJobSalary())
                .jobLocation(jobDTO.getJobLocation())
                .jobDescription(jobDTO.getJobDescription())
                .jobPhoto(photoPath) // 파일 경로 추가
                .build();
        return jobRepository.save(job);
    }

    // 특정 Job ID로 Job 조회
    @Transactional
    public Optional<Job> findJobById(Long id) {
        return jobRepository.findById(id); // JobRepository의 findById 메서드 사용해 조회
    }

    //userId로 Job 목록 조회
//    @Transactional(readOnly = true)
//    public List<Job> findJobsByUserId(String userId) {
//        User user = userRepository.findByUserId(userId) //userId로 사용자 조회
//                .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다."));
//
//        return jobRepository.findByUser(user); //user로 Job 목록 조회
//    }

    // 사용자 고유 ID로 Job 조회
    @Transactional(readOnly = true)
    public List<Job> findJobsByUserId(Long userId) {
        return jobRepository.findJobListsByUserId(userId); //user로 Job 목록 조회
    }


        // 모든 Job 조회
    @Transactional(readOnly = true)
    public List<Job> findAllJobs() {
        return jobRepository.findAll(); // 모든 Job 목록 조회
    }

    // 파일 저장 로직
    private String saveFile(MultipartFile file) {
        // 파일 이름을 고유하게 생성하기 위해 UUID 사용
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // 파일 경로 설정
        File saveFile = new File(uploadDirectory + File.separator + fileName);

        try {
            // 디렉터리가 존재하지 않으면 생성
            if (!saveFile.getParentFile().exists()) {
                saveFile.getParentFile().mkdirs();
            }

            // 파일을 해당 경로에 저장
            file.transferTo(saveFile);
        } catch (IOException e) {
            throw new IllegalArgumentException("파일 저장에 실패했습니다: " + e.getMessage());
        }

        // 웹에서 접근할 수 있는 경로 반환 (예: /uploads/job_photos/filename.jpg)
        return "/uploads/job_photos/" + fileName;
    }
}
