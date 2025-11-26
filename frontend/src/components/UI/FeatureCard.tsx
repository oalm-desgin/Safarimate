import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description?: string
  onClick?: () => void
}

export default function FeatureCard({ icon: Icon, title, description, onClick }: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer transition-all duration-300 hover:shadow-gold hover:scale-[1.02]"
    >
      <div className="flex items-center gap-4">
        <div className="icon-wrapper-gold flex-shrink-0">
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-300">{description}</p>}
        </div>
      </div>
    </div>
  )
}
