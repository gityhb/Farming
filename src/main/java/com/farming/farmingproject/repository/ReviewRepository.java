package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByReviewId(Long reviewId);
    List<Review> findByProductIdOrderByReviewIdAsc(Long productId);
    long countByProductId(Long productId);

    @Query("SELECT r.productId, AVG(r.star) FROM Review r GROUP BY r.productId")
    List<Object[]> findAverageStarByProductId();
}