package com.safarmate.places.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for DistanceCalculator
 */
class DistanceCalculatorTest {
    
    private DistanceCalculator distanceCalculator;
    
    @BeforeEach
    void setUp() {
        distanceCalculator = new DistanceCalculator();
    }
    
    @Test
    void testCalculateDistance_ShouldReturnCorrectDistance() {
        // Given: New York City coordinates
        double lat1 = 40.7128;
        double lon1 = -74.0060;
        
        // Given: Los Angeles coordinates
        double lat2 = 34.0522;
        double lon2 = -118.2437;
        
        // When
        double distance = distanceCalculator.calculateDistance(lat1, lon1, lat2, lon2);
        
        // Then: Distance should be approximately 3944 km (2445 miles)
        // Allowing 100km tolerance for calculation differences
        assertTrue(distance > 3800000 && distance < 4100000, 
                "Distance should be approximately 3944 km");
    }
    
    @Test
    void testCalculateDistance_ShouldReturnZero_WhenSameLocation() {
        // Given
        double lat = 40.7128;
        double lon = -74.0060;
        
        // When
        double distance = distanceCalculator.calculateDistance(lat, lon, lat, lon);
        
        // Then
        assertEquals(0.0, distance, 0.1, "Distance should be 0 for same location");
    }
    
    // TODO: Add more test cases for:
    // - Edge cases (poles, equator)
    // - Very close locations
    // - Very far locations
}

