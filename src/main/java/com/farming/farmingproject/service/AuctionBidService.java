package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Auction;
import com.farming.farmingproject.domain.AuctionBid;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddAuctionBidRequest;
import com.farming.farmingproject.repository.AuctionBidRepository;
import com.farming.farmingproject.repository.AuctionRepository;
import com.farming.farmingproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuctionBidService {

    private final AuctionBidRepository auctionBidRepository;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;

    // 새로운 입찰을 추가하는 메서드
    @Transactional
    public AuctionBid placeBid(AddAuctionBidRequest request) {
        // 경매 ID로 경매 정보를 조회
        Auction auction = auctionRepository.findById(request.getAuctionId())
                .orElseThrow(() -> new IllegalArgumentException("해당 경매를 찾을 수 없습니다."));

        // 사용자 ID로 사용자 정보를 조회
        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        // 새로운 경매 입찰 객체 생성
        AuctionBid auctionBid = AuctionBid.builder()
                .auction(auction)
                .user(user)
                .auctionBidAmount(request.getAuctionBidAmount())  // 입찰 금액 설정
                .auctionBidTime(LocalDateTime.now())              // 현재 시간을 입찰 시간으로 설정
                .build();

        // 입찰 정보를 DB에 저장
        return auctionBidRepository.save(auctionBid);
    }

    // 특정 경매에 대한 가장 높은 입찰을 가져오는 메서드
    @Transactional(readOnly = true)
    public Optional<AuctionBid> getHighestBid(Long auctionId) {
        // 해당 경매의 가장 높은 입찰 정보를 반환
        return auctionBidRepository.findHighestBidByAuctionId(auctionId);
    }

    // 상위 5개의 입찰 금액을 반환하는 메서드
    @Transactional(readOnly = true)
    public List<Double> getTop5BidAmounts(Long auctionId) {
        return auctionBidRepository.findTopBidAmountsByAuctionId(auctionId, PageRequest.of(0, 5));  // 첫 번째 페이지의 상위 5개
    }
}
