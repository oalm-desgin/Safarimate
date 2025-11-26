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
      {/* App Container */}
      <div 
        className="min-h-screen flex items-center justify-center bg-gray-900"
      >
        {/* App Content */}
        <div 
          className="overflow-hidden bg-background"
          style={{
            width: '393px',
            height: '852px',
            maxHeight: '98vh',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch'
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
