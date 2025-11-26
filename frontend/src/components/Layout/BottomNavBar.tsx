import { NavLink } from 'react-router-dom'
import { Home, MapPin, Clock, Plane, User } from 'lucide-react'

export default function BottomNavBar() {
  const navItems = [
    { to: '/', icon: Home },
    { to: '/places', icon: MapPin },
    { to: '/prayer-times', icon: Clock },
    { to: '/trips', icon: Plane },
    { to: '/profile', icon: User }
  ]

  return (
    <nav 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        width: '393px',
        margin: '0 auto',
        pointerEvents: 'auto'
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(10, 46, 41, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '1px solid rgba(217, 193, 122, 0.2)',
          boxShadow: 'inset 0 1px 0 rgba(217, 193, 122, 0.1), 0 -2px 16px rgba(0, 0, 0, 0.3)',
          width: '100%',
          margin: 0,
          padding: 0
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '64px',
            width: '100%',
            padding: '0 8px',
            margin: 0
          }}
        >
          {navItems.map(({ to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-center rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'text-gold bg-gold/10' 
                    : 'text-primary-light/60 hover:text-gold hover:bg-gold/5'
                }`
              }
              style={{
                width: '48px',
                height: '48px',
                minWidth: '48px',
                flexShrink: 0
              }}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
