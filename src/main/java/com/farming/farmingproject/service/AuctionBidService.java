package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Auction;
import com.farming.farmingproject.domain.AuctionBid;
import com.farming.farmingproject.repository.AuctionBidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionBidService {

    @Autowired
    private AuctionBidRepository auctionBidRepository;

    //새로운 입찰 저장
    public AuctionBid saveBid(AuctionBid auctionBid) {
        return auctionBidRepository.save(auctionBid);
    }

    //특정 경매의 모든 입찰 목록 조회
    public List<AuctionBid> getBidByAuction(Long auctionId) {
        return auctionBidRepository.findAll();
    }
}
