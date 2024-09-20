package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Review;
import com.farming.farmingproject.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farming.farmingproject.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public void createReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setName(reviewDTO.getName());
        review.setStar(reviewDTO.getStar());
        review.setTaste(reviewDTO.getTaste());
        review.setFresh(reviewDTO.getFresh());
        review.setPackageQuality(reviewDTO.getPackageQuality());
        review.setReviewdetail(reviewDTO.getReviewdetail());

        reviewRepository.save(review);
    }
}