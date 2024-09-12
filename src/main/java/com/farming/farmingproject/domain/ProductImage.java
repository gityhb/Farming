package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "ProductImage")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id", updatable = false)
    private Long productImageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "FK_PRODUCT_ID"))  // 외래키로 설정
    private Product product;    // Product 엔티티 전체를 참조 (id 뿐만 아니라 모든 필드와 관계를 포함해 참조)

    @Column(name = "product_image_path", nullable = false)
    private String productImagePath;

    @Column(name = "product_image_created_date", nullable = false)
    private Timestamp productImageCreatedDate;

    @Column(name = "product_image_modified_date", nullable = false)
    private Timestamp productImageModifiedDate;

    @Builder
    public ProductImage(Product product, String productImagePath) {
        this.product = product;
        this.productImagePath = productImagePath;
        this.productImageCreatedDate = new Timestamp(System.currentTimeMillis());
        this.productImageModifiedDate = new Timestamp(System.currentTimeMillis());
    }


}