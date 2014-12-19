package com.candikrush.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.candikrush.dto.CKUser;
import com.candikrush.dto.CKUserPermissions;
import com.candikrush.dto.Role;

@Service
public class RoleApiService {

    private final String baseRestUrl = "http://transcoder-music-dev-1492533402.ap-southeast-1.elb.amazonaws.com/v1/roles/";
//    private final String baseRestUrl = "http://54.227.42.232:8080/v1/roles/";


    @RolesAllowed({ "CREATE_ROLE" })
    public Role createRole(String roleName, List<CKUserPermissions> permissions, String storeName) {
        if(null == permissions || permissions.isEmpty() || StringUtils.isEmpty(storeName)) {
            return null;
        }
        String userId = getUserIdFromContext();
        Role role = new Role();
        role.setName(roleName);
        role.setPermissions(permissions);
        role.setCreateUserId(userId);
        role.setModifiedUserId(userId);
        long createTimestamp = System.currentTimeMillis();
        role.setCreationDate(createTimestamp);
        role.setLastUpdated(createTimestamp);
        role.setStoreType(storeName);
        RestTemplate restApi = new RestTemplate();
        role = restApi.postForObject(baseRestUrl + "create", role, Role.class);
        return role;
    }

    @RolesAllowed({ "EDIT_ROLE" })
    public boolean editRole(String roleName, List<CKUserPermissions> permissions) {
        String userId = getUserIdFromContext();
        Role role = new Role();
        role.setName(roleName);
        role.setPermissions(permissions);
        role.setModifiedUserId(userId);
        role.setLastUpdated(System.currentTimeMillis());
        RestTemplate restApi = new RestTemplate();
        Boolean result = restApi.postForObject(baseRestUrl + "edit", role, Boolean.class);
        return result;
    }

    @RolesAllowed({ "DELETE_ROLE" })
    public boolean deleteRole(String roleName) {
        String userId = getUserIdFromContext();
        Role role = new Role();
        role.setName(roleName);
        role.setModifiedUserId(userId);
        role.setLastUpdated(System.currentTimeMillis());
        RestTemplate restApi = new RestTemplate();
        Boolean result = restApi.postForObject(baseRestUrl + "delete", role, Boolean.class);
        return result;
    }

    @RolesAllowed({ "EDIT_ACCOUNT_PERMISSIONS" })
    public boolean updateRolesForUser(List<String> newRoles, String userId) {
        CKUser user = new CKUser();
        user.setUsername(userId);
        user.setRoles(newRoles);
        RestTemplate restApi = new RestTemplate();
        return restApi.postForObject(baseRestUrl + "updateUserRoles", user, Boolean.class);
    }

    public List<Role> getRolesForUser(String username) {
        RestTemplate restApi = new RestTemplate();
        Role[] roles = restApi.getForObject(baseRestUrl + "userRoles?username="+username, Role[].class);
        return Arrays.asList(roles);
    }

    public Set<CKUserPermissions> getPermissionsForUser(List<Role> roles) {
        Set<CKUserPermissions> permissions = EnumSet.noneOf(CKUserPermissions.class);
        for(Role role : roles) {
            permissions.addAll(role.getPermissions());
        }
        return permissions;
    }

    public Set<CKUserPermissions> getPermissionsForUser(String userId) {
        List<Role> roleList = getRolesForUser(userId);
        Set<CKUserPermissions> permissionSet = getPermissionsForUser(roleList);
        return permissionSet;
    }

    public Set<CKUserPermissions> getPermissionsForUser() {
        return getPermissionsForUser(getUserIdFromContext());
    }

    public String getUserIdFromContext() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String userId = (String) authentication.getPrincipal();
        return userId;
    }

    public Role getRoleByName(String role) {
        List<Role> roles = getRolesByName(Arrays.asList(role));
        if(null == roles || roles.isEmpty()) {
            return null;
        }
        return roles.get(0);
    }

    public List<Role> getRoleAllRoles() {
        List<Role> roles = getRolesByName(new ArrayList<String>());
        return roles;
    }

    private List<Role> getRolesByName(List<String> roleNames) {
        RestTemplate restApi = new RestTemplate();
        StringBuilder sb = new StringBuilder("?roleNames=");
        for(String name : roleNames) {
            sb.append(name + ",");
        }
        Role[] roles = restApi.getForObject(baseRestUrl + "roleByName" + sb.substring(0, sb.length() - 1), Role[].class);
        return Arrays.asList(roles);
    }

}
