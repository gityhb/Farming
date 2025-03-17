package com.farming.farmingproject.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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

    @Column(name = "product_id")
    private Long productId;  // 제품 ID 추가

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

    @Column(name = "seller_comment", nullable = true)
    private String sellerComment;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @Column(name = "review_date", nullable = true)
    private Timestamp reviewAt;

    @Builder
    public Review(Long productId, Long reviewId, String userId, String name, Integer star, String taste, String fresh, String packageQuality, String reviewDetail,String sellerComment) {
        this.productId=productId;
        this.reviewId = reviewId;
        this.userId = userId;  // Builder에 userId 추가
        this.name = name;
        this.star = star;
        this.taste = taste;
        this.fresh = fresh;
        this.packageQuality = packageQuality;
        this.reviewDetail = reviewDetail;
        this.sellerComment = sellerComment;
        this.reviewAt = new Timestamp(System.currentTimeMillis());
    }
}

