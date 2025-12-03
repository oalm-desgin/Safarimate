export interface CityData {
  name: string
  country: string
  timezone: string
  currency: string
  emergency: string
  weekend: string
  coordinates: {
    lat: number
    lng: number
  }
  imageUrl: string
}

export const cityData: { [key: string]: CityData } = {
  'Mecca': {
    name: 'Mecca',
    country: 'Saudi Arabia',
    timezone: 'Asia/Riyadh',
    currency: 'SAR (Saudi Riyal)',
    emergency: '112',
    weekend: 'Friday-Saturday',
    coordinates: {
      lat: 21.4225,
      lng: 39.8262
    },
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&q=80'
  },
  'Medina': {
    name: 'Medina',
    country: 'Saudi Arabia',
    timezone: 'Asia/Riyadh',
    currency: 'SAR (Saudi Riyal)',
    emergency: '112',
    weekend: 'Friday-Saturday',
    coordinates: {
      lat: 24.4672,
      lng: 39.6111
    },
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80'
  },
  'Dubai': {
    name: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    currency: 'AED (Dirham)',
    emergency: '999',
    weekend: 'Saturday-Sunday',
    coordinates: {
      lat: 25.2048,
      lng: 55.2708
    },
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80'
  },
  'Abu Dhabi': {
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    currency: 'AED (Dirham)',
    emergency: '999',
    weekend: 'Saturday-Sunday',
    coordinates: {
      lat: 24.4539,
      lng: 54.3773
    },
    imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200&q=80'
  },
  'Istanbul': {
    name: 'Istanbul',
    country: 'Turkey',
    timezone: 'Europe/Istanbul',
    currency: 'TRY (Turkish Lira)',
    emergency: '112',
    weekend: 'Saturday-Sunday',
    coordinates: {
      lat: 41.0082,
      lng: 28.9784
    },
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80'
  },
  'Cairo': {
    name: 'Cairo',
    country: 'Egypt',
    timezone: 'Africa/Cairo',
    currency: 'EGP (Egyptian Pound)',
    emergency: '122',
    weekend: 'Friday-Saturday',
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&q=80'
  },
  'Marrakech': {
    name: 'Marrakech',
    country: 'Morocco',
    timezone: 'Africa/Casablanca',
    currency: 'MAD (Moroccan Dirham)',
    emergency: '19',
    weekend: 'Saturday-Sunday',
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=80'
  },
  'Kuala Lumpur': {
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    timezone: 'Asia/Kuala_Lumpur',
    currency: 'MYR (Malaysian Ringgit)',
    emergency: '999',
    weekend: 'Saturday-Sunday',
    coordinates: {
      lat: 3.1390,
      lng: 101.6869
    },
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80'
  },
  'Jakarta': {
    name: 'Jakarta',
    country: 'Indonesia',
    timezone: 'Asia/Jakarta',
    currency: 'IDR (Indonesian Rupiah)',
    emergency: '112',
    weekend: 'Saturday-Sunday',
    coordinates: {
      lat: -6.2088,
      lng: 106.8456
    },
    imageUrl: '' // User needs to provide image
  },
  'Doha': {
    name: 'Doha',
    country: 'Qatar',
    timezone: 'Asia/Qatar',
    currency: 'QAR (Qatari Riyal)',
    emergency: '999',
    weekend: 'Friday-Saturday',
    coordinates: {
      lat: 25.2854,
      lng: 51.5310
    },
    imageUrl: '' // User needs to provide image
  }
}

// Helper function to get city data
export const getCityData = (cityName: string): CityData | null => {
  return cityData[cityName] || null
}

// Helper function to get city image with placeholder for missing images
export const getCityImageUrl = (cityName: string): string => {
  const data = getCityData(cityName)
  const imageUrl = data?.imageUrl || ''
  
  // If image is missing for Doha or Jakarta, return blurred emerald placeholder
  if (!imageUrl && (cityName === 'Doha' || cityName === 'Jakarta')) {
    // Return a blurred emerald gradient as data URI
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMEEyRTI5O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwNjFFMUE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9InVybCgjZ3JhZCkiLz4KPC9zdmc+'
  }
  
  return imageUrl || 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1200&q=80'
}

// Check if city needs user-provided image
export const cityNeedsImage = (cityName: string): boolean => {
  const data = getCityData(cityName)
  return !data?.imageUrl && (cityName === 'Doha' || cityName === 'Jakarta')
}

// Helper function to get city coordinates
export const getCityCoordinates = (cityName: string): { lat: number; lng: number } | null => {
  const data = getCityData(cityName)
  return data?.coordinates || null
}

