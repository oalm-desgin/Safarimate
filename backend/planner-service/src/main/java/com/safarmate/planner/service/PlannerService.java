package com.safarmate.planner.service;

import com.safarmate.planner.dto.ActivityRequest;
import com.safarmate.planner.dto.ActivityResponse;
import com.safarmate.planner.dto.TripRequest;
import com.safarmate.planner.dto.TripResponse;
import com.safarmate.planner.entity.Activity;
import com.safarmate.planner.entity.Trip;
import com.safarmate.planner.repository.ActivityRepository;
import com.safarmate.planner.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlannerService {
    
    private final TripRepository tripRepository;
    private final ActivityRepository activityRepository;
    
    @Transactional
    public TripResponse createTrip(String userId, TripRequest request) {
        log.info("Creating trip for user: {}, name: {}", userId, request.getName());
        
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End date must be after start date");
        }
        
        Trip trip = Trip.builder()
                .userId(userId)
                .name(request.getName())
                .city(request.getCity())
                .country(request.getCountry())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();
        
        trip = tripRepository.save(trip);
        
        log.info("Trip created successfully: {}", trip.getId());
        
        return mapToTripResponse(trip);
    }
    
    @Transactional
    public TripResponse updateTrip(String userId, String tripId, TripRequest request) {
        log.info("Updating trip: {} for user: {}", tripId, userId);
        
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        if (!trip.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this trip");
        }
        
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End date must be after start date");
        }
        
        trip.setName(request.getName());
        trip.setCity(request.getCity());
        trip.setCountry(request.getCountry());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        
        trip = tripRepository.save(trip);
        
        log.info("Trip updated successfully: {}", tripId);
        
        return mapToTripResponse(trip);
    }
    
    @Transactional
    public void deleteTrip(String userId, String tripId) {
        log.info("Deleting trip: {} for user: {}", tripId, userId);
        
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        if (!trip.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this trip");
        }
        
        tripRepository.delete(trip);
        
        log.info("Trip deleted successfully: {}", tripId);
    }
    
    public List<TripResponse> getTripsForUser(String userId) {
        log.info("Fetching trips for user: {}", userId);
        
        List<Trip> trips = tripRepository.findByUserIdOrderByCreatedAtDesc(userId);
        
        return trips.stream()
                .map(this::mapToTripResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ActivityResponse addActivity(String userId, String tripId, ActivityRequest request) {
        log.info("Adding activity to trip: {} for user: {}", tripId, userId);
        
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        if (!trip.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to add activity to this trip");
        }
        
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }
        
        Activity activity = Activity.builder()
                .trip(trip)
                .name(request.getName())
                .notes(request.getNotes())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .locationName(request.getLocationName())
                .build();
        
        // TODO: Check for prayer time conflicts
        activity = checkPrayerTimeConflicts(activity);
        
        activity = activityRepository.save(activity);
        
        log.info("Activity added successfully: {}", activity.getId());
        
        return mapToActivityResponse(activity);
    }
    
    @Transactional
    public ActivityResponse updateActivity(String userId, String activityId, ActivityRequest request) {
        log.info("Updating activity: {} for user: {}", activityId, userId);
        
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        
        if (!activity.getTrip().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this activity");
        }
        
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }
        
        activity.setName(request.getName());
        activity.setNotes(request.getNotes());
        activity.setStartTime(request.getStartTime());
        activity.setEndTime(request.getEndTime());
        activity.setLocationName(request.getLocationName());
        
        // TODO: Check for prayer time conflicts
        activity = checkPrayerTimeConflicts(activity);
        
        activity = activityRepository.save(activity);
        
        log.info("Activity updated successfully: {}", activityId);
        
        return mapToActivityResponse(activity);
    }
    
    @Transactional
    public void deleteActivity(String userId, String activityId) {
        log.info("Deleting activity: {} for user: {}", activityId, userId);
        
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        
        if (!activity.getTrip().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this activity");
        }
        
        activityRepository.delete(activity);
        
        log.info("Activity deleted successfully: {}", activityId);
    }
    
    public List<ActivityResponse> getActivitiesForTrip(String userId, String tripId) {
        log.info("Fetching activities for trip: {} for user: {}", tripId, userId);
        
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        if (!trip.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to view activities for this trip");
        }
        
        List<Activity> activities = activityRepository.findByTripIdOrderByStartTimeAsc(tripId);
        
        return activities.stream()
                .map(this::mapToActivityResponse)
                .collect(Collectors.toList());
    }
    
    private Activity checkPrayerTimeConflicts(Activity activity) {
        // TODO: Implement prayer time conflict detection
        // This should call the prayer service to check if the activity time overlaps with prayer times
        // For now, set conflictsWithPrayer to false as placeholder
        log.warn("Prayer time conflict detection not yet implemented");
        return activity;
    }
    
    private TripResponse mapToTripResponse(Trip trip) {
        List<ActivityResponse> activities = trip.getActivities().stream()
                .map(this::mapToActivityResponse)
                .collect(Collectors.toList());
        
        return TripResponse.builder()
                .id(trip.getId())
                .userId(trip.getUserId())
                .name(trip.getName())
                .city(trip.getCity())
                .country(trip.getCountry())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .activities(activities)
                .createdAt(trip.getCreatedAt())
                .updatedAt(trip.getUpdatedAt())
                .build();
    }
    
    private ActivityResponse mapToActivityResponse(Activity activity) {
        // TODO: Calculate conflictsWithPrayer based on actual prayer time check
        Boolean conflictsWithPrayer = false; // Placeholder
        
        return ActivityResponse.builder()
                .id(activity.getId())
                .tripId(activity.getTrip().getId())
                .name(activity.getName())
                .notes(activity.getNotes())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .locationName(activity.getLocationName())
                .conflictsWithPrayer(conflictsWithPrayer)
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build();
    }
}

