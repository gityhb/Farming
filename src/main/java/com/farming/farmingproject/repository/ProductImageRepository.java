package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    Optional<ProductImage> findByProductImageId(Long productImageId);     // 상품 고유 아이디로 상품 이미지를 가져옴
}
