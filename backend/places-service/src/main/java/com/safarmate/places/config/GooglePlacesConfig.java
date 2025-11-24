package com.safarmate.places.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "google.places.api")
@Data
public class GooglePlacesConfig {
    private String key;
    private String baseUrl;
    private Integer defaultRadius;
    private Integer maxRadius;
}

