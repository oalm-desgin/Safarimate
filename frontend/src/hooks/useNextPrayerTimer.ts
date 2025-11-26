import { useState, useEffect } from 'react'

interface PrayerTime {
  name: string
  time: string
}

interface NextPrayerInfo {
  name: string
  time: string
  diffMs: number
}

// Function to get the next prayer time and its difference in milliseconds
export const getNextPrayer = (prayerTimes: PrayerTime[]): NextPrayerInfo | null => {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  let nextPrayer: NextPrayerInfo | null = null
  let minDiff = Infinity

  for (const prayer of prayerTimes) {
    if (!prayer.time || typeof prayer.time !== 'string') continue
    
    const [hours, minutes] = prayer.time.split(':').map(Number)
    if (isNaN(hours) || isNaN(minutes)) continue
    
    const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0)

    // If prayer time has already passed today, consider it for tomorrow
    if (prayerDate.getTime() < now.getTime()) {
      prayerDate.setDate(prayerDate.getDate() + 1)
    }

    const diffMs = prayerDate.getTime() - now.getTime()

    if (diffMs > 0 && diffMs < minDiff) {
      minDiff = diffMs
      nextPrayer = {
        name: prayer.name,
        time: prayer.time,
        diffMs: diffMs,
      }
    }
  }

  return nextPrayer
}

export const useNextPrayerTimer = (initialPrayerTimes: PrayerTime[]) => {
  const [nextPrayer, setNextPrayer] = useState<NextPrayerInfo | null>(null)
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, formatted: '00:00:00' })

  const updateNextPrayer = () => {
    const newNextPrayer = getNextPrayer(initialPrayerTimes)
    setNextPrayer(newNextPrayer)
  }

  useEffect(() => {
    if (!initialPrayerTimes || initialPrayerTimes.length === 0) return

    updateNextPrayer() // Initial calculation

    const interval = setInterval(() => {
      setNextPrayer((prevNextPrayer) => {
        if (!prevNextPrayer) {
          updateNextPrayer() // Recalculate if no next prayer
          return null
        }

        const newDiffMs = prevNextPrayer.diffMs - 1000
        if (newDiffMs <= 0) {
          updateNextPrayer() // Recalculate when countdown hits 0
          return null
        }
        return { ...prevNextPrayer, diffMs: newDiffMs }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [initialPrayerTimes])

  useEffect(() => {
    if (nextPrayer) {
      const totalSeconds = Math.floor(nextPrayer.diffMs / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const formatted = [hours, minutes, seconds]
        .map((unit) => String(unit).padStart(2, '0'))
        .join(':')

      setCountdown({ hours, minutes, seconds, formatted })
    } else {
      setCountdown({ hours: 0, minutes: 0, seconds: 0, formatted: '00:00:00' })
    }
  }, [nextPrayer])

  return { nextPrayer, countdown }
}
