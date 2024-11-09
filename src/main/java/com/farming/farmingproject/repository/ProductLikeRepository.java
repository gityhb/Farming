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
    int countByProductRG(ProductRG productRG);
    Optional<ProductLike> findByUserAndProductRG(User user, ProductRG productRG);
    boolean existsByUserAndProductRG(User user, ProductRG productRG);

    @Query("SELECT pl.productRG.productId FROM ProductLike pl WHERE pl.user.id = :userId")  // userId를 user.id로 변경
    List<Long> findLikedProductIdsByUserId(@Param("userId") Long userId);


    List<ProductLike> findByUserOrderByLikedAtDesc(User user);

    List<ProductLike> findByUserUserId(String userId);
}
