package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Auction;
import com.farming.farmingproject.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    // 경매 상품 저장
    public Auction saveAuction(Auction auction) {
        return auctionRepository.save(auction);
    }

    // 모든 경매 상품 조회
    public List<Auction> getAllAuctions() {
        return auctionRepository.findAllByOrderByDateAsc();
    }

    // 특정 경매 상품 조회
    public Auction getAuctionById(Long id) {
        return auctionRepository.findById(id).orElse(null);
    }
}
