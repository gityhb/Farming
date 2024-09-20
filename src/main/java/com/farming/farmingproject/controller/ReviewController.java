package com.farming.farmingproject.controller;

import com.farming.farmingproject.dto.AddReviewRequest;
import com.farming.farmingproject.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
//@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody AddReviewRequest addReviewRequest) {
        try {
            Long createdReview = reviewService.createReview(addReviewRequest);
            return ResponseEntity.ok(createdReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating review: " + e.getMessage());
        }
    }
}