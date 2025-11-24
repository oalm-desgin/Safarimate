import { HalalPlace } from '../api/osmService'
import { MapPin, Star, Navigation } from 'lucide-react'

interface RestaurantCardProps {
  restaurant: HalalPlace
  isSelected: boolean
  onSelect: () => void
}

export default function RestaurantCard({ restaurant, isSelected, onSelect }: RestaurantCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Restaurant Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
            <svg
              className="w-7 h-7 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-gray-800">{restaurant.name}</h3>
            {restaurant.rating && (
              <div className="flex items-center gap-1 ml-2 px-2 py-1 bg-yellow-50 rounded-lg">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">
                  {restaurant.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {restaurant.cuisine && (
            <p className="text-sm text-gray-600 mt-1 capitalize">
              {restaurant.cuisine} cuisine
            </p>
          )}

          {restaurant.address && (
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              {restaurant.address}
            </p>
          )}

          {restaurant.distance !== undefined && (
            <p className="text-sm text-gray-500 mt-1">
              {(restaurant.distance * 1000).toFixed(0)} meters away
            </p>
          )}
        </div>

        {/* Navigation Button */}
        <div className="flex-shrink-0 self-center">
          <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
            <Navigation size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

