package com.candikrush.acl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.candikrush.service.UserApiService;


@Component("userAuthenticationProvider")
public class UserAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    UserApiService userApiService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        if(userApiService.authenticateUser(token.getName(), token.getCredentials().toString())) {
            Collection<GrantedAuthority> authorities = userApiService.getGrantedAuthoritiesForUser(token.getName());
            return new UsernamePasswordAuthenticationToken(token.getName(), token.getCredentials(), authorities);
        }
        else {
            throw new UsernameNotFoundException("Invalid username/password");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }

}
