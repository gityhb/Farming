package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "productRG")
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class ProductRG {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "seller_id", nullable = false)
    private String sellerId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "store_name", nullable = false)
    private String storeName;

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

    @Column(name ="product_img", nullable = false)
    private String productimgPath;

    @Column(name = "product_info_img", nullable = false)
    private String productInfoimgPath;

    @Column(name = "product_status", nullable = false)
    private int productStatus;

    @Column(name = "product_sellcount", nullable = false)
    private int sellcount;

    @Column(name = "product_astar", nullable = false)
    private float astar;

    @Column(name = "product_salenum", nullable = false)
    private int salenum;



   @Builder
    public ProductRG(String sellerId, String productName, String storeName, Integer productPrice1, String productPrice2, Integer productPrice3, String productOrigin, String productDeliveryDate,
                     String productInfoimgPath, Integer productStatus, Integer sellcount, Float astar, Integer salenum, String productimgPath) {
        this.sellerId = sellerId;
        this.productName = productName;
        this.storeName = storeName;
        this.productPrice1 = productPrice1;
        this.productPrice2 = productPrice2;
        this.productPrice3 = productPrice3;
        this.productOrigin = productOrigin;
        this.productDeliveryDate = productDeliveryDate;
        this.productStatus = productStatus;
        this.productInfoimgPath=productInfoimgPath;
        this.sellcount = sellcount;
        this.astar = astar;
        this.salenum = salenum;
        this.productimgPath = productimgPath;
    }


}
