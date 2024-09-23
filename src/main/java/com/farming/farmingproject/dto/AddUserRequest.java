package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private long id;
    private String userId;
    private String password;
    private String name;
    private String nickname;
    private String storeName;
    private String businessNumber;
    private String phoneNumber;
    private String storePhoneNumber;
    private String email;
    private String address;
    private int authority;
}
