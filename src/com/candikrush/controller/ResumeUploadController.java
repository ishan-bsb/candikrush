package com.candikrush.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.candikrush.dto.CKUser;
import com.candikrush.dto.UploadedResumeDetails;
import com.candikrush.service.ResumeUploadService;

@Controller
@RequestMapping("/uploadFile")
public class ResumeUploadController {

    @Autowired 
    private ResumeUploadService resumeUploadService;
    
    @Autowired
    private MongoTemplate mongoCMSDB;
    
    private static final Logger logger = LoggerFactory.getLogger(ResumeUploadController.class);
    
    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView uploadFileHandler(@ModelAttribute("file") MultipartFile file, @RequestParam("ectc") String ectc, 
                                                @RequestParam("cctc") String cctc,
                                                @RequestParam("noticePeriod") String noticePeriod) {
    	ModelAndView mv = new ModelAndView();
        if (!file.isEmpty()) {
            try { 
                byte[] bytes = file.getBytes();
                //ectc, cctc, email, notice period
                // Creating the directory to store file
                String rootPath = "/Users/jasdeep/Desktop/tomcat/webapps/resumes/";
                File dir = new File(rootPath);
                if (!dir.exists()){
                    dir.mkdirs();
                }
                // Create the file on server
                String fileName = file.getOriginalFilename();
                fileName = fileName.substring(fileName.lastIndexOf("/")+1);
                File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                UploadedResumeDetails urd = new UploadedResumeDetails();
                urd.setCctc(Integer.parseInt(cctc));
                urd.setEctc(Integer.parseInt(ectc));
                String username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                CKUser user = mongoCMSDB.findOne(Query.query(Criteria.where("username").is(username)), CKUser.class);
                urd.setEmail(user.getEmail());
                int np = 0;
                try {
                    np = Integer.parseInt(noticePeriod);
                }
                catch (Exception e) {
                    
                }
                urd.setNoticePeriod(np);
                urd.setFilePath(serverFile.getAbsolutePath());
                urd.setCreationDate(System.currentTimeMillis());
                resumeUploadService.updateResumeData(urd);
                
                logger.info("Server File Location=" + serverFile.getAbsolutePath());
                 mv.addObject("info", "Thank you! Successfully uploaded file=" + serverFile.getName());
            } catch (Exception e) {
            	mv.addObject("info", "File uploading failed. Exception is: " + e.getMessage());
            }
        } else {
        	mv.addObject("info","Uploaded file is empty. Please provide a valid file.");
        }
        mv.setViewName("common/thanks");
        return mv;
    }
    
    /**
     * Upload multiple file using Spring Controller
     */
    /*@RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody
    String uploadMultipleFileHandler(@RequestParam("ectc") String[] names,
            @RequestParam("file") MultipartFile[] files) {
 
        if (files.length != names.length)
            return "Mandatory information missing";
 
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            String name = names[i];
            try {
                byte[] bytes = file.getBytes();
 
                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())
                    dir.mkdirs();
 
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
 
                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());
 
                message = message + "You successfully uploaded file=" + name
                        + "<br />";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        }
        return message;
    }*/
}
