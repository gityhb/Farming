package com.farming.farmingproject.dto;

public class ReviewDTO {
    private String name;
    private int star;
    private String taste;
    private String fresh;
    private String packageQuality;
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