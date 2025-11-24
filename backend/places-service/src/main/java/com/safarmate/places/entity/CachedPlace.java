package com.safarmate.places.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * Entity for caching place search results in Redis
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CachedPlace implements Serializable {
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
    private Double distance;
    private String placeId;
    private String type; // mosque, halal_restaurant, prayer_room
}

