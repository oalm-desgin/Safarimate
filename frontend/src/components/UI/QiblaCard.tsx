import { Compass } from 'lucide-react'

interface QiblaCardProps {
  direction: number
  directionName: string
}

export default function QiblaCard({ direction, directionName }: QiblaCardProps) {
  return (
    <div className="card-lg text-center">
      <div className="icon-wrapper-gold mx-auto mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Qibla Direction</h3>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 flex items-center justify-center">
          <div
            className="absolute w-1 h-16 bg-primary rounded-full origin-bottom"
            style={{ transform: `rotate(${direction}deg)` }}
          />
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-primary">N</div>
      </div>
      <p className="text-2xl font-bold text-primary">{directionName}</p>
      <p className="text-sm text-gray-600 mt-2">{direction.toFixed(1)}°</p>
    </div>
  )
}

