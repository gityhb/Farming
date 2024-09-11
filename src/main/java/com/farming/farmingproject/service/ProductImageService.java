package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.ProductImage;
import com.farming.farmingproject.dto.AddProductImageRequest;
import com.farming.farmingproject.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductImageService {
    @Autowired
    private final ProductImageRepository productImageRepository;

    public Long save(AddProductImageRequest dto) {
        return productImageRepository.save(ProductImage.builder()
                .productId(dto.getProductId())
                .productImagePath(dto.getProductImagePath())
                .build()).getProductImageId();
    }
}
