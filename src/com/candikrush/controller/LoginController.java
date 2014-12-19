package com.candikrush.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.candikrush.common.UserType;
import com.candikrush.dto.CKUser;
import com.candikrush.dto.Candidate;
import com.candikrush.dto.CvState;
import com.candikrush.service.CandidateApiService;
import com.candikrush.service.LoginService;
import com.candikrush.service.UserApiService;

@Controller
public class LoginController {

	@Autowired 
	private UserApiService userAccountService;
	
	@Autowired 
	private LoginService loginService;
	
	@Autowired 
    private CandidateApiService candidateApiService;
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@RequestMapping(value = { "login", "index" })
	public ModelAndView getloginPage(HttpServletRequest request, Model model) {
		return new ModelAndView("login/login");
	}
	
	@RequestMapping(value = { "", "home"})
	public ModelAndView gethomePage(HttpServletRequest request, Model model) {

		 String username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	     CKUser user = loginService.getUserFromUserName(username);
		 if(user.getUserType() == UserType.CONSULTANT){
		     logger.debug("logged in by a consultant: "+user.getUsername());
			 return new ModelAndView("consultant/uploadResume");
		 }
		 else if(user.getUserType() == UserType.HR){
		     logger.debug("logged in by an HR: "+user.getUsername());
		     ModelAndView mv = getFreshCandidate();
		     mv.setViewName("hr/homeDashboard");
		     return mv;
		 }
		 return new ModelAndView("login/home");
	}

    /**
     * @return
     */
    private ModelAndView getFreshCandidate() {
        ModelAndView mv = new ModelAndView();
         List<CvState> states = new ArrayList<>();
         states.add(CvState.REFRESHED);
         states.add(CvState.UPLOAD);
         Candidate latestCandidate = candidateApiService.getLatestCandidateData(states);
         if(latestCandidate != null){
             mv.addObject("candidateId", latestCandidate.getId());
             mv.addObject("candidateName", latestCandidate.getName());
             mv.addObject("location", latestCandidate.getLocation());
             mv.addObject("summary", latestCandidate.getSummary());
             mv.addObject("resumeLink", latestCandidate.getCvPath());
         }
         //mv.addObject("summary", "This is summary");
         //mv.addObject("resumeLink", "This is link");
         return mv;
    }
	
    @RequestMapping(value="/assignCandidate", method = RequestMethod.POST)
	public ModelAndView assignCandidate(@RequestParam("interviewerId") String interviewerId, 
            @RequestParam("candidateId1") String candidateId) {
	    candidateApiService.assignForInterview(candidateId, interviewerId);
	    ModelAndView mv = getFreshCandidate();
        mv.setViewName("hr/homeDashboard");
        return mv;
	}
	@RequestMapping(value="/rejectCandidate", method = RequestMethod.POST)
	public ModelAndView rejectCandidate(@RequestParam("candidateId2") String candidateId) {
        candidateApiService.rejectInterview(candidateId);
        ModelAndView mv = getFreshCandidate();
        mv.setViewName("hr/homeDashboard");
        return mv;
    }
	
	@RequestMapping(value="/changeState", method = RequestMethod.POST)
    public ModelAndView changeState(@RequestParam("candidateId") String candidateId, 
                @RequestParam("assigneeId") String assigneeId, @RequestParam(required=false, value="nextState") String nextState, 
                @RequestParam("remarks") String remarks, @RequestParam("result") String result) {
        candidateApiService.changeState(candidateId, assigneeId, nextState, remarks, result);
        
        ModelAndView mv = getFreshCandidate();
        mv.setViewName("hr/homeDashboard");
        return mv;
    } 
}
