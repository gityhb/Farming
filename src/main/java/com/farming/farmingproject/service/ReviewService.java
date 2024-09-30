package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Review;
import com.farming.farmingproject.dto.AddReviewRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farming.farmingproject.repository.ReviewRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    public Long save(AddReviewRequest dto, String userId) {
        Review review = Review.builder()
                .name(dto.getName())
                .taste(dto.getTaste())
                .star(dto.getStar())
                .fresh(dto.getFresh())
                .packageQuality(dto.getPackageQuality())
                .reviewDetail(dto.getReviewDetail())
                .userId(userId)  // 현재 로그인한 사용자의 userId
                .productId(dto.getProductId())
                .build();
        Review savedReview = reviewRepository.save(review);
        return savedReview.getReviewId();
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public boolean deleteReview(Long reviewId) {
        if (reviewRepository.existsById(reviewId)) {
            reviewRepository.deleteById(reviewId);
            return true;
        }
        return false;
    }

    public void updateReview(AddReviewRequest dto) {
        Review review = reviewRepository.findById(dto.getReviewId())
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setName(dto.getName());
        review.setTaste(dto.getTaste());
        review.setStar(dto.getStar());
        review.setFresh(dto.getFresh());
        review.setPackageQuality(dto.getPackageQuality());
        review.setReviewDetail(dto.getReviewDetail());

        reviewRepository.save(review);
    }

    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductIdOrderByReviewIdAsc(productId);
    }

    @Transactional
    public void addSellerComment(Long reviewId, String sellerComment) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));
        review.setSellerComment(sellerComment);
        reviewRepository.save(review);
    }
}