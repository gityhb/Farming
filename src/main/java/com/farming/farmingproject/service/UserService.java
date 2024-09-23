package com.farming.farmingproject.service;

import com.farming.farmingproject.domain.User;
import com.farming.farmingproject.dto.AddUserRequest;
import com.farming.farmingproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
                .nickname(dto.getNickName())
                .storeName(dto.getStoreName())
                .businessNumber(dto.getBusinessNumber())
                .phoneNumber(dto.getPhoneNumber())
                .storePhoneNumber(dto.getStorePhoneNumber())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .authority(dto.getAuthority())
                .build()).getId();
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
}
