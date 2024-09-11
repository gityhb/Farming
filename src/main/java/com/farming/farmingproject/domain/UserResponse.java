package com.farming.farmingproject.domain;

public class UserResponse {
    private String userId;
    private String name;
    private Integer authority;

    public UserResponse(String userId, String name, Integer authority) {
        this.userId = userId;
        this.name = name;
        this.authority = authority;
    }

    // Getter 및 Setter
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAuthority() { return authority; }

    public void setAuthority(Integer authority) { this.authority = authority; }

}