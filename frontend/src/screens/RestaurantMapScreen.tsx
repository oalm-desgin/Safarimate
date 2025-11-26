import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocation } from '../hooks/useLocation'
import { fetchNearbyHalalPlaces, HalalPlace } from '../api/osmService'
import RestaurantBottomSheet from '../components/RestaurantBottomSheet'
import { Navigation, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTravelStore } from '../store/travelStore'
import { getCityCoordinates } from '../data/cityData'

// Fix for default marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

// Custom restaurant icon (orange/red)
const restaurantIcon = L.divIcon({
  html: `
    <div style="background: #f97316; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    </div>
  `,
  className: 'custom-restaurant-icon',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
})

// User location icon (blue dot)
const userLocationIcon = L.divIcon({
  html: `
    <div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
  `,
  className: 'custom-user-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

// Component to handle map updates
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom, { animate: true })
  }, [center, zoom, map])
  
  return null
}

export default function RestaurantMapScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { destinationCity, hasActiveTrip } = useTravelStore()
  const [restaurants, setRestaurants] = useState<HalalPlace[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<HalalPlace | null>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [mapCenter, setMapCenter] = useState<[number, number]>([45.5017, -73.5673]) // Montreal fallback
  const [mapZoom, setMapZoom] = useState(13)
  const [loading, setLoading] = useState(false)

  // Update map center when user location is available or use destination coordinates
  useEffect(() => {
    // Check if there's an active trip and use destination coordinates
    if (hasActiveTrip() && destinationCity) {
      const destCoords = getCityCoordinates(destinationCity)
      if (destCoords) {
        setMapCenter([destCoords.lat, destCoords.lng])
        setMapZoom(13)
        loadNearbyRestaurants(destCoords.lat, destCoords.lng)
        return
      }
    }
    
    // Otherwise use user's actual location
    if (location.latitude && location.longitude) {
      setMapCenter([location.latitude, location.longitude])
      setMapZoom(14)
      loadNearbyRestaurants(location.latitude, location.longitude)
    } else {
      // Fallback to default city
      loadNearbyRestaurants(mapCenter[0], mapCenter[1])
    }
  }, [location.latitude, location.longitude, destinationCity, hasActiveTrip])

  const loadNearbyRestaurants = async (lat: number, lon: number) => {
    setLoading(true)
    try {
      const fetchedRestaurants = await fetchNearbyHalalPlaces(lat, lon, 5)
      
      // Add mock ratings for demo (in production, get from reviews API)
      let restaurantsWithRatings = fetchedRestaurants.map((restaurant) => ({
        ...restaurant,
        rating: restaurant.rating || (Math.random() * 2 + 3), // Random rating 3-5 if not available
      }))
      
      // If no restaurants found, use mock data for demonstration
      if (restaurantsWithRatings.length === 0) {
        restaurantsWithRatings = [
          {
            id: 'mock-1',
            name: 'Boustan Restaurant',
            lat: lat + 0.008,
            lon: lon - 0.012,
            cuisine: 'Lebanese',
            distance: 0.85,
            rating: 4.5,
          },
          {
            id: 'mock-2',
            name: 'Marché Adonis',
            lat: lat - 0.012,
            lon: lon + 0.008,
            address: '2001 Rue Sauvé Ouest',
            cuisine: 'Middle Eastern',
            distance: 1.2,
            rating: 4.3,
          },
          {
            id: 'mock-3',
            name: 'Amir Restaurant',
            lat: lat + 0.015,
            lon: lon + 0.018,
            address: '5455 Rue de Gaspé',
            cuisine: 'Mediterranean',
            distance: 1.8,
            rating: 4.7,
          },
          {
            id: 'mock-4',
            name: 'Istanbul Restaurant',
            lat: lat - 0.018,
            lon: lon - 0.015,
            address: '1234 Boulevard Saint-Laurent',
            cuisine: 'Turkish',
            distance: 2.1,
            rating: 4.4,
          },
        ]
      }
      
      setRestaurants(restaurantsWithRatings)
      setIsBottomSheetOpen(true)
    } catch (error) {
      console.error('Error loading restaurants:', error)
      // Set mock data on error
      setRestaurants([
        {
          id: 'mock-1',
          name: 'Boustan Restaurant',
          lat: lat + 0.008,
          lon: lon - 0.012,
          cuisine: 'Lebanese',
          distance: 0.85,
          rating: 4.5,
        },
        {
          id: 'mock-2',
          name: 'Marché Adonis',
          lat: lat - 0.012,
          lon: lon + 0.008,
          address: '2001 Rue Sauvé Ouest',
          cuisine: 'Middle Eastern',
          distance: 1.2,
          rating: 4.3,
        },
      ])
      setIsBottomSheetOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectRestaurant = (restaurant: HalalPlace) => {
    setSelectedRestaurant(restaurant)
    setMapCenter([restaurant.lat, restaurant.lon])
    setMapZoom(16)
  }

  const handleRecenterOnUser = () => {
    if (location.latitude && location.longitude) {
      setMapCenter([location.latitude, location.longitude])
      setMapZoom(14)
      setSelectedRestaurant(null)
    } else {
      location.requestPermission()
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate('/places')}
        className="absolute top-6 left-6 z-30 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {location.latitude && location.longitude && (
          <Marker
            position={[location.latitude, location.longitude]}
            icon={userLocationIcon}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Restaurant markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lon]}
            icon={restaurantIcon}
            eventHandlers={{
              click: () => handleSelectRestaurant(restaurant),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                {restaurant.rating && (
                  <div className="flex items-center text-sm text-yellow-600 mt-1">
                    <span>⭐ {restaurant.rating.toFixed(1)}</span>
                  </div>
                )}
                {restaurant.cuisine && (
                  <p className="text-sm text-gray-600 mt-1 capitalize">{restaurant.cuisine}</p>
                )}
                {restaurant.distance !== undefined && (
                  <p className="text-sm text-gray-500 mt-1">
                    {restaurant.distance.toFixed(1)} km away
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Recenter button */}
      <button
        onClick={handleRecenterOnUser}
        className="absolute top-6 right-6 z-30 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Center on my location"
      >
        <Navigation className="w-6 h-6 text-primary" />
      </button>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 bg-white px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading restaurants...</span>
          </div>
        </div>
      )}

      {/* Location permission denied message */}
      {!location.loading && !location.hasPermission && location.error && (
        <div className="absolute top-6 left-6 right-6 z-30 bg-red-50 border-2 border-red-200 rounded-xl p-4 shadow-lg">
          <p className="text-sm text-red-800 font-medium">{location.error}</p>
          <button
            onClick={location.requestPermission}
            className="mt-2 text-sm text-red-600 underline font-medium"
          >
            Grant Permission
          </button>
        </div>
      )}

      {/* Bottom Sheet */}
      <RestaurantBottomSheet
        halalPlaces={restaurants}
        selectedPlace={selectedRestaurant}
        onSelectPlace={handleSelectRestaurant}
        isOpen={isBottomSheetOpen}
        onToggle={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
      />
    </div>
  )
}

