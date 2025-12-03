import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MobileLayout from './components/Layout/MobileLayout'
import HomeScreen from './screens/HomeScreen'
import MosqueMapScreen from './screens/MosqueMapScreen'
import RestaurantMapScreen from './screens/RestaurantMapScreen'
import PrayerTimesScreen from './screens/PrayerTimesScreen'
import PlacesScreen from './screens/PlacesScreen'
import PlaceCategoryDetailScreen from './screens/PlaceCategoryDetailScreen'
import TripsScreen from './screens/TripsScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProtectedRoute from './components/ProtectedRoute'
import WelcomeScreen from './screens/WelcomeScreen'
import TravelDashboardScreen from './screens/TravelDashboardScreen'

function App() {
  return (
    <Router>
      {/* Mobile-Only Container */}
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Strict Mobile App - Max 420px */}
        <div 
          className="overflow-hidden bg-background"
          style={{
            width: '100vw',
            maxWidth: '420px',
            height: '100vh',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            margin: '0 auto'
          }}
        >
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MobileLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomeScreen />} />
                <Route path="places" element={<PlacesScreen />} />
                <Route path="places/mosques" element={<MosqueMapScreen />} />
                <Route path="places/restaurants" element={<RestaurantMapScreen />} />
                <Route path="places/:categoryId" element={<PlaceCategoryDetailScreen />} />
                <Route path="prayer-times" element={<PrayerTimesScreen />} />
                <Route path="trips" element={<TripsScreen />} />
                <Route path="welcome" element={<WelcomeScreen />} />
                <Route path="travel-dashboard" element={<TravelDashboardScreen />} />
                <Route path="profile" element={<ProfileScreen />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
