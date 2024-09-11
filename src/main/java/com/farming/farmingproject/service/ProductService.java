package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.dto.AddProductRequest;
import com.farming.farmingproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService {
    @Autowired
    private final ProductRepository productRepository;

    public Long save(AddProductRequest dto) {
        return productRepository.save(Product.builder()
                .sellerId(dto.getSellerId())
                .productName(dto.getProductName())
                .sellerName(dto.getSellerName())
                .productPrice1(dto.getProductPrice1())
                .productPrice2(dto.getProductPrice2())
                .productPrice3(dto.getProductPrice3())
                .productOrigin(dto.getProductOrigin())
                .productDeliveryDate(dto.getProductDeliveryDate())
                .productInfo(dto.getProductInfo())
                .productStatus(dto.getProductStatus())
                .build()).getProductId();
    }

}
