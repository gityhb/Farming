package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.dto.AddProductRGRequest;
import com.farming.farmingproject.repository.ProductLikeRepository;
import com.farming.farmingproject.repository.ProductRGRepository;
import com.farming.farmingproject.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class ProductRGService {
    private final ProductRGRepository productRGRepository;
    private final ReviewRepository reviewRepository;
    @Autowired
    private ProductLikeRepository productLikeRepository;

    @Autowired
    public ProductRGService(ProductRGRepository productRGRepository, ReviewRepository reviewRepository) {
        this.productRGRepository = productRGRepository;
        this.reviewRepository = reviewRepository;
    }

    // 상품 이미지 저장 경로
    //private final String productImageDirectory = new File("src/main/resources/static/uploads/product_img/").getAbsolutePath();
    // 상품 정보 이미지 저장 경로
    //private final String productInfoImageDirectory = new File("src/main/resources/static/uploads/product_info_img/").getAbsolutePath();

    private final String productImageDirectory = "src/main/resources/static/uploads/product_img/";
    private final String productInfoImageDirectory = "src/main/resources/static/uploads/product_info_img/";


    public List<ProductRG> getAllProductRGs() {
        return productRGRepository.findAll();
    }

    public ProductRG getProductById(Long productId) {
        Optional<ProductRG> product = productRGRepository.findByProductId(productId);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

    public Map<Long, Long> getReviewCountsByProduct() {
        List<ProductRG> products = productRGRepository.findAll();
        Map<Long, Long> reviewCounts = new HashMap<>();

        for (ProductRG product : products) {
            long count = reviewRepository.countByProductId(product.getProductId());
            reviewCounts.put(product.getProductId(), count);
        }

        return reviewCounts;
    }

    public List<ProductRG> getProductsBySellerId(String sellerId) {
        return productRGRepository.findBySellerId(sellerId);
    }

    /*@Transactional
    public ProductRG saveProduct(AddProductRGRequest addProductRGRequest) {
        String productImagePath = null;
        String productInfoImagePath = null;

        if (addProductRGRequest.getProductimgPath() != null && !addProductRGRequest.getProductimgPath().isEmpty()) {
            productImagePath = saveFile(addProductRGRequest.getProductimgPath(), productImageDirectory);
        }

        if (addProductRGRequest.getProductInfoimgPath() != null && !addProductRGRequest.getProductInfoimgPath().isEmpty()) {
            productInfoImagePath = saveFile(addProductRGRequest.getProductInfoimgPath(), productInfoImageDirectory);
        }

        ProductRG product = ProductRG.builder()
                .sellerId(addProductRGRequest.getSellerId())
                .productName(addProductRGRequest.getProductName())
                .storeName(addProductRGRequest.getStoreName())
                .productPrice1(addProductRGRequest.getProductPrice1())
                .productPrice2(addProductRGRequest.getProductPrice2())
                .productPrice3(addProductRGRequest.getProductPrice3())
                .productOrigin(addProductRGRequest.getProductOrigin())
                .productDeliveryDate(addProductRGRequest.getProductDeliveryDate())
                .productimgPath(productImagePath)
                .productInfoimgPath(productInfoImagePath)
                .sellcount(addProductRGRequest.getSellcount())
                .astar(addProductRGRequest.getAstar())
                .salenum(addProductRGRequest.getSalenum())
                .build();

        return productRGRepository.save(product);
    }

    private String saveFile(MultipartFile file, String directory) {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File saveFile = new File(directory + File.separator + fileName);

        try {
            if (!saveFile.getParentFile().exists()) {
                saveFile.getParentFile().mkdirs();
            }
            file.transferTo(saveFile);
        } catch (IOException e) {
            throw new IllegalArgumentException("파일 저장에 실패했습니다: " + e.getMessage());
        }

        return fileName;
    }*/

    @Transactional
    public ProductRG saveProduct(AddProductRGRequest addProductRGRequest) {
        String productImagePath = null;
        String productInfoImagePath = null;

        if (addProductRGRequest.getProductimgPath() != null && !addProductRGRequest.getProductimgPath().isEmpty()) {
            productImagePath = saveFile(addProductRGRequest.getProductimgPath(), productImageDirectory);
        }

        if (addProductRGRequest.getProductInfoimgPath() != null && !addProductRGRequest.getProductInfoimgPath().isEmpty()) {
            productInfoImagePath = saveFile(addProductRGRequest.getProductInfoimgPath(), productInfoImageDirectory);
        }

        ProductRG product = ProductRG.builder()
                .sellerId(addProductRGRequest.getSellerId())
                .sellerName(addProductRGRequest.getSellerName())
                .productName(addProductRGRequest.getProductName())
                .storeName(addProductRGRequest.getStoreName())
                .productPrice1(addProductRGRequest.getProductPrice1())
                .productPrice2(addProductRGRequest.getProductPrice2())
                .productPrice3(addProductRGRequest.getProductPrice3())
                .productOrigin(addProductRGRequest.getProductOrigin())
                .productDeliveryDate(addProductRGRequest.getProductDeliveryDate())
                .productimgPath(productImagePath)
                .productInfoimgPath(productInfoImagePath)
                .sellcount(addProductRGRequest.getSellcount())
                .astar(addProductRGRequest.getAstar())
                .salenum(addProductRGRequest.getSalenum())
                .build();

        return productRGRepository.save(product);
    }

    private String saveFile(MultipartFile file, String directory) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(directory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "uploads/" + (directory.contains("product_img") ? "product_img/" : "product_info_img/") + fileName;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장에 실패했습니다: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void updateProductAverageStars() {
        List<Object[]> averageStars = reviewRepository.findAverageStarByProductId();

        for (Object[] result : averageStars) {
            Long productId = (Long) result[0];
            Double averageStar = (Double) result[1];

            ProductRG product = productRGRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

            product.setAstar(averageStar.floatValue());
            productRGRepository.save(product);
        }
    }

    public List<ProductRG> searchProductsByName(String name) {
        return productRGRepository.findByProductNameContaining(name);
    }

    // like_count가 높은 상품 5개를 가져오는 메서드
    public List<ProductRG> getTop5Products() {
        return productRGRepository.findTop5ProductsByLikeCount();
    }

//    public List<ProductRG> getLikedProducts(Long userId) {
//        List<Long> likedProductIds = productLikeRepository.findLikedProductIdsByUserId(userId);
//        return productRGRepository.findByProductIdIn(likedProductIds);
//    }
}
