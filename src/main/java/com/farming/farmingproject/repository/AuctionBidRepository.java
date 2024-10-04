package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.AuctionBid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionBidRepository extends JpaRepository<AuctionBid, Long> {
}
