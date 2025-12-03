import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { User, Settings, LogOut, Info, Shield } from 'lucide-react'
import IslamicPattern from '../components/UI/IslamicPattern'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: Info, label: 'About SafariMate', action: () => {} },
    { icon: Shield, label: 'Privacy Policy', action: () => {} },
    { icon: LogOut, label: 'Logout', action: handleLogout, danger: true },
  ]

  return (
    <div className="min-h-screen pb-20">
      {/* Islamic Header with User Info */}
      <div className="islamic-header px-6 py-10 relative mb-6">
        <IslamicPattern />
        <div className="relative z-20 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center border-4 border-gold/40">
            <User className="w-12 h-12 text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {user?.name || 'Traveler'}
          </h1>
          <p className="text-gray-300 text-sm">{user?.email || 'user@example.com'}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full card flex items-center gap-4 py-4 hover:shadow-gold transition-all duration-300 ${
                item.danger ? 'border-red-500/50 hover:border-red-500' : ''
              }`}
            >
              <div className={`icon-wrapper-gold ${item.danger ? 'bg-red-500/20 text-red-400 border-red-500/40' : ''}`}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className={`font-semibold ${item.danger ? 'text-red-400' : 'text-white'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* App Version */}
      <div className="px-6 mt-8 text-center">
        <p className="text-xs text-gray-400">SafariMate v1.0.0</p>
      </div>
    </div>
  )
}
