package com.farming.farmingproject.repository;

import com.farming.farmingproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId);   // 사용자 아이디로 사용자 정보를 가져옴
    Optional<User> findByNickname(String nickname);   // 사용자 닉네임으로 사용자 정보를 가져옴
}

