package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Basket;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.repository.BasketRepository;
import com.farming.farmingproject.repository.ProductRGRepository;
import com.farming.farmingproject.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BasketService {
    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRGRepository productRGRepository;

    @Transactional
    public void addToBasket(String userId, Long productId, int quantity) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        ProductRG productRG = productRGRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<Basket> existingBasketItem = basketRepository.findByUserAndProductRG(user, productRG);

        if (existingBasketItem.isPresent()) {
            Basket basketItem = existingBasketItem.get();
            basketItem.addQuantity(quantity);
            basketRepository.save(basketItem);
        } else {
            Basket newBasketItem = Basket.builder()
                    .user(user)
                    .productRG(productRG)
                    .quantity(quantity)
                    .build();
            basketRepository.save(newBasketItem);
        }
    }

    public List<Basket> getBasketItems(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return basketRepository.findByUser(user);
    }
}