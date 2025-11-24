package com.safarmate.planner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TripRequest {
    
    @NotBlank(message = "Trip name is required")
    @Size(min = 1, max = 200, message = "Trip name must be between 1 and 200 characters")
    private String name;
    
    @NotBlank(message = "City is required")
    @Size(min = 1, max = 100, message = "City must be between 1 and 100 characters")
    private String city;
    
    @NotBlank(message = "Country is required")
    @Size(min = 1, max = 100, message = "Country must be between 1 and 100 characters")
    private String country;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    private LocalDate endDate;
}

