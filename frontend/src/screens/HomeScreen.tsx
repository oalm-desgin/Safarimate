import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import HeaderGradient from '../components/UI/HeaderGradient'
import FeatureCard from '../components/UI/FeatureCard'
import PrayerCard from '../components/UI/PrayerCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { MapPin, Clock, Calendar, Compass } from 'lucide-react'
import placesApi from '../api/placesApi'
import { getTodayPrayerTimes } from '../api/prayerApi'

interface Place {
  id: string
  name: string
  type: string
  address: string
  rating?: number
  distanceMeters?: number
}

interface PrayerTime {
  name: string
  time: string
  isNext?: boolean
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [places, setPlaces] = useState<Place[]>([])
  const [loadingPlaces, setLoadingPlaces] = useState(false)
  const [placesError, setPlacesError] = useState<string | null>(null)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [prayerLoading, setPrayerLoading] = useState(false)
  const [prayerError, setPrayerError] = useState('')

  useEffect(() => {
    fetchNearbyPlaces()
    fetchPrayerTimes()
  }, [])

  const fetchNearbyPlaces = async () => {
    setLoadingPlaces(true)
    setPlacesError(null)

    try {
      const res = await placesApi.get<Place[]>('/places/nearby')
      setPlaces(res.data)
    } catch (err: any) {
      setPlacesError(
        err.response?.data?.message ??
          err.message ??
          'Failed to load nearby places'
      )
    } finally {
      setLoadingPlaces(false)
    }
  }

  async function fetchPrayerTimes() {
    setPrayerLoading(true)
    setPrayerError('')
    try {
      // Default to Makkah coordinates (21.3891, 39.8579)
      const lat = 21.3891
      const lng = 39.8579
      const response = await getTodayPrayerTimes(lat, lng)
      const data = response.data

      // Map the response to prayer times array
      const prayers: PrayerTime[] = []
      if (data.fajr) prayers.push({ name: 'Fajr', time: formatTime(data.fajr) })
      if (data.dhuhr) prayers.push({ name: 'Dhuhr', time: formatTime(data.dhuhr) })
      if (data.asr) prayers.push({ name: 'Asr', time: formatTime(data.asr) })
      if (data.maghrib) prayers.push({ name: 'Maghrib', time: formatTime(data.maghrib) })
      if (data.isha) prayers.push({ name: 'Isha', time: formatTime(data.isha) })

      // Mark the next prayer
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      
      let nextPrayerIndex = -1
      for (let i = 0; i < prayers.length; i++) {
        const [hours, minutes] = prayers[i].time.split(':').map(Number)
        const prayerTime = hours * 60 + minutes
        if (prayerTime > currentTime) {
          nextPrayerIndex = i
          break
        }
      }

      if (nextPrayerIndex >= 0) {
        prayers[nextPrayerIndex].isNext = true
      }

      setPrayerTimes(prayers)
    } catch (err: any) {
      setPrayerError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load prayer times'
      )
      setPrayerTimes([])
    } finally {
      setPrayerLoading(false)
    }
  }

  function formatTime(time: string | Date): string {
    if (typeof time === 'string') {
      // If it's already formatted, return as is
      if (time.includes(':')) {
        return time.substring(0, 5) // Return HH:MM format
      }
    }
    // If it's a Date object or ISO string, format it
    const date = new Date(time)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderGradient
        title={`Assalamu Alaikum, ${user?.name || 'Traveler'}`}
        subtitle="Your journey companion"
      />
      
      <div className="px-6 py-6 space-y-6">
        {/* Feature Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard
              icon={MapPin}
              title="Nearby Mosques Map"
              description="Interactive map view"
              onClick={() => navigate('/map')}
            />
            <FeatureCard
              icon={Clock}
              title="Prayer Times"
              description="Today's schedule"
              onClick={() => navigate('/prayer')}
            />
            <FeatureCard
              icon={Compass}
              title="Qibla"
              description="Find direction"
              onClick={() => navigate('/prayer')}
            />
            <FeatureCard
              icon={Calendar}
              title="Trip Planner"
              description="Plan your journey"
              onClick={() => navigate('/trips')}
            />
          </div>
        </div>

        {/* Halal Places */}
        <section className="mt-4">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Halal Places
          </h2>

          {loadingPlaces && (
            <p className="text-sm text-gray-500">Loading nearby places...</p>
          )}

          {placesError && (
            <p className="text-sm text-red-500">{placesError}</p>
          )}

          {!loadingPlaces && !placesError && places.length === 0 && (
            <p className="text-sm text-gray-500">No places found nearby.</p>
          )}

          <div className="mt-2 space-y-3">
            {places.map((place) => (
              <div
                key={place.id}
                className="rounded-xl bg-white p-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {place.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {place.type} • {place.address}
                    </p>
                  </div>
                  {place.rating && (
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                      {place.rating.toFixed(1)} ★
                    </span>
                  )}
                </div>
                {place.distanceMeters !== undefined && (
                  <p className="mt-1 text-xs text-gray-500">
                    {(place.distanceMeters / 1000).toFixed(1)} km away
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Prayer Times Card */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Prayers</h2>
          {prayerLoading && <Loading message="Loading prayer times..." />}
          {prayerError && <ErrorMessage message={prayerError} />}
          {!prayerLoading && !prayerError && prayerTimes.length === 0 && (
            <div className="text-center py-4 text-gray-600">No prayer times available</div>
          )}
          {!prayerLoading && prayerTimes.length > 0 && (
            <div className="space-y-3">
              {prayerTimes.map((prayer, index) => (
                <PrayerCard
                  key={prayer.name}
                  name={prayer.name}
                  time={prayer.time}
                  isNext={prayer.isNext}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

