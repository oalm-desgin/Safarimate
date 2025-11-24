package com.safarmate.places.controller;

import com.safarmate.places.dto.*;
import com.safarmate.places.service.PlacesService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/places")
@RequiredArgsConstructor
@Slf4j
@Validated
public class PlacesController {
    
    private final PlacesService placesService;
    
    @GetMapping("/halal")
    public ResponseEntity<List<HalalPlaceResponse>> getHalalRestaurants(
            @RequestParam @NotNull(message = "Latitude is required") @Min(-90) @Max(90) Double lat,
            @RequestParam @NotNull(message = "Longitude is required") @Min(-180) @Max(180) Double lng,
            @RequestParam(required = false) @Min(1) @Max(50000) Integer radius) {
        
        log.info("GET /api/places/halal - lat: {}, lng: {}, radius: {}", lat, lng, radius);
        List<HalalPlaceResponse> places = placesService.getHalalRestaurants(lat, lng, radius);
        return ResponseEntity.ok(places);
    }
    
    @GetMapping("/mosques")
    public ResponseEntity<List<MosqueResponse>> getMosques(
            @RequestParam @NotNull(message = "Latitude is required") @Min(-90) @Max(90) Double lat,
            @RequestParam @NotNull(message = "Longitude is required") @Min(-180) @Max(180) Double lng,
            @RequestParam(required = false) @Min(1) @Max(50000) Integer radius) {
        
        log.info("GET /api/places/mosques - lat: {}, lng: {}, radius: {}", lat, lng, radius);
        List<MosqueResponse> places = placesService.getMosques(lat, lng, radius);
        return ResponseEntity.ok(places);
    }
    
    @GetMapping("/prayer-rooms")
    public ResponseEntity<List<PrayerRoomResponse>> getPrayerRooms(
            @RequestParam @NotNull(message = "Latitude is required") @Min(-90) @Max(90) Double lat,
            @RequestParam @NotNull(message = "Longitude is required") @Min(-180) @Max(180) Double lng,
            @RequestParam(required = false) @Min(1) @Max(50000) Integer radius) {
        
        log.info("GET /api/places/prayer-rooms - lat: {}, lng: {}, radius: {}", lat, lng, radius);
        List<PrayerRoomResponse> places = placesService.getPrayerRooms(lat, lng, radius);
        return ResponseEntity.ok(places);
    }
    
    @GetMapping("/detail")
    public ResponseEntity<PlaceDetailResponse> getPlaceDetail(
            @RequestParam @NotNull(message = "Place ID is required") String id) {
        
        log.info("GET /api/places/detail - id: {}", id);
        PlaceDetailResponse detail = placesService.getPlaceDetail(id);
        return ResponseEntity.ok(detail);
    }
    
    @GetMapping("/places/nearby")
    public ResponseEntity<List<Map<String, Object>>> getNearbyPlaces(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("GET /places/nearby - Authorization header present: {}", authHeader != null);
        
        // Mock data for now
        List<Map<String, Object>> places = new ArrayList<>();
        
        Map<String, Object> place1 = new HashMap<>();
        place1.put("id", "1");
        place1.put("name", "Masjid Al Noor");
        place1.put("type", "Mosque");
        place1.put("address", "123 Main St");
        place1.put("rating", 4.8);
        place1.put("distanceMeters", 350);
        places.add(place1);
        
        Map<String, Object> place2 = new HashMap<>();
        place2.put("id", "2");
        place2.put("name", "Halal Grill");
        place2.put("type", "Restaurant");
        place2.put("address", "456 Market Ave");
        place2.put("rating", 4.5);
        place2.put("distanceMeters", 800);
        places.add(place2);
        
        return ResponseEntity.ok(places);
    }
}

