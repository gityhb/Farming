package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Order;
import com.farming.farmingproject.domain.OrderItem;
import com.farming.farmingproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByProduct_ProductId(Long productId);

    @Query("SELECT oi FROM OrderItem oi JOIN oi.order o WHERE o.user.id = :userId")
    List<OrderItem> findByOrderUserId(@Param("userId") Long userId);

}
