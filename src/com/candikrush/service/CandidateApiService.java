package com.candikrush.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.candikrush.dto.CKUser;
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

    @Autowired
    private LoginService        loginService;

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

    public void changeState(String candidateId, String assigneeId, String nextState, String remarks, String result, String schTime) {
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
            if(proceedToNextRound){
                //TODO: make an entry in schedule collection
                long schTimeInMillis = 0;
                if(StringUtils.hasText(schTime)){
                    try {
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
                        Date schDateTime = sdf.parse(schTime);
                        schTimeInMillis = schDateTime.getTime();
                    }
                    catch (Exception e) {
                        
                    }
                }
                //TODO: what about duration of interview
                sendMailService.sendNotificationEmail(HR_MAIL_ID, assigneeId, candidateId, schTimeInMillis, 3600000);
            }
        }
        catch (Exception e) {
            logger.error("Error while changing state for " + candidateId + " Error " + e.getMessage(), e);
        }
    }

    public void updateCandidateStateInDb(Candidate candidate, String assignee, CvState nextState, String remarks) {
        // To update in candidate collection and in interview collection
        // TODO: uncomment following before committing...test it once with reporting collection
        
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CKUser user = loginService.getUserFromUserName(username);

        reportingService.updateTotal(user.getEmail());
        if(CvState.TECH_SCREEN_SCH.equals(nextState)) {
            reportingService.updateSuccess(candidate.getSourceUserId());
        }
        if(!(CvState.HR_REJECT.equals(nextState) || CvState.TECH_SCREEN_REJECT.equals(nextState) || CvState.INT_REJECT.equals(nextState))) {
            reportingService.updateSuccess(user.getEmail());
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
