package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="auctionbid")
@Getter


@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class AuctionBid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="auctionbid_id",updatable = false)
    private Long auctionBidId;

    //auction 테이블의 auctionId 참조
    @ManyToOne
    @JoinColumn(name="auction_id",nullable = false)
    private Auction auction;

    //User 테이블의 사용자 Id 참조
    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(name="auctionbid_amount",nullable = false)
    private double auctionBidAmount;

    @Column(name = "auctionbid_time",nullable = false)
    private LocalDateTime auctionBidTime;

    @Builder
    public AuctionBid(Auction auction, User user, double auctionBidAmount, LocalDateTime auctionBidTime) {
        this.auction = auction;
        this.user = user;
        this.auctionBidAmount = auctionBidAmount;
        this.auctionBidTime = auctionBidTime;
    }

}
