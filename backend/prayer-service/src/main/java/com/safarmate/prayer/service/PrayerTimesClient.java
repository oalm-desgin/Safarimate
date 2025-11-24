package com.safarmate.prayer.service;

import com.safarmate.prayer.dto.PrayerTimesResponse;

/**
 * Interface for Aladhan API client
 * This is a placeholder interface - actual Aladhan API integration will be implemented later
 */
public interface PrayerTimesClient {
    
    /**
     * Get prayer times for a specific location
     * @param latitude Latitude of the location
     * @param longitude Longitude of the location
     * @param method Calculation method (1-15, see Aladhan API documentation)
     * @param madhab School of thought for Asr calculation (hanafi or shafi)
     * @return Prayer times response
     */
    PrayerTimesResponse getPrayerTimes(double latitude, double longitude, Integer method, String madhab);
    
    /**
     * Get prayer times for a city by name
     * @param city City name
     * @param country Country name (optional)
     * @param method Calculation method
     * @param madhab School of thought for Asr calculation
     * @return Prayer times response
     */
    PrayerTimesResponse getPrayerTimesByCity(String city, String country, Integer method, String madhab);
}

