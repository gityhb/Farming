package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.Product;
import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddUserRequest;
import com.farming.farmingproject.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserRequest dto) {
        return userRepository.save(User.builder()
                .userId(dto.getUserId())
                // 패스워드 암호화
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .nickname(dto.getNickname())
                .storeName(dto.getStoreName())
                .businessNumber(dto.getBusinessNumber())
                .phoneNumber(dto.getPhoneNumber())
                .storePhoneNumber(dto.getStorePhoneNumber())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .authority(dto.getAuthority())
                .build()).getId();
    }

    // 관리자 계정 생성
    @PostConstruct
    public void initAdminUser() {
        String adminUserId = "admin";
        String adminPassword = "1234";

        // Admin 계정이 이미 존재하는지 확인
        if(userRepository.findByUserId(adminUserId).isEmpty()) {
            User adminUser = User.builder()
                    .userId(adminUserId)
                    .password(bCryptPasswordEncoder.encode(adminPassword))
                    .name("관리자")
                    .phoneNumber("01012345678")
                    .email("admin@gmail.com")
                    .address("(08221) 서울 구로구 경인로 445 3호관")
                    .authority(3)
                    .build();

            userRepository.save(adminUser);
        }
    }

    // 아이디를 통해 사용자 정보를 찾는 메서드
    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with userId: " + userId));
    }

    // 아이디 중복 여부를 확인하는 메서드
    public boolean checkUserIdDuplicate(String userId) {
        return userRepository.findByUserId(userId).isPresent();  // userId 존재 여부 반환
    }

    // 닉네임 중복 여부를 확인하는 메서드
    public boolean checkUserNicknameDuplicate(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();   // nickNmae 존재 여부 반환
    }

    // 모든 사용자 불러오기
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
