package com.candikrush.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import com.candikrush.dto.UploadedResumeDetails;

@Component
public class ResumeUploadService {

    @Autowired
    private MongoTemplate mongoCMSDB;
    
    private static final Logger logger = LoggerFactory.getLogger(ResumeUploadService.class);
    
    public void updateResumeData(UploadedResumeDetails urd){
        mongoCMSDB.save(urd);
    }
    
}
