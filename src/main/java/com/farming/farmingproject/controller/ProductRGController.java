package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.Review;
import com.farming.farmingproject.service.ProductRGService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/productRG")
public class ProductRGController {
    private final ProductRGService productRGService;

    @GetMapping("/get_productRG")
    public ResponseEntity<List<?>> getProductRGs() {
        try {
            List<ProductRG> productRGs = productRGService.getAllProductRGs();
            return ResponseEntity.ok(productRGs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductRG> getProductById(@PathVariable("productId") Long productId) {
        try {
            ProductRG product = productRGService.getProductById(productId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*리뷰갯수*/
    @GetMapping("/review-counts")
    public ResponseEntity<Map<Long, Long>> getReviewCounts() {
        Map<Long, Long> reviewCounts = productRGService.getReviewCountsByProduct();
        return ResponseEntity.ok(reviewCounts);
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductRG>> getProductsBySellerId(@PathVariable("sellerId") String sellerId) {
        try {
            List<ProductRG> products = productRGService.getProductsBySellerId(sellerId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
