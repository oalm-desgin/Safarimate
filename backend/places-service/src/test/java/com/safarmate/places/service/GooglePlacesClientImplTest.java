package com.safarmate.places.service;

import com.safarmate.places.config.GooglePlacesConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

/**
 * Unit tests for GooglePlacesClientImpl
 * TODO: Add more comprehensive test cases once Google Places API is integrated
 */
@ExtendWith(MockitoExtension.class)
class GooglePlacesClientImplTest {
    
    @Mock
    private GooglePlacesConfig googlePlacesConfig;
    
    @InjectMocks
    private GooglePlacesClientImpl googlePlacesClient;
    
    @BeforeEach
    void setUp() {
        when(googlePlacesConfig.getKey()).thenReturn("test-api-key");
        when(googlePlacesConfig.getBaseUrl()).thenReturn("https://maps.googleapis.com/maps/api/place");
    }
    
    @Test
    void testSearchHalalRestaurants_ShouldReturnEmptyList_WhenNotImplemented() {
        // Given
        double lat = 40.7128;
        double lng = -74.0060;
        Integer radius = 5000;
        
        // When
        var result = googlePlacesClient.searchHalalRestaurants(lat, lng, radius);
        
        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
    
    // TODO: Add more test cases once Google Places API integration is complete:
    // - Test successful API calls
    // - Test error handling
    // - Test response transformation
    // - Test rate limiting
}

