package com.zzr.springbootlibrary.config;

//import com.okta.spring.boot.oauth.Okta;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.accept.ContentNegotiationStrategy;
//import org.springframework.web.accept.HeaderContentNegotiationStrategy;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//
//@Configuration
//public class SecurityConfiguration {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        //Disable Cross Site Request Forgery
////        http.csrf().disable();
//        http.csrf(AbstractHttpConfigurer::disable);
//
//        //Protect endpoints at /api/<type>/secure
//        http.authorizeRequests(configurer ->
//                configurer
//                        .requestMatchers("/api/books/secure/**")
//                        .authenticated())
//                .oauth2ResourceServer((oauth2) -> oauth2
//                        .jwt(Customizer.withDefaults())
//                );
////                .oauth2ResourceServer()
////                .jwt();
//
//        // Add CORS filters
//        http.cors(Customizer.withDefaults());
//
//        //Add content negotiation strategy
//        http.setSharedObject(ContentNegotiationStrategy.class,
//                new HeaderContentNegotiationStrategy());
//
//        //Force a non-empty response body for 401's tp
//        Okta.configureResourceServer401ResponseBody(http);
//
//        return http.build();
//
//    }
//}
//import com.okta.spring.boot.oauth.Okta;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.accept.ContentNegotiationStrategy;
//import org.springframework.web.accept.HeaderContentNegotiationStrategy;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
////      disable cross request site forgery
//        http.csrf(AbstractHttpConfigurer::disable);
//        http.authorizeHttpRequests(configurer ->
//                        configurer
//                .requestMatchers("/api/books/secure/**").authenticated()
//                .oauth2ResourceServer((oauth2) -> oauth2
//                        .jwt(Customizer.withDefaults())
//                );
//                               //.requestMatchers("/api/books/**", "/api/reviews/**").permitAll())
//
////      add cors filter
//        http.cors(Customizer.withDefaults());
////      add content negotiation strategy
//        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
////      Force a non-empty response body to make unauthorized response body more friendly.
//        Okta.configureResourceServer401ResponseBody(http);
//        return http.build();
//    }
//}



        import com.okta.spring.boot.oauth.Okta;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.security.config.Customizer;
        import org.springframework.security.config.annotation.web.builders.HttpSecurity;
        import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
        import org.springframework.security.web.SecurityFilterChain;
        import org.springframework.web.accept.ContentNegotiationStrategy;
        import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable Cross Site Request Forgery
        http.csrf(AbstractHttpConfigurer::disable);

        // Protect endpoints at /api/<type>/secure
        http.authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/api/books/secure/**",
                                        "/api/review/secure/**",
                                        "/api/messages/secure/**",
                                        "/api/admin/secure/**")
                                .authenticated().anyRequest().permitAll())
                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(Customizer.withDefaults()));
//.anyRequest().permitAll()

//        // Add CORS filters
         http.cors(Customizer.withDefaults());
//
//        // Add content negotiation strategy
         http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());
//
//        // Force a non-empty response body for 401's to make the response friendly
//         Okta.configureResourceServer401ResponseBody(http);
//
       return http.build();
    }

}