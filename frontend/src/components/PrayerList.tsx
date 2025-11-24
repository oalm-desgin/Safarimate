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

export default function PrayerList({ prayers }: PrayerListProps) {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="px-4 py-4 space-y-3">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={`bg-white rounded-2xl p-5 shadow-sm transition-all ${
              prayer.isNext
                ? 'border-2 border-primary bg-gradient-to-r from-primary/5 to-transparent'
                : 'border border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Prayer Name and Times */}
              <div className="flex-grow">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {prayer.name}
                  </h3>
                  {prayer.isNext && (
                    <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full">
                      Next Prayer
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  {/* Main Time */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {prayer.time.split(':')[0]}
                    </span>
                    <span className="text-3xl font-bold text-gray-900">:</span>
                    <span className="text-3xl font-bold text-gray-900">
                      {prayer.time.split(':')[1]}
                    </span>
                    <span className="text-xs font-medium text-gray-500 ml-1 uppercase">
                      {parseInt(prayer.time.split(':')[0]) < 12 ? 'AM' : 'PM'}
                    </span>
                  </div>

                  {/* Iqamah Time */}
                  {prayer.iqamah && (
                    <div className="text-sm text-gray-600 ml-4">
                      {prayer.iqamah}
                    </div>
                  )}
                </div>
              </div>

              {/* Mute Icon */}
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                <BellOff size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <BellOff size={14} />
            <span>Sunrise 7:14</span>
          </div>
          <span className="text-gray-300">|</span>
          <span>Jum'a 12:00</span>
          <span className="text-gray-300">|</span>
          <span>1:15</span>
        </div>
      </div>
    </div>
  )
}

