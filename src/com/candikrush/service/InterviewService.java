package com.candikrush.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.candikrush.dto.Interview;
import com.candikrush.dto.Outcome;

@Service
public class InterviewService {

    @Autowired
    private MongoTemplate mongoCMSDB;

    private Logger        logger = LoggerFactory.getLogger(InterviewService.class.getCanonicalName());

    public List<Interview> getInterviewsForCandidateForDay(String candId) {
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        long start = cal.getTimeInMillis();
        cal.add(Calendar.DATE, 1);
        long end = cal.getTimeInMillis();
        return mongoCMSDB.find(Query.query(Criteria.where("startTimestamp").gte(start).and("candId").is(candId).andOperator(Criteria.where("startTimestamp").lt(end))), Interview.class);
    }

    public void scheduleInterview(String candId, String reviewerId, long start, long end) {
        if(StringUtils.isEmpty(candId) || StringUtils.isEmpty(reviewerId) || (end <= start)) {
            logger.error("Incorrect params for scheduleInterview");
            return;
        }
        Interview interview = new Interview();
        interview.setCandId(candId);
        interview.setReviewerId(reviewerId);
        interview.setStartTimestamp(start);
        interview.setEndTimestamp(end);
        mongoCMSDB.save(interview);
    }
    
    public boolean updateOutcome(String remarks, Outcome outcome, String interviewId) {
        if(StringUtils.isEmpty(remarks) || null == outcome || StringUtils.isEmpty(interviewId)) {
            logger.error("Mandatory params missing");
            return false;
        }
        Interview interview = mongoCMSDB.findById(interviewId, Interview.class);
        interview.setRemarks(remarks);
        interview.setOutcome(outcome);
        mongoCMSDB.save(interview);
        return true;
    }
    
    public List<Interview> getAllInterviewsForCandidate(String candId) {
        return mongoCMSDB.find(Query.query(Criteria.where("candId").is(candId)), Interview.class);
    }

}
