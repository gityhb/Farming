package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProductImageRequest {
    private long productId;
    private String productImagePath;
}
