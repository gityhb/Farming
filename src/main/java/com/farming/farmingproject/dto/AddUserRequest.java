package com.farming.farmingproject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private String userId;
    private String password;
    private String name;
    private String nickname;
    private String storeName;
    private Integer businessNumber;
    private Integer phoneNumber;
    private Integer storePhoneNumber;
    private String email;
    private String address;
    private int authority;
}
