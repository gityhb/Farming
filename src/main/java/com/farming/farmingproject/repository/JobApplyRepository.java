package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.JobApply;
import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobApplyRepository extends JpaRepository<JobApply, Long> {
    //특정 구인 공고(Job)에 지원한 모든 지원서를 가져오는 메소드
    List<JobApply> findByJob(Job job);

    //특정 사용자가 지원한 모든 지원서를 가져오는 메소드
    List<JobApply> findByUser(User user);

    //특정 구인 공고와 사용자에 해당하는 지원서가 있는지 확인하는 메소드
    Optional<JobApply> findByJobAndUser(Job job, User user);

    // 특정 사용자가 올린 구인 공고에 대해 지원된 내역을 조회
    @Query("SELECT ja FROM JobApply ja WHERE ja.job.user.userId = :userId")
    List<JobApply> findApplicationsForUserJobs(@Param("userId") String userId);

}
