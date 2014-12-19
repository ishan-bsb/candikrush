package com.candikrush.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.xml.bind.DatatypeConverter;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.candikrush.dto.CKLogin;
import com.candikrush.dto.CKUser;

@Component
public class LoginService {

    @Autowired
    private MongoTemplate mongoCMSDB;

    private final String   CKUsername               = "username";

    private final String   cmsPassword               = "password";

    private final String   userIdKey                 = "userId";

    private final String   logoutAt                  = "logoutAt";

    private final String   salt                      = "eghjksdfh!jap#%qu323";

    private final String   isActive                  = "isActive";

    public boolean logOut(String cookie) {
        String[] userInfo = getUserInfoFormCookie(cookie);
        return logOutUser(userInfo[1]);
    }

    public boolean logOutUser(String username) {
        if(StringUtils.isEmpty(username)) {
            return false;
        }
        MongoOperations oper = mongoCMSDB;//new MongoTemplate(mongo);
        oper.updateMulti(Query.query(Criteria.where(userIdKey).is(username).and(isActive).is(true)), Update.update(isActive, false).set(logoutAt, System.currentTimeMillis()), CKLogin.class);
        return true;
    }

    public String loginUser(String username, String password) {
        MongoOperations oper = mongoCMSDB;//new MongoTemplate(mongo);
        CKUser user = oper.findOne(Query.query(Criteria.where(CKUsername).is(username).and(cmsPassword).is(password)), CKUser.class);
        return generateCookie(user);
    }

    public boolean isUserLoggedIn(String cookie) {
        if(StringUtils.isEmpty(cookie)) {
            return false;
        }
        byte[] decodedCookie = Base64.decodeBase64(cookie);
        String userInfo = new String(decodedCookie);
        String[] userDetails = userInfo.split(",");
        if(userDetails.length != 3) {
            return false;
        }
        if(cookie.equals(generateCookie(userDetails[0], userDetails[1]))) {
            return validateLoginTable(userDetails[0], userDetails[1]);
        }
        return false;
    }
    
    public CKUser getUserFromUserName(String username){
    	 MongoOperations oper = mongoCMSDB;//new MongoTemplate(mongo);
         CKUser user = oper.findOne(Query.query(Criteria.where(CKUsername).is(username)), CKUser.class);
         if(null == user) {
             return null;
         } else {
             return user;
         }
    }
    
    public boolean authenticateUser(String username, String password) {
        MongoOperations oper = mongoCMSDB;//new MongoTemplate(mongo);
        CKUser user = oper.findOne(Query.query(Criteria.where(CKUsername).is(username).and(cmsPassword).is(password)), CKUser.class);
        if(null == user) {
            return false;
        } else {
            return true;
        }
    }
    
    private String generateCookie(CKUser user) {
        String loginId = updateLogins(user);
        String userId = user.getId();
        return generateCookie(loginId, userId);
    }

    private boolean validateLoginTable(String loginId, String userId) {
        MongoOperations oper = mongoCMSDB;//new MongoTemplate(mongo);
        CKLogin login = oper.findOne(Query.query(Criteria.where("id").is(loginId).and("userId").is(userId).and("isActive").is(true)), CKLogin.class);
        if(null != login) {
            return true;
        }
        return false;
    }

    private String updateLogins(CKUser obj) {
        CKLogin login = new CKLogin();
        login.setActive(true);
        login.setLoginAt(System.currentTimeMillis());
        login.setUserId(obj.getId());
        MongoOperations oper = mongoCMSDB;//new MongoTemplate(mongo);
        oper.save(login);
        return login.getId();
    }        

    private String generateCookie(String loginId, String userId) {
        String enc = getMD5Hash(userId + loginId + salt);
        String cookie = Base64.encodeBase64String((loginId + "," + userId + "," + enc).getBytes());
        return cookie;
    }

    private String getMD5Hash(String input) {
        String hex = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest((input).getBytes());
            hex = DatatypeConverter.printHexBinary(bytes);
        }
        catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return hex;
    }

    private String[] getUserInfoFormCookie(String cookie) {
        if(StringUtils.isEmpty(cookie)) {
            return null;
        }
        byte[] decodedCookie = Base64.decodeBase64(cookie);
        String userInfo = new String(decodedCookie);
        String[] userDetails = userInfo.split(",");
        if(userDetails.length != 3) {
            return null;
        }
        return userDetails;
    }
    
    public static void main(String[] args) {
        LoginService ls = new LoginService();
        System.out.println(ls.getMD5Hash("123456"));
    }

}
