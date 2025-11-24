package com.safarmate.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {
    private String id;
    private String tripId;
    private String name;
    private String notes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String locationName;
    private Boolean conflictsWithPrayer;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

