package com.farming.farmingproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductRG product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "delivery_status", nullable = false)
    private String deliveryStatus;

    @Builder
    public OrderItem(Order order, ProductRG product, Integer quantity, Integer price, String deliveryStatus) {
        this.order = order;  // 반드시 Order를 설정
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.deliveryStatus=deliveryStatus;
    }

    private void incrementProductSellCount() {
        if (this.product != null && this.quantity != null) {
            this.product.increaseSellCount(this.quantity);
        }
    }
}
