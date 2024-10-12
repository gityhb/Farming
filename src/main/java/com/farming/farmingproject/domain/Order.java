package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "total_Amount",nullable = false)
    private Long totalAmount;

    @Column(name = "order_Date", nullable = false)
    private Timestamp orderDate;

    @Column(name = "deliveryAddress", nullable = false)
    private String deliveryAddress;

    @Column(name = "deliveryRequest", nullable = false)
    private String deliveryRequest;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Builder
    public Order(User user, Long totalAmount, String deliveryAddress, String deliveryRequest, String status) {
        this.user = user;
        this.totalAmount=totalAmount;
        this.deliveryAddress = deliveryAddress;
        this.deliveryRequest = deliveryRequest;
        this.status = status;
        this.orderDate= new Timestamp(System.currentTimeMillis());
    }
}
