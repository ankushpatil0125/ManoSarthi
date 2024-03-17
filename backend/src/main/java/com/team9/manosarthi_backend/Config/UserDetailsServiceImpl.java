package com.team9.manosarthi_backend.Config;

import com.team9.manosarthi_backend.Entities.User;
import com.team9.manosarthi_backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= userRepository.findByUsername(username);

        if(user==null)
        {
            System.out.println("hello");
            throw new UsernameNotFoundException("Cannot find user");
        }
        System.out.println(user.getUsername());
        CustomUserDetails customUserDetails=new CustomUserDetails(user);
        System.out.println(customUserDetails.getUsername());
        return customUserDetails;
    }


}
