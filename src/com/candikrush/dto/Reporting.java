package com.candikrush.dto;

import com.candikrush.common.UserType;

public class Reporting {

    private String   id;

    private String   userId;

    private UserType userType;

    private long     cycleTimestamp;

    private int      total;

    private int      success;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public long getCycleTimestamp() {
        return cycleTimestamp;
    }

    public void setCycleTimestamp(long cycleTimestamp) {
        this.cycleTimestamp = cycleTimestamp;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getSuccess() {
        return success;
    }

    public void setSuccess(int success) {
        this.success = success;
    }

}
