package com.safarmate.prayer.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aladhan.api")
@Data
public class PrayerTimesConfig {
    private String key;
    private String baseUrl;
    private Integer timeout;
}

