import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import HeaderGradient from '../components/UI/HeaderGradient'
import ErrorMessage from '../components/ErrorMessage'
import { login as loginApi } from '../api/authApi'
import authApi from '../api/authApi'

export default function LoginScreen() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await loginApi({
        email,
        password,
      })

      const { accessToken, user } = response.data

      // Save token to localStorage
      localStorage.setItem('token', accessToken)

      // Update auth store
      login(accessToken, {
        id: user.id || user.userId || '',
        email: user.email || email,
        name: user.name || user.username || 'User',
        language: user.language || 'en',
        theme: user.theme || 'light',
      })

      // Redirect to home
      navigate('/')
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login failed. Please check your credentials and try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const testAuthService = async () => {
    setMessage('')
    try {
      const response = await authApi.get('/auth/test')
      setMessage(response.data || 'Auth service is running!')
    } catch (err: any) {
      setMessage(
        `Error: ${err.response?.data?.message ?? err.message ?? 'Failed to reach auth service'}`
      )
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderGradient title="Welcome Back" subtitle="Sign in to continue" showAvatar={false} />
      
      <div className="flex-1 px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
        
        <button
          onClick={testAuthService}
          className="mt-4 w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Test Auth Service
        </button>

        {message && (
          <div className="mt-3 rounded-lg bg-white p-3 text-sm text-gray-800">
            {message}
          </div>
        )}
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

