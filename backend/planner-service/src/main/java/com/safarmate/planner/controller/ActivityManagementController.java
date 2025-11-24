package com.safarmate.planner.controller;

import com.safarmate.planner.dto.ActivityRequest;
import com.safarmate.planner.dto.ActivityResponse;
import com.safarmate.planner.service.PlannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
@Slf4j
public class ActivityManagementController {
    
    private final PlannerService plannerService;
    
    @PutMapping("/{id}")
    public ResponseEntity<ActivityResponse> updateActivity(
            Authentication authentication,
            @PathVariable String id,
            @Valid @RequestBody ActivityRequest request) {
        
        log.info("PUT /api/activities/{} - UserId: {}", id, authentication.getName());
        ActivityResponse response = plannerService.updateActivity(authentication.getName(), id, request);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(
            Authentication authentication,
            @PathVariable String id) {
        
        log.info("DELETE /api/activities/{} - UserId: {}", id, authentication.getName());
        plannerService.deleteActivity(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}

