package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.ProductImage;
import com.farming.farmingproject.dto.AddProductImageRequest;
import com.farming.farmingproject.dto.ProductImageDTO;
import com.farming.farmingproject.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/product_img")
public class ProductImageApiController {
    @Autowired
    private final ProductImageService productImageService;

    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> applyProductImage(@ModelAttribute AddProductImageRequest request, @RequestParam("productImagePath") MultipartFile productImagePath) {
        Map<String, Object> response = new HashMap<>();
        try {
//            String imagePath = "./img/products/" + request.getProductImagePath();
//            request.setProductImagePath(imagePath);
//            request.setProductId(2L);
            request.setProductImagePath(productImagePath);
            productImageService.save(request);
            response.put("message", "상품 이미지 등록 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "상품 이미지 등록 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{productId}/list")
    public ResponseEntity<List<ProductImageDTO>>  getProductImagesByProductId(@PathVariable("productId") Long productId) {
        try {
            List<ProductImage> productImages = productImageService.findProductImagesByProductId(productId);

            // ProductImage를 ProductImageDTO로 변환
            List<ProductImageDTO> productImageDTO = productImages.stream().map(image -> {
                ProductImageDTO dto = new ProductImageDTO();
                dto.setProductImageId(image.getProductImageId());
                dto.setProductId(productId);
                dto.setProductImagePath(image.getProductImagePath()); // 경로 설정
                return dto;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(productImageDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

//    @GetMapping("/list/{productId}")
//    public ResponseEntity<List<ProductImageResponse>> getProductImagesByproductId(@PathVariable Long productId) {
//        List<ProductImage> productImages = productImageRepository.findByProductId(productId);
//        List<ProductImageResponse> response = productImages.stream()
//                .map(image -> new ProductImageResponse(image.getProductImagePath()))
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(response);
//    }

}
