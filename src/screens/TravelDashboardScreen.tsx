import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTravelStore } from '../store/travelStore'
import IslamicPattern from '../components/UI/IslamicPattern'
import {
  Clock,
  DollarSign,
  CloudRain,
  Phone,
  Calendar as CalendarIcon,
  MapPin,
  ArrowLeft,
  Info,
} from 'lucide-react'
import { DateTime } from 'luxon'
import { getCityData, getCityImageUrl } from '../data/cityData'

export default function TravelDashboardScreen() {
  const navigate = useNavigate()
  const { destinationCity, destinationCountry, homeCountry, clearDestination } = useTravelStore()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (!destinationCity) {
      navigate('/trips')
      return
    }

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [destinationCity, navigate])

  // Mock data (in production, fetch from APIs)
  // Get city data
  const cityInfo = getCityData(destinationCity || '')
  
  // Get home timezone (using browser's timezone)
  const homeTimezone = DateTime.local().zoneName
  const destTimezone = cityInfo?.timezone || 'UTC'

  // Get current times in both zones
  const homeTime = DateTime.now().setZone(homeTimezone)
  const destTime = DateTime.now().setZone(destTimezone)

  // Calculate time difference in hours using Luxon's diff
  const timeDiff = Math.round(destTime.diff(homeTime, 'hours').hours)

  const formatTime = (dateTime: DateTime) => {
    return dateTime.toFormat('hh:mm:ss a')
  }

  const getTimeDifferenceText = () => {
    const roundedDiff = Math.round(timeDiff)
    if (roundedDiff === 0) return 'Same time zone'
    if (roundedDiff > 0) return `+${Math.abs(roundedDiff)} hours ahead`
    return `${Math.abs(roundedDiff)} hours behind`
  }

  // Mock weather data (in production, use weather API)
  const getWeather = () => {
    const weatherData: { [key: string]: string } = {
      'Mecca': '35°C Sunny',
      'Medina': '33°C Partly Cloudy',
      'Dubai': '38°C Hot',
      'Abu Dhabi': '37°C Hot',
      'Istanbul': '22°C Pleasant',
      'Cairo': '30°C Warm',
      'Marrakech': '28°C Sunny',
      'Kuala Lumpur': '32°C Humid',
      'Jakarta': '31°C Tropical',
      'Doha': '36°C Hot',
    }
    return weatherData[destinationCity || ''] || '25°C'
  }

  const handleEndTrip = () => {
    if (window.confirm('Are you sure you want to end this trip?')) {
      clearDestination()
      navigate('/trips')
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header with City Banner Image */}
      <div className="relative h-64 overflow-hidden mb-6">
        {/* City Background Image */}
        <img 
          src={getCityImageUrl(destinationCity || '')} 
          alt={destinationCity}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0">
          <IslamicPattern opacity={0.1} />
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-between px-6 py-8">
          <button
            onClick={() => navigate('/trips')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors self-start"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            <span>Back to Trips</span>
          </button>
          
          <div>
            <h1 className="text-4xl font-bold text-gold mb-2">{destinationCity}</h1>
            <p className="text-white text-lg">{destinationCountry}</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Time Comparison */}
        <div className="card-lg border-2 border-gold/30">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" strokeWidth={1.5} />
            Time Zones
          </h3>
          
          <div className="space-y-3">
            {/* Destination Time */}
            <div className="flex items-center justify-between p-3 bg-primary-dark rounded-islamic">
              <div>
                <p className="text-sm text-gray-300">Local Time</p>
                <p className="text-2xl font-bold text-gold">{formatTime(destTime)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{destinationCity}</p>
              </div>
            </div>

            {/* Time Difference */}
            <div className="flex items-center justify-center">
              <div className="px-4 py-2 bg-gold/20 rounded-full">
                <p className="text-sm font-medium text-gold">{getTimeDifferenceText()}</p>
              </div>
            </div>

            {/* Home Time */}
            <div className="flex items-center justify-between p-3 bg-primary-dark/50 rounded-islamic">
              <div>
                <p className="text-sm text-gray-400">Home Time</p>
                <p className="text-xl font-medium text-gray-300">{formatTime(homeTime)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{homeCountry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Information */}
        <div>
          <h3 className="font-bold text-white mb-3 px-2">Essential Information</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Currency */}
            <div className="card">
              <DollarSign className="w-6 h-6 text-gold mb-2" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 mb-1">Currency</p>
              <p className="text-sm font-medium text-white">
                {cityInfo?.currency || 'Data not available'}
              </p>
            </div>

            {/* Weather */}
            <div className="card">
              <CloudRain className="w-6 h-6 text-gold mb-2" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 mb-1">Weather</p>
              <p className="text-sm font-medium text-white">{getWeather()}</p>
            </div>

            {/* Emergency */}
            <div className="card">
              <Phone className="w-6 h-6 text-gold mb-2" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 mb-1">Emergency</p>
              <p className="text-sm font-medium text-white">
                {cityInfo?.emergency || 'Data not available'}
              </p>
            </div>

            {/* Weekend */}
            <div className="card">
              <CalendarIcon className="w-6 h-6 text-gold mb-2" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 mb-1">Weekend</p>
              <p className="text-sm font-medium text-white">
                {cityInfo?.weekend || 'Data not available'}
              </p>
            </div>
          </div>
        </div>

        {/* Explore City Button */}
        <button
          onClick={() => navigate('/places')}
          className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
        >
          <MapPin className="w-6 h-6" strokeWidth={1.5} />
          <span>Explore {destinationCity}</span>
        </button>

        {/* Info Box */}
        <div className="card bg-primary-dark/50">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-gray-300">
              The Places tab now shows services and locations in {destinationCity}. 
              Browse mosques, restaurants, and more in your destination city.
            </p>
          </div>
        </div>

        {/* End Trip Button */}
        <button
          onClick={handleEndTrip}
          className="w-full btn-secondary text-red-400 border-red-400/30 hover:bg-red-500/10"
        >
          End Trip
        </button>
      </div>
    </div>
  )
}

