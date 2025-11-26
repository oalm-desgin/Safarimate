import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { User, Mail, Lock, LogIn, UserPlus, ChevronRight } from 'lucide-react'

export default function LoginScreen() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      // For demo purposes, accept any credentials
      login({
        id: '1',
        email: email || 'guest@safarimate.com',
        name: name || 'Guest User',
        token: 'demo-token'
      })
      navigate('/')
    } catch (err) {
      setError('Authentication failed. Please try again.')
    }
  }

  const handleGuestContinue = () => {
    login({
      id: 'guest',
      email: 'guest@safarimate.com',
      name: 'Guest',
      token: 'guest-token'
    })
    navigate('/')
  }

  return (
    <div 
      className="w-full relative overflow-hidden"
      style={{
        height: '852px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0A2E29 0%, #061E1A 100%)'
      }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1549144511-f099e773c147?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          opacity: 0.2
        }}
      />
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 46, 41, 0.7) 0%, rgba(6, 30, 26, 0.9) 100%)'
        }}
      />

      {/* Content */}
      <div 
        className="relative z-10 p-6"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <div 
          className="w-full max-w-md animate-fadeIn"
          style={{
            animation: 'slideUp 0.6s ease-out',
            width: '100%',
            maxWidth: '28rem'
          }}
        >
          {/* Login Card */}
          <div 
            className="rounded-3xl p-8"
            style={{
              backgroundColor: 'rgba(10, 46, 41, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(217, 193, 122, 0.1)',
              border: '1px solid rgba(217, 193, 122, 0.1)',
              width: '100%'
            }}
          >
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(217, 193, 122, 0.2) 0%, rgba(217, 193, 122, 0.05) 100%)',
                  border: '2px solid rgba(217, 193, 122, 0.3)'
                }}
              >
                <svg className="w-12 h-12 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to SafariMate
              </h1>
              <p className="text-sm text-gray-300">
                Your trusted companion for Muslim travel
              </p>
            </div>

            {/* Form (if registering) */}
            {isRegistering && (
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {error && (
                  <div 
                    className="p-3 rounded-xl text-sm text-white"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" strokeWidth={1.5} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-400 transition-all"
                      style={{
                        backgroundColor: 'rgba(14, 79, 69, 0.4)',
                        border: '1px solid rgba(217, 193, 122, 0.2)',
                        outline: 'none'
                      }}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" strokeWidth={1.5} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-400 transition-all"
                      style={{
                        backgroundColor: 'rgba(14, 79, 69, 0.4)',
                        border: '1px solid rgba(217, 193, 122, 0.2)',
                        outline: 'none'
                      }}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" strokeWidth={1.5} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-400 transition-all"
                      style={{
                        backgroundColor: 'rgba(14, 79, 69, 0.4)',
                        border: '1px solid rgba(217, 193, 122, 0.2)',
                        outline: 'none'
                      }}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-semibold text-primary flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #D9C17A 0%, #C4A960 100%)',
                    boxShadow: '0 4px 16px rgba(217, 193, 122, 0.3)'
                  }}
                >
                  <UserPlus className="w-5 h-5" strokeWidth={2} />
                  Create Account
                </button>

                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="w-full text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Already have an account? Sign In
                </button>
              </form>
            )}

            {/* Buttons (if not registering) */}
            {!isRegistering && (
              <div className="space-y-3">
                {/* Sign In Button */}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="w-full py-3 rounded-2xl font-semibold text-primary flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #D9C17A 0%, #C4A960 100%)',
                    boxShadow: '0 4px 16px rgba(217, 193, 122, 0.3)'
                  }}
                >
                  <LogIn className="w-5 h-5" strokeWidth={2} />
                  Sign In
                </button>

                {/* Create Account Button */}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="w-full py-3 rounded-2xl font-semibold text-gold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(217, 193, 122, 0.5)',
                    boxShadow: '0 0 0 0 rgba(217, 193, 122, 0)'
                  }}
                >
                  <UserPlus className="w-5 h-5" strokeWidth={2} />
                  Create Account
                </button>

                {/* Continue as Guest */}
                <button
                  onClick={handleGuestContinue}
                  className="w-full py-3 rounded-2xl font-medium text-white flex items-center justify-center gap-2 transition-all hover:bg-white/5"
                >
                  Continue as Guest
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            )}
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-400 mt-6">
            By continuing, you agree to SafariMate's Terms of Service
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        input:focus {
          border-color: rgba(217, 193, 122, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(217, 193, 122, 0.1) !important;
        }
      `}</style>
    </div>
  )
}
