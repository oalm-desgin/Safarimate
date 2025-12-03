import { User } from 'lucide-react'

interface HeaderGradientProps {
  title: string
  subtitle?: string
  showAvatar?: boolean
}

export default function HeaderGradient({ title, subtitle, showAvatar = true }: HeaderGradientProps) {
  return (
    <div className="gradient-header text-white px-6 py-8 rounded-b-3xl shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
        </div>
        {showAvatar && (
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
            <User className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}

