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
    private Long productImageId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product productId;

    @Column(name = "image_path", nullable = false)
    private String productImagePath;

    @Column(name = "product_image_created_date", nullable = false)
    private Timestamp productImageCreatedDate;

    @Column(name = "product_image_modified_date", nullable = false)
    private Timestamp productImageModifiedDate;

    @Builder
    public ProductImage(Product productId, String productImagePath) {
        this.productId = productId;
        this.productImagePath = productImagePath;
        this.productImageCreatedDate = new Timestamp(System.currentTimeMillis());
        this.productImageModifiedDate = new Timestamp(System.currentTimeMillis());
    }


}