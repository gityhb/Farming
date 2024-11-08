package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.ProductLike;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductLikeRepository extends JpaRepository<ProductLike, Long> {

    // 특정 상품에 대한 좋아요 수를 계산하는 메서드
    int countByProductRG(ProductRG productRG);
    Optional<ProductLike> findByUserAndProductRG(User user, ProductRG productRG);
    boolean existsByUserAndProductRG(User user, ProductRG productRG);

    // 특정 사용자가 좋아요를 누른 상품 찾기
//    @Query("SELECT pl.productRG FROM ProductLike pl WHERE pl.user = :userId")
//    List<Long> findLikedProductIdsByUserId(@Param("userId") Long userId);
}
