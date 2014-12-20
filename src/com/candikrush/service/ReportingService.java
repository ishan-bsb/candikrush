package com.candikrush.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.candikrush.common.UserType;
import com.candikrush.dto.CKUser;
import com.candikrush.dto.Reporting;

@Service
public class ReportingService {

    @Autowired
    private MongoTemplate mongoCMSDB;

    public List<Reporting> getReports(UserType type, int monthsOld) {
        Calendar cal = getMonthStart();
        cal.add(Calendar.MONTH, -monthsOld);
        return mongoCMSDB.find(Query.query(Criteria.where("cycleTimestamp").is(cal.getTimeInMillis()).and("userType").is(type)), Reporting.class);
    }

    public void updateTotal(String sourceId) {
        CKUser user = mongoCMSDB.findOne(Query.query(Criteria.where("email").is(sourceId)), CKUser.class);
        Calendar cal = getMonthStart();
        Reporting rep = mongoCMSDB.findOne(Query.query(Criteria.where("userId").is(sourceId)), Reporting.class);
        if(null == rep) {
            rep = new Reporting();
            rep.setCycleTimestamp(cal.getTimeInMillis());
            rep.setSuccess(0);
            rep.setTotal(1);
            rep.setUserId(sourceId);
            rep.setUserType(user.getUserType());
        }
        rep.setTotal(rep.getTotal() + 1);
        mongoCMSDB.save(rep);
    }

    public void updateSuccess(String sourceId) {
        CKUser user = mongoCMSDB.findOne(Query.query(Criteria.where("email").is(sourceId)), CKUser.class);
        Calendar cal = getMonthStart();
        Reporting rep = mongoCMSDB.findOne(Query.query(Criteria.where("userId").is(sourceId)), Reporting.class);
        if(null == rep) {
            rep = new Reporting();
            rep.setCycleTimestamp(cal.getTimeInMillis());
            rep.setSuccess(1);
            rep.setTotal(1);
            rep.setUserId(sourceId);
            rep.setUserType(user.getUserType());
        }
        rep.setSuccess(rep.getSuccess() + 1);
        mongoCMSDB.save(rep);
    }

    private Calendar getMonthStart() {
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        return cal;
    }

}
