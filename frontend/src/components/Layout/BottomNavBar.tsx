import { Link, useLocation } from 'react-router-dom'
import { Home, MapPin, Clock, Calendar, User } from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/places', icon: MapPin, label: 'Places' },
  { path: '/prayer', icon: Clock, label: 'Prayer' },
  { path: '/trips', icon: Calendar, label: 'Trips' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNavBar() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-gray-200 shadow-lg z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

