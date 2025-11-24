import { useNavigate } from 'react-router-dom'
import PageTitle from '../components/UI/PageTitle'
import FeatureCard from '../components/UI/FeatureCard'
import { Landmark, UtensilsCrossed, Building2 } from 'lucide-react'

export default function PlacesScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <PageTitle
        title="Nearby Places"
        subtitle="Find halal restaurants, mosques, and prayer rooms"
      />
      
      <div className="px-6 py-4 space-y-4">
        <FeatureCard
          icon={Landmark}
          title="Mosques"
          description="Find nearby mosques on the map"
          gradient
          onClick={() => navigate('/places/mosques')}
        />
        <FeatureCard
          icon={UtensilsCrossed}
          title="Halal Restaurants"
          description="Discover halal food near you"
          gradient
          onClick={() => navigate('/places/restaurants')}
        />
        <FeatureCard
          icon={Building2}
          title="Prayer Rooms"
          description="Locate prayer facilities"
          gradient
        />
      </div>
    </div>
  )
}

