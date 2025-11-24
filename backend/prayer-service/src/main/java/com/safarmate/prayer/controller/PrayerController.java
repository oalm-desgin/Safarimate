package com.safarmate.prayer.controller;

import com.safarmate.prayer.dto.PrayerTimesResponse;
import com.safarmate.prayer.dto.QiblaDirectionResponse;
import com.safarmate.prayer.service.PrayerService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prayer")
@RequiredArgsConstructor
@Slf4j
@Validated
public class PrayerController {
    
    private final PrayerService prayerService;
    
    @GetMapping("/times")
    public ResponseEntity<PrayerTimesResponse> getPrayerTimes(
            @RequestParam @NotNull(message = "Latitude is required") @Min(-90) @Max(90) Double lat,
            @RequestParam @NotNull(message = "Longitude is required") @Min(-180) @Max(180) Double lng,
            @RequestParam(required = false) @Min(0) @Max(15) Integer method,
            @RequestParam(required = false) String madhab) {
        
        log.info("GET /api/prayer/times - lat: {}, lng: {}, method: {}, madhab: {}", lat, lng, method, madhab);
        PrayerTimesResponse response = prayerService.getPrayerTimes(lat, lng, method, madhab);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/by-city")
    public ResponseEntity<PrayerTimesResponse> getPrayerTimesByCity(
            @RequestParam @NotNull(message = "City is required") String city,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) @Min(0) @Max(15) Integer method,
            @RequestParam(required = false) String madhab) {
        
        log.info("GET /api/prayer/by-city - city: {}, country: {}, method: {}, madhab: {}", city, country, method, madhab);
        PrayerTimesResponse response = prayerService.getPrayerTimesByCity(city, country, method, madhab);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/qibla")
    public ResponseEntity<QiblaDirectionResponse> getQiblaDirection(
            @RequestParam @NotNull(message = "Latitude is required") @Min(-90) @Max(90) Double lat,
            @RequestParam @NotNull(message = "Longitude is required") @Min(-180) @Max(180) Double lng) {
        
        log.info("GET /api/prayer/qibla - lat: {}, lng: {}", lat, lng);
        QiblaDirectionResponse response = prayerService.getQiblaDirection(lat, lng);
        return ResponseEntity.ok(response);
    }
}

