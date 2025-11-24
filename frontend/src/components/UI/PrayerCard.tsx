interface PrayerCardProps {
  name: string
  time: string
  isNext?: boolean
  isActive?: boolean
}

export default function PrayerCard({ name, time, isNext = false, isActive = false }: PrayerCardProps) {
  return (
    <div
      className={`card transition-all duration-200 ${
        isActive ? 'bg-primary text-white' : isNext ? 'bg-accent/10 border-2 border-accent' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
          {isNext && <p className="text-xs text-accent mt-1">Next Prayer</p>}
        </div>
        <div className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-primary'}`}>
          {time}
        </div>
      </div>
    </div>
  )
}

