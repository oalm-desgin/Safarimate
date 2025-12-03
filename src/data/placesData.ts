import { 
  Plane, 
  ShoppingBag, 
  UtensilsCrossed, 
  Building2,
  Camera
} from 'lucide-react'

export interface PlaceCategory {
  id: string
  title: string
  icon: any
  description: string
  imageUrl: string
  samplePlaces: Array<{
    name: string
    description?: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
    rating: number
    openNow: boolean
    distance?: number
    image?: string
  }>
}

export const placesCategories: PlaceCategory[] = [
  {
    id: 'restaurants',
    title: 'Halal Restaurants',
    icon: UtensilsCrossed,
    description: 'Certified halal restaurants & cafes',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    samplePlaces: [
      {
        name: 'Boustan Restaurant',
        description: 'Authentic Lebanese cuisine with fresh ingredients',
        address: '2001 Sauvé Street',
        coordinates: { lat: 45.5525, lng: -73.6295 },
        rating: 4.8,
        openNow: true,
        distance: 0.8,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80'
      },
      {
        name: 'Istanbul Kebab House',
        description: 'Turkish grills and traditional dishes',
        address: '1234 Boulevard Saint-Laurent',
        coordinates: { lat: 45.5435, lng: -73.5815 },
        rating: 4.7,
        openNow: true,
        distance: 1.5,
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80'
      },
      {
        name: 'Marché Adonis',
        description: 'Mediterranean grocery and prepared foods',
        address: '2001 Rue Sauvé Ouest',
        coordinates: { lat: 45.5565, lng: -73.6385 },
        rating: 4.5,
        openNow: true,
        distance: 2.3,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80'
      }
    ]
  },
  {
    id: 'mosques',
    title: 'Mosques',
    icon: Building2,
    description: 'Local mosques and prayer facilities',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80',
    samplePlaces: [
      {
        name: 'Downtown Islamic Center',
        description: 'Main community mosque with daily prayers',
        address: '123 Mosque Street',
        coordinates: { lat: 45.5075, lng: -73.5725 },
        rating: 4.9,
        openNow: true,
        distance: 0.5,
        image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'
      },
      {
        name: 'Community Masjid',
        description: 'Family-friendly mosque with Islamic school',
        address: '456 Islamic Ave',
        coordinates: { lat: 45.5195, lng: -73.5945 },
        rating: 4.8,
        openNow: true,
        distance: 1.2,
        image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80'
      },
      {
        name: 'Al-Noor Prayer Hall',
        description: 'Prayer space with wudu facilities',
        address: '789 Noor Blvd',
        coordinates: { lat: 45.5295, lng: -73.6045 },
        rating: 4.7,
        openNow: true,
        distance: 2.1,
        image: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80'
      }
    ]
  },
  {
    id: 'markets',
    title: 'Muslim Markets',
    icon: ShoppingBag,
    description: 'Islamic shops, halal groceries & bookstores',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80',
    samplePlaces: [
      {
        name: 'Al-Madina Islamic Center',
        description: 'Complete Islamic bookstore and halal groceries',
        address: '1234 Main Street',
        coordinates: { lat: 45.5155, lng: -73.5835 },
        rating: 4.9,
        openNow: true,
        distance: 1.2,
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80'
      },
      {
        name: 'Barakah Halal Grocery',
        description: 'Fresh halal meat and Middle Eastern products',
        address: '456 Commerce Blvd',
        coordinates: { lat: 45.5235, lng: -73.5965 },
        rating: 4.6,
        openNow: true,
        distance: 2.1,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80'
      },
      {
        name: 'Islamic Bookstore & Gifts',
        description: 'Qurans, Islamic literature, and gifts',
        address: '789 Cultural Ave',
        coordinates: { lat: 45.5325, lng: -73.6125 },
        rating: 4.7,
        openNow: false,
        distance: 3.5,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'
      },
      {
        name: 'Hijab & Modest Fashion',
        description: 'Elegant modest clothing for women',
        address: '321 Style Street',
        coordinates: { lat: 45.5115, lng: -73.5755 },
        rating: 4.8,
        openNow: true,
        distance: 1.8,
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
      }
    ]
  },
  {
    id: 'islamic-shops',
    title: 'Islamic Shops',
    icon: ShoppingBag,
    description: 'Islamic clothing, gifts & decor',
    imageUrl: 'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=1200&q=80',
    samplePlaces: [
      {
        name: 'Islamic Arts & Crafts',
        description: 'Handcrafted Islamic calligraphy and art',
        address: '234 Heritage Lane',
        coordinates: { lat: 45.5185, lng: -73.5885 },
        rating: 4.8,
        openNow: true,
        distance: 1.5,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'
      },
      {
        name: 'Quranic Bookstore',
        description: 'Extensive collection of Islamic books and translations',
        address: '567 Knowledge Street',
        coordinates: { lat: 45.5265, lng: -73.6015 },
        rating: 4.9,
        openNow: true,
        distance: 1.8,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'
      },
      {
        name: 'Modest Fashion Boutique',
        description: 'Contemporary modest fashion for modern Muslims',
        address: '890 Elegance Ave',
        coordinates: { lat: 45.5345, lng: -73.6185 },
        rating: 4.7,
        openNow: true,
        distance: 2.2,
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80'
      },
      {
        name: 'Islamic Home Decor',
        description: 'Beautiful home decorations with Islamic motifs',
        address: '123 Design Plaza',
        coordinates: { lat: 45.5095, lng: -73.5695 },
        rating: 4.6,
        openNow: false,
        distance: 2.8,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80'
      }
    ]
  },
  {
    id: 'airport',
    title: 'Airport Facilities',
    icon: Plane,
    description: 'Prayer rooms, halal restaurants & services',
    imageUrl: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1200&q=80',
    samplePlaces: [
      {
        name: 'Terminal 1 Prayer Room',
        description: 'Quiet prayer space with wudu facilities',
        address: 'International Departures, Level 3',
        coordinates: { lat: 45.4706, lng: -73.7408 },
        rating: 4.8,
        openNow: true,
        distance: 15.2,
        image: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80'
      },
      {
        name: 'Halal Food Court',
        description: 'Multiple halal dining options',
        address: 'Terminal 2, Gate Area',
        coordinates: { lat: 45.4726, lng: -73.7458 },
        rating: 4.5,
        openNow: true,
        distance: 15.5,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
      },
      {
        name: 'Muslim Prayer Space',
        description: 'Dedicated prayer area near gates',
        address: 'Terminal 3, Near Gate 15',
        coordinates: { lat: 45.4746, lng: -73.7508 },
        rating: 4.7,
        openNow: true,
        distance: 15.8,
        image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80'
      },
      {
        name: 'Wudu Facilities',
        description: 'Ablution facilities in all terminals',
        address: 'All Terminals, Multiple Locations',
        coordinates: { lat: 45.4716, lng: -73.7428 },
        rating: 4.6,
        openNow: true,
        distance: 15.2,
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80'
      }
    ]
  },
  {
    id: 'attractions',
    title: 'Attractions & Landmarks',
    icon: Camera,
    description: 'Historical sites & tourist attractions',
    imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200&q=80',
    samplePlaces: [
      {
        name: 'Historical Islamic Museum',
        description: 'Explore rich Islamic heritage and artifacts',
        address: '1100 Heritage Drive',
        coordinates: { lat: 45.5385, lng: -73.6245 },
        rating: 4.9,
        openNow: true,
        distance: 3.3,
        image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'
      },
      {
        name: 'Old City Cultural Center',
        description: 'Cultural events and exhibitions',
        address: '1200 Old City Square',
        coordinates: { lat: 45.5465, lng: -73.6385 },
        rating: 4.7,
        openNow: true,
        distance: 4.1,
        image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80'
      },
      {
        name: 'Islamic Architecture Tour',
        description: 'Guided tours of historic Islamic buildings',
        address: 'Historic District',
        coordinates: { lat: 45.5405, lng: -73.6295 },
        rating: 4.8,
        openNow: true,
        distance: 3.8,
        image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80'
      },
      {
        name: 'Botanical Garden & Park',
        description: 'Peaceful gardens with Islamic design elements',
        address: '1300 Garden Road',
        coordinates: { lat: 45.5545, lng: -73.6485 },
        rating: 4.6,
        openNow: true,
        distance: 5.0,
        image: 'https://images.unsplash.com/photo-1541346183200-e8e117d945b5?w=800&q=80'
      }
    ]
  }
]

export const getPlaceCategoryById = (id: string): PlaceCategory | undefined => {
  return placesCategories.find(category => category.id === id)
}
