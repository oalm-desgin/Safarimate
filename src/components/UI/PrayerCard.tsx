import { Clock } from 'lucide-react'

interface PrayerCardProps {
  name: string
  time: string
  isNext?: boolean
}

export default function PrayerCard({ name, time, isNext }: PrayerCardProps) {
  return (
    <div
      className={`card transition-all duration-300 ${
        isNext ? 'border-2 border-gold shadow-gold' : 'border border-gold/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="icon-wrapper-gold">
            <Clock className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            {isNext && (
              <span className="text-xs text-gold font-medium">Next Prayer</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gold">{time}</p>
        </div>
      </div>
    </div>
  )
}
