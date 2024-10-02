package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.repository.ProductRGRepository;
import com.farming.farmingproject.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductRGService {
    private final ProductRGRepository productRGRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ProductRGService(ProductRGRepository productRGRepository, ReviewRepository reviewRepository) {
        this.productRGRepository = productRGRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<ProductRG> getAllProductRGs() {
        return productRGRepository.findAll();
    }

    public ProductRG getProductById(Long productId) {
        Optional<ProductRG> product = productRGRepository.findByProductId(productId);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

    public Map<Long, Long> getReviewCountsByProduct() {
        List<ProductRG> products = productRGRepository.findAll();
        Map<Long, Long> reviewCounts = new HashMap<>();

        for (ProductRG product : products) {
            long count = reviewRepository.countByProductId(product.getProductId());
            reviewCounts.put(product.getProductId(), count);
        }

        return reviewCounts;
    }

    public List<ProductRG> getProductsBySellerId(String sellerId) {
        return productRGRepository.findBySellerId(sellerId);
    }
}
