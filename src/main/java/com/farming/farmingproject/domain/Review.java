package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "review_table")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "star", nullable = false)
    private int star;

    @Column(name = "taste", nullable = false)
    private String taste;

    @Column(name = "fresh", nullable = false)
    private String fresh;

    @Column(name = "package", nullable = false)
    private String packageQuality;

    @Column(name = "reviewdetail", nullable = false)
    private String reviewdetail;

    @Builder
    public Review(Long reviewId, String name, int star, String taste, String fresh, String packageQuality, String reviewdetail) {
        this.reviewId = reviewId;
        this.name = name;
        this.star = star;
        this.taste = taste;
        this.fresh = fresh;
        this.packageQuality = packageQuality;
        this.reviewdetail = reviewdetail;
    }
}

