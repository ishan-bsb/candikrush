package com.candikrush.dto;

import java.util.List;

import com.candikrush.common.UserType;

public class CKUser {

    private String   id;

    private String   username;

    private String   password;

    private long     lastUpdated;

    List<String>     roles;

    private UserType userType;

    private String   email;

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "CmsUser [id=" + id + ", username=" + username + ", password=" + password + ", lastUpdated=" + lastUpdated + ", roles=" + roles + "]";
    }

}
