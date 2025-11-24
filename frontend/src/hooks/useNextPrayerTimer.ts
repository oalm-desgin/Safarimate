import { useState, useEffect } from 'react'

interface PrayerTimes {
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

interface NextPrayer {
  name: string
  time: string
  diffMs: number
}

interface TimerState {
  hours: number
  minutes: number
  seconds: number
  formatted: string
}

// Convert HH:mm time string to Date object for today
function timeToDate(time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

// Get the next prayer based on current time
export function getNextPrayer(prayerTimes: PrayerTimes): NextPrayer | null {
  const now = new Date()
  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ]

  // Find the next prayer after current time
  for (const prayer of prayers) {
    const prayerDate = timeToDate(prayer.time)
    const diffMs = prayerDate.getTime() - now.getTime()

    if (diffMs > 0) {
      return {
        name: prayer.name,
        time: prayer.time,
        diffMs,
      }
    }
  }

  // If no prayer found today, return Fajr for tomorrow
  const tomorrowFajr = timeToDate(prayerTimes.fajr)
  tomorrowFajr.setDate(tomorrowFajr.getDate() + 1)
  const diffMs = tomorrowFajr.getTime() - now.getTime()

  return {
    name: 'Fajr',
    time: prayerTimes.fajr,
    diffMs,
  }
}

// Custom hook for countdown timer
export function useNextPrayerTimer(nextPrayerTime: string | null): TimerState {
  const [timer, setTimer] = useState<TimerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: '00:00:00',
  })

  useEffect(() => {
    if (!nextPrayerTime) return

    const calculateTimer = () => {
      const now = new Date()
      const targetTime = timeToDate(nextPrayerTime)
      let diffMs = targetTime.getTime() - now.getTime()

      // If prayer time has passed today, set it for tomorrow
      if (diffMs < 0) {
        targetTime.setDate(targetTime.getDate() + 1)
        diffMs = targetTime.getTime() - now.getTime()
      }

      if (diffMs <= 0) {
        setTimer({
          hours: 0,
          minutes: 0,
          seconds: 0,
          formatted: '00:00:00',
        })
        return
      }

      const totalSeconds = Math.floor(diffMs / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

      setTimer({
        hours,
        minutes,
        seconds,
        formatted,
      })
    }

    // Calculate immediately
    calculateTimer()

    // Update every second
    const interval = setInterval(calculateTimer, 1000)

    return () => clearInterval(interval)
  }, [nextPrayerTime])

  return timer
}

