import { useState, useEffect } from 'react'
import PageTitle from '../components/UI/PageTitle'
import PrayerCard from '../components/UI/PrayerCard'
import QiblaCard from '../components/UI/QiblaCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getQiblaDirection } from '../api/qiblaApi'

export default function PrayerScreen() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null)
  const [qiblaLoading, setQiblaLoading] = useState(false)
  const [qiblaError, setQiblaError] = useState('')

  useEffect(() => {
    fetchQiblaDirection()
  }, [])

  async function fetchQiblaDirection() {
    setQiblaLoading(true)
    setQiblaError('')
    try {
      // Default to Makkah coordinates
      const lat = 21.3891
      const lng = 39.8579
      const response = await getQiblaDirection(lat, lng)
      const angle = response.data?.angle || response.data || 0
      setQiblaAngle(angle)
    } catch (err: any) {
      setQiblaError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load Qibla direction'
      )
      // Fallback angle
      setQiblaAngle(58.5)
    } finally {
      setQiblaLoading(false)
    }
  }

  function getDirectionName(angle: number): string {
    const directions = [
      'N', 'NNE', 'NE', 'ENE',
      'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW',
      'W', 'WNW', 'NW', 'NNW'
    ]
    const index = Math.round(angle / 22.5) % 16
    return directions[index]
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle
        title="Prayer Times"
        subtitle="Today's schedule and Qibla direction"
      />
      
      <div className="px-6 py-4 space-y-6">
        {/* Prayer Times */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Prayers</h2>
          <div className="space-y-3">
            <PrayerCard name="Fajr" time="05:30" />
            <PrayerCard name="Dhuhr" time="12:15" isNext />
            <PrayerCard name="Asr" time="15:45" />
            <PrayerCard name="Maghrib" time="18:20" />
            <PrayerCard name="Isha" time="19:45" />
          </div>
        </div>

        {/* Qibla Direction */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Qibla Direction</h2>
          {qiblaLoading && <Loading message="Loading Qibla direction..." />}
          {qiblaError && <ErrorMessage message={qiblaError} />}
          {!qiblaLoading && qiblaAngle !== null && (
            <QiblaCard
              direction={qiblaAngle}
              directionName={getDirectionName(qiblaAngle)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

