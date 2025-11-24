package com.safarmate.places.util;

import org.springframework.stereotype.Component;

/**
 * Utility class for generating cache keys
 */
@Component
public class CacheKeyGenerator {
    
    private static final String CACHE_PREFIX = "places:";
    private static final String SEARCH_PREFIX = "search:";
    private static final String DETAIL_PREFIX = "detail:";
    
    public String generateSearchKey(String type, double lat, double lng, Integer radius) {
        // Round coordinates to 4 decimal places (~11 meters precision) for cache efficiency
        double roundedLat = Math.round(lat * 10000.0) / 10000.0;
        double roundedLng = Math.round(lng * 10000.0) / 10000.0;
        
        if (radius != null) {
            return CACHE_PREFIX + SEARCH_PREFIX + type + ":" + roundedLat + ":" + roundedLng + ":" + radius;
        }
        return CACHE_PREFIX + SEARCH_PREFIX + type + ":" + roundedLat + ":" + roundedLng;
    }
    
    public String generateDetailKey(String placeId) {
        return CACHE_PREFIX + DETAIL_PREFIX + placeId;
    }
}

