import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description?: string
  onClick?: () => void
  gradient?: boolean
}

export default function FeatureCard({ icon: Icon, title, description, onClick, gradient = false }: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        gradient ? 'bg-gradient-to-br from-primary/10 to-accent/10' : ''
      }`}
    >
      <div className="icon-wrapper mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  )
}

