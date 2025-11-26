import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocation } from '../hooks/useLocation'
import { fetchNearbyMosques, fetchPrayerTimes, Mosque } from '../api/osmService'
import MapBottomSheet from '../components/MapBottomSheet'
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

// Custom mosque icon (purple)
const mosqueIcon = L.divIcon({
  html: `
    <div style="background: #6b21a8; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    </div>
  `,
  className: 'custom-mosque-icon',
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

export default function MosqueMapScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { destinationCity, hasActiveTrip } = useTravelStore()
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)
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
        loadNearbyMosques(destCoords.lat, destCoords.lng)
        return
      }
    }
    
    // Otherwise use user's actual location
    if (location.latitude && location.longitude) {
      setMapCenter([location.latitude, location.longitude])
      setMapZoom(14)
      loadNearbyMosques(location.latitude, location.longitude)
    } else {
      // Fallback to default city
      loadNearbyMosques(mapCenter[0], mapCenter[1])
    }
  }, [location.latitude, location.longitude, destinationCity, hasActiveTrip])

  const loadNearbyMosques = async (lat: number, lon: number) => {
    setLoading(true)
    try {
      const fetchedMosques = await fetchNearbyMosques(lat, lon, 5)
      
      // Fetch prayer times for each mosque
      const prayerTimes = await fetchPrayerTimes(lat, lon)
      let mosquesWithPrayers = fetchedMosques.map((mosque) => ({
        ...mosque,
        prayerTimes,
      }))
      
      // If no mosques found, use mock data for demonstration
      if (mosquesWithPrayers.length === 0) {
        mosquesWithPrayers = [
          {
            id: 'mock-1',
            name: 'Unnamed Mosque',
            lat: lat + 0.01,
            lon: lon - 0.01,
            distance: 1.02,
            prayerTimes: {
              fajr: '05:30',
              dhuhr: '12:45',
              asr: '15:30',
              maghrib: '18:15',
              isha: '19:45',
            },
          },
          {
            id: 'mock-2',
            name: 'Fatima-Zohra',
            lat: lat - 0.015,
            lon: lon + 0.01,
            address: '2012 Rue Saint-Dominique',
            distance: 1.14,
            prayerTimes: {
              fajr: '05:30',
              dhuhr: '12:45',
              asr: '15:30',
              maghrib: '18:15',
              isha: '19:45',
            },
          },
          {
            id: 'mock-3',
            name: 'Mosquée Al-Iman',
            lat: lat + 0.02,
            lon: lon + 0.015,
            address: '236 Boulevard Henri-Bourassa',
            distance: 2.3,
            prayerTimes: {
              fajr: '05:30',
              dhuhr: '12:45',
              asr: '15:30',
              maghrib: '18:15',
              isha: '19:45',
            },
          },
        ]
      }
      
      setMosques(mosquesWithPrayers)
      setIsBottomSheetOpen(true)
    } catch (error) {
      console.error('Error loading mosques:', error)
      // Set mock data on error
      setMosques([
        {
          id: 'mock-1',
          name: 'Unnamed Mosque',
          lat: lat + 0.01,
          lon: lon - 0.01,
          distance: 1.02,
          prayerTimes: {
            fajr: '05:30',
            dhuhr: '12:45',
            asr: '15:30',
            maghrib: '18:15',
            isha: '19:45',
          },
        },
        {
          id: 'mock-2',
          name: 'Fatima-Zohra',
          lat: lat - 0.015,
          lon: lon + 0.01,
          address: '2012 Rue Saint-Dominique',
          distance: 1.14,
          prayerTimes: {
            fajr: '05:30',
            dhuhr: '12:45',
            asr: '15:30',
            maghrib: '18:15',
            isha: '19:45',
          },
        },
      ])
      setIsBottomSheetOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectMosque = (mosque: Mosque) => {
    setSelectedMosque(mosque)
    setMapCenter([mosque.lat, mosque.lon])
    setMapZoom(16)
  }

  const handleRecenterOnUser = () => {
    if (location.latitude && location.longitude) {
      setMapCenter([location.latitude, location.longitude])
      setMapZoom(14)
      setSelectedMosque(null)
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

        {/* Mosque markers */}
        {mosques.map((mosque) => (
          <Marker
            key={mosque.id}
            position={[mosque.lat, mosque.lon]}
            icon={mosqueIcon}
            eventHandlers={{
              click: () => handleSelectMosque(mosque),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{mosque.name}</h3>
                {mosque.address && (
                  <p className="text-sm text-gray-600 mt-1">{mosque.address}</p>
                )}
                {mosque.distance !== undefined && (
                  <p className="text-sm text-gray-500 mt-1">
                    {mosque.distance.toFixed(1)} km away
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
            <span className="text-sm font-medium">Loading mosques...</span>
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
      <MapBottomSheet
        mosques={mosques}
        selectedMosque={selectedMosque}
        onSelectMosque={handleSelectMosque}
        isOpen={isBottomSheetOpen}
        onToggle={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
      />
    </div>
  )
}

