import { useNextPrayerTimer } from '../hooks/useNextPrayerTimer'
import { useEffect, useState } from 'react'
import IslamicPattern from './UI/IslamicPattern'

interface PrayerHeaderProps {
  mosqueName: string
  prayerTimes: { name: string; time: string }[]
}

export default function PrayerHeader({ mosqueName, prayerTimes }: PrayerHeaderProps) {
  const { nextPrayer, countdown } = useNextPrayerTimer(prayerTimes)
  const [hijriDate, setHijriDate] = useState('')
  const [gregorianDate, setGregorianDate] = useState('')

  useEffect(() => {
    const today = new Date()
    setGregorianDate(today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    setHijriDate('3 Jumada al-Thani 1447 AH')
  }, [])

  return (
    <div 
      className="relative text-white px-6 py-8 rounded-b-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(14, 79, 69, 0.95) 0%, rgba(10, 46, 41, 1) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <IslamicPattern opacity={0.1} />

      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-gold mb-4">{mosqueName}</h2>

        {/* Countdown Timer */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-2">Next Prayer</p>
          <h3 className="text-3xl font-bold text-white mb-2">
            {nextPrayer?.name || 'Prayer'}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-bold text-gold">
              {countdown?.formatted || '00:00:00'}
            </p>
            {nextPrayer && (
              <p className="text-lg text-gray-300">at {nextPrayer.time}</p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-300 space-y-1 mt-6">
          <p>{gregorianDate}</p>
          <p className="text-gold">{hijriDate}</p>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                nextPrayer && i === prayerTimes.findIndex(p => p.name === nextPrayer.name) 
                  ? 'bg-gold w-8' 
                  : 'bg-gray-500 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
