package com.safarmate.prayer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrayerTimesResponse {
    private String date;
    private LocationDto location;
    private List<PrayerTimeDto> prayers;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LocationDto {
        private String city;
        private String country;
        private Double latitude;
        private Double longitude;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PrayerTimeDto {
        private String name;
        private String time;
        private Long timestamp; // Unix timestamp in milliseconds
    }
}

