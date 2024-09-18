package com.farming.farmingproject.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Table(name="users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
//@Setter
//@AllArgsConstructor

public class User implements UserDetails {  // UserDetails를 상속받아 인증 객체로 사용
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "business_number")
    private String businessNumber;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "store_phone_number")
    private String storePhoneNumber;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "authority", nullable = false)
    private int authority;

    @Column(name = "created_date", nullable = false)
    private Timestamp createdDate;

    @Column(name = "modified_date", nullable = false)
    private Timestamp modifiedDate;

    @Builder
    public User(String userId, String password, String name, String nickname, String storeName, String businessNumber, String phoneNumber, String storePhoneNumber, String email, String address, Integer authority) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.storeName = storeName;
        this.businessNumber = businessNumber;
        this.phoneNumber = phoneNumber;
        this.storePhoneNumber = storePhoneNumber;
        this.email = email;
        this.address = address;
        this.authority = authority;
        this.createdDate = new Timestamp(System.currentTimeMillis());  // 현재 시간 설정
        this.modifiedDate = new Timestamp(System.currentTimeMillis());  // 현재 시간 설정
    }

    @Override   // 권한 반환
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    // 사용자의 id를 반환(고유한 값)
    @Override
    public String getUsername() {
        return userId;
    }

    public Integer getAuthority() { return authority; }

    // 사용자의 패스워드 반환
    @Override
    public String getPassword() {
        return password;
    }

    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        // 만료되었는지 확인하는 로직
        return true;    // true -> 만료되지 않음
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠금되었는지 확인하는 로직
        return true;    // true -> 잠금되지 않았음
    }

    // 패스워드의 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        // 패스워드가 만료되었는지 확인하는 로직
        return true;    // true -> 만료되지 않음
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        // 계정 사용 가능한지 확인하는 로직
        return true;    // true -> 사용 가능
    }


}
