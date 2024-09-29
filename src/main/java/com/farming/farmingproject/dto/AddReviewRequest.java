package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddReviewRequest {
    private long reviewId;
    private String name;
    private int star;
    private String taste;
    private String fresh;
    private String packageQuality;
    private String reviewDetail;
}