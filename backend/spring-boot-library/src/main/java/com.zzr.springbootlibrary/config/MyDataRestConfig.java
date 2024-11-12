package com.zzr.springbootlibrary.config;

import com.zzr.springbootlibrary.entity.Book;
import com.zzr.springbootlibrary.entity.Message;
import com.zzr.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "https://localhost:3000";

//    cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);

    @Override

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors){
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);

        disableHttpMethods(Book.class,config,theUnsupportedActions);
        disableHttpMethods(Review.class,config,theUnsupportedActions);
        disableHttpMethods(Message.class,config,theUnsupportedActions);

        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);
//              .allowedHeaders("*");
    }


    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata,httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure(((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions)));
    }
}
