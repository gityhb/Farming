package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter

public class AddAuctionRequest {
    private Long auctionId;
    private String auctionTitle;
    private String auctionDate;
    private String auctionMinimumbid;
    private MultipartFile auctionImage;

}
