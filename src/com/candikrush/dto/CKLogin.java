package com.candikrush.dto;


public class CKLogin {
    private String id;
    private String userId;
    private long loginAt;
    private long logoutAt;
    private boolean isActive;
    
    public String getId() {
        return id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public long getLoginAt() {
        return loginAt;
    }
    
    public void setLoginAt(long loginAt) {
        this.loginAt = loginAt;
    }
    
    public long getLogoutAt() {
        return logoutAt;
    }
    
    public void setLogoutAt(long logoutAt) {
        this.logoutAt = logoutAt;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
    
}
