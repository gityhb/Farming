package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Auction;
import com.farming.farmingproject.domain.AuctionBid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuctionBidRepository extends JpaRepository<AuctionBid, Long> {
    // 특정 경매에 대한 가장 높은 낙찰가를 찾는 쿼리
    @Query("SELECT ab FROM AuctionBid ab WHERE ab.auction.auctionId = :auctionId ORDER BY ab.auctionBidAmount DESC")
    Optional<AuctionBid> findHighestBidByAuctionId(Long auctionId);

    // 특정 경매에 대한 상위 5개의 입찰 금액을 가져오는 쿼리
    @Query("SELECT ab.auctionBidAmount FROM AuctionBid ab WHERE ab.auction.auctionId = :auctionId ORDER BY ab.auctionBidAmount DESC")
    List<Double> findTopBidAmountsByAuctionId(@Param("auctionId") Long auctionId, Pageable pageable);
}
