package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddProductRequest;
import com.farming.farmingproject.dto.UpdateProductStatusRequest;
import com.farming.farmingproject.service.ProductService;
import com.farming.farmingproject.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.management.LockInfo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/product")
public class ProductApiController {
    @Autowired
    private final ProductService productService;

    private final UserService userService;

    // 상품 신청하기
    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> applyProduct(@RequestBody AddProductRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (userDetails == null) {
                response.put("message", "인증되지 않은 사용자입니다.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // UserDetails에서 아이디를 추출하여 사용자 정보를 조회
            User user = userService.findByUserId(userDetails.getUsername());
            Long sellerId = user.getId();

            // 요청 객체에 판매자 ID 설정
            request.setSellerId(sellerId);
            request.setProductStatus(0);
            // Product 객체 저장 및 반환
            Product savedProduct = productService.save(request);
            response.put("message", "상품 등록 신청 성공");
            response.put("productId", savedProduct.getProductId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "상품 등록 신청 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 상품 모두 가져오기
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAllProducts();
        return ResponseEntity.ok(products);
    }

//    @GetMapping("/{productId}")
//    public ResponseEntity<List<Product>> getProductById(@PathVariable("productId") Long productId) {
//        try {
//            List<Product> product = productService.findProductById(productId);
//            return ResponseEntity.ok(product);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }

    // 해당 상품 고유 번호에 맞는 상품 정보 가져오기
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) {
        try {
            Product product = productService.findProductById(productId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 상품 상태 업데이트
    @PutMapping("/{productId}/status")
    public ResponseEntity<String> updateProductStatus(@PathVariable("productId") Long productId, @RequestBody UpdateProductStatusRequest updateStatusRequest) {
        try {
            productService.updateProductStatus(productId, updateStatusRequest.getProductStatus());
            return ResponseEntity.ok("상품 상태가 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 상태 업데이트에 오류가 발생하였습니다.");
        }
    }

//    @PutMapping("/{productId}/update_product")
//    public ResponseEntity<String> updateProduct(@PathVariable("productId") Long productId, @RequestBody UpdateProductRequest updateProductRequest) {
//        try {
//            productService.updateProduct(productId, updateProductRequest.getProduct)
//        }
//    }

    // 상품 상태 별로 상품 가져오기
    @GetMapping("")
    public ResponseEntity<List<Product>> getProductsByStatus(@RequestParam(value = "productStatus") int productStatus) {
        List<Product> products = productService.findProductsByStatus(productStatus);
        return ResponseEntity.ok(products);
    }

    // 판매자 별 상품 등록 신청 내역 가져오기
    @GetMapping("/{sellerId}/applylist")
    public ResponseEntity<List<Product>> getProductApplyListById(@PathVariable("sellerId") Long sellerId) {
        List<Product> products = productService.findProductApplyListsById(sellerId);
        return ResponseEntity.ok(products);     // 조회된 product 목록을 응답으로 반환
    }


}
