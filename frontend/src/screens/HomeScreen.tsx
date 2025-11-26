import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, Plane, User } from 'lucide-react'
import { useTravelStore } from '../store/travelStore'
import { getCityCoordinates } from '../data/cityData'
import { DateTime } from 'luxon'
import CalligraphyPattern from '../components/UI/CalligraphyPattern'

interface PrayerTimes {
  Fajr: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { destinationCity, hasActiveTrip } = useTravelStore()
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null)
  const [currentDate, setCurrentDate] = useState({ hijri: '', gregorian: '' })
  const [userName, setUserName] = useState('Guest')

  useEffect(() => {
    loadPrayerData()
    updateDateTime()
    const interval = setInterval(() => {
      loadPrayerData()
      updateDateTime()
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [destinationCity, hasActiveTrip])

  const loadPrayerData = async () => {
    try {
      let lat = 45.5017
      let lng = -73.5673

      // Use destination coordinates if trip is active
      if (hasActiveTrip() && destinationCity) {
        const destCoords = getCityCoordinates(destinationCity)
        if (destCoords) {
          lat = destCoords.lat
          lng = destCoords.lng
        }
      }

      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}`)
      const data = await response.json()
      
      if (data.code === 200) {
        const times: PrayerTimes = data.data.timings
        calculateNextPrayer(times)
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error)
    }
  }

  const calculateNextPrayer = (times: PrayerTimes) => {
    const now = new Date()
    const prayers = [
      { name: 'Fajr', time: times.Fajr },
      { name: 'Dhuhr', time: times.Dhuhr },
      { name: 'Asr', time: times.Asr },
      { name: 'Maghrib', time: times.Maghrib },
      { name: 'Isha', time: times.Isha },
    ]

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number)
      const prayerTime = new Date(now)
      prayerTime.setHours(hours, minutes, 0, 0)

      if (prayerTime > now) {
        const diff = prayerTime.getTime() - now.getTime()
        const hoursRemaining = Math.floor(diff / (1000 * 60 * 60))
        const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        
        setNextPrayer({
          name: prayer.name,
          time: prayer.time,
          remaining: `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}`
        })
        return
      }
    }

    // If no prayer found today, set to Fajr tomorrow
    setNextPrayer({
      name: 'Fajr',
      time: times.Fajr,
      remaining: 'Tomorrow'
    })
  }

  const updateDateTime = () => {
    const now = DateTime.now()
    const gregorian = now.toFormat('EEEE, MMMM d, yyyy')
    const hijri = '3 Jumada al-Thani 1447 AH' // Mock - use proper Hijri calendar library
    setCurrentDate({ hijri, gregorian })
  }

  return (
    <div className="min-h-screen pb-24 relative">
      <CalligraphyPattern opacity={0.15} />
      
      <div className="relative z-10 px-6 py-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Assalamu Alaikum, {userName}
          </h1>
          <div className="space-y-1">
            <p className="text-sm text-gray-300">{currentDate.gregorian}</p>
            <p className="text-sm text-gold">{currentDate.hijri}</p>
          </div>
        </div>

        {/* Next Prayer Card */}
        {nextPrayer && (
          <div 
            className="rounded-xl p-6 mb-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 79, 69, 0.9) 0%, rgba(10, 46, 41, 0.95) 100%)',
              boxShadow: '0 8px 32px rgba(217, 193, 122, 0.15)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
            <div className="relative z-10">
              <p className="text-sm text-gray-300 mb-2">Next Prayer</p>
              <h2 className="text-4xl font-bold text-white mb-2">{nextPrayer.name}</h2>
              <div className="h-px bg-gold/30 w-16 mb-3" />
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-gold">{nextPrayer.remaining}</p>
                <p className="text-lg text-gray-300">at {nextPrayer.time}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation Grid - 2x2 matching bottom tab bar */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {/* Places */}
          <button
            onClick={() => navigate('/places')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(14, 79, 69, 0.6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(217, 193, 122, 0.15)',
                border: '1px solid rgba(217, 193, 122, 0.3)'
              }}
            >
              <MapPin className="w-8 h-8 text-gold" strokeWidth={1.5} />
            </div>
            <span className="text-white font-semibold text-base">Places</span>
          </button>

          {/* Prayer */}
          <button
            onClick={() => navigate('/prayer-times')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(14, 79, 69, 0.6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(217, 193, 122, 0.15)',
                border: '1px solid rgba(217, 193, 122, 0.3)'
              }}
            >
              <Clock className="w-8 h-8 text-gold" strokeWidth={1.5} />
            </div>
            <span className="text-white font-semibold text-base">Prayer</span>
          </button>

          {/* Trips */}
          <button
            onClick={() => navigate('/trips')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(14, 79, 69, 0.6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(217, 193, 122, 0.15)',
                border: '1px solid rgba(217, 193, 122, 0.3)'
              }}
            >
              <Plane className="w-8 h-8 text-gold" strokeWidth={1.5} />
            </div>
            <span className="text-white font-semibold text-base">Trips</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(14, 79, 69, 0.6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(217, 193, 122, 0.15)',
                border: '1px solid rgba(217, 193, 122, 0.3)'
              }}
            >
              <User className="w-8 h-8 text-gold" strokeWidth={1.5} />
            </div>
            <span className="text-white font-semibold text-base">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
