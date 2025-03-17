package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductImageDTO {
    private Long productImageId;    // 이미지 고유 ID
    private Long productId;     // 상품 ID
    private String productImagePath;    // 이미지 경로
}
