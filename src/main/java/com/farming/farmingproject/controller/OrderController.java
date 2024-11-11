package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Order;
import com.farming.farmingproject.dto.AddOrderRequest;
import com.farming.farmingproject.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    @Transactional
    public ResponseEntity<?> createOrder(@RequestBody AddOrderRequest request) {
        try {
            Order order = orderService.createOrder(request);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("주문 생성 실패: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable(name = "userId") String userId) {
        try {
            List<Order> orders = orderService.getOrdersByUser(userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("주문 조회 실패: " + e.getMessage());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getOrdersByProductId(@PathVariable("productId") Long productId) {
        try {
            List<Map<String, Object>> orders = orderService.getOrdersByProductId(productId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("주문 조회 실패: " + e.getMessage());
        }
    }
}