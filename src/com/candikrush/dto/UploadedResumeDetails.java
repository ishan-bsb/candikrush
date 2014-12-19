package com.candikrush.dto;


public class UploadedResumeDetails {

    private String filePath;
    private long cctc;
    private long ectc;
    private String email;
    private int noticePeriod;
    private long creationDate;
    
    public String getFilePath() {
        return filePath;
    }
    
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    
    public long getCctc() {
        return cctc;
    }
    
    public void setCctc(long cctc) {
        this.cctc = cctc;
    }
    
    public long getEctc() {
        return ectc;
    }
    
    public void setEctc(long ectc) {
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

    @Override
    public String toString() {
        return "UploadedResumeDetails [filePath=" + filePath + ", cctc=" + cctc + ", ectc=" + ectc + ", email=" + email + ", noticePeriod=" + noticePeriod + ", creationDate=" + creationDate + "]";
    }

        
}
