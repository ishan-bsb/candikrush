package com.candikrush.dto;

public class Schedule {

    private String       id;

    private String       candId;

    private String       reviewerId;

    private String       schedulederId;

    private long         scheduleTimestamp;

    private long         startTimestamp;

    private long         endTimestamp;

    private String       remarks;

    private Outcome      outcome;

    private ScheduleType scheduleType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCandId() {
        return candId;
    }

    public void setCandId(String candId) {
        this.candId = candId;
    }

    public String getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(String reviewerId) {
        this.reviewerId = reviewerId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Outcome getOutcome() {
        return outcome;
    }

    public void setOutcome(Outcome outcome) {
        this.outcome = outcome;
    }

    public long getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(long startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public long getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(long endTimestamp) {
        this.endTimestamp = endTimestamp;
    }

    public String getSchedulederId() {
        return schedulederId;
    }

    public void setSchedulederId(String schedulederId) {
        this.schedulederId = schedulederId;
    }

    public long getScheduleTimestamp() {
        return scheduleTimestamp;
    }

    public void setScheduleTimestamp(long scheduleTimestamp) {
        this.scheduleTimestamp = scheduleTimestamp;
    }

    public ScheduleType getScheduleType() {
        return scheduleType;
    }

    public void setScheduleType(ScheduleType scheduleType) {
        this.scheduleType = scheduleType;
    }

}
