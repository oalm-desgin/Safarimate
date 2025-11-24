import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import PageTitle from '../components/UI/PageTitle'
import { User, LogOut, Settings, Moon, Sun } from 'lucide-react'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { user, logout, setTheme } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle
        title="Profile"
        subtitle="Manage your account settings"
      />
      
      <div className="px-6 py-4 space-y-4">
        {/* User Info Card */}
        <div className="card-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="icon-wrapper">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="card-lg space-y-4">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-900">Settings</span>
            </div>
          </button>
          
          <button
            onClick={() => setTheme(user?.theme === 'dark' ? 'light' : 'dark')}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              {user?.theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
              <span className="font-medium text-gray-900">Theme</span>
            </div>
            <span className="text-sm text-gray-600 capitalize">{user?.theme || 'light'}</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

