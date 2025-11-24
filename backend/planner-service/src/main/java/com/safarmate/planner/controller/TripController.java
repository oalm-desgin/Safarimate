package com.safarmate.planner.controller;

import com.safarmate.planner.dto.TripRequest;
import com.safarmate.planner.dto.TripResponse;
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
@RequestMapping("/api/trips")
@RequiredArgsConstructor
@Slf4j
public class TripController {
    
    private final PlannerService plannerService;
    
    @PostMapping
    public ResponseEntity<TripResponse> createTrip(
            Authentication authentication,
            @Valid @RequestBody TripRequest request) {
        
        log.info("POST /api/trips - UserId: {}", authentication.getName());
        TripResponse response = plannerService.createTrip(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    public ResponseEntity<List<TripResponse>> getTrips(Authentication authentication) {
        log.info("GET /api/trips - UserId: {}", authentication.getName());
        List<TripResponse> trips = plannerService.getTripsForUser(authentication.getName());
        return ResponseEntity.ok(trips);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TripResponse> updateTrip(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody TripRequest request) {
        
        log.info("PUT /api/trips/{} - UserId: {}", id, authentication.getName());
        TripResponse response = plannerService.updateTrip(authentication.getName(), id, request);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(
            Authentication authentication,
            @PathVariable String id) {
        
        log.info("DELETE /api/trips/{} - UserId: {}", id, authentication.getName());
        plannerService.deleteTrip(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}

