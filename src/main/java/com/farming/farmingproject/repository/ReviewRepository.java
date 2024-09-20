package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공됩니다.
    // 필요한 경우 여기에 커스텀 쿼리 메서드를 추가할 수 있습니다.
}