import { useNextPrayerTimer } from '../hooks/useNextPrayerTimer'

interface PrayerHeaderProps {
  mosqueName: string
  nextPrayerName: string
  nextPrayerTime: string
  hijriDate: string
  gregorianDate: string
}

export default function PrayerHeader({
  mosqueName,
  nextPrayerName,
  nextPrayerTime,
  hijriDate,
  gregorianDate,
}: PrayerHeaderProps) {
  const timer = useNextPrayerTimer(nextPrayerTime)

  return (
    <div className="relative bg-gradient-to-br from-[#1a4d2e] via-[#2d5f3e] to-[#1a4d2e] text-white p-6 rounded-b-3xl shadow-2xl">
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 rounded-b-3xl overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="mosque-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 10 L60 40 L40 40 Z M35 45 H65 V85 H35 Z M45 50 H55 V85 H45 Z" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mosque-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Mosque Name */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold opacity-90">{mosqueName}</h1>
        </div>

        {/* Next Prayer Countdown */}
        <div className="text-center mb-6">
          <p className="text-sm opacity-80 mb-2">{nextPrayerName} in</p>
          <div className="text-5xl font-bold tracking-wider">
            {timer.formatted.substring(0, 5)}
          </div>
        </div>

        {/* Date Information */}
        <div className="flex justify-center items-center gap-4 text-sm opacity-80">
          <span>{hijriDate}</span>
          <span className="text-white/40">|</span>
          <span>{gregorianDate}</span>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  )
}

