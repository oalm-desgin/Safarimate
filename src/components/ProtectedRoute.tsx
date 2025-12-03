import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Check for token in localStorage
  const token = localStorage.getItem('token')
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // If no token in localStorage, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // If token exists, allow access
  return <>{children}</>
}

