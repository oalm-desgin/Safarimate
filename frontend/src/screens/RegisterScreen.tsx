import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import IslamicPattern from '../components/UI/IslamicPattern'
import ErrorMessage from '../components/ErrorMessage'
import { signup as signupApi } from '../api/authApi'
import { UserPlus } from 'lucide-react'

export default function RegisterScreen() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await signupApi({
        name,
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
        name: user.name || name,
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
        'Signup failed. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-6">
      {/* Islamic Header */}
      <div className="islamic-header px-6 py-12 relative mb-8">
        <IslamicPattern />
        <div className="relative z-20 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center border-4 border-gold/40">
            <UserPlus className="w-10 h-10 text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-300 text-sm">Join SafariMate today</p>
        </div>
      </div>
      
      <div className="px-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-islamic bg-card border border-gold/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-islamic bg-card border border-gold/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-islamic bg-card border border-gold/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
        
        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold font-semibold hover:text-gold/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
