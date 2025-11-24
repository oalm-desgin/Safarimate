import { Mosque } from '../api/osmService'
import { MapPin, Navigation } from 'lucide-react'

interface MosqueCardProps {
  mosque: Mosque
  isSelected: boolean
  onSelect: () => void
}

export default function MosqueCard({ mosque, isSelected, onSelect }: MosqueCardProps) {
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
        {/* Mosque Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">
            {mosque.name}
          </h3>
          
          {mosque.address && (
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{mosque.address}</span>
            </div>
          )}
          
          {mosque.distance !== undefined && (
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
              <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{mosque.distance.toFixed(1)} km away</span>
            </div>
          )}

          {/* Prayer Times */}
          {mosque.prayerTimes && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {Object.entries(mosque.prayerTimes).map(([name, time]) => (
                <div key={name} className="text-center">
                  <div className="text-xs text-gray-500 capitalize">{name}</div>
                  <div className="text-sm font-medium text-gray-900">{time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

