import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import MobileLayout from './components/Layout/MobileLayout'
import HomeScreen from './screens/HomeScreen'
import MosqueMapScreen from './screens/MosqueMapScreen'
import RestaurantMapScreen from './screens/RestaurantMapScreen'
import PrayerTimesScreen from './screens/PrayerTimesScreen'
import PlacesScreen from './screens/PlacesScreen'
import PrayerScreen from './screens/PrayerScreen'
import TripsScreen from './screens/TripsScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
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
          <Route path="prayer" element={<PrayerScreen />} />
          <Route path="prayer-times" element={<PrayerTimesScreen />} />
          <Route path="trips" element={<TripsScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

