package com.safarmate.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripResponse {
    private String id;
    private String userId;
    private String name;
    private String city;
    private String country;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<ActivityResponse> activities;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

