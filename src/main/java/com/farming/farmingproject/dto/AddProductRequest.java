package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProductRequest {
    private long productId;
    private long sellerId;
    private String productName;
    private String sellerName;
    private String storeName;
    private int productPrice1;
    private String productPrice2;
    private int productPrice3;
    private String productOrigin;
    private String productDeliveryDate;
    private String productInfo;
    private int productStatus;
}
