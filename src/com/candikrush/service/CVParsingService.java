package com.candikrush.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.candikrush.dto.Candidate;
import com.candikrush.dto.CvState;
import com.candikrush.dto.CvStateDescription;
import com.candikrush.utils.Utils;
import com.candikrush.utils.XMLUtils;

@Service
public class CVParsingService {

    private Logger          logger  = LoggerFactory.getLogger(CVParsingService.class.getCanonicalName());

    private final String    url     = "http://localhost:3131/v1/cv/parse?fileName=%s&filPath=%s";

    @Autowired
    private MongoOperations candiMongoTemplate;

    RestTemplate            restApi = new RestTemplate();

    public String getParsedResume(String filePath, String fileName) {
        logger.info("Getting parsed cv for :" + filePath + " : " + fileName);
        String xml = "";
        try {
            xml = restApi.getForObject(String.format(url, URLEncoder.encode(fileName, "UTF-8"), URLEncoder.encode(filePath, "UTF-8")), String.class);
        }
        catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        logger.info("Response : " + xml);
        return xml;
    }

    private byte[] loadFile(File file) throws IOException {
        InputStream is = new FileInputStream(file);
        long length = file.length();
        byte[] bytes = new byte[(int) length];
        int offset = 0;
        int numRead = 0;
        while(offset < bytes.length && (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
            offset += numRead;
        }
        if(offset < bytes.length) {
            is.close();
            throw new IOException("Could not completely read file " + file.getName());
        }
        System.out.println(offset);
        is.close();
        return bytes;
    }

    public static void main(String[] args) throws Exception {
        CVParsingService ps = new CVParsingService();
        // ps.getParsedResume("/Users/jasdeep/Downloads/BSB final resumes 2/Anshul Sharma_new-2.pdf",
        // "Anshul Sharma_new-2.pdf");
        String resumeXml = new String(ps.loadFile(new File("/Users/jasdeep/Desktop/anshul.xml")));
        ps.processCV(resumeXml, "/Users/jasdeep/Desktop/anshul.xml", "jasdeep@bsb.in", 0L, 400000, 600000, 60);
    }

    public boolean processCV(String resumeXML, String path, String sourceId, long postTimestamp, int cctc, int ectc, int np) {
        Document doc = XMLUtils.parse(resumeXML);
        Element rootElement = doc.getDocumentElement();
        String email = XMLUtils.getValue(rootElement, "InternetEmailAddress");
        String msisdn = XMLUtils.getValue(rootElement, "phone_Mobile");
        msisdn = Utils.get10DigitMsisdn(msisdn.trim());
        String name = XMLUtils.getValue(rootElement, "FullName");
        if(!checkForDuplicateEmailPhone(email, msisdn)) {
            Candidate cand = createNewCandidate(path, sourceId, postTimestamp, rootElement, email, msisdn, name, cctc, ectc, np);
            candiMongoTemplate.save(cand);
            sendNotificationEmailToHr(cand);
            sendNotificationToSource(cand);
        }
        else {
            Candidate cand = updateExisting(sourceId, cctc, ectc, np, email, msisdn);
            sendRefreshNotificationToHR(cand);
            sendDuplicateNotificationToSource(cand, sourceId);
        }
        return true;
    }

    private Candidate updateExisting(String sourceId, int cctc, int ectc, int np, String email, String msisdn) {
        Candidate cand = candiMongoTemplate.findOne(Query.query(Criteria.where("email").is(email).orOperator(Criteria.where("phone").is(msisdn))), Candidate.class);
        cand.setCurrentState(CvState.REFRESHED);
        long time = System.currentTimeMillis();
        cand.setLastupdateTimestamp(time);
        cand.setEctc(ectc);
        cand.setCctc(cctc);
        cand.setNp(np);
        List<CvStateDescription> list = cand.getHistory();
        CvStateDescription desc = new CvStateDescription();
        desc.setState(CvState.REFRESHED);
        desc.setTimestamp(time);
        desc.setRemarks("CV refereshed, thanks to " + sourceId);
        list.add(desc);
        candiMongoTemplate.save(cand);
        return cand;
    }

    private Candidate createNewCandidate(String path, String sourceId, long postTimestamp, Element rootElement, String email, String msisdn, String name, int cctc, int ectc, int np) {
        String summary = generateSummary(rootElement);
        Candidate cand = new Candidate();
        cand.setCurrentState(CvState.UPLOAD);
        cand.setEmail(email);
        cand.setPhone(msisdn);
        cand.setName(name);
        String location = XMLUtils.getValue(rootElement, "City");
        cand.setLocation(location);
        cand.setSummary(summary);
        cand.setSourceUserId(sourceId);
        cand.setCvPath(path);
        List<CvStateDescription> list = new ArrayList<>();
        CvStateDescription desc = new CvStateDescription();
        desc.setRemarks("New cv upload at " + new Date(postTimestamp));
        desc.setState(CvState.UPLOAD);
        list.add(desc);
        cand.setHistory(list);
        long time = System.currentTimeMillis();
        desc.setTimestamp(time);
        cand.setLastupdateTimestamp(time);
        cand.setEctc(ectc);
        cand.setCctc(cctc);
        cand.setNp(np);
        return cand;
    }

    private void sendDuplicateNotificationToSource(Candidate cand, String sourceId) {
        // TODO Auto-generated method stub

    }

    private void sendRefreshNotificationToHR(Candidate cand) {
        // TODO Auto-generated method stub

    }

    private void sendNotificationToSource(Candidate cand) {
        // TODO Auto-generated method stub

    }

    private void sendNotificationEmailToHr(Candidate cand) {
        // TODO
    }

    private String generateSummary(Element rootElement) {
        List<String> schools = XMLUtils.getValues(rootElement, "SchoolName");
        List<String> companies = XMLUtils.getValues(rootElement, "EmployerOrgName");
        List<String> skills = XMLUtils.getAttributeValues(rootElement, "Competency", "Name");
        StringBuilder summary = new StringBuilder("<table style='width:100%'><tr><td>Skills</td><td>");
        for(String skill : skills) {
            summary.append(skill + ", ");
        }
        summary.append("</td></tr><tr><td>Schools</td><td>");
        for(String skill : schools) {
            summary.append(skill + "<br>");
        }
        summary.append("</td></tr><tr><td>Companies</td><td>");
        for(String skill : companies) {
            summary.append(skill + "<br>");
        }
        summary.append("</td></tr><tr><td>Total Exp</td><td>" + XMLUtils.getValue(rootElement, "TotalExperience") + "</td></tr></table>");
        return summary.toString();
    }

    private boolean checkForDuplicateEmailPhone(String email, String msisdn) {
        Candidate candi = new Candidate();
        candi.setEmail(email);
        candi.setPhone(msisdn);
        Candidate cand = candiMongoTemplate.findOne(Query.query(Criteria.where("email").is(email).orOperator(Criteria.where("phone").is(msisdn))), Candidate.class);
        if(null == cand) {
            return false;
        }
        return true;
    }
}
