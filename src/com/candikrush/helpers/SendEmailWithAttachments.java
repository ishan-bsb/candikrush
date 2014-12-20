package com.candikrush.helpers;


import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.Calendar;

import org.apache.commons.mail.ByteArrayDataSource;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.MultiPartEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.candikrush.service.SendMailService;

import edu.emory.mathcs.backport.java.util.Arrays;

public class SendEmailWithAttachments {

    private static Properties properties = null;
    protected static Logger logger = LoggerFactory.getLogger(SendEmailWithAttachments.class);
    //String[] attachments = { "/Users/jasdeep/timeoutsPacks.txt" };
    //SendEmailWithAttachments.sendMultiPartMail("jasdeep@bsb.in <mailto:jasdeep@bsb.in>", "arun@bsb.in <mailto:arun@bsb.in>", "sumit@bsb.in <mailto:sumit@bsb.in>", "Logs for " + yesterday, "", attachments);
    
    static {
        try {
            properties = new Properties();
            properties.put("mail.smtp.host", "smtp.gmail.com");
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.socketFactory.port", "465");
            properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            properties.put("mail.smtp.socketFactory.fallback", "false");
            properties.put("mail.login.username", "ishan@bsb.in");
            properties.put("mail.login.password", "bsb@12345");
        }
        catch (Exception e) {
        }
    }

    public static void sendMultiPartMail(String from, String to, String cc, String subject, String text, String[] attachments) throws Exception {
        if(properties.isEmpty()) {
            throw new Exception("Cannot send mail. Host data not available.");
        }

        Session session = Session.getInstance(properties, new Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication((String) properties.get("mail.login.username"), (String) properties.get("mail.login.password"));
            }
        });

        // Create to and from addresses
        InternetAddress fromAddress = new InternetAddress(from);
        InternetAddress toAddress = new InternetAddress(to);

        // Create the message instance and add the sender,
        // recipient, subject and body.
        Message msg = new MimeMessage(session);
        msg.setFrom(fromAddress);
        msg.setSubject(subject);
        msg.setRecipient(RecipientType.TO, toAddress);
        msg.setRecipient(RecipientType.CC, new InternetAddress(cc));

        Multipart multipart = new MimeMultipart();
        BodyPart part1 = new MimeBodyPart();
        part1.setContent(text,"text/html; charset=utf-8");
        multipart.addBodyPart(part1);

        BodyPart attachment = null;
        for(String filename : attachments) {
            attachment = new MimeBodyPart();
            DataSource source = new FileDataSource(filename);
            attachment.setDataHandler(new DataHandler(source));
            attachment.setFileName(filename);
            multipart.addBodyPart(attachment);
        }

        msg.setContent(multipart);

        Transport.send(msg);
    }
    
    
    public static void sendICSMail(String from, String to,String subject, String text, long startTime, long duration, List<String> attachments ) throws Exception {
//        if(properties.isEmpty()) {
//            throw new Exception("Cannot send mail. Host data not available.");
//        }

        Calendar calender = CalenderInviteService.CreateICalender(startTime, duration, subject, to);
        
        FileOutputStream fout = new FileOutputStream("mycalendar.ics");
        CalendarOutputter outputter = new CalendarOutputter();
        outputter.output(calender, fout);
        
        byte[] attachmentData = CalenderInviteService.calendarAsByteArray(calender);
        
        MultiPartEmail email = new MultiPartEmail();
		email.setHostName("smtp.googlemail.com");
		email.setSmtpPort(465);

		try {
			email.addTo(to);
			email.setFrom(from);
			email.setSubject(subject);
			email.setMsg(text);
			email.setAuthenticator(new DefaultAuthenticator("ishan@bsb.in", "bsb@12345"));
			email.setSSLOnConnect(true);

			String name = "invite.ics";
			String contentType = String.format("text/calendar; name="+name);
			System.out.println(contentType);
			email.attach(new ByteArrayDataSource(attachmentData, contentType),
					name, "", EmailAttachment.ATTACHMENT);
			for(String fileName : attachments){
				email.attach(new File(fileName));
			}
			String sendMail = email.send();
			System.out.println(sendMail);
			logger.info(sendMail);
		}
		catch(Exception e){
		    e.printStackTrace();
			logger.error("Error sending email "+e.getMessage(),e);
		}
    }
    
    public static void main(String[] args) {
		try {
			String[] test = {"/tmp/candiKrush.log"};
//			sendMultiPartMail("ishan@bsb.com", "ishan@bsb.in", "ishannsd@bsb.in", "testing", "Hello",test );
			sendICSMail("ravikant@bsb.in", "ishan@bsb.in", "Meeting invite", "Hello ", 1419018399000L, 3600000L, Arrays.asList(test));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
}