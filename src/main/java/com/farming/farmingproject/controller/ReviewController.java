package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Review;
import com.farming.farmingproject.dto.AddReviewRequest;
import com.farming.farmingproject.service.ReviewService;
import com.farming.farmingproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private final ReviewService reviewService;

    @PostMapping("/reviews_create")
    public ResponseEntity<Map<String, String>> save(@RequestBody AddReviewRequest addReviewRequest, @AuthenticationPrincipal UserDetails userDetails) {
        Map<String, String> response = new HashMap<>();
        try {
            String userId = userDetails.getUsername();
            reviewService.save(addReviewRequest, userId);
            response.put("message", "리뷰 작성 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "리뷰 작성 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/get_reviews")
    public ResponseEntity<List<Review>> getReviews() {
        try {
            List<Review> reviews = reviewService.getAllReviews();
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Map<String, String>> deleteReview(@PathVariable(name = "reviewId") String idStr) {
        Map<String, String> response = new HashMap<>();
        try {
            Long id = Long.parseLong(idStr);
            boolean isDeleted = reviewService.deleteReview(id);
            if (isDeleted) {
                response.put("message", "리뷰 삭제 성공");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "리뷰를 찾을 수 없습니다");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (NumberFormatException e) {
            response.put("message", "잘못된 ID 형식");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("message", "리뷰 삭제 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, String>> updateReview(@RequestBody AddReviewRequest updateReviewRequest) {
        Map<String, String> response = new HashMap<>();
        try {
            reviewService.updateReview(updateReviewRequest);
            response.put("message", "리뷰 수정 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "리뷰 수정 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable("productId") Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{reviewId}/sellercomment")
    public ResponseEntity<?> addSellerComment(@PathVariable("reviewId") Long reviewId, @RequestBody Map<String, String> payload) {
        String sellerComment = payload.get("sellerComment");
        reviewService.addSellerComment(reviewId, sellerComment);
        return ResponseEntity.ok().build();
    }
}