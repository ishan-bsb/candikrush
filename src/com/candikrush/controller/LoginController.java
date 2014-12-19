package com.candikrush.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.candikrush.common.UserType;
import com.candikrush.dto.CKUser;
import com.candikrush.service.LoginService;
import com.candikrush.service.UserApiService;

@Controller
public class LoginController {

	@Autowired 
	private UserApiService userAccountService;
	
	@Autowired 
	private LoginService loginService;
	
	@RequestMapping(value = { "login", "index" })
	public ModelAndView getloginPage(HttpServletRequest request, Model model) {

		return new ModelAndView("login/login");
	}
	
	@RequestMapping(value = { "", "home"})
	public ModelAndView gethomePage(HttpServletRequest request, Model model) {

		 String username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	     CKUser user = loginService.getUserFromUserName(username);
		 if(user.getUserType() == UserType.CONSULTANT){
			 return new ModelAndView("consultant/bulkUpload");
		 }
		 else if(user.getUserType() == UserType.HR){
			 return new ModelAndView("consultant/home");
		 }
		 return new ModelAndView("login/home");
	}
	
}
