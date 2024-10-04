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
    private Long userId;
    private double auctionBidAmount;

    public AddAuctionBidRequest(Long auctionId, Long userId, double auctionBidAmount) {
        this.auctionId = auctionId;
        this.userId = userId;
        this.auctionBidAmount = auctionBidAmount;
    }

}
