package com.candikrush.dto;

import org.springframework.util.StringUtils;

public enum CvState {

    UPLOAD("Resume uploaded successfully"), REFRESHED(""), HR_REJECT("Resume Rejected @Hr screening"), TECH_SCREEN_SCH("Please screen the candidate"),  TECH_SCREEN_REJECT("Resume Rejected @Tech screening"), TECH_SCREEN_CLEAR("Resume Passed HR screening"), INT_SCH("Interview scheduled"), INT_REJECT("Interview Reject"), INT_CLEAR("Interview Cleared"), OFFER("Offer Proccessed"), HOLD("Offer on hold");

    private final String mail_subject;
    
    private CvState(String mailSubject) {
    	this.mail_subject  = mailSubject;
    }

	public String getMail_subject() {
		return mail_subject;
	}
	
	public static CvState getCVStateFromString(String state){
	    if(!StringUtils.hasText(state)){
	        return null;
	    }
	    return CvState.valueOf(state);
	}
    
	public static CvState getNextState(CvState currentState, boolean proceedToNextRound, CvState nextState){
		if(nextState != null){
			return nextState;
		}
		
		if(UPLOAD == currentState || REFRESHED == currentState){
			if(proceedToNextRound){
				return TECH_SCREEN_SCH;
			}
			else{
				return HR_REJECT;
			}
		}
		
		else if(TECH_SCREEN_SCH == currentState){
			if(proceedToNextRound){
				return TECH_SCREEN_CLEAR;
			}
			else{
				return TECH_SCREEN_REJECT;
			}
		}
		
		else if(TECH_SCREEN_CLEAR == currentState){
			if(proceedToNextRound){
				return INT_SCH;
			}
			else{
				return HR_REJECT;
			}
		}
		else if(INT_SCH == currentState){
			if(proceedToNextRound){
				return INT_CLEAR;
			}
			else{
				return INT_REJECT;
			}
		}
		else if(INT_CLEAR == currentState){
            if(proceedToNextRound){
                return INT_SCH;
            }
            else{
                return HR_REJECT;
            }
        }
		return HR_REJECT;
	}
	
}
