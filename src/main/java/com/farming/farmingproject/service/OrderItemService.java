package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.OrderItem;
import com.farming.farmingproject.repository.OrderItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Map<String, Integer> getDeliveryStatusCount(Long userId) {
        List<OrderItem> orderItems = orderItemRepository.findByOrderUserId(userId);

        Map<String, Integer> statusCount = new HashMap<>();
        statusCount.put("결제완료", 0);
        statusCount.put("배송준비중", 0);
        statusCount.put("배송중", 0);
        statusCount.put("배송완료", 0);

        for (OrderItem item : orderItems) {
            String status = item.getDeliveryStatus();
            if("결제완료".equals(status)) {
                statusCount.put("결제완료", statusCount.get("결제완료") + 1);
            } else if ("배송준비".equals(status)) {
                statusCount.put("배송준비중", statusCount.get("배송준비중") + 1);
            } else if ("배송중".equals(status)) {
                statusCount.put("배송중", statusCount.get("배송중") + 1);
            } else if ("배송완료".equals(status)) {
                statusCount.put("배송완료", statusCount.get("배송완료") + 1);
            }
        }

        return statusCount;
    }
}