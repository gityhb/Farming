package com.farming.farmingproject.domain;

public class UserResponse {
    private String userId;
    private String name;

    public UserResponse(String userId, String name) {
        this.userId = userId;
        this.name = name;

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

}