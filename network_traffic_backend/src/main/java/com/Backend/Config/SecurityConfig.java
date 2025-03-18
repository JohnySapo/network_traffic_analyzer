package com.Backend.Config;

import com.Backend.Handler.Authentication.JwtLogoutSuccessHandler;
import com.Backend.Handler.CustomAccessDeniedHandler;
import com.Backend.Handler.CustomAuthenticationEntryPoint;
import com.Backend.Filter.CsrfCookieFilter;
import com.Backend.Filter.JwtAuthenticationFilter;
import com.Backend.Handler.Authentication.JwtAuthenticationSuccessHandler;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter JwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationSuccessHandler jwtAuthSuccessHandler;
    private final JwtLogoutSuccessHandler jwtLogoutSuccessHandler;

    @Autowired
    public SecurityConfig(
            JwtAuthenticationFilter JwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider,
            JwtAuthenticationSuccessHandler jwtAuthSuccessHandler,
            JwtLogoutSuccessHandler jwtLogoutSuccessHandler
    ) {
        this.JwtAuthenticationFilter = JwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthSuccessHandler = jwtAuthSuccessHandler;
        this.jwtLogoutSuccessHandler = jwtLogoutSuccessHandler;
    }

    /*
    ** Security Chain Build for Web
    ** CSRF TOKEN
    ** CORS
    ** Authorization for API End Points
    ** Authentication Filters & Exception Handlers
    * */

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestHandler csrfAttributeHandler = new CsrfTokenRequestAttributeHandler();

        http
                .securityContext(contextConfig -> contextConfig.requireExplicitSave(false))
                .sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(corsConfig -> corsConfig.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:5123"));
                        config.setAllowedHeaders(Arrays.asList(
                                HttpHeaders.CONTENT_TYPE,
                                HttpHeaders.AUTHORIZATION,
                                "X-XSRF-TOKEN"
                        ));
                        config.setExposedHeaders(Collections.singletonList(HttpHeaders.AUTHORIZATION));
                        config.setAllowedMethods(Arrays.asList(
                                HttpMethod.GET.name(),
                                HttpMethod.POST.name(),
                                HttpMethod.PUT.name(),
                                HttpMethod.DELETE.name()
                        ));
                        config.setAllowCredentials(true);
                        config.setMaxAge(3600L);
                        return config;
                    }
                }))
                .csrf(csrfConfig -> {
                    csrfConfig.csrfTokenRequestHandler(csrfAttributeHandler);
                    csrfConfig.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
                    csrfConfig.ignoringRequestMatchers("/auth/logout");
                })
                .addFilterBefore(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
                .addFilterAfter(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .requiresChannel(rcc -> rcc.anyRequest().requiresInsecure())
                .authorizeHttpRequests( auth -> {
                    auth.requestMatchers("/auth/**").permitAll();
                    auth.requestMatchers("/user/**").hasAuthority("USER");
                    auth.requestMatchers("/admin/**").hasAuthority("ADMIN");
                    auth.anyRequest().authenticated();
                })
                .formLogin(login ->
                            login.successHandler(jwtAuthSuccessHandler)
                )
                .logout(logout -> {
                            logout.logoutUrl("/auth/logout");
                            logout.logoutSuccessHandler(jwtLogoutSuccessHandler);
                        }
                );

        http.httpBasic(hbc -> hbc.authenticationEntryPoint(new CustomAuthenticationEntryPoint()));
        http.exceptionHandling(ehc -> ehc.accessDeniedHandler(new CustomAccessDeniedHandler()));

        return http.build();
    }
}
