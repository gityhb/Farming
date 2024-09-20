package com.farming.farmingproject.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "review_table")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = false)
    private int star;

    @Column(nullable = false, length = 6)
    private String taste;

    @Column(nullable = false, length = 6)
    private String fresh;

    @Column(name = "package", nullable = false, length = 6)
    private String packageQuality;

    @Column(nullable = false, length = 100)
    private String reviewdetail;

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    public String getFresh() {
        return fresh;
    }

    public void setFresh(String fresh) {
        this.fresh = fresh;
    }

    public String getPackageQuality() {
        return packageQuality;
    }

    public void setPackageQuality(String packageQuality) {
        this.packageQuality = packageQuality;
    }

    public String getReviewdetail() {
        return reviewdetail;
    }

    public void setReviewdetail(String reviewdetail) {
        this.reviewdetail = reviewdetail;
    }
}