package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddQNARequest {
    private Long userId;
    private Long productId;
    private String qnaContent;
}
