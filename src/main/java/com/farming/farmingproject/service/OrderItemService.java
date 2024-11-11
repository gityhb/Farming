package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.OrderItem;
import com.farming.farmingproject.repository.OrderItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public void updateDeliveryStatus(Long orderItemId, String deliveryStatus) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id: " + orderItemId));
        orderItem.setDeliveryStatus(deliveryStatus);
        orderItemRepository.save(orderItem);
        System.out.println("배송 상태 업데이트 완료: OrderItemId=" + orderItemId + ", 새로운 상태=" + deliveryStatus);
    }

}