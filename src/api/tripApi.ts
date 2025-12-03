import axios from 'axios'

const tripApi = axios.create({
  baseURL: 'http://localhost:8083',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
tripApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for 401 handling
tripApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const getTrips = () => tripApi.get('/trips')
export const createTrip = (data: any) => tripApi.post('/trips', data)
export const deleteTrip = (id: string) => tripApi.delete(`/trips/${id}`)

export default tripApi

