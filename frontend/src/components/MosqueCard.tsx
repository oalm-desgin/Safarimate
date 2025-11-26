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
      className={`card cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-2 border-gold shadow-gold'
          : 'border border-gold/20 hover:shadow-gold'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Mosque Icon */}
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
                d="M6 8v13M18 8v13M4 6h16a2 2 0 012 2v13H2V8a2 2 0 012-2zm0 0V4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v2M10 12h4m-4 4h4"
              />
            </svg>
          </div>
        </div>

        {/* Mosque Info */}
        <div className="flex-grow">
          <h3 className="font-semibold text-white text-lg">{mosque.name}</h3>
          {mosque.address && (
            <p className="text-sm text-gray-300 flex items-center mt-1">
              <MapPin size={14} className="mr-1 flex-shrink-0" strokeWidth={1.5} />
              {mosque.address}
            </p>
          )}
          {mosque.distance !== undefined && (
            <p className="text-sm text-gray-400 mt-1">
              {(mosque.distance * 1000).toFixed(0)} meters away
            </p>
          )}

          {/* Prayer Times */}
          {mosque.prayerTimes && (
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-300 mt-3">
              <div>
                <span className="font-medium text-gold">Fajr:</span> {mosque.prayerTimes.fajr}
              </div>
              <div>
                <span className="font-medium text-gold">Dhuhr:</span> {mosque.prayerTimes.dhuhr}
              </div>
              <div>
                <span className="font-medium text-gold">Asr:</span> {mosque.prayerTimes.asr}
              </div>
              <div>
                <span className="font-medium text-gold">Maghrib:</span> {mosque.prayerTimes.maghrib}
              </div>
              <div>
                <span className="font-medium text-gold">Isha:</span> {mosque.prayerTimes.isha}
              </div>
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
