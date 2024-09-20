package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Review;
import com.farming.farmingproject.dto.AddReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farming.farmingproject.repository.ReviewRepository;

@RequiredArgsConstructor
@Service
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    public Long createReview(AddReviewRequest dto) {
        return reviewRepository.save(Review.builder()
                .name(dto.getName())
                .taste(dto.getTaste())
                .star(dto.getStar())
                .fresh(dto.getFresh())
                .packageQuality(dto.getPackageQuality())
                .reviewdetail(dto.getReviewdetail())
                .build()).getReviewId();
    }
}