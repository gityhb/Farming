package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRGRepository extends JpaRepository<ProductRG, Long> {
    Optional<ProductRG> findByProductId(Long productId);
    List<ProductRG> findBySellerId(String sellerId);

    // like_count가 높은 순으로 최대 5개 상품을 조회
    @Query("SELECT p FROM ProductRG p ORDER BY p.likeCount DESC")
    List<ProductRG> findTop5ProductsByLikeCount();

    // 상품 고유 번호로 상품 조회
//    List<ProductRG> findByProductIdIn(List<Long> productIds);
}
