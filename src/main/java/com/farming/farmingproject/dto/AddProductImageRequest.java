package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AddProductImageRequest {
    private long productId;
    private MultipartFile productImagePath;
}
