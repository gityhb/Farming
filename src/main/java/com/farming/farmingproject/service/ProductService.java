package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.dto.AddProductRequest;
import com.farming.farmingproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {
    @Autowired
    private final ProductRepository productRepository;

//    public Long save(AddProductRequest dto) {
//        return productRepository.save(Product.builder()
//                .sellerId(dto.getSellerId())
//                .productName(dto.getProductName())
//                .sellerName(dto.getSellerName())
//                .productPrice1(dto.getProductPrice1())
//                .productPrice2(dto.getProductPrice2())
//                .productPrice3(dto.getProductPrice3())
//                .productOrigin(dto.getProductOrigin())
//                .productDeliveryDate(dto.getProductDeliveryDate())
//                .productInfo(dto.getProductInfo())
//                .productStatus(dto.getProductStatus())
//                .build()).getProductId();
//    }
    public Product save(AddProductRequest dto) {
        Product product = Product.builder()
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
                .build();

        return productRepository.save(product);
    }

    // 모든 상품 가져오기
    public List<Product> findAllProducts() {
        return productRepository.findAll();  // 모든 상품을 리스트로 반환
    }

    // 특정 ID를 가진 상품 가져오기
    public Product findProductById(Long id) {
        return productRepository.findById(id).orElse(null);  // 상품이 없을 경우 null 반환
    }

}
