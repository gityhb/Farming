package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AddProductRGRequest {
    private String sellerId;
    private String sellerName;
    private String productName;
    private String storeName;
    private int productPrice1;
    private String productPrice2;
    private int productPrice3;
    private String productOrigin;
    private String productDeliveryDate;
    private MultipartFile productimgPath;
    private MultipartFile productInfoimgPath;
    private Integer sellcount;
    private Float astar;
    private Integer salenum;
    private long pdId;
}