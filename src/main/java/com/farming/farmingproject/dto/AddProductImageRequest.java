package com.farming.farmingproject.dto;

import com.farming.farmingproject.domain.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProductImageRequest {
    private long productImageId;
    private Product productId;
    private String productImagePath;
}
