package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Auction;
import com.farming.farmingproject.domain.Job;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddAuctionRequest;
import com.farming.farmingproject.dto.AddJobRequest;
import com.farming.farmingproject.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class AuctionService {

    // 실제 파일이 저장될 경로 (서버 파일 시스템 상의 경로)
    private final String uploadDirectory = new File("src/main/resources/static/uploads/auction_photos/").getAbsolutePath();


    @Autowired
    private AuctionRepository auctionRepository;

    // 경매 상품 저장
//    public Auction saveAuction(Auction auction) {
//        return auctionRepository.save(auction);
//    }

    @Transactional
    public Auction saveAuction(AddAuctionRequest request) {
        // 파일 업로드 처리
        String photoPath = null;
        if (request.getAuctionImage() != null && !request.getAuctionImage().isEmpty()) {
            photoPath = saveFile(request.getAuctionImage()); // 파일 저장하고 경로 받음
        }

        // Auction 엔티티를 빌드할 때 User 객체를 할당
        Auction auction = Auction.builder()
                .auctionTitle(request.getAuctionTitle())
                .auctionDate(request.getAuctionDate())
                .auctionMinimumbid(request.getAuctionMinimumbid())
                .auctionImage(photoPath) // 파일 경로 추가
                .build();
        return auctionRepository.save(auction);
    }

    // 파일 저장 로직
    private String saveFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        // 파일 이름을 고유하게 생성하기 위해 UUID 사용
//        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // 파일 경로 설정
        File saveFile = new File(uploadDirectory + File.separator + fileName);

        try {
            // 디렉터리가 존재하지 않으면 생성
            if (!saveFile.getParentFile().exists()) {
                saveFile.getParentFile().mkdirs();
            }

            // 파일을 해당 경로에 저장
            file.transferTo(saveFile);
        } catch (IOException e) {
            throw new IllegalArgumentException("파일 저장에 실패했습니다: " + e.getMessage());
        }

        // 웹에서 접근할 수 있는 경로 반환 (예: /uploads/job_photos/filename.jpg)
        return "/uploads/job_photos/" + fileName;
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
