package com.candikrush.service;

import java.util.*;

import javax.annotation.security.RolesAllowed;

import com.candikrush.common.UserType;
import com.mongodb.DBObject;
import org.apache.commons.lang.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.candikrush.dto.CKUser;
import com.candikrush.dto.CKUserPermissions;
import com.candikrush.dto.Candidate;
import com.candikrush.property.PropertyReader;
import com.candikrush.utils.HttpClient;


@Service
public class UserApiService {

    @Autowired
    RoleApiService       roleApiService;
    @Autowired PropertyReader propertyReader;

    @Autowired
    LoginService loginService;

    @Autowired
    private MongoTemplate mongoCMSDB;
    
//    @RolesAllowed({ "CREATE_ACCOUNT" })
    public CKUser createUser(String username, String password, List<String> roles, UserType type) {
        if(StringUtils.isEmpty(username) || StringUtils.isEmpty(password) || roles.isEmpty()) {
            return null;
        }
        CKUser user = new CKUser();
        user.setUsername(username);
        user.setPassword(password);
        user.setRoles(roles);
        user.setUserType(type);
        user.setLastUpdated(System.currentTimeMillis());
        MongoOperations oper = mongoCMSDB;
        user.setLastUpdated(System.currentTimeMillis());
        oper.save(user);
        return user;
    }

    @RolesAllowed({ "DELETE_ACCOUNT" })
    public boolean deleteUser(String username) {
        if(StringUtils.isEmpty(username) || username.equals(roleApiService.getUserIdFromContext())) {
            return false;
        }

        CKUser user = new CKUser();
        user.setUsername(username);
        MongoOperations oper = mongoCMSDB;
        oper.remove(Query.query(Criteria.where(username).is(username)), CKUser.class);
        return true;
    }

    public CKUser getUser(String username){
        CKUser user = mongoCMSDB.findOne(Query.query(Criteria.where(username).is(username)), CKUser.class);
        return user;
    }


    // TODO remove after unit testing
    public CKUser getUserInfo(String username) {
        return getUser(username);
    }
    

    
    /**
     * This function has been left unsecured since it is used to get permissions while
     * authenticating user. Hence userId is passed here instead of getting it from security context.
     * 
     * @param userId
     *            for which permissions have to be fetched.
     * @return Granted Authorities for user.
     */
    public List<GrantedAuthority> getGrantedAuthoritiesForUser(String userId) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        Set<CKUserPermissions> permissions = null;
        permissions = roleApiService.getPermissionsForUser(userId);
        for(CKUserPermissions permission : permissions) {
            authorities.add(new SimpleGrantedAuthority(permission.name()));
        }
        return authorities;
    }

    public boolean authenticateUser(String username, String password) {
        CKUser user = new CKUser();
        user.setUsername(username);
        user.setPassword(password);
        RestTemplate restApi = new RestTemplate();
        return loginService.authenticateUser(username,password);
    }
}
