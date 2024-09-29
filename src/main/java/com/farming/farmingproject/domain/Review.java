package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "Review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @Column(name = "user_id", nullable = false)
    private String userId;  // AddUserRequest의 userId와 매칭됨

    //@Column(name = "product_id")
    //private Long productId;  // 제품 ID 추가

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "star", nullable = false)
    private int star;

    @Column(name = "taste", nullable = false)
    private String taste;

    @Column(name = "fresh", nullable = false)
    private String fresh;

    @Column(name = "package_quality", nullable = false)
    private String packageQuality;

    @Column(name = "reviewDetail", nullable = false)
    private String reviewDetail;

    @Builder
    public Review(Long reviewId, String userId, String name, Integer star, String taste, String fresh, String packageQuality, String reviewDetail) {
        this.reviewId = reviewId;
        this.userId = userId;  // Builder에 userId 추가
        this.name = name;
        this.star = star;
        this.taste = taste;
        this.fresh = fresh;
        this.packageQuality = packageQuality;
        this.reviewDetail = reviewDetail;
    }

}

