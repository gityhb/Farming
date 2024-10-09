package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
//    List<Product> findInfoByProductId(Long productId);
    Optional<Product> findInfoByProductId(Long productId);
    List<Product> findProductsByProductStatus(int productStatus);
    List<Product> findProductApplyListsBySellerId(Long sellerId);

}
