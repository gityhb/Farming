package com.farming.farmingproject.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String storeName;
    private String address;
    private Integer authority;
    private String businessNumber;


    public UserResponse(Long id, String userId, String name,String email, String phoneNumber, String storeName, String address, Integer authority, String businessNumber) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.storeName = storeName;
        this.address = address;
        this.authority = authority;
        this.businessNumber = businessNumber;
    }

    // Getter 및 Setter


//    public Long getId() { return id; }
//
//    public void setId(Long id) { this.id = id; }
//
//    public String getUserId() {
//        return userId;
//    }
//
//    public void setUserId(String userId) {
//        this.userId = userId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {return email;}
//
//    public void setEmail(String email) {this.email = email;}
//
//    public String getPhoneNumber() {return phoneNumber;}
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public String getStoreName() {return storeName;}
//    public void setStoreName(String storeName) {this.storeName = storeName;}
//
//    public String getAddress() {return address;}
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public Integer getAuthority() { return authority; }
//
//    public void setAuthority(Integer authority) { this.authority = authority; }

}