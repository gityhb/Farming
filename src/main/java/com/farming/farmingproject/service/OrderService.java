package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Order;
import com.farming.farmingproject.domain.OrderItem;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddOrderItemRequest;
import com.farming.farmingproject.dto.AddOrderRequest;
import com.farming.farmingproject.repository.OrderItemRepository;
import com.farming.farmingproject.repository.OrderRepository;
import com.farming.farmingproject.repository.ProductRGRepository;
import com.farming.farmingproject.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRGRepository productRGRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;  // OrderItemRepository 추가

    @Transactional
    public Order createOrder(AddOrderRequest request) {
        // 유저 정보 조회
        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Order 객체 생성
        Order order = Order.builder()
                .user(user)
                .totalAmount(request.getTotalAmount())
                .deliveryAddress(request.getDeliveryAddress())
                .deliveryRequest(request.getDeliveryRequest())
                .status(request.getStatus())
                .build();

        // Order 저장 (이후 OrderItem들을 저장할 수 있게 ID가 할당됨)
        order = orderRepository.save(order);

        // 각 OrderItem을 생성하고 Order에 추가
        for (AddOrderItemRequest itemRequest : request.getItems()) {
            ProductRG product = productRGRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // OrderItem 생성 시 Order와 연관시키기
            OrderItem orderItem = OrderItem.builder()
                    .order(order)  // Order 객체 설정
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(itemRequest.getPrice())
                    .build();

            // OrderItem 저장
            orderItemRepository.save(orderItem);
        }

        // 최종적으로 저장된 Order 반환
        return order;
    }

    public List<Order> getOrdersByUser(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }
}

