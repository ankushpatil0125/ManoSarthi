package com.team9.manosarthi_backend.Config;
import com.team9.manosarthi_backend.security.JwtAuthenticationEntryPoint;
import com.team9.manosarthi_backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;
    @Bean
    public UserDetailsService getUserDetailService()
    {
        return new UserDetailsServiceImpl();
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }


 /*
 //Spring securitty

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasRole("USER")
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated())
                .httpBasic(withDefaults())
                .formLogin(withDefaults())
//                .formLogin(form -> form   //use this when login page come
//                        .loginPage("/login")
//                        .permitAll()
//                )
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();

    }
    */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                       .requestMatchers("/passwordstatus/**").permitAll()
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/subdistrict/**").permitAll()
                        .requestMatchers("/district/**").permitAll()
                        .requestMatchers("/user/**").permitAll()
//                        .requestMatchers("/admin/**").permitAll()
//                        .requestMatchers("/doctor/**").permitAll()

//                        .requestMatchers("/admin/**").hasRole("USER")
                        .requestMatchers("/admin/**").hasRole("ADMIN")
//                        .requestMatchers(("/admin/**")).permitAll()

                        .requestMatchers("/doctor/**").hasRole("DOCTOR")
                        .requestMatchers("/supervisor/**").hasRole("SUPERVISOR")
//                        .requestMatchers("/doctor/**").hasRole("DOCTOR")
//                        .requestMatchers("/user/**").hasRole("USER")

//                        .requestMatchers("/auth/login").permitAll()
//
                        .anyRequest().authenticated())
                .httpBasic(withDefaults())
                .formLogin(withDefaults())
//                .formLogin(form -> form   //use this when login page come
//                        .loginPage("/login")
//                        .permitAll()
//                )
                .exceptionHandling(ex->ex.authenticationEntryPoint(point))
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .csrf(csrf-> csrf.disable())
//                .cors(cors-> cors.disable());
                .cors(withDefaults());
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(this.getUserDetailService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

        return daoAuthenticationProvider;
    }





    //Tried work

    /*
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity .csrf(csrf -> csrf
                        .disable()
                )
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/admin/**").hasRole("admin")
                        .requestMatchers("/user/**").hasRole("user")
                        .requestMatchers("/**").permitAll())
                .formLogin(
                        Customizer.withDefaults()
                );
//                .authorizeRequests(authorize -> authorize
//                        .requestMatchers("/admin/**").hasRole("admin")
//                        .requestMatchers("/user/**").hasRole("user")
//                        .requestMatchers("/**").permitAll())
        System.out.println("step2");
        return httpSecurity.build();
    }
*/
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        auth.authenticationProvider(authenticationProvider());
//    }


//    public void configure(DaoAuthenticationProvider authenticationProvider) {
//        this.authenticationProvider = authenticationProvider;
//    }





/*
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration)throws Exception
    {
        return configuration.getAuthenticationManager();
    }
*/
    /*
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)throws Exception
    {
        return configuration.getAuthenticationManager();
    }
*/

//    protected void configure(HttpSecurity http)throws Exception{
//        http.authorizeRequests().antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/user/**").hasRole("USER")
//                .antMatchers("/**").permitAll().and().formlogin().and().csrf().disable();
//    }
//    public SecurityFilterChain securityFilterChain(HttpSecurity http)
//    {
//        http.antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/user/**").hasRole("USER")
//                .antMatchers("/**").permitAll().and().formlogin().and().csrf().disable();
//    }
    /*
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http .csrf(csrf -> csrf
                        .disable()
                )
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/admin/**").hasRole("admin")
                        .requestMatchers("/user/**").hasRole("user")
                        .requestMatchers("/**").permitAll())
                .formLogin(
                Customizer.withDefaults()
                );
        return http.build();
    }
    */


}
