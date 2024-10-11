package com.farming.farmingproject.controller;

import com.farming.farmingproject.domain.Basket;
import com.farming.farmingproject.dto.AddBasketRequest;
import com.farming.farmingproject.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}