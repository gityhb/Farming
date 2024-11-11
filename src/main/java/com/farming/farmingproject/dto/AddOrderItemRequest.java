package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddOrderItemRequest {
    private Long productId;
    private Integer quantity;
    private Integer price;
    private String deliveryStatus;
}


