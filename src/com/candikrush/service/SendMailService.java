package com.candikrush.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.candikrush.dto.Candidate;
import com.candikrush.dto.CvState;
import com.candikrush.helpers.SendEmailWithAttachments;
import com.candikrush.property.PropertyReader;

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
		List<String> attachment = new ArrayList<String>();
		attachment.add(candidate.getCvPath());
		
		SendEmailWithAttachments.sendICSMail(from, to, mailSubject, mailerContent, timeStampinMillis, durationinMillis, attachment);
	}
	
	private String getMailer(String summary, String form_action, String candidateId){
		String mailer = "<html><body><table align='center' border='2' style='width: 100%;'><tbody><tr><td>"
				+summary+"</td></tr><tr><td><table border='1' style='width: 100%'><tbody><tr><td><form action='"+form_action+
				"method='post'>"+"<input type='textarea' name='comments'>Review Comments</input>"
				+ "<input type='hidden' name='id' value='"+ candidateId +"'></></td></tr></tbody></table><table border='1' "
				+ "style='width: 100%;'><tbody><tr><td><input type='radio' name='result' value='fail'>Reject</td><td>"
				+ "<input type='radio' name='result' value='pass' "
				+ "checked>Proceed Further</td></tr></form></tbody></table></td></tr></tbody></table>"+
				 "</body></html>";
		
		return mailer;
	}
	
	private String generateFormResponseUrl(){
		String baseApiUrl = propertyReader.loadProperty("baseApiUrl");
		String stateChangeApi = baseApiUrl +"changeState";
		return stateChangeApi;
	}
	
	
	
}
