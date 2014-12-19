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

import com.candikrush.dto.Schedule;
import com.candikrush.dto.Outcome;
import com.candikrush.dto.ScheduleType;

@Service
public class InterviewService {

    @Autowired
    private MongoTemplate mongoCMSDB;

    private Logger        logger = LoggerFactory.getLogger(InterviewService.class.getCanonicalName());

    public List<Schedule> getInterviewsForCandidateForDay(String candId) {
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
        return mongoCMSDB.find(
                Query.query(Criteria.where("startTimestamp").gte(start).and("candId").is(candId).and("scheduleType").is(ScheduleType.INTERVIEW).andOperator(Criteria.where("startTimestamp").lt(end))),
                Schedule.class);
    }

    public void scheduleEvent(String candId, String reviewerId, long start, long end, String schedulerId, ScheduleType scheduleType) {
        if(StringUtils.isEmpty(candId) || StringUtils.isEmpty(reviewerId) || (end <= start)) {
            logger.error("Incorrect params for scheduleInterview");
            return;
        }
        Schedule interview = new Schedule();
        interview.setCandId(candId);
        interview.setReviewerId(reviewerId);
        interview.setStartTimestamp(start);
        interview.setEndTimestamp(end);
        interview.setSchedulederId(schedulerId);
        interview.setScheduleType(scheduleType);
        interview.setScheduleTimestamp(System.currentTimeMillis());
        mongoCMSDB.save(interview);
    }

    public boolean updateOutcome(String remarks, Outcome outcome, String interviewId) {
        if(StringUtils.isEmpty(remarks) || null == outcome || StringUtils.isEmpty(interviewId)) {
            logger.error("Mandatory params missing");
            return false;
        }
        Schedule interview = mongoCMSDB.findById(interviewId, Schedule.class);
        interview.setRemarks(remarks);
        interview.setOutcome(outcome);
        mongoCMSDB.save(interview);
        return true;
    }

    public List<Schedule> getAllInterviewsForCandidate(String candId) {
        return mongoCMSDB.find(Query.query(Criteria.where("candId").is(candId).and("scheduleType").is(ScheduleType.INTERVIEW)), Schedule.class);
    }

}
