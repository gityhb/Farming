package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Order;
import com.farming.farmingproject.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByProduct_ProductId(Long productId);
}
