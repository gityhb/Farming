package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.Basket;
import com.farming.farmingproject.domain.ProductRG;
import com.farming.farmingproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    List<Basket> findByUser(User user);
    Optional<Basket> findByUserAndProductRG(User user, ProductRG productRG);
    void deleteByIdIn(List<Long> ids);
}