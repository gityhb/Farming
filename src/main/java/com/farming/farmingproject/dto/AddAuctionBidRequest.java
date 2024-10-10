package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AddAuctionBidRequest {
    private Long auctionId;
    private String userId;
    private double auctionBidAmount;

    public AddAuctionBidRequest(Long auctionId, String userId, double auctionBidAmount) {
        this.auctionId = auctionId;
        this.userId = userId;
        this.auctionBidAmount = auctionBidAmount;
    }

}
