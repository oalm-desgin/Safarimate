import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTravelStore } from '../store/travelStore'
import IslamicPattern from '../components/UI/IslamicPattern'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { DateTime } from 'luxon'
import { getCityData, getCityImageUrl } from '../data/cityData'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const { destinationCity, destinationCountry, homeCountry } = useTravelStore()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Redirect if no destination
    if (!destinationCity) {
      navigate('/trips')
      return
    }

    // Fade in animation
    setTimeout(() => setIsVisible(true), 100)

    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [destinationCity, navigate])

  // Get city data
  const cityInfo = getCityData(destinationCity || '')
  
  // Get home timezone (using browser's timezone)
  const homeTimezone = DateTime.local().zoneName
  const destTimezone = cityInfo?.timezone || 'UTC'

  // Get current times in both zones
  const homeTime = DateTime.now().setZone(homeTimezone)
  const destTime = DateTime.now().setZone(destTimezone)

  // Calculate time difference in hours using Luxon's diff
  const timeDiff = destTime.diff(homeTime, 'hours').hours

  const formatTime = (dateTime: DateTime) => {
    return dateTime.toFormat('hh:mm a')
  }

  const getHijriDate = () => {
    // Mock Hijri date (in production, use proper Hijri calendar library)
    return '3 Jumada al-Thani 1447 AH'
  }

  const getGregorianDate = () => {
    return destTime.toFormat('EEEE, MMMM d, yyyy')
  }

  const getTimeDifferenceText = () => {
    const roundedDiff = Math.round(timeDiff)
    if (roundedDiff === 0) return 'Same time zone'
    if (roundedDiff > 0) return `+${Math.abs(roundedDiff)} hours ahead`
    return `${Math.abs(roundedDiff)} hours behind`
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Hero Section with City Background Image */}
      <div className="flex-1 relative overflow-hidden">
        {/* City Background Image */}
        <img 
          src={getCityImageUrl(destinationCity || '')} 
          alt={destinationCity}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0">
          <IslamicPattern opacity={0.1} />
        </div>
        
        <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          {/* Main Welcome Message */}
          <div className="mb-8 animate-fade-in">
            <p className="text-gold text-lg font-medium mb-2">Assalamu Alaikum</p>
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to
            </h1>
            <h2 className="text-6xl font-bold text-gold mb-2">
              {destinationCity}
            </h2>
            <p className="text-white/80 text-lg">{destinationCountry}</p>
          </div>

          {/* Time Information */}
          <div className="space-y-4 w-full max-w-md">
            {/* Local Time */}
            <div className="card bg-primary-dark/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  <div className="text-left">
                    <p className="text-sm text-gray-300">Local Time</p>
                    <p className="text-2xl font-bold text-white">{formatTime(destTime)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Home Time */}
            <div className="card bg-primary-dark/60 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold/70" strokeWidth={1.5} />
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Home Time ({homeCountry})</p>
                    <p className="text-xl font-medium text-gray-300">{formatTime(homeTime)}</p>
                  </div>
                </div>
                <div className="text-gold text-sm font-medium">
                  {getTimeDifferenceText()}
                </div>
              </div>
            </div>

            {/* Date Information */}
            <div className="card bg-primary-dark/60 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-sm text-white">{getGregorianDate()}</p>
                  <p className="text-xs text-gray-300 mt-1">{getHijriDate()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-6 bg-gradient-to-t from-background to-transparent">
        <button
          onClick={() => navigate('/travel-dashboard')}
          className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
        >
          <span>Continue</span>
          <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

