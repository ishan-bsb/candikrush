package com.candikrush.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.CollectionUtils;

public class Candidate {

    private String                   id;

    private String                   name;

    private String                   email;

    private String                   phone;

    private String                   cvPath;

    private String                   summary;

    private String                   location;

    private CvState                  currentState;

    private String                   sourceUserId;

    private List<CvStateDescription> history;

    private long                     lastupdateTimestamp;

    private int                      cctc;

    private int                      ectc;

    private int                      np;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCvPath() {
        return cvPath;
    }

    public void setCvPath(String cvPath) {
        this.cvPath = cvPath;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public CvState getCurrentState() {
        return currentState;
    }

    public void setCurrentState(CvState currentState) {
        this.currentState = currentState;
    }

    public String getSourceUserId() {
        return sourceUserId;
    }

    public void setSourceUserId(String sourceUserId) {
        this.sourceUserId = sourceUserId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<CvStateDescription> getHistory() {
        return history;
    }

    public void setHistory(List<CvStateDescription> history) {
        this.history = history;
    }

    public long getLastupdateTimestamp() {
        return lastupdateTimestamp;
    }

    public void setLastupdateTimestamp(long lastupdateTimestamp) {
        this.lastupdateTimestamp = lastupdateTimestamp;
    }

    public int getCctc() {
        return cctc;
    }

    public void setCctc(int cctc) {
        this.cctc = cctc;
    }

    public int getEctc() {
        return ectc;
    }

    public void setEctc(int ectc) {
        this.ectc = ectc;
    }

    public int getNp() {
        return np;
    }

    public void setNp(int np) {
        this.np = np;
    }

    public void addHistoryElem(CvStateDescription historyElem) {
        if(CollectionUtils.isEmpty(history)){
            this.history = new ArrayList<>();
        }
        this.history.add(historyElem);
    }

}
