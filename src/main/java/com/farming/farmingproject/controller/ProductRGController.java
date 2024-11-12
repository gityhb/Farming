package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.ProductLike;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddProductRGRequest;
import com.farming.farmingproject.repository.UserRepository;
import com.farming.farmingproject.service.ProductRGService;
import com.farming.farmingproject.repository.ProductLikeRepository;
import com.farming.farmingproject.repository.ProductRGRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/productRG")
public class ProductRGController {
    private final ProductRGService productRGService;
    private final ProductLikeRepository productLikeRepository;
    private final ProductRGRepository productRGRepository;
    private final UserRepository userRepository;

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

    @GetMapping("/top5")
    public ResponseEntity<List<?>> getTop5Products() {
        List<ProductRG> top5Products = productRGService.getTop5Products();
        return ResponseEntity.ok(top5Products);
    }

//    @GetMapping("/liked")
//    public List<ProductRG> getLikedProducts(@RequestParam Long userId) {
//        return productRGService.getLikedProducts(userId);
//    }


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

    /*상품 등록*/
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

    /*평점 업데이트*/
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

    /*상품 좋아요*/
    @PostMapping("/{productId}/like")
    public ResponseEntity<?> toggleProductLike(@PathVariable("productId") Long productId, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            ProductRG productRG = productRGRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("상품이 없습니다."));

            User user = userRepository.findByUserId(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            Optional<ProductLike> existingLike = productLikeRepository.findByUserAndProductRG(user, productRG);

            if (existingLike.isPresent()) {
                // 이미 좋아요를 눌렀다면 취소
                productLikeRepository.delete(existingLike.get());
                productRG.setLikeCount(productRG.getLikeCount() - 1);
            } else {
                // 좋아요가 없다면 추가
                ProductLike productLike = new ProductLike(user, productRG, LocalDateTime.now());
                productLikeRepository.save(productLike);
                productRG.setLikeCount(productRG.getLikeCount() + 1);
            }

            productRGRepository.save(productRG);

            return ResponseEntity.ok().body(Map.of(
                    "isLiked", !existingLike.isPresent(),
                    "likeCount", productRG.getLikeCount()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("좋아요 처리 실패: " + e.getMessage());
        }
    }

    @GetMapping("/{productId}/like/status")
    public ResponseEntity<?> getLikeStatus(@PathVariable("productId") Long productId, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            ProductRG productRG = productRGRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("상품이 없습니다."));

            User user = userRepository.findByUserId(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            boolean isLiked = productLikeRepository.existsByUserAndProductRG(user, productRG);

            return ResponseEntity.ok().body(Map.of(
                    "isLiked", isLiked,
                    "likeCount", productRG.getLikeCount()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("좋아요 상태 확인 실패: " + e.getMessage());
        }
    }

    //product_name 열 기준으로 제품 검색
    @GetMapping("/search")
    public ResponseEntity<List<ProductRG>> searchProductsByName(@RequestParam("name") String name) {
        try{
            List<ProductRG> products = productRGService.searchProductsByName(name);
            return ResponseEntity.ok(products);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<Map<String, Object>>> getUserLikedProducts(@PathVariable("userId") Long userId) {
        try {
            List<Map<String, Object>> likedProducts = productRGService.getLikedProductsByUser(userId);

            if (likedProducts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
            }

            return ResponseEntity.ok(likedProducts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }




    // 판매 상품 정보 수정
    @PutMapping("/{productId}/update_product")
    public ResponseEntity<?> updateProductRG(@PathVariable("productId") Long productId, @RequestBody AddProductRGRequest updateProductRGRequest) {
        productRGService.updateProductRG(productId, updateProductRGRequest);

        return ResponseEntity.ok().body("상품 정보 수정에 성공했습니다.");
    }

    // ProductRGController.java
    @GetMapping("/timeSale")
    public ResponseEntity<List<ProductRG>> getTimeSaleProducts() {
        try {
            List<ProductRG> allProducts = productRGService.getAllProductRGs();

            // 5개의 랜덤 상품을 선택
            Collections.shuffle(allProducts);
            List<ProductRG> timeSaleProducts = allProducts.stream().limit(5).collect(Collectors.toList());

            // 각 상품에 5% 추가 할인을 적용
            timeSaleProducts.forEach(product -> {
                double additionalDiscountedPrice = product.getProductPrice3() * 0.95; // 5% 추가 할인
                product.setProductPrice3((int) additionalDiscountedPrice);
            });

            return ResponseEntity.ok(timeSaleProducts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }



}
