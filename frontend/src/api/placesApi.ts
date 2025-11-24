import axios from 'axios'

const placesApi = axios.create({
  baseURL: 'http://localhost:8082',
  withCredentials: true,
})

placesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

placesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const getNearbyPlaces = () => placesApi.get('/places/nearby')

export default placesApi
