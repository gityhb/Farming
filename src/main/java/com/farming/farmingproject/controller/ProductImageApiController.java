package com.farming.farmingproject.controller;

import com.farming.farmingproject.dto.AddProductImageRequest;
import com.farming.farmingproject.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/product_img")
public class ProductImageApiController {
    @Autowired
    private final ProductImageService productImageService;

    @PostMapping("/apply")
    public ResponseEntity<Map<String, String>> applyProductImage(@RequestBody AddProductImageRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            String imagePath = "./img/products/" + request.getProductImagePath();
            request.setProductImagePath(imagePath);
            productImageService.save(request);
            response.put("message", "상품 이미지 등록 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "상품 이미지 등록 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
