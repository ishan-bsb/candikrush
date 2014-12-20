package com.candikrush.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.candikrush.dto.Candidate;
import com.candikrush.dto.CvState;
import com.candikrush.helpers.SendEmailWithAttachments;
import com.candikrush.property.PropertyReader;

@Service
public class SendMailService {
	
	@Autowired
	CandidateApiService candidateApiService;
	
	@Autowired
	PropertyReader propertyReader;

	private static final String CC_MAIL_ID = "ishan@bsb.in";
	
	protected static Logger logger = LoggerFactory.getLogger(SendMailService.class);
	
	public void sendNotificationEmail(String from, String to, String candidateId, long timeStampinMillis, long durationinMillis) throws Exception{
		Candidate candidate = candidateApiService.getCandidateFromId(candidateId);
		if(null == candidate){
			logger.error("Candidate not found for id:"+candidateId);
		}
		CvState currentState = candidate.getCurrentState();
		String mailSubject = currentState.getMail_subject();
		String formAction = generateFormResponseUrl();
		
		String mailerContent =  getMailer(candidate.getSummary(), formAction, candidateId);
		if(timeStampinMillis > System.currentTimeMillis()){
			List<String> attachment = new ArrayList<String>();
			//TODO: uncomment before committing
			//attachment.add(candidate.getCvPath());
			attachment.add("/Users/ravikant/Desktop/Candi_Krush/tmpFiles/nitin_req.txt");
			SendEmailWithAttachments.sendICSMail(from, to, mailSubject, mailerContent, timeStampinMillis, durationinMillis, attachment);
		}
		else{
		  //TODO: uncomment before committing
			//String[] arr = {candidate.getCvPath()};
		    String[] arr = {"/Users/ravikant/Desktop/Candi_Krush/tmpFiles/nitin_req.txt"};
			SendEmailWithAttachments.sendMultiPartMail(from, to, CC_MAIL_ID, mailSubject, mailerContent,  arr);
		}
	}
	
	private String getMailer(String summary, String form_action, String candidateId){
		String mailer = "<html><body><TABLE width='100%' border='2' cellspacing='0' cellpadding='0'><tr>"
				+ "<td>"+summary+"</td></tr><tr><td><FORM action="+form_action+" method='POST'>"
				+ "<input type='textarea' name='remarks' value='Review Comments'>"
				+ "</input><br/><INPUT type='radio' name='result' value='fail'>"
				+ "Reject<input type='hidden' name='candidateId' value='"+ candidateId +"'>"
				+ "<INPUT type='radio' name='result' value='pass'>pass<br/>"
				+ "<button type='submit' value='submit'>Submit</button></FORM>"
				+ "</td></tr></TABLE></body></html>";
		
		return mailer;
	}
	
	private String generateFormResponseUrl(){
		String baseApiUrl = propertyReader.loadProperty("baseApiUrl");
		String stateChangeApi = baseApiUrl;
		return stateChangeApi;
	}
	
	
	
}
