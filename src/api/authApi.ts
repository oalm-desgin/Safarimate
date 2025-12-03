import axios from 'axios'

const authApi = axios.create({
  baseURL: 'http://localhost:8085',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
authApi.interceptors.request.use((config) => {
  console.log('[authApi] Request URL:', config.baseURL + config.url)
  console.log('[authApi] Request method:', config.method)
  console.log('[authApi] Request data:', config.data)
  
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for 401 handling
authApi.interceptors.response.use(
  (response) => {
    console.log('[authApi] Response received:', response.status, response.data)
    return response
  },
  async (error) => {
    console.error('[authApi] Request failed:', error.message)
    console.error('[authApi] Error details:', error.response?.data || error)
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const login = (data: { email: string; password: string }) => {
  console.log('[authApi] Calling login with baseURL: http://localhost:8085')
  return authApi.post('/auth/login', data)
}

export const signup = (data: any) => {
  console.log('[authApi] Calling signup with baseURL: http://localhost:8085')
  return authApi.post('/auth/signup', data)
}

export default authApi

