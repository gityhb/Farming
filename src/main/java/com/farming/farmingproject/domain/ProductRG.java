package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

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

    @Column(name = "seller_name", nullable = false)
    private String sellerName;

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

    @Column(name = "product_sellcount", nullable = true)
    private Integer sellcount = 0;

    @Column(name = "product_astar", nullable = true)
    private Float astar = 0f;

    @Column(name = "product_salenum", nullable = true)
    private Integer salenum = 0;

    @Column(name = "like_count")
    private Integer likeCount = 0;

    public void increaseSellCount(int quantity) {
        this.sellcount += quantity;
    }

//    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name = "pd_id", nullable = false, foreignKey = @ForeignKey(name = "FK_PD_ID"))  // 외래키로 설정
    private Product product;    // Product 엔티티 전체를 참조 (id 뿐만 아니라 모든 필드와 관계를 포함해 참조)

    @Column(name = "product_created_date", nullable = false)
    private Timestamp productCreatedDate;

    @Column(name = "product_modified_date", nullable = false)
    private Timestamp productModifiedDate;

    @Builder
    public ProductRG(String sellerId, String sellerName, String productName, String storeName, Integer productPrice1, String productPrice2, Integer productPrice3, String productOrigin, String productDeliveryDate,
                     String productInfoimgPath, Integer sellcount, Float astar, Integer salenum, String productimgPath, Product product) {
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.productName = productName;
        this.storeName = storeName;
        this.productPrice1 = productPrice1;
        this.productPrice2 = productPrice2;
        this.productPrice3 = productPrice3;
        this.productOrigin = productOrigin;
        this.productDeliveryDate = productDeliveryDate;
        this.productInfoimgPath = productInfoimgPath;
        this.sellcount = sellcount != null ? sellcount : 0;
        this.astar = astar != null ? astar : 0f;
        this.salenum = salenum != null ? salenum : 10;
        this.productimgPath = productimgPath;
        this.product = product;
        this.productCreatedDate = new Timestamp(System.currentTimeMillis());
        this.productModifiedDate = new Timestamp(System.currentTimeMillis());
    }
}
