package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.ProductImage;
import com.farming.farmingproject.dto.AddProductImageRequest;
import com.farming.farmingproject.repository.ProductImageRepository;
import com.farming.farmingproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProductImageService {
    @Autowired
    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    // 실제 파일이 저장될 경로 (서버 파일 시스템 상의 경로)
    private final String uploadDirectory = new File("src/main/resources/static/uploads/apply_product_photos/").getAbsolutePath();

    public String saveFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("빈 파일입니다.");
        }

        // 파일 이름을 고유햐게 생성하기 위해 UUID 사용
//        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String fileName = file.getOriginalFilename();   // 파일 이름 그대로 저장
        // 파일 경로 설정
        File targetFile = new File(uploadDirectory + File.separator + fileName);

        try {
            // 디렉터리가 존재하지 않으면 생성
            if (!targetFile.getParentFile().exists()) {
                targetFile.getParentFile().mkdirs();
            }

            // 파일을 해당 경로에 저장
            file.transferTo(targetFile);
        } catch (IOException e) {
            throw new IllegalArgumentException("파일 저장에 실패했습니다: " + e.getMessage());
        }

        // 웹에서 접근할 수 있는 경로 반환 (예: /uploads/apply_product_photos/filename.jpg)
        return "/uploads/apply_product_photos/" + fileName;
    }

    public ProductImage save(AddProductImageRequest dto) {

        // Product 엔티티 조회

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductImage productImage = ProductImage.builder()
                .product(product)
                .productImagePath(saveFile(dto.getProductImagePath()))
                .build();

        return productImageRepository.save(productImage);

    }

    public List<ProductImage> findProductImagesByProductId(Long productId) {
        return productImageRepository.findProductImagesByProduct_ProductId(productId);
    }
}
