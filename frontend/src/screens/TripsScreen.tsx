import { useState, useEffect } from 'react'
import PageTitle from '../components/UI/PageTitle'
import TripCard from '../components/UI/TripCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { Plus, Trash2 } from 'lucide-react'
import { getTrips, createTrip, deleteTrip } from '../api/tripApi'

interface Trip {
  id: string
  name: string
  origin: string
  destination: string
  date: string
  [key: string]: any
}

export default function TripsScreen() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    destination: '',
    date: '',
  })

  useEffect(() => {
    fetchTrips()
  }, [])

  async function fetchTrips() {
    setLoading(true)
    setError('')
    try {
      const response = await getTrips()
      setTrips(response.data || [])
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load trips'
      )
      setTrips([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateTrip(e: React.FormEvent) {
    e.preventDefault()
    setFormLoading(true)
    try {
      await createTrip(formData)
      setFormData({ name: '', origin: '', destination: '', date: '' })
      setShowForm(false)
      fetchTrips()
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to create trip'
      )
    } finally {
      setFormLoading(false)
    }
  }

  async function handleDeleteTrip(id: string) {
    if (!window.confirm('Are you sure you want to delete this trip?')) {
      return
    }
    try {
      await deleteTrip(id)
      fetchTrips()
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to delete trip'
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle
        title="My Trips"
        subtitle="Plan and manage your journeys"
      />
      
      <div className="px-6 py-4 space-y-4">
        {/* Add New Trip Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Trip</span>
        </button>

        {/* Create Trip Form */}
        {showForm && (
          <form onSubmit={handleCreateTrip} className="card space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Umrah Journey"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., New York"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Mecca"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 btn-primary"
                disabled={formLoading}
              >
                {formLoading ? 'Creating...' : 'Create Trip'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

        {/* Loading State */}
        {loading && <Loading message="Loading trips..." />}

        {/* Trip Cards */}
        {!loading && trips.length === 0 && (
          <div className="text-center py-4 text-gray-600">
            No trips found. Create your first trip!
          </div>
        )}

        {!loading && trips.length > 0 && (
          <div className="space-y-3">
            {trips.map((trip) => (
              <div key={trip.id} className="relative">
                <TripCard
                  name={trip.name}
                  origin={trip.origin}
                  destination={trip.destination}
                  date={trip.date}
                />
                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  aria-label="Delete trip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

