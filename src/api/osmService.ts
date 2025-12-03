export interface Mosque {
  id: string
  name: string
  lat: number
  lon: number
  address?: string
  distance?: number
  prayerTimes?: {
    fajr: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }
}

export interface HalalPlace {
  id: string
  name: string
  lat: number
  lon: number
  address?: string
  distance?: number
  cuisine?: string
  rating?: number
}

const OVERPASS_API = 'https://overpass-api.de/api/interpreter'

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const fetchNearbyMosques = async (
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): Promise<Mosque[]> => {
  const radiusMeters = radiusKm * 1000

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${latitude},${longitude});
      way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${latitude},${longitude});
      relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${latitude},${longitude});
    );
    out center;
  `

  try {
    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      body: query,
    })

    const data = await response.json()

    const mosques: Mosque[] = data.elements.map((element: any) => {
      const lat = element.lat || element.center?.lat
      const lon = element.lon || element.center?.lon
      const distance = calculateDistance(latitude, longitude, lat, lon)

      return {
        id: `${element.type}/${element.id}`,
        name: element.tags?.name || 'Unnamed Mosque',
        lat,
        lon,
        address:
          element.tags?.['addr:street'] && element.tags?.['addr:housenumber']
            ? `${element.tags['addr:housenumber']} ${element.tags['addr:street']}`
            : element.tags?.['addr:city'] || '',
        distance: Math.round(distance * 100) / 100,
      }
    })

    // Sort by distance
    return mosques.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  } catch (error) {
    console.error('Error fetching mosques:', error)
    return []
  }
}

export const fetchNearbyHalalPlaces = async (
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): Promise<HalalPlace[]> => {
  const radiusMeters = radiusKm * 1000

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="restaurant"]["cuisine"~"halal|kebab|turkish|middle_eastern|arab"](around:${radiusMeters},${latitude},${longitude});
      way["amenity"="restaurant"]["cuisine"~"halal|kebab|turkish|middle_eastern|arab"](around:${radiusMeters},${latitude},${longitude});
      node["diet:halal"="yes"](around:${radiusMeters},${latitude},${longitude});
      way["diet:halal"="yes"](around:${radiusMeters},${latitude},${longitude});
    );
    out center;
  `

  try {
    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      body: query,
    })

    const data = await response.json()

    const places: HalalPlace[] = data.elements.map((element: any) => {
      const lat = element.lat || element.center?.lat
      const lon = element.lon || element.center?.lon
      const distance = calculateDistance(latitude, longitude, lat, lon)

      return {
        id: `${element.type}/${element.id}`,
        name: element.tags?.name || 'Unnamed Restaurant',
        lat,
        lon,
        address:
          element.tags?.['addr:street'] && element.tags?.['addr:housenumber']
            ? `${element.tags['addr:housenumber']} ${element.tags['addr:street']}`
            : element.tags?.['addr:city'] || '',
        distance: Math.round(distance * 100) / 100,
        cuisine: element.tags?.cuisine || 'halal',
        rating: element.tags?.rating ? parseFloat(element.tags.rating) : undefined,
      }
    })

    return places.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  } catch (error) {
    console.error('Error fetching halal places:', error)
    return []
  }
}

// Mock prayer times (in production, fetch from prayer times API)
export const fetchPrayerTimes = async (latitude: number, longitude: number) => {
  // This would normally call your prayer API
  return {
    fajr: '05:30',
    dhuhr: '12:45',
    asr: '15:30',
    maghrib: '18:15',
    isha: '19:45',
  }
}

