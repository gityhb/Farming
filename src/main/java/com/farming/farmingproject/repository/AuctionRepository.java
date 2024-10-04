package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction,Long> {

}
