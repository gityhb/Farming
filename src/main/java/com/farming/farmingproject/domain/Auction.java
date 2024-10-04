package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;

@Entity
@Table(name="auction")
@NoArgsConstructor
@AllArgsConstructor
@Getter // Lombok을 사용해 getter 메소드 자동 생성
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="auction_id", updatable = false)
    private Long auctionId;

    @Column(name="auction_title", nullable = false)
    private String auctionTitle;

    @Column(name = "auction_date", nullable = false)
    private String auctionDate;

    @Column(name="auction_image", nullable = false)
    private String auctionImage;

    @Column(name="auction_minimumbid", nullable = false)
    private String auctionMinimumbid;

    // Builder 패턴 생성자
    @Builder
    public Auction(String auctionTitle, String auctionDate, String auctionImage, String auctionMinimumbid) {
        this.auctionTitle = auctionTitle;
        this.auctionDate = auctionDate;
        this.auctionImage = auctionImage;
        this.auctionMinimumbid = auctionMinimumbid;
    }
}
