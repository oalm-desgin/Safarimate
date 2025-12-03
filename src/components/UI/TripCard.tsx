import { Calendar, MapPin } from 'lucide-react'

interface TripCardProps {
  name: string
  origin?: string
  destination?: string
  city?: string
  country?: string
  date?: string
  startDate?: string
  endDate?: string
  onClick?: () => void
}

export default function TripCard({
  name,
  origin,
  destination,
  city,
  country,
  date,
  startDate,
  endDate,
  onClick,
}: TripCardProps) {
  const displayDate = date || startDate || 'No date'

  return (
    <div
      onClick={onClick}
      className="card cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
    >
      <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
      {origin && destination && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {origin} → {destination}
          </span>
        </div>
      )}
      {!origin && (city || country) && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {city}
            {country && `, ${country}`}
          </span>
        </div>
      )}
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-1" />
        <span>
          {displayDate}
          {endDate && endDate !== startDate && ` - ${endDate}`}
        </span>
      </div>
    </div>
  )
}
