import { useState, useEffect } from 'react'

interface LocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
  hasPermission: boolean
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
    hasPermission: false,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
        loading: false,
        hasPermission: false,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
          hasPermission: true,
        })
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }

        setLocation({
          latitude: null,
          longitude: null,
          error: errorMessage,
          loading: false,
          hasPermission: false,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }, [])

  const requestPermission = () => {
    setLocation((prev) => ({ ...prev, loading: true }))
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
          hasPermission: true,
        })
      },
      (error) => {
        setLocation({
          latitude: null,
          longitude: null,
          error: 'Location permission denied',
          loading: false,
          hasPermission: false,
        })
      }
    )
  }

  return { ...location, requestPermission }
}

