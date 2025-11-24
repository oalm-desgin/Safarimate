import { HalalPlace } from '../api/osmService'
import RestaurantCard from './RestaurantCard'
import { X } from 'lucide-react'

interface RestaurantBottomSheetProps {
  restaurants: HalalPlace[]
  selectedRestaurant: HalalPlace | null
  onSelectRestaurant: (restaurant: HalalPlace) => void
  isOpen: boolean
  onToggle: () => void
}

export default function RestaurantBottomSheet({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  isOpen,
  onToggle,
}: RestaurantBottomSheetProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
          onClick={onToggle}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-120px)]'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle */}
        <div
          className="flex justify-center p-3 cursor-grab active:cursor-grabbing"
          onClick={onToggle}
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Halal Restaurants</h2>
            <p className="text-sm text-gray-500">{restaurants.length} places found</p>
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Restaurant List */}
        <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: 'calc(85vh - 100px)' }}>
          {restaurants.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No halal restaurants found nearby.</p>
          ) : (
            <div className="space-y-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isSelected={selectedRestaurant?.id === restaurant.id}
                  onSelect={() => onSelectRestaurant(restaurant)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

