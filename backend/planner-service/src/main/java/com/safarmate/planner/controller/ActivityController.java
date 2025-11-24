package com.safarmate.planner.controller;

import com.safarmate.planner.dto.ActivityRequest;
import com.safarmate.planner.dto.ActivityResponse;
import com.safarmate.planner.service.PlannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/activities")
@RequiredArgsConstructor
@Slf4j
public class ActivityController {
    
    private final PlannerService plannerService;
    
    @PostMapping
    public ResponseEntity<ActivityResponse> addActivity(
            Authentication authentication,
            @PathVariable String tripId,
            @Valid @RequestBody ActivityRequest request) {
        
        log.info("POST /api/trips/{}/activities - UserId: {}", tripId, authentication.getName());
        ActivityResponse response = plannerService.addActivity(authentication.getName(), tripId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getActivities(
            Authentication authentication,
            @PathVariable String tripId) {
        
        log.info("GET /api/trips/{}/activities - UserId: {}", tripId, authentication.getName());
        List<ActivityResponse> activities = plannerService.getActivitiesForTrip(authentication.getName(), tripId);
        return ResponseEntity.ok(activities);
    }
}

