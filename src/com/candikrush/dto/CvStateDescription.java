package com.candikrush.dto;

public class CvStateDescription {

    private CvState state;

    private long    timestamp;

    private String  remarks;

    public CvState getState() {
        return state;
    }

    public void setState(CvState state) {
        this.state = state;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

}
