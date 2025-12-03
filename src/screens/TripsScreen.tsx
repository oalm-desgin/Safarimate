import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTravelStore } from '../store/travelStore'
import IslamicPattern from '../components/UI/IslamicPattern'
import { MapPin, Globe, Plane, ChevronRight, Upload } from 'lucide-react'
import { getCityImageUrl, cityNeedsImage } from '../data/cityData'

const COUNTRIES = [
  'Saudi Arabia', 'United Arab Emirates', 'Turkey', 'Egypt', 'Morocco',
  'Indonesia', 'Malaysia', 'Pakistan', 'Qatar', 'Jordan',
  'United States', 'United Kingdom', 'Canada', 'France', 'Germany'
].sort()

const POPULAR_CITIES = [
  { name: 'Mecca', country: 'Saudi Arabia' },
  { name: 'Medina', country: 'Saudi Arabia' },
  { name: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Abu Dhabi', country: 'United Arab Emirates' },
  { name: 'Istanbul', country: 'Turkey' },
  { name: 'Cairo', country: 'Egypt' },
  { name: 'Marrakech', country: 'Morocco' },
  { name: 'Kuala Lumpur', country: 'Malaysia' },
  { name: 'Jakarta', country: 'Indonesia' },
  { name: 'Doha', country: 'Qatar' },
]

export default function TripsScreen() {
  const navigate = useNavigate()
  const { homeCountry, destinationCity, destinationCountry, setHomeCountry, setDestination, clearDestination, hasActiveTrip } = useTravelStore()
  
  const [selectedCountry, setSelectedCountry] = useState(homeCountry || '')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDestCountry, setSelectedDestCountry] = useState('')
  const [showCityInput, setShowCityInput] = useState(false)

  const handleSetHomeCountry = () => {
    if (selectedCountry) {
      setHomeCountry(selectedCountry)
    }
  }

  const handlePlanTrip = () => {
    if (selectedCity && selectedDestCountry) {
      setDestination(selectedCity, selectedDestCountry)
      navigate('/welcome')
    }
  }

  const handleCitySelect = (city: string, country: string) => {
    setSelectedCity(city)
    setSelectedDestCountry(country)
  }

  // If there's an active trip, show quick access
  if (hasActiveTrip() && destinationCity) {
    return (
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="islamic-header px-6 py-10 relative mb-6">
          <IslamicPattern />
          <div className="relative z-20">
            <h1 className="text-3xl font-bold text-white mb-2">Active Trip</h1>
            <p className="text-gray-300 text-sm">Continue your journey</p>
          </div>
        </div>

        <div className="px-6 space-y-4">
          {/* Active Trip Card with City Image */}
          <div className="relative h-48 rounded-islamic overflow-hidden border-2 border-gold shadow-islamic">
            {/* City Background Image */}
            <img 
              src={getCityImageUrl(destinationCity)} 
              alt={destinationCity}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div className="flex items-center gap-3">
                <Plane className="w-8 h-8 text-gold" strokeWidth={1.5} />
                <div>
                  <h2 className="text-3xl font-bold text-gold">{destinationCity}</h2>
                  <p className="text-white text-sm">{destinationCountry}</p>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/travel-dashboard')}
                className="w-full bg-gold text-primary font-bold py-3 px-6 rounded-islamic flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
              >
                <span>View Travel Dashboard</span>
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Plan New Trip */}
          <button
            onClick={() => {
              clearDestination()
              setSelectedCity('')
              setSelectedDestCountry('')
            }}
            className="w-full btn-secondary"
          >
            Plan a New Trip
          </button>
        </div>
      </div>
    )
  }

  // If no home country set, show country selection
  if (!homeCountry) {
    return (
      <div className="min-h-screen pb-20">
        <div className="islamic-header px-6 py-10 relative mb-6">
          <IslamicPattern />
          <div className="relative z-20">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to SafariMate</h1>
            <p className="text-gray-300 text-sm">Let's get started with your home country</p>
          </div>
        </div>

        <div className="px-6">
          <div className="card-lg mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-wrapper-gold">
                <Globe className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-white">Select Home Country</h3>
                <p className="text-sm text-gray-300">Where are you traveling from?</p>
              </div>
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-islamic bg-primary-dark border border-gold/30 text-white focus:outline-none focus:ring-2 focus:ring-gold mb-4"
            >
              <option value="">Choose your country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <button
              onClick={handleSetHomeCountry}
              disabled={!selectedCountry}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show destination selection
  return (
    <div className="min-h-screen pb-20">
      <div className="islamic-header px-6 py-10 relative mb-6">
        <IslamicPattern />
        <div className="relative z-20">
          <h1 className="text-3xl font-bold text-white mb-2">Plan Your Trip</h1>
          <p className="text-gray-300 text-sm">Where would you like to go?</p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Home Country Display */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs text-gray-400">Home Country</p>
                <p className="font-medium text-white">{homeCountry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div>
          <h3 className="font-bold text-white mb-3 px-2">Popular Destinations</h3>
          <div className="space-y-2">
            {POPULAR_CITIES.map((city) => (
              <div
                key={`${city.name}-${city.country}`}
                onClick={() => handleCitySelect(city.name, city.country)}
                className={`relative h-24 rounded-islamic overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedCity === city.name && selectedDestCountry === city.country
                    ? 'ring-2 ring-gold'
                    : ''
                }`}
              >
                {/* City Background Image */}
                <img 
                  src={getCityImageUrl(city.name)} 
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gold" strokeWidth={1.5} />
                    <div className="text-left">
                      <p className="font-bold text-white text-lg">{city.name}</p>
                      <p className="text-sm text-gray-200">{city.country}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom City Input */}
        {showCityInput && (
          <div className="card-lg">
            <h3 className="font-bold text-white mb-4">Enter Custom Destination</h3>
            <input
              type="text"
              placeholder="City name"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-islamic bg-primary-dark border border-gold/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold mb-3"
            />
            <select
              value={selectedDestCountry}
              onChange={(e) => setSelectedDestCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-islamic bg-primary-dark border border-gold/30 text-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        )}

        {!showCityInput && (
          <button
            onClick={() => setShowCityInput(true)}
            className="w-full btn-secondary"
          >
            Enter Custom Destination
          </button>
        )}

        {/* Plan Trip Button */}
        {selectedCity && selectedDestCountry && (
          <button
            onClick={handlePlanTrip}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Plane className="w-5 h-5" strokeWidth={1.5} />
            <span>Start Journey to {selectedCity}</span>
          </button>
        )}
      </div>
    </div>
  )
}
