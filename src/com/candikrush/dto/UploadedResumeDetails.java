package com.candikrush.dto;

public class UploadedResumeDetails {

    private String  filePath;

    private int     cctc;

    private int     ectc;

    private String  email;

    private int     noticePeriod;

    private long    creationDate;

    private boolean processed;

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getNoticePeriod() {
        return noticePeriod;
    }

    public void setNoticePeriod(int noticePeriod) {
        this.noticePeriod = noticePeriod;
    }

    public long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(long creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isProcessed() {
        return processed;
    }

    public void setProcessed(boolean processed) {
        this.processed = processed;
    }

    @Override
    public String toString() {
        return "UploadedResumeDetails [filePath=" + filePath + ", cctc=" + cctc + ", ectc=" + ectc + ", email=" + email + ", noticePeriod=" + noticePeriod + ", creationDate=" + creationDate + "]";
    }

}
