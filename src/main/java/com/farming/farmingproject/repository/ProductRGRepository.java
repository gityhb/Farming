package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRGRepository extends JpaRepository<ProductRG, Long> {
    Optional<ProductRG> findByProductId(Long productId);
    List<ProductRG> findBySellerId(String sellerId);
    List<ProductRG> findByProductNameContaining(String name);
}
