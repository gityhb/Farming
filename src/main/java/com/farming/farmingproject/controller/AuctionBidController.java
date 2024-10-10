package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.AuctionBid;
import com.farming.farmingproject.dto.AddAuctionBidRequest;
import com.farming.farmingproject.service.AuctionBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctionbid")  // 경매 입찰 관련 API 엔드포인트
@RequiredArgsConstructor
public class AuctionBidController {

    private final AuctionBidService auctionBidService;

    // 입찰 추가 API
    @PostMapping
    public ResponseEntity<AuctionBid> placeBid(@RequestBody AddAuctionBidRequest request) {
        AuctionBid auctionBid = auctionBidService.placeBid(request);  // 새로운 입찰 저장
        return ResponseEntity.ok(auctionBid);  // 성공적으로 저장된 입찰 반환
    }

    // 특정 경매에 대한 가장 높은 입찰 정보를 가져오는 API
    @GetMapping("/highest/{auctionId}")
    public ResponseEntity<AuctionBid> getHighestBid(@PathVariable Long auctionId) {
        return auctionBidService.getHighestBid(auctionId)
                .map(ResponseEntity::ok)  // 가장 높은 입찰 반환
                .orElse(ResponseEntity.notFound().build());  // 입찰이 없으면 404 반환
    }

    // 상위 5개의 입찰 금액을 반환하는 API
    @GetMapping("/top5/{auctionId}")
    public ResponseEntity<List<Double>> getTop5BidAmounts(@PathVariable("auctionId") Long auctionId) {
        List<Double> topBidAmounts = auctionBidService.getTop5BidAmounts(auctionId);
        return ResponseEntity.ok(topBidAmounts);  // 상위 5개의 입찰 금액을 반환
    }

}
