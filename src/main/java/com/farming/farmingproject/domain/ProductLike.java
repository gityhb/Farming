package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_like")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id", nullable = false)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductRG productRG;

    @Column(name = "liked_at", nullable = false)
    private LocalDateTime likedAt;

    @Builder
    public ProductLike(User user, ProductRG productRG, LocalDateTime likedAt) {
        this.user = user;
        this.productRG = productRG;
        this.likedAt = likedAt;
    }
}


