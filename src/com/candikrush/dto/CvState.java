package com.candikrush.dto;

public enum CvState {

    UPLOAD("Resume uploaded successfully"), REFRESHED(""), HR_REJECT("Resume Rejected @Hr screening"), TECH_SCREEN_SCH("Please screen the candidate"),  TECH_SCREEN_REJECT("Resume Rejected @Tech screening"), TECH_SCREEN_CLEAR("Resume Passed HR screening"), INT_SCH("Interview scheduled");

    private final String mail_subject;
    
    private CvState(String mailSubject) {
    	this.mail_subject  = mailSubject;
    }

	public String getMail_subject() {
		return mail_subject;
	}
    
}
