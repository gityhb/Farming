package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction,Long> {
    @Query("SELECT a FROM Auction a ORDER BY a.auctionDate ASC")
    List<Auction> findAllByOrderByDateAsc();

}
