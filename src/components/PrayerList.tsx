import { BellOff } from 'lucide-react'

interface PrayerTime {
  name: string
  time: string
  iqamah?: string
  isNext?: boolean
}

interface PrayerListProps {
  prayers: PrayerTime[]
}

// Prayer emoji mapping
const getPrayerEmoji = (prayerName: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Fajr': '🌅',
    'Sunrise': '🌅',
    'Dhuhr': '☀️',
    'Asr': '🌤️',
    'Maghrib': '🌇',
    'Isha': '🌙'
  }
  return emojiMap[prayerName] || '🕌'
}

export default function PrayerList({ prayers }: PrayerListProps) {
  return (
    <div className="px-6 space-y-3 mt-6 pb-24">
      {prayers.map((prayer) => (
        <div
          key={prayer.name}
          className={`rounded-xl p-5 transition-all ${
            prayer.isNext
              ? 'border-2 border-gold'
              : 'border border-gold/10'
          }`}
          style={{
            background: prayer.isNext 
              ? 'rgba(14, 79, 69, 0.9)' 
              : 'rgba(14, 79, 69, 0.5)',
            boxShadow: prayer.isNext 
              ? '0 8px 32px rgba(217, 193, 122, 0.25)' 
              : '0 4px 16px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {/* Prayer Emoji */}
                <span className="text-2xl" style={{ filter: prayer.isNext ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.9)' }}>
                  {getPrayerEmoji(prayer.name)}
                </span>
                
                <h3 className={`text-xl font-bold ${prayer.isNext ? 'text-gold' : 'text-white'}`}>
                  {prayer.name}
                </h3>
                {prayer.isNext && (
                  <span className="text-xs font-medium text-gold px-2 py-1 bg-gold/10 rounded-full">
                    Next
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300 ml-11">{prayer.iqamah || '+10 min'}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className={`text-3xl font-bold ${prayer.isNext ? 'text-gold' : 'text-white'}`}>
                {prayer.time}
              </p>
              <button className="p-2 rounded-full hover:bg-gold/10 transition-colors">
                <BellOff size={20} className="text-gray-400" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
