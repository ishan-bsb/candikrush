package com.candikrush.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.candikrush.dto.Candidate;

@Service
public class CandidateApiService {
	
	@Autowired
    private MongoTemplate mongoCMSDB;
	
	 public Candidate getCandidateFromId(String id){
	    	Candidate candidate = mongoCMSDB.findOne(Query.query(Criteria.where("id").is(id)), Candidate.class);
	    	return candidate;
	    }

}
