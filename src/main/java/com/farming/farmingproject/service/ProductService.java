package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Job;
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
                .storeName(dto.getStoreName())
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
//    public List<Product> findProductById(Long productId) {
//        return productRepository.findInfoByProductId(productId);
////                .orElseThrow(() -> new IllegalArgumentException("상품의 정보를 얻어올 수 없는 해당 상품 고유 번호: " + productId));
//    }

    public Product findProductById(Long productId) {
        return productRepository.findInfoByProductId(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품의 정보를 얻어올 수 없는 해당 상품 고유 번호: " + productId));
    }

    //public void updateProduct(Long productId, int )

    public void updateProductStatus(Long productId, int productStatus) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품의 정보를 얻어올 수 없는 해당 상품 고유 번호: " + productId));
        product.setProductStatus(productStatus);
        productRepository.save(product);    // 상태 저장
    }

    public List<Product> findProductsByStatus(int productStatus) {
        return productRepository.findProductsByProductStatus(productStatus);
    }

    public List<Product> findProductApplyListsById(Long sellerId) {
        return productRepository.findProductApplyListsBySellerId(sellerId);
    }
}
