package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddReviewRequest {
    private long reviewId;
    private String name;
    private int star;
    private String taste;
    private String fresh;
    private String packageQuality;
    private String reviewDetail;
    //private Long userId;  // 사용자 ID 추가
    //private Long productId;  // 제품 ID 추가
}