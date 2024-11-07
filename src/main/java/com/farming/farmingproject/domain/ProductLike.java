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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // User 테이블과 연결

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductRG productRG; // ProductRG 테이블과 연결

    @Column(name = "liked_at", nullable = false)
    private LocalDateTime likedAt; // 좋아요를 누른 시간

    @Builder
    public ProductLike(User user, ProductRG productRG, LocalDateTime likedAt) {
        this.user = user;
        this.productRG = productRG;
        this.likedAt = likedAt;
    }
}

