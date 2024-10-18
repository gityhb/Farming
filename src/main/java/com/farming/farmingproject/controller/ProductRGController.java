package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.Review;
import com.farming.farmingproject.dto.AddProductRGRequest;
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

    /*@PostMapping("/register")
    public ResponseEntity<?> registerProduct(@ModelAttribute AddProductRGRequest addProductRGRequest) {
        try {
            ProductRG savedProduct = productRGService.saveProduct(addProductRGRequest);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            e.printStackTrace(); // 서버 로그에 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 등록 실패: " + e.getMessage());
        }
    }*/

    @PostMapping("/register")
    public ResponseEntity<?> registerProduct(@ModelAttribute AddProductRGRequest addProductRGRequest) {
        try {
            ProductRG savedProduct = productRGService.saveProduct(addProductRGRequest);
            return ResponseEntity.ok(savedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 등록 실패: " + e.getMessage());
        }
    }

    @PostMapping("/update-ratings")
    public ResponseEntity<String> updateProductRatings() {
        try {
            productRGService.updateProductAverageStars();
            return ResponseEntity.ok("Product ratings updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update product ratings: " + e.getMessage());
        }
    }
}
