package com.safarmate.prayer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QiblaDirectionResponse {
    private Double latitude;
    private Double longitude;
    private Double direction; // Direction in degrees (0-360, where 0 is North)
    private String directionName; // Cardinal direction (N, NE, E, SE, S, SW, W, NW)
}

