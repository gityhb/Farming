package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.ProductImage;
import com.farming.farmingproject.dto.AddProductImageRequest;
import com.farming.farmingproject.repository.ProductImageRepository;
import com.farming.farmingproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductImageService {
    @Autowired
    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    public ProductImage save(AddProductImageRequest dto) {

        // Product 엔티티 조회

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductImage productImage = ProductImage.builder()
                .product(product)
                .productImagePath(dto.getProductImagePath())
                .build();

        return productImageRepository.save(productImage);

    }

//    @Transactional
    public ProductImage findProductImagesByProductId(Long productId) {
        return productImageRepository.findProductImagesByProduct_ProductId(productId);
    }
}
