package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "basket")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductRG productRG;

    @Column(name="quantity", nullable = false)
    private int quantity;

    @Column(name = "createdDate", nullable = false)
    private Timestamp createdAt;

    @Builder
    public Basket(User user, ProductRG productRG, int quantity) {
        this.user = user;
        this.productRG = productRG;
        this.quantity = quantity;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public void addQuantity(int quantity) {
        this.quantity += quantity;
    }
}