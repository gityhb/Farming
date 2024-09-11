package com.farming.farmingproject.controller;

import com.farming.farmingproject.dto.AddProductRequest;
import com.farming.farmingproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/product")
public class ProductApiController {
    @Autowired
    private final ProductService productService;

    @PostMapping("/apply")
    public ResponseEntity<Map<String, String>> applyProduct(@RequestBody AddProductRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            request.setProductStatus(0);
            request.getProductPrice2();
            request.getProductDeliveryDate();
            request.getSellerName();
            productService.save(request);
            response.put("message", "상품 등록 신청 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "상품 등록 신청 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
