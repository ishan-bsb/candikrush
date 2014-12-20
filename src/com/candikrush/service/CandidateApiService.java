package com.candikrush.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.candikrush.dto.Candidate;
import com.candikrush.dto.CvState;
import com.candikrush.dto.CvStateDescription;

@Service
public class CandidateApiService {

    @Autowired
    private MongoTemplate       mongoCMSDB;
    
    @Autowired
    private SendMailService     sendMailService;

    @Autowired
    private ReportingService    reportingService;

    private static final String SELECTED_RADIO = "pass";
    private static final String HR_MAIL_ID     = "hr@bsb.in";

    private static final Logger logger         = LoggerFactory.getLogger(CandidateApiService.class);

    public Candidate getCandidateFromId(String id) {
        Candidate candidate = mongoCMSDB.findOne(Query.query(Criteria.where("id").is(id)), Candidate.class);
        return candidate;
    }

    public Candidate getLatestCandidateData(List<CvState> states) {
        Query query = new Query();
        query.addCriteria(Criteria.where("currentState").in(states));
        query.with(new Sort(Sort.Direction.DESC, "lastupdateTimestamp"));
        Candidate candidate = mongoCMSDB.findOne(query, Candidate.class);
        return candidate;
    }

    public void assignForInterview(String candidateId, String interviewerId) {
        Candidate candidate = getCandidateFromId(candidateId);
        if(candidate != null) {
            candidate.setCurrentState(CvState.TECH_SCREEN_SCH);
            mongoCMSDB.save(candidate);
        }
    }

    public void rejectInterview(String candidateId) {
        Candidate candidate = getCandidateFromId(candidateId);
        if(candidate != null) {
            candidate.setCurrentState(CvState.HR_REJECT);
            mongoCMSDB.save(candidate);
        }
    }

    public void changeState(String candidateId, String assigneeId, String nextState, String remarks, String result) {
        try {
            Candidate candidate = getCandidateFromId(candidateId);
            if(candidate == null) {
                return;
            }
            boolean proceedToNextRound = false;
            if(SELECTED_RADIO.equalsIgnoreCase(result)) {
                proceedToNextRound = true;
            }
            CvState finalNextState = CvState.getNextState(candidate.getCurrentState(), proceedToNextRound, CvState.getCVStateFromString(nextState));
            updateCandidateStateInDb(candidate, assigneeId, finalNextState, remarks);
            sendMailService.sendNotificationEmail(HR_MAIL_ID, assigneeId, candidateId, System.currentTimeMillis(), 3600000);
        }
        catch (Exception e) {
            logger.error("Error while changing state for " + candidateId + " Error " + e.getMessage(), e);
        }
    }

    public void updateCandidateStateInDb(Candidate candidate, String assignee, CvState nextState, String remarks){
        //To update in candidate collection and in interview collection
        reportingService.updateTotal(assignee);
        if(!(CvState.HR_REJECT.equals(nextState) || CvState.TECH_SCREEN_REJECT.equals(nextState) || CvState.INT_REJECT.equals(nextState))) {
            reportingService.updateSuccess(assignee);
        }
        candidate.setCurrentState(nextState);
        CvStateDescription historyElem = new CvStateDescription();
        historyElem.setState(nextState);
        if(!StringUtils.hasText(remarks)) {
            remarks = "State changed"; 
        }
        historyElem.setRemarks(remarks);
        historyElem.setTimestamp(System.currentTimeMillis());
        candidate.addHistoryElem(historyElem);
        mongoCMSDB.save(candidate);
    }

}
