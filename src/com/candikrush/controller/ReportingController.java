package com.candikrush.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.candikrush.common.UserType;
import com.candikrush.dto.Reporting;
import com.candikrush.service.ReportingService;

@Controller("/reports")
public class ReportingController {

    @Autowired
    private ReportingService reportingService;

    @RequestMapping(value = "/getReports", method = RequestMethod.GET)
    public ModelAndView getReports(@RequestParam("userType") String userType, @RequestParam("monthsOld") Integer monthsOld) {
        List<Reporting> rep = reportingService.getReports(UserType.valueOf(userType), monthsOld);
        ModelAndView mv = new ModelAndView();
        if(rep != null) {
            long time = rep.get(0).getCycleTimestamp();
            mv.addObject("date", new Date(time));
            mv.addObject("rep", rep);
        }
        mv.setViewName("hr/homeDashboard");
        return mv;
    }

}
