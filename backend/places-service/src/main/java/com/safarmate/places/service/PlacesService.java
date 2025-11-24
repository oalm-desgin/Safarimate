package com.safarmate.places.service;

import com.safarmate.places.config.GooglePlacesConfig;
import com.safarmate.places.dto.*;
import com.safarmate.places.entity.CachedPlace;
import com.safarmate.places.util.DistanceCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlacesService {
    
    private final GooglePlacesClient googlePlacesClient;
    private final GooglePlacesConfig googlePlacesConfig;
    private final DistanceCalculator distanceCalculator;
    
    @Cacheable(value = "places", key = "'halal:' + #latitude + ':' + #longitude + ':' + (#radius != null ? #radius : 'default')")
    public List<HalalPlaceResponse> getHalalRestaurants(double latitude, double longitude, Integer radius) {
        log.info("Fetching halal restaurants for lat: {}, lng: {}, radius: {}", latitude, longitude, radius);
        
        Integer searchRadius = radius != null ? Math.min(radius, googlePlacesConfig.getMaxRadius()) : googlePlacesConfig.getDefaultRadius();
        
        List<CachedPlace> places = googlePlacesClient.searchHalalRestaurants(latitude, longitude, searchRadius);
        
        return places.stream()
                .map(place -> {
                    double distance = distanceCalculator.calculateDistance(latitude, longitude, place.getLatitude(), place.getLongitude());
                    return HalalPlaceResponse.builder()
                            .id(place.getId())
                            .name(place.getName())
                            .address(place.getAddress())
                            .latitude(place.getLatitude())
                            .longitude(place.getLongitude())
                            .rating(place.getRating())
                            .userRatingsTotal(place.getUserRatingsTotal())
                            .photoUrl(place.getPhotoUrl())
                            .openNow(place.getOpenNow())
                            .openingHours(place.getOpeningHours())
                            .distance(distance)
                            .placeId(place.getPlaceId())
                            .build();
                })
                .sorted((a, b) -> Double.compare(a.getDistance(), b.getDistance()))
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "places", key = "'mosque:' + #latitude + ':' + #longitude + ':' + (#radius != null ? #radius : 'default')")
    public List<MosqueResponse> getMosques(double latitude, double longitude, Integer radius) {
        log.info("Fetching mosques for lat: {}, lng: {}, radius: {}", latitude, longitude, radius);
        
        Integer searchRadius = radius != null ? Math.min(radius, googlePlacesConfig.getMaxRadius()) : googlePlacesConfig.getDefaultRadius();
        
        List<CachedPlace> places = googlePlacesClient.searchMosques(latitude, longitude, searchRadius);
        
        return places.stream()
                .map(place -> {
                    double distance = distanceCalculator.calculateDistance(latitude, longitude, place.getLatitude(), place.getLongitude());
                    return MosqueResponse.builder()
                            .id(place.getId())
                            .name(place.getName())
                            .address(place.getAddress())
                            .latitude(place.getLatitude())
                            .longitude(place.getLongitude())
                            .rating(place.getRating())
                            .userRatingsTotal(place.getUserRatingsTotal())
                            .photoUrl(place.getPhotoUrl())
                            .openNow(place.getOpenNow())
                            .openingHours(place.getOpeningHours())
                            .distance(distance)
                            .placeId(place.getPlaceId())
                            .build();
                })
                .sorted((a, b) -> Double.compare(a.getDistance(), b.getDistance()))
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "places", key = "'prayer_room:' + #latitude + ':' + #longitude + ':' + (#radius != null ? #radius : 'default')")
    public List<PrayerRoomResponse> getPrayerRooms(double latitude, double longitude, Integer radius) {
        log.info("Fetching prayer rooms for lat: {}, lng: {}, radius: {}", latitude, longitude, radius);
        
        Integer searchRadius = radius != null ? Math.min(radius, googlePlacesConfig.getMaxRadius()) : googlePlacesConfig.getDefaultRadius();
        
        List<CachedPlace> places = googlePlacesClient.searchPrayerRooms(latitude, longitude, searchRadius);
        
        return places.stream()
                .map(place -> {
                    double distance = distanceCalculator.calculateDistance(latitude, longitude, place.getLatitude(), place.getLongitude());
                    return PrayerRoomResponse.builder()
                            .id(place.getId())
                            .name(place.getName())
                            .address(place.getAddress())
                            .latitude(place.getLatitude())
                            .longitude(place.getLongitude())
                            .rating(place.getRating())
                            .userRatingsTotal(place.getUserRatingsTotal())
                            .photoUrl(place.getPhotoUrl())
                            .openNow(place.getOpenNow())
                            .openingHours(place.getOpeningHours())
                            .distance(distance)
                            .placeId(place.getPlaceId())
                            .build();
                })
                .sorted((a, b) -> Double.compare(a.getDistance(), b.getDistance()))
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "places", key = "'detail:' + #placeId")
    public PlaceDetailResponse getPlaceDetail(String placeId) {
        log.info("Fetching place detail for placeId: {}", placeId);
        
        PlaceDetailResponse detail = googlePlacesClient.getPlaceDetail(placeId);
        
        if (detail == null) {
            throw new RuntimeException("Place not found with id: " + placeId);
        }
        
        return detail;
    }
}

