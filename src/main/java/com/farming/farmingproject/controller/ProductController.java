package com.farming.farmingproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProductController {

    // 가상의 제품 데이터 (실제 DB와 연결해야 함)
    private List<Product> products = List.of(
            new Product(1, "프리미엄 고당도 수박", 18900, 27, "/img/watermelon.png"),
            new Product(2, "오이지오이 10kg", 12900, 15, "/img/cucumber.png"),
            new Product(3, "백설향 딸기", 5000, 40, "/img/snow_white_strawberry.png")
    );

    @GetMapping("/api/products")
    public List<Product> getAllProducts() {
        return products; // 전체 제품 목록 반환
    }

    @GetMapping("/api/search")
    public List<Product> searchProducts(@RequestParam String query) {
        // 검색어에 맞는 제품 필터링 (이름 기준으로 검색)
        return products.stream()
                .filter(product -> product.getName().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}

class Product {
    private int id;
    private String name;
    private int price;
    private int discountPercentage;
    private String imageUrl;

    public Product(int id, String name, int price, int discountPercentage, String imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public int getId() { return id; }
    public String getName() { return name; }
    public int getPrice() { return price; }
    public int getDiscountPercentage() { return discountPercentage; }
    public String getImageUrl() { return imageUrl; }
}
