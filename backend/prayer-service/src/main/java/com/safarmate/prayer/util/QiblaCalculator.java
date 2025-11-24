package com.safarmate.prayer.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Utility class for calculating Qibla direction using spherical trigonometry
 * Based on the great-circle bearing formula
 */
@Component
public class QiblaCalculator {
    
    // Kaaba coordinates in Mecca
    private static final double KAABA_LAT = 21.4225241;
    private static final double KAABA_LON = 39.8261818;
    
    /**
     * Calculate Qibla direction in degrees from a given location
     * Uses the spherical trigonometry formula (great-circle bearing)
     * 
     * @param latitude Latitude of the location
     * @param longitude Longitude of the location
     * @return Direction in degrees (0-360, where 0 is North, 90 is East, 180 is South, 270 is West)
     */
    public double calculateQiblaDirection(double latitude, double longitude) {
        double lat1 = Math.toRadians(latitude);
        double lon1 = Math.toRadians(longitude);
        double lat2 = Math.toRadians(KAABA_LAT);
        double lon2 = Math.toRadians(KAABA_LON);
        
        double deltaLon = lon2 - lon1;
        
        // Calculate bearing using spherical trigonometry
        double y = Math.sin(deltaLon) * Math.cos(lat2);
        double x = Math.cos(lat1) * Math.sin(lat2) - 
                   Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
        
        double bearing = Math.atan2(y, x);
        
        // Convert from radians to degrees and normalize to 0-360
        double direction = Math.toDegrees(bearing);
        direction = (direction + 360) % 360;
        
        return direction;
    }
    
    /**
     * Get cardinal direction name from degrees
     * @param degrees Direction in degrees (0-360)
     * @return Cardinal direction name (N, NE, E, SE, S, SW, W, NW)
     */
    public String getDirectionName(double degrees) {
        // Normalize to 0-360
        degrees = (degrees + 360) % 360;
        
        // Map degrees to cardinal directions
        if (degrees >= 337.5 || degrees < 22.5) {
            return "N";
        } else if (degrees >= 22.5 && degrees < 67.5) {
            return "NE";
        } else if (degrees >= 67.5 && degrees < 112.5) {
            return "E";
        } else if (degrees >= 112.5 && degrees < 157.5) {
            return "SE";
        } else if (degrees >= 157.5 && degrees < 202.5) {
            return "S";
        } else if (degrees >= 202.5 && degrees < 247.5) {
            return "SW";
        } else if (degrees >= 247.5 && degrees < 292.5) {
            return "W";
        } else {
            return "NW";
        }
    }
}

