package com.safarmate.places.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDetailResponse {
    private String id;
    private String name;
    private String address;
    private String formattedAddress;
    private Double latitude;
    private Double longitude;
    private Double rating;
    private Integer userRatingsTotal;
    private String photoUrl;
    private String phoneNumber;
    private String website;
    private Boolean openNow;
    private List<String> openingHours;
    private List<ReviewResponse> reviews;
    private String placeId;
    private String type; // mosque, halal_restaurant, prayer_room
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewResponse {
        private String authorName;
        private Double rating;
        private String text;
        private String time;
        private String relativeTimeDescription;
    }
}

