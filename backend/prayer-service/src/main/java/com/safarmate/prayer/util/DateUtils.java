package com.safarmate.prayer.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for date and time operations
 */
@Component
public class DateUtils {
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    
    /**
     * Get current date in ISO format (yyyy-MM-dd)
     * @return Current date as string
     */
    public String getCurrentDate() {
        return LocalDate.now().format(DATE_FORMATTER);
    }
    
    /**
     * Get current date for a specific timezone
     * @param zoneId Timezone ID
     * @return Current date as string
     */
    public String getCurrentDate(String zoneId) {
        return LocalDate.now(ZoneId.of(zoneId)).format(DATE_FORMATTER);
    }
    
    /**
     * Parse time string (HH:mm) to Unix timestamp
     * @param timeString Time in HH:mm format
     * @param date Date string in yyyy-MM-dd format
     * @param zoneId Timezone ID
     * @return Unix timestamp in milliseconds
     */
    public long parseTimeToTimestamp(String timeString, String date, String zoneId) {
        try {
            LocalDate localDate = LocalDate.parse(date, DATE_FORMATTER);
            String[] timeParts = timeString.split(":");
            int hour = Integer.parseInt(timeParts[0]);
            int minute = Integer.parseInt(timeParts[1]);
            
            LocalDateTime dateTime = localDate.atTime(hour, minute);
            return dateTime.atZone(ZoneId.of(zoneId)).toInstant().toEpochMilli();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse time: " + timeString, e);
        }
    }
    
    /**
     * Format timestamp to time string (HH:mm)
     * @param timestamp Unix timestamp in milliseconds
     * @param zoneId Timezone ID
     * @return Time string in HH:mm format
     */
    public String formatTimestampToTime(long timestamp, String zoneId) {
        LocalDateTime dateTime = LocalDateTime.ofEpochSecond(
                timestamp / 1000, 
                0, 
                ZoneId.of(zoneId).getRules().getOffset(java.time.Instant.now())
        );
        return dateTime.format(TIME_FORMATTER);
    }
}

