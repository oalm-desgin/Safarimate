package com.safarmate.places.service;

import com.safarmate.places.dto.PlaceDetailResponse;
import com.safarmate.places.entity.CachedPlace;

import java.util.List;

/**
 * Interface for Google Places API client
 * This is a placeholder interface - actual Google Places API integration will be implemented later
 */
public interface GooglePlacesClient {
    
    /**
     * Search for halal restaurants near a location
     * @param latitude Latitude of the search location
     * @param longitude Longitude of the search location
     * @param radius Search radius in meters
     * @return List of halal restaurant places
     */
    List<CachedPlace> searchHalalRestaurants(double latitude, double longitude, Integer radius);
    
    /**
     * Search for mosques near a location
     * @param latitude Latitude of the search location
     * @param longitude Longitude of the search location
     * @param radius Search radius in meters
     * @return List of mosque places
     */
    List<CachedPlace> searchMosques(double latitude, double longitude, Integer radius);
    
    /**
     * Search for prayer rooms near a location
     * @param latitude Latitude of the search location
     * @param longitude Longitude of the search location
     * @param radius Search radius in meters
     * @return List of prayer room places
     */
    List<CachedPlace> searchPrayerRooms(double latitude, double longitude, Integer radius);
    
    /**
     * Get detailed information about a place by its ID
     * @param placeId Google Places API place ID
     * @return Place detail information
     */
    PlaceDetailResponse getPlaceDetail(String placeId);
}

