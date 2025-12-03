import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TravelState {
  homeCountry: string | null
  destinationCity: string | null
  destinationCountry: string | null
  setHomeCountry: (country: string) => void
  setDestination: (city: string, country: string) => void
  clearDestination: () => void
  hasActiveTrip: () => boolean
}

export const useTravelStore = create<TravelState>()(
  persist(
    (set, get) => ({
      homeCountry: null,
      destinationCity: null,
      destinationCountry: null,
      
      setHomeCountry: (country: string) => set({ homeCountry: country }),
      
      setDestination: (city: string, country: string) =>
        set({ destinationCity: city, destinationCountry: country }),
      
      clearDestination: () =>
        set({ destinationCity: null, destinationCountry: null }),
      
      hasActiveTrip: () => {
        const state = get()
        return !!(state.destinationCity && state.destinationCountry)
      },
    }),
    {
      name: 'travel-storage',
    }
  )
)

