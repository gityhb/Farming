package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Auction;
import com.farming.farmingproject.dto.AddAuctionRequest;
import com.farming.farmingproject.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/auction")
@CrossOrigin(origins = "http://localhost:3000") //프론트 도메인 허용

public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    // 경매 상품 추가
    @PostMapping("/items")
    public ResponseEntity<Auction> createAuction(@ModelAttribute AddAuctionRequest request, @RequestParam("auctionImage")MultipartFile auctionImage) {
        request.setAuctionImage(auctionImage);
        Auction auction = auctionService.saveAuction(request);
        return ResponseEntity.ok(auction);
    }

    // 모든 경매 상품 조회
    @GetMapping("/items")
    public List<Auction> getAllAuctions() {
        return auctionService.getAllAuctions();
    }

    // 특정 경매 상품 조회
    @GetMapping("/items/{auctionId}")
    public ResponseEntity<Auction> getAuctionById(@PathVariable("auctionId") Long auctionId) {
        Auction auction = auctionService.getAuctionById(auctionId);
        if (auction != null) {
            return ResponseEntity.ok(auction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
