package com.safarmate.prayer.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for QiblaCalculator
 */
class QiblaCalculatorTest {
    
    private QiblaCalculator qiblaCalculator;
    
    @BeforeEach
    void setUp() {
        qiblaCalculator = new QiblaCalculator();
    }
    
    @Test
    void testCalculateQiblaDirection_ShouldReturnCorrectDirection_ForNewYork() {
        // Given: New York City coordinates
        double lat = 40.7128;
        double lon = -74.0060;
        
        // When
        double direction = qiblaCalculator.calculateQiblaDirection(lat, lon);
        
        // Then: Qibla direction from NYC should be approximately 58-59 degrees (NE)
        assertTrue(direction >= 58 && direction <= 59, 
                "Qibla direction from NYC should be approximately 58-59 degrees");
    }
    
    @Test
    void testCalculateQiblaDirection_ShouldReturnCorrectDirection_ForMecca() {
        // Given: Mecca coordinates (should point to itself, but direction may vary)
        double lat = 21.4225241;
        double lon = 39.8261818;
        
        // When
        double direction = qiblaCalculator.calculateQiblaDirection(lat, lon);
        
        // Then: Should return a valid direction (0-360)
        assertTrue(direction >= 0 && direction < 360, 
                "Direction should be between 0 and 360 degrees");
    }
    
    @Test
    void testGetDirectionName_ShouldReturnCorrectCardinalDirection() {
        // Test North
        assertEquals("N", qiblaCalculator.getDirectionName(0));
        assertEquals("N", qiblaCalculator.getDirectionName(360));
        assertEquals("N", qiblaCalculator.getDirectionName(10));
        
        // Test East
        assertEquals("E", qiblaCalculator.getDirectionName(90));
        
        // Test South
        assertEquals("S", qiblaCalculator.getDirectionName(180));
        
        // Test West
        assertEquals("W", qiblaCalculator.getDirectionName(270));
        
        // Test Northeast
        assertEquals("NE", qiblaCalculator.getDirectionName(45));
        
        // Test Southeast
        assertEquals("SE", qiblaCalculator.getDirectionName(135));
        
        // Test Southwest
        assertEquals("SW", qiblaCalculator.getDirectionName(225));
        
        // Test Northwest
        assertEquals("NW", qiblaCalculator.getDirectionName(315));
    }
    
    @Test
    void testGetDirectionName_ShouldHandleNegativeDegrees() {
        // Negative degrees should be normalized
        assertEquals("N", qiblaCalculator.getDirectionName(-10));
        assertEquals("W", qiblaCalculator.getDirectionName(-90));
    }
    
    // TODO: Add more test cases for:
    // - Edge cases (poles, equator)
    // - Various cities around the world
    // - Boundary conditions for direction names
}

