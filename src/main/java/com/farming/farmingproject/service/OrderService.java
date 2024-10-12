package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Order;
import com.farming.farmingproject.domain.OrderItem;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddOrderItemRequest;
import com.farming.farmingproject.dto.AddOrderRequest;
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

    @Transactional
    public Order createOrder(AddOrderRequest request) {
        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = Order.builder()
                .user(user)
                .totalAmount(request.getTotalAmount())
                .deliveryAddress(request.getDeliveryAddress())
                .deliveryRequest(request.getDeliveryRequest())
                .status(request.getStatus())
                .build();

        for (AddOrderItemRequest itemRequest : request.getItems()) {
            ProductRG product = productRGRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(itemRequest.getPrice())
                    .build();

            order.getOrderItems().add(orderItem);
        }

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }
}
