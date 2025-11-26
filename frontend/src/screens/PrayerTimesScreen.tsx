import { useState, useEffect } from 'react'
import { useLocation } from '../hooks/useLocation'
import PrayerHeader from '../components/PrayerHeader'
import PrayerList from '../components/PrayerList'
import { useTravelStore } from '../store/travelStore'
import { getCityCoordinates } from '../data/cityData'
import CalligraphyPattern from '../components/UI/CalligraphyPattern'

interface PrayerTime {
  name: string
  time: string
  iqamah?: string
  isNext?: boolean
}

export default function PrayerTimesScreen() {
  const location = useLocation()
  const { destinationCity, hasActiveTrip } = useTravelStore()
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [loading, setLoading] = useState(true)
  const [locationName, setLocationName] = useState('Your Local Mosque')

  useEffect(() => {
    loadPrayerTimes()
  }, [location.latitude, location.longitude, destinationCity])

  const loadPrayerTimes = async () => {
    let lat: number = 45.5017 // Montreal fallback
    let lng: number = -73.5673
    let locName = 'Your Local Mosque'

    // Priority: Use destination coordinates if trip is active
    if (hasActiveTrip() && destinationCity) {
      const destCoords = getCityCoordinates(destinationCity)
      if (destCoords) {
        lat = destCoords.lat
        lng = destCoords.lng
        locName = `${destinationCity} Mosque`
      }
    } else if (location.latitude && location.longitude) {
      // Use GPS location
      lat = location.latitude
      lng = location.longitude
      locName = 'Your Local Mosque'
    }

    setLocationName(locName)
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}`
      )
      const data = await response.json()

      if (data.code === 200) {
        const times = data.data.timings
        const formattedPrayers: PrayerTime[] = [
          { name: 'Fajr', time: times.Fajr, iqamah: '+10 min' },
          { name: 'Dhuhr', time: times.Dhuhr, iqamah: '+15 min' },
          { name: 'Asr', time: times.Asr, iqamah: '+10 min' },
          { name: 'Maghrib', time: times.Maghrib, iqamah: '+5 min' },
          { name: 'Isha', time: times.Isha, iqamah: '+15 min' },
        ]

        // Determine next prayer
        const now = new Date()
        let nextPrayerFound = false

        for (const prayer of formattedPrayers) {
          const [hours, minutes] = prayer.time.split(':').map(Number)
          const prayerTime = new Date(now)
          prayerTime.setHours(hours, minutes, 0, 0)

          if (!nextPrayerFound && prayerTime > now) {
            prayer.isNext = true
            nextPrayerFound = true
          }
        }

        // If no next prayer found today, mark Fajr as next
        if (!nextPrayerFound && formattedPrayers.length > 0) {
          formattedPrayers[0].isNext = true
        }

        setPrayerTimes(formattedPrayers)
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error)
      // Fallback times
      setPrayerTimes([
        { name: 'Fajr', time: '05:30', iqamah: '+10 min', isNext: false },
        { name: 'Dhuhr', time: '12:15', iqamah: '+15 min', isNext: false },
        { name: 'Asr', time: '15:45', iqamah: '+10 min', isNext: true },
        { name: 'Maghrib', time: '18:20', iqamah: '+5 min', isNext: false },
        { name: 'Isha', time: '19:52', iqamah: '+15 min', isNext: false },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <CalligraphyPattern opacity={0.15} />
        <div className="relative z-10">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 relative">
      <CalligraphyPattern opacity={0.15} />
      
      <div className="relative z-10">
        <PrayerHeader
          mosqueName={locationName}
          prayerTimes={prayerTimes}
        />

        {!loading && prayerTimes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white px-6">
            <p className="text-lg text-center">No prayer times available.</p>
          </div>
        )}

        {!loading && prayerTimes.length > 0 && <PrayerList prayers={prayerTimes} />}
      </div>
    </div>
  )
}
