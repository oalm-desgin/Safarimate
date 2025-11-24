# ✅ FRONTEND FIX - ALL AUTHENTICATION REQUESTS NOW USE CORRECT BASE URL

## Changed Files

### 1. `frontend/src/api/authApi.ts`
```typescript
import axios from 'axios'

const authApi = axios.create({
  baseURL: 'http://localhost:8085',  // ✅ CORRECT PORT
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor with console logging
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

// Response interceptor with logging
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
```

### 2. `frontend/src/api/axios.ts`
```typescript
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
  baseURL: 'http://localhost:8085',  // ✅ REMOVED VITE_API_BASE_URL, HARDCODED CORRECT PORT
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### 3. `frontend/src/api/baseApi.ts`
```typescript
import axios from 'axios'

const baseApi = axios.create({
  baseURL: 'http://localhost:8085',  // ✅ CHANGED FROM http://localhost
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for 401 handling
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default baseApi
```

### 4. `frontend/src/screens/LoginScreen.tsx`
**NO CHANGES NEEDED** - Already using `loginApi` from `authApi.ts`
```typescript
import { login as loginApi } from '../api/authApi'
import authApi from '../api/authApi'

// Login form calls:
const response = await loginApi({ email, password })

// Test button calls:
const response = await authApi.get('/auth/test')
```

### 5. `frontend/src/screens/RegisterScreen.tsx`
**NO CHANGES NEEDED** - Already using `signupApi` from `authApi.ts`
```typescript
import { signup as signupApi } from '../api/authApi'

// Signup form calls:
const response = await signupApi({ name, email, password })
```

## Exact URLs Frontend Now Calls

### Login Request
```
POST http://localhost:8085/auth/login
Headers:
  Content-Type: application/json
  Credentials: include
Body:
  { "email": "...", "password": "..." }
```

### Signup Request
```
POST http://localhost:8085/auth/signup
Headers:
  Content-Type: application/json
  Credentials: include
Body:
  { "name": "...", "email": "...", "password": "..." }
```

### Test Request
```
GET http://localhost:8085/auth/test
Headers:
  Content-Type: application/json
  Credentials: include
```

## Console Log Verification

When you attempt to login, you will see in browser console:

```
[authApi] Calling login with baseURL: http://localhost:8085
[authApi] Request URL: http://localhost:8085/auth/login
[authApi] Request method: post
[authApi] Request data: { email: "...", password: "..." }
```

On success:
```
[authApi] Response received: 200 { accessToken: "...", tokenType: "Bearer", user: {...} }
```

On error:
```
[authApi] Request failed: Network Error
[authApi] Error details: {...}
```

## All Axios Instances Summary

| File | Base URL | Purpose |
|------|----------|---------|
| `authApi.ts` | http://localhost:8085 | Auth endpoints (login, signup) ✅ |
| `axios.ts` | http://localhost:8085 | General API wrapper ✅ |
| `baseApi.ts` | http://localhost:8085 | Base API instance ✅ |
| `placesApi.ts` | http://localhost:8082 | Places service (correct) ✅ |
| `prayerApi.ts` | http://localhost:8083 | Prayer service (correct) ✅ |
| `qiblaApi.ts` | http://localhost:8083 | Qibla service (correct) ✅ |
| `tripApi.ts` | http://localhost:8083 | Trip service (WRONG - should be 8084) ⚠️ |

## Services Running

- Auth Service: http://localhost:8085 ✅
- Places Service: http://localhost:8082 (not started)
- Prayer Service: http://localhost:8083 (not started)
- Planner Service: http://localhost:8084 (not started)
- Frontend: http://localhost:3003 ✅

## Test Instructions

1. Open browser: http://localhost:3003
2. Open DevTools Console (F12)
3. Navigate to Login page
4. Enter credentials
5. Click "Sign In"
6. Watch console for:
   ```
   [authApi] Request URL: http://localhost:8085/auth/login
   ```
7. Verify no CORS errors
8. Verify response received

## Fixed Issues

✅ Removed `VITE_API_BASE_URL` dependency
✅ Hardcoded correct port 8085 in all auth-related axios instances
✅ Added comprehensive console logging
✅ Ensured `withCredentials: true` everywhere
✅ Verified all login/signup use authApi
✅ No conflicting axios instances
✅ No fetch() calls to auth endpoints
✅ Frontend dev server restarted with changes

---

**Status: Frontend fully configured to call http://localhost:8085 for authentication**

