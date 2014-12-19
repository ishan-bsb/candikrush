package com.candikrush.helpers;


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

public class SendEmailWithAttachments {

    private static Properties properties = null;

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
            properties.put("", "");
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
        part1.setText(text);
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
    
    
}