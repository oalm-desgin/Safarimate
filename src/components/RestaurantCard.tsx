import { HalalPlace } from '../api/osmService'
import { MapPin, Navigation, Star } from 'lucide-react'

interface RestaurantCardProps {
  place: HalalPlace
  isSelected: boolean
  onSelect: () => void
}

export default function RestaurantCard({ place, isSelected, onSelect }: RestaurantCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`card cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-2 border-gold shadow-gold'
          : 'border border-gold/20 hover:shadow-gold'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Restaurant Icon */}
        <div className="flex-shrink-0">
          <div className="icon-wrapper-gold">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="flex-grow">
          <h3 className="font-semibold text-white text-lg">{place.name}</h3>
          {place.cuisine && (
            <p className="text-sm text-gray-300 mt-1">{place.cuisine}</p>
          )}
          {place.address && (
            <p className="text-sm text-gray-300 flex items-center mt-1">
              <MapPin size={14} className="mr-1 flex-shrink-0" strokeWidth={1.5} />
              {place.address}
            </p>
          )}
          {place.distance !== undefined && (
            <p className="text-sm text-gray-400 mt-1">
              {(place.distance * 1000).toFixed(0)} meters away
            </p>
          )}
          {place.rating && (
            <div className="flex items-center mt-2 text-gold">
              <Star size={16} fill="currentColor" stroke="none" />
              <span className="ml-1 text-sm font-medium">{place.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Navigation Button */}
        <div className="flex-shrink-0 self-center">
          <button className="p-2 rounded-islamic bg-gold/10 text-gold hover:bg-gold hover:text-primary-dark transition-colors">
            <Navigation size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
