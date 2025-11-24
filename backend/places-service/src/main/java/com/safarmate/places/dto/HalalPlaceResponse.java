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
public class HalalPlaceResponse {
    private String id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double rating;
    private Integer userRatingsTotal;
    private String photoUrl;
    private Boolean openNow;
    private List<String> openingHours;
    private Double distance; // in meters
    private String placeId;
}

