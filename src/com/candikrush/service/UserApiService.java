package com.candikrush.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;

import org.apache.commons.lang.StringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.candikrush.dto.CKUser;
import com.candikrush.dto.CKUserPermissions;
import com.candikrush.property.PropertyReader;
import com.candikrush.utils.HttpClient;


@Service
public class UserApiService {

    @Autowired
    RoleApiService       roleApiService;
    @Autowired PropertyReader propertyReader;

    @Autowired
    LoginService loginService;
    
    private final String baseUrl = "http://transcoder-music-dev-1492533402.ap-southeast-1.elb.amazonaws.com/v1/user/";
//    private final String baseUrl = "http://54.227.42.232:8080/v1/user/";
//    private final String baseUrl = propertyReader.loadProperty("userProfile");
    
    @RolesAllowed({ "CREATE_ACCOUNT" })
    public CKUser createUser(String username, String password, List<String> roles) {
        if(StringUtils.isEmpty(username) || StringUtils.isEmpty(password) || roles.isEmpty()) {
            return null;
        }
        CKUser user = new CKUser();
        user.setUsername(username);
        user.setPassword(password);
        user.setRoles(roles);
        user.setLastUpdated(System.currentTimeMillis());
        RestTemplate restApi = new RestTemplate();
        user = restApi.postForObject(baseUrl + "create", user, CKUser.class);
        return user;
    }

    @RolesAllowed({ "DELETE_ACCOUNT" })
    public boolean deleteUser(String username) {
        if(StringUtils.isEmpty(username) || username.equals(roleApiService.getUserIdFromContext())) {
            return false;
        }
        CKUser user = new CKUser();
        user.setUsername(username);
        RestTemplate restApi = new RestTemplate();
        return restApi.postForObject(baseUrl + "delete", user, Boolean.class);
    }

    // TODO remove after unit testing
    public CKUser getUserInfo(String username) {
        CKUser user = new CKUser();
        user.setUsername(username);
        RestTemplate restApi = new RestTemplate();
        return restApi.postForObject(baseUrl + "info", user, CKUser.class);
    }
    
    /*
     * Get Generic User Info
     */
    public Object getUserInfoGeneric(String username, String fieldRequired) {
    	String content = HttpClient.getContent(baseUrl + "info?username="+username);
    	JSONObject jsonObj = (JSONObject) JSONValue.parse(content);
    	if(jsonObj!=null){
    		Object arrObj = jsonObj.get(fieldRequired);
			return arrObj;
    	}
    	return null;
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
