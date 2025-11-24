import { useState, useEffect } from 'react'
import { useLocation } from '../hooks/useLocation'
import { fetchPrayerTimes } from '../api/osmService'
import { getNextPrayer } from '../hooks/useNextPrayerTimer'
import PrayerHeader from '../components/PrayerHeader'
import PrayerTabs from '../components/PrayerTabs'
import PrayerList from '../components/PrayerList'

interface PrayerTimes {
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export default function PrayerTimesScreen() {
  const location = useLocation()
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'times' | 'information' | 'news' | 'calendar'>('times')

  useEffect(() => {
    loadPrayerTimes()
  }, [location.latitude, location.longitude])

  const loadPrayerTimes = async () => {
    if (location.latitude && location.longitude) {
      setLoading(true)
      try {
        const times = await fetchPrayerTimes(location.latitude, location.longitude)
        setPrayerTimes(times)
      } catch (error) {
        console.error('Error fetching prayer times:', error)
      } finally {
        setLoading(false)
      }
    } else {
      // Use fallback prayer times even without location
      setPrayerTimes({
        fajr: '05:30',
        dhuhr: '12:15',
        asr: '15:45',
        maghrib: '18:20',
        isha: '19:52',
      })
      setLoading(false)
    }
  }

  // Get current Hijri and Gregorian dates
  const getFormattedDates = () => {
    const now = new Date()
    const gregorian = now.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
    
    // Mock Hijri date (in production, use proper Hijri calendar library)
    const hijriDate = '3 Jumadal Akhira 1447'
    
    return { hijriDate, gregorian }
  }

  const { hijriDate, gregorian } = getFormattedDates()

  // Get next prayer
  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null

  // Prepare prayer list
  const prayerList = prayerTimes ? [
    {
      name: 'Fajr',
      time: prayerTimes.fajr,
      iqamah: '6:10 AM',
      isNext: nextPrayer?.name === 'Fajr',
    },
    {
      name: 'Dhuhr',
      time: prayerTimes.dhuhr,
      iqamah: '12:30 PM',
      isNext: nextPrayer?.name === 'Dhuhr',
    },
    {
      name: 'Asr',
      time: prayerTimes.asr,
      iqamah: '3:00 PM',
      isNext: nextPrayer?.name === 'Asr',
    },
    {
      name: 'Maghrib',
      time: prayerTimes.maghrib,
      iqamah: '+5',
      isNext: nextPrayer?.name === 'Maghrib',
    },
    {
      name: 'Isha',
      time: prayerTimes.isha,
      iqamah: '8:00 PM',
      isNext: nextPrayer?.name === 'Isha',
    },
  ] : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Countdown */}
      <PrayerHeader
        mosqueName="Your Local Mosque"
        nextPrayerName={nextPrayer?.name || 'Fajr'}
        nextPrayerTime={nextPrayer?.time || '05:30'}
        hijriDate={hijriDate}
        gregorianDate={gregorian}
      />

      {/* Tabs */}
      <PrayerTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === 'times' && prayerList.length > 0 && (
        <PrayerList prayers={prayerList} />
      )}

      {activeTab === 'information' && (
        <div className="p-6 text-center text-gray-500">
          <p>Information section coming soon</p>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="p-6 text-center text-gray-500">
          <p>News section coming soon</p>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="p-6 text-center text-gray-500">
          <p>Calendar section coming soon</p>
        </div>
      )}
    </div>
  )
}

