package com.safarmate.planner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityRequest {
    
    @NotBlank(message = "Activity name is required")
    @Size(min = 1, max = 200, message = "Activity name must be between 1 and 200 characters")
    private String name;
    
    @Size(max = 1000, message = "Notes must not exceed 1000 characters")
    private String notes;
    
    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;
    
    @NotNull(message = "End time is required")
    private LocalDateTime endTime;
    
    @Size(max = 200, message = "Location name must not exceed 200 characters")
    private String locationName;
}

