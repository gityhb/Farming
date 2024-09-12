package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.ProductImage;
import com.farming.farmingproject.dto.AddProductImageRequest;
import com.farming.farmingproject.repository.ProductImageRepository;
import com.farming.farmingproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductImageService {
    @Autowired
    private final ProductImageRepository productImageRepository;

    @Autowired
    private ProductRepository productRepository;

    public Long save(AddProductImageRequest dto) {

        return productImageRepository.save(ProductImage.builder()
                .productId(dto.getProductId())
                .productImagePath(dto.getProductImagePath())
                .build()).getProductImageId();
    }
}
