package com.safarmate.prayer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PrayerServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PrayerServiceApplication.class, args);
    }
}

