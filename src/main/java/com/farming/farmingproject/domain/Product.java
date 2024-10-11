package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "Product")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "seller_id", nullable = false)
    private Long sellerId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "seller_name", nullable = false)
    private String sellerName;

    @Column(name = "product_price_1", nullable = false)
    private int productPrice1;

    @Column(name = "product_price_2", nullable = false)
    private String productPrice2;

    @Column(name = "product_price_3", nullable = false)
    private int productPrice3;

    @Column(name = "product_origin", nullable = false)
    private String productOrigin;

    @Column(name = "product_delivery_date", nullable = false)
    private String productDeliveryDate;

    @Column(name = "product_info", nullable = false, length = 3000)
    private String productInfo;

    @Column(name = "product_status", nullable = false)
    private int productStatus;

    @Column(name = "product_created_date", nullable = false)
    private Timestamp productCreatedDate;

    @Column(name = "product_modified_date", nullable = false)
    private Timestamp productModifiedDate;

    @Builder
    public Product(Long productId, Long sellerId, String productName, String sellerName, Integer productPrice1, String productPrice2, Integer productPrice3, String productOrigin, String productDeliveryDate, String productInfo, Integer productStatus) {
        this.productId = productId;
        this.sellerId = sellerId;
        this.productName = productName;
        this.sellerName = sellerName;
        this.productPrice1 = productPrice1;
        this.productPrice2 = productPrice2;
        this.productPrice3 = productPrice3;
        this.productOrigin = productOrigin;
        this.productDeliveryDate = productDeliveryDate;
        this.productInfo = productInfo;
        this.productStatus = productStatus;
        this.productCreatedDate = new Timestamp(System.currentTimeMillis());
        this.productModifiedDate = new Timestamp(System.currentTimeMillis());
    }

    public void setProductStatus(Integer productStatus) {
        this.productStatus = productStatus;
    }


}


