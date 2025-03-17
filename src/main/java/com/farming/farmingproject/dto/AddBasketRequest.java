package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBasketRequest {
    private String userId;
    private Long productId;
    private int quantity;
}