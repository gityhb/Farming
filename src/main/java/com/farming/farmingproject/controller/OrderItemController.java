package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.OrderItem;
import com.farming.farmingproject.service.OrderItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orderItems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/{orderItemId}/deliveryStatus")
    public ResponseEntity<?> updateDeliveryStatus(@PathVariable("orderItemId") Long orderItemId, @RequestParam("deliveryStatus") String deliveryStatus) {
        try {
            orderItemService.updateDeliveryStatus(orderItemId, deliveryStatus);
            return ResponseEntity.ok().body("배송 상태가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("배송 상태 업데이트 실패: " + e.getMessage());
        }
    }

}