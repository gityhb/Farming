package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT COUNT(r) FROM Review r WHERE r.productId = :productId AND r.taste = :taste")
    long countByProductIdAndTaste(@Param("productId") Long productId, @Param("taste") String taste);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.productId = :productId AND r.fresh = :fresh")
    long countByProductIdAndFresh(@Param("productId") Long productId, @Param("fresh") String fresh);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.productId = :productId AND r.packageQuality = :packageQuality")
    long countByProductIdAndPackageQuality(@Param("productId") Long productId, @Param("packageQuality") String packageQuality);

    List<Review> findByProductIdOrderByReviewAtDesc(Long productId);
    List<Review> findByProductIdOrderByStarDesc(Long productId);
    List<Review> findByProductIdOrderByStarAsc(Long productId);

}