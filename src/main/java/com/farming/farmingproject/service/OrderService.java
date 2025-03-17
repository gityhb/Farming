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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRGRepository productRGRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

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

        order = orderRepository.save(order);

        for (AddOrderItemRequest itemRequest : request.getItems()) {
            ProductRG product = productRGRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(itemRequest.getPrice())
                    .deliveryStatus(itemRequest.getDeliveryStatus())
                    .build();

            orderItemRepository.save(orderItem);

            // ProductRG의 sellCount 증가
            product.increaseSellCount(itemRequest.getQuantity());
            productRGRepository.save(product);
        }

        return order;
    }

    public List<Order> getOrdersByUser(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }

    public List<Map<String, Object>> getOrdersByProductId(Long productId) {
        List<OrderItem> orderItems = orderItemRepository.findByProduct_ProductId(productId);  // productId로 OrderItem 찾기

        List<Map<String, Object>> response = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            Order order = orderItem.getOrder();  // 해당 주문을 가져옵니다.
            User user = order.getUser();  // 주문자 정보

            // 주문자 정보와 주문 항목을 포함한 데이터를 준비
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("orderId", order.getOrderId());
            orderMap.put("orderDate", order.getOrderDate());
            orderMap.put("deliveryAddress", order.getDeliveryAddress());
            orderMap.put("deliveryRequest", order.getDeliveryRequest());
            orderMap.put("userName", user.getName());
            orderMap.put("userPhone", user.getPhoneNumber());
            orderMap.put("userAddress", user.getAddress());  // 주소 정보도 추가

            // 주문 항목 정보 추가
            Map<String, Object> orderItemMap = new HashMap<>();
            orderItemMap.put("productId", orderItem.getProduct().getProductId());
            orderItemMap.put("productName", orderItem.getProduct().getProductName());
            orderItemMap.put("quantity", orderItem.getQuantity());
            orderItemMap.put("price", orderItem.getPrice());
            orderItemMap.put("deliveryStatus", orderItem.getDeliveryStatus());
            orderItemMap.put("orderItemId", orderItem.getOrderItemId());

            orderMap.put("orderItem", orderItemMap);

            // 결과에 추가
            response.add(orderMap);
        }

        return response;
    }
}

