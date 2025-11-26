import { useNavigate } from 'react-router-dom'
import { useTravelStore } from '../store/travelStore'
import { getCityCoordinates } from '../data/cityData'
import { placesCategories } from '../data/placesData'
import CalligraphyPattern from '../components/UI/CalligraphyPattern'

export default function PlacesScreen() {
  const navigate = useNavigate()
  const { destinationCity, hasActiveTrip } = useTravelStore()

  const locationText = hasActiveTrip() && destinationCity
    ? `Services in ${destinationCity}`
    : 'Nearby Places'

  // Get destination coordinates for active trip
  const destinationCoords = destinationCity ? getCityCoordinates(destinationCity) : null

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'mosques') {
      navigate('/places/mosques')
    } else if (categoryId === 'restaurants') {
      navigate('/places/restaurants')
    } else {
      // For other categories, show detail view
      navigate(`/places/${categoryId}`)
    }
  }

  return (
    <div className="min-h-screen pb-24 relative">
      <CalligraphyPattern opacity={0.15} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">{locationText}</h1>
          {hasActiveTrip() && destinationCity && destinationCoords && (
            <p className="text-sm text-gray-400">
              {destinationCoords.lat.toFixed(4)}°, {destinationCoords.lng.toFixed(4)}°
            </p>
          )}
        </div>

        {/* Categories Grid */}
        <div className="px-6 space-y-4">
          {placesCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="w-full rounded-xl overflow-hidden relative h-32 transition-all duration-200 hover:scale-[1.02]"
              style={{
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Background Image */}
              <img 
                src={category.imageUrl} 
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center px-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                  style={{
                    background: 'rgba(217, 193, 122, 0.2)',
                    border: '1px solid rgba(217, 193, 122, 0.4)'
                  }}
                >
                  <category.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
