package com.farming.farmingproject;

public class Slide {
    private String title;
    private String content1;
    private String content2;
    private String imageUrl;  // 이미지 URL 필드 추가

    // 생성자, getter, setter
    public Slide(String title, String content1, String content2, String imageUrl) {
        this.title = title;
        this.content1 = content1;
        this.content2 = content2;
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent1() {
        return content1;
    }

    public void setContent1(String content1) {
        this.content1 = content1;
    }

    public String getContent2() {
        return content2;
    }

    public void setContent2(String content2) {
        this.content2 = content2;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
