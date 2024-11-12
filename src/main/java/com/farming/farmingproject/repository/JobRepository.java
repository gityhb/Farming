package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job,Long>{
    List<Job> findByUser(User user);
    Optional<Job> findByJobId(Long jobId);  // jobId로 조회하는 메소드 추가
    List<Job> findJobListsByUserId(Long userId);
}

