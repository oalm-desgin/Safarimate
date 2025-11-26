import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, Clock } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getPlaceCategoryById } from '../data/placesData'
import { useTravelStore } from '../store/travelStore'
import { getCityCoordinates } from '../data/cityData'
import CalligraphyPattern from '../components/UI/CalligraphyPattern'

// Fix for default marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

export default function PlaceCategoryDetailScreen() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { destinationCity } = useTravelStore()
  const category = categoryId ? getPlaceCategoryById(categoryId) : null

  if (!category) {
    return (
      <div className="min-h-screen pb-24 relative flex items-center justify-center">
        <CalligraphyPattern opacity={0.15} />
        <div className="relative z-10 text-center px-6">
          <p className="text-lg text-white">Category not found</p>
          <button
            onClick={() => navigate('/places')}
            className="mt-4 px-6 py-2 bg-gold text-primary rounded-xl font-medium"
          >
            Back to Places
          </button>
        </div>
      </div>
    )
  }

  const CategoryIcon = category.icon
  
  // Get map center coordinates
  const cityCoords = destinationCity ? getCityCoordinates(destinationCity) : null
  const mapCenter: [number, number] = cityCoords 
    ? [cityCoords.lat, cityCoords.lng] 
    : [45.5017, -73.5673] // Montreal fallback

  // Get places with coordinates
  const placesWithCoords = category.samplePlaces.filter(place => place.coordinates)

  return (
    <div className="min-h-screen pb-24 relative">
      <CalligraphyPattern opacity={0.15} />
      
      <div className="relative z-10">
        {/* Hero Header with City Background */}
        <div 
          className="relative h-48 overflow-hidden"
          style={{
            backgroundImage: `url(${category.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Calligraphy overlay */}
          <div className="absolute inset-0">
            <CalligraphyPattern opacity={0.12} />
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate('/places')}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-primary/80 backdrop-blur-xl flex items-center justify-center z-10"
          >
            <ArrowLeft className="w-5 h-5 text-gold" strokeWidth={1.5} />
          </button>

          {/* Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Discover {category.title}
            </h1>
            {destinationCity && (
              <p className="text-lg text-gold">in {destinationCity}</p>
            )}
            <div className="h-0.5 w-16 bg-gold/60 mt-3" />
          </div>
        </div>

        {/* Map Section */}
        {placesWithCoords.length > 0 && (
          <div className="h-48 relative">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {placesWithCoords.map((place, index) => (
                place.coordinates && (
                  <Marker
                    key={index}
                    position={[place.coordinates.lat, place.coordinates.lng]}
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{place.name}</p>
                        <p className="text-xs text-gray-600">{place.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        )}

        {/* Places List */}
        <div className="px-6 mt-6 space-y-3">
          {category.samplePlaces.map((place, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(14, 79, 69, 0.6)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex gap-3">
                {/* Thumbnail Image */}
                {place.image && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(217, 193, 122, 0.15)',
                        border: '1px solid rgba(217, 193, 122, 0.3)'
                      }}
                    >
                      <CategoryIcon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">
                        {place.name}
                      </h3>
                      {place.description && (
                        <p className="text-xs text-gray-300 line-clamp-1 mt-1">
                          {place.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                    <MapPin className="w-3 h-3" strokeWidth={1.5} />
                    <span className="truncate">{place.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-gold">
                      <Star className="w-3 h-3 fill-gold" strokeWidth={1.5} />
                      <span className="font-medium">{place.rating}</span>
                    </div>
                    
                    {place.distance !== undefined && (
                      <span className="text-gray-400">
                        {place.distance.toFixed(1)} km
                      </span>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />
                      <span className={place.openNow ? 'text-green-400' : 'text-red-400'}>
                        {place.openNow ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Message */}
        <div className="px-6 mt-6 pb-6">
          <div 
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(14, 79, 69, 0.4)',
              border: '1px solid rgba(217, 193, 122, 0.2)'
            }}
          >
            <p className="text-sm text-gray-300">
              Showing sample data for <span className="text-gold font-medium">{category.title}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Real-time data will be available in the next update
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
