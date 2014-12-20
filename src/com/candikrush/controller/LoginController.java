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
import org.springframework.util.StringUtils;
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
		 if(!StringUtils.hasText(username)){
			 return getloginPage(request, model);
		 }
	     CKUser user = loginService.getUserFromUserName(username);
		 if(user.getUserType() == UserType.CONSULTANT){
		     logger.debug("logged in by a consultant: "+user.getUsername());
			 return new ModelAndView("consultant/uploadResume");
		 }
		 else if(user.getUserType() == UserType.HR){
		     logger.debug("logged in by an HR: "+user.getUsername());
		     ModelAndView mv = getFreshCandidate();
		     mv.setViewName("hr/homeDashboard");
		     //mv.setViewName("hr/schedule");
		     return mv;
		 }
		 return new ModelAndView("login/home");
	}

	@RequestMapping("/getFreshCandidateDashboard")
	public ModelAndView getFreshCandidateDashboard() {
	    ModelAndView mv = getFreshCandidate();
	    mv.addObject("pageId", "freshcandidatedashboard");
	    mv.setViewName("hr/freshCandidateDashboard");
	    return mv;
	}
	
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
         return mv;
    }
	
    /*@RequestMapping(value="/assignCandidate", method = RequestMethod.POST)
	public ModelAndView assignCandidate(@RequestParam("interviewerId") String interviewerId, 
            @RequestParam("candidateId1") String candidateId) {
	    candidateApiService.assignForInterview(candidateId, interviewerId);
	    ModelAndView mv = getFreshCandidate();
        mv.setViewName("hr/freshCandidateDashboard");
        return mv;
	}
	@RequestMapping(value="/rejectCandidate", method = RequestMethod.POST)
	public ModelAndView rejectCandidate(@RequestParam("candidateId2") String candidateId) {
        candidateApiService.rejectInterview(candidateId);
        ModelAndView mv = getFreshCandidate();
        mv.setViewName("hr/freshCandidateDashboard");
        return mv;
    }*/
	
	@RequestMapping(value="/changeState", method = RequestMethod.POST)
    public ModelAndView changeState(@RequestParam("candidateId") String candidateId, 
                @RequestParam(required=false, value="assigneeId") String assigneeId, @RequestParam(required=false, value="nextState") String nextState, 
                @RequestParam(required=false, value="remarks") String remarks, @RequestParam("result") String result, 
                @RequestParam(required=false, value="pageId") String pageId, @RequestParam(required=false, value="schTime") String schTime) {
        
	    candidateApiService.changeState(candidateId, assigneeId, nextState, remarks, result, schTime);
        
        ModelAndView mv = new ModelAndView();
        if("freshcandidatedashboard".equalsIgnoreCase(pageId)){
            mv = getFreshCandidate();
            mv.addObject("pageId", "freshcandidatedashboard");
            mv.setViewName("hr/freshCandidateDashboard");
        }else if("screenedcandidatedashboard".equalsIgnoreCase(pageId)){
            mv = getScreenedCandidate();
            mv.addObject("pageId", "screenedcandidatedashboard");
            mv.setViewName("hr/screenedCandidateDashboard");
        }else{
            /*String username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(!StringUtils.hasText(username)){
                return new ModelAndView("common/thanks");
            }*/
            return new ModelAndView("common/thanks");
        }
        return mv;
    } 
	
	@RequestMapping("/getScreenedCandidateDashboard")
    public ModelAndView getScreenedCandidateDashboard() {
        ModelAndView mv = getScreenedCandidate();
        mv.addObject("pageId", "screenedcandidatedashboard");
        mv.setViewName("hr/screenedCandidateDashboard");
        return mv;
    }
	
	private ModelAndView getScreenedCandidate() {
        ModelAndView mv = new ModelAndView();
         List<CvState> states = new ArrayList<>();
         states.add(CvState.TECH_SCREEN_CLEAR);
         states.add(CvState.INT_SCH);
         Candidate latestCandidate = candidateApiService.getLatestCandidateData(states);
         if(latestCandidate != null){
             mv.addObject("candidateId", latestCandidate.getId());
             mv.addObject("candidateName", latestCandidate.getName());
             mv.addObject("location", latestCandidate.getLocation());
             mv.addObject("summary", latestCandidate.getSummary());
             mv.addObject("resumeLink", latestCandidate.getCvPath());
         }
         return mv;
    }
}
