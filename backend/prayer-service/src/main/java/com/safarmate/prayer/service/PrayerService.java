package com.safarmate.prayer.service;

import com.safarmate.prayer.dto.PrayerTimesResponse;
import com.safarmate.prayer.dto.QiblaDirectionResponse;
import com.safarmate.prayer.util.QiblaCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrayerService {
    
    private final PrayerTimesClient prayerTimesClient;
    private final QiblaCalculator qiblaCalculator;
    
    @Cacheable(value = "prayer-times", key = "'times:' + #latitude + ':' + #longitude + ':' + (#method != null ? #method : 'default') + ':' + (#madhab != null ? #madhab : 'default')")
    public PrayerTimesResponse getPrayerTimes(double latitude, double longitude, Integer method, String madhab) {
        log.info("Getting prayer times for lat: {}, lng: {}, method: {}, madhab: {}", latitude, longitude, method, madhab);
        
        PrayerTimesResponse response = prayerTimesClient.getPrayerTimes(latitude, longitude, method, madhab);
        
        if (response == null) {
            throw new RuntimeException("Failed to fetch prayer times");
        }
        
        return response;
    }
    
    @Cacheable(value = "prayer-times", key = "'city:' + #city + ':' + (#country != null ? #country : 'default') + ':' + (#method != null ? #method : 'default') + ':' + (#madhab != null ? #madhab : 'default')")
    public PrayerTimesResponse getPrayerTimesByCity(String city, String country, Integer method, String madhab) {
        log.info("Getting prayer times for city: {}, country: {}, method: {}, madhab: {}", city, country, method, madhab);
        
        PrayerTimesResponse response = prayerTimesClient.getPrayerTimesByCity(city, country, method, madhab);
        
        if (response == null) {
            throw new RuntimeException("Failed to fetch prayer times for city: " + city);
        }
        
        return response;
    }
    
    @Cacheable(value = "qibla", key = "'qibla:' + #latitude + ':' + #longitude")
    public QiblaDirectionResponse getQiblaDirection(double latitude, double longitude) {
        log.info("Calculating Qibla direction for lat: {}, lng: {}", latitude, longitude);
        
        double direction = qiblaCalculator.calculateQiblaDirection(latitude, longitude);
        String directionName = qiblaCalculator.getDirectionName(direction);
        
        return QiblaDirectionResponse.builder()
                .latitude(latitude)
                .longitude(longitude)
                .direction(direction)
                .directionName(directionName)
                .build();
    }
}

