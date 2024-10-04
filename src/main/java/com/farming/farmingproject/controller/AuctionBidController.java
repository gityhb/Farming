package com.farming.farmingproject.controller;


import com.farming.farmingproject.domain.AuctionBid;
import com.farming.farmingproject.service.AuctionBidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/auctionbid")
@CrossOrigin(origins = "http://localhost:3000")//프론트엔드 허용
public class AuctionBidController {
    @Autowired
    private AuctionBidService auctionBidService;

    // 특정 경매의 모든 입찰 목록 조회
    @GetMapping("/bids/{auctionId}")
    public ResponseEntity<List<AuctionBid>> getBidsByAuctionId(@PathVariable Long auctionId) {
        List<AuctionBid> bids = auctionBidService.getBidByAuction(auctionId);
        return ResponseEntity.ok(bids);
    }
}
