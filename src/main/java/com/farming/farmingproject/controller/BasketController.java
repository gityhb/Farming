package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Basket;
import com.farming.farmingproject.dto.AddBasketRequest;
import com.farming.farmingproject.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/basket")
public class BasketController {
    @Autowired
    private BasketService basketService;

    @PostMapping("/add")
    public ResponseEntity<?> addToBasket(@RequestBody AddBasketRequest request) {
        try {
            basketService.addToBasket(request.getUserId(), request.getProductId(), request.getQuantity());
            return ResponseEntity.ok().body("Item added to basket successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add item to basket: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getBasketItems(@PathVariable(name = "userId")  String userId) {
        try {
            List<Basket> basketItems = basketService.getBasketItems(userId);
            return ResponseEntity.ok(basketItems);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get basket items: " + e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteBasketItems(@RequestBody Map<String, List<Long>> request) {
        List<Long> ids = request.get("basketIds");
        Map<String, String> response = new HashMap<>();
        try {
            basketService.deleteBasketItems(ids);
            response.put("message", ids.size() + "개의 장바구니 항목 삭제 성공");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "장바구니 항목 삭제 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}