import { LucideIcon } from 'lucide-react'

interface IconWrapperProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'gold' | 'accent'
  className?: string
}

export default function IconWrapper({ icon: Icon, size = 'md', variant = 'primary', className = '' }: IconWrapperProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }
  
  const variantClasses = {
    primary: 'bg-primary/10 text-primary',
    gold: 'bg-gold/20 text-gold',
    accent: 'bg-accent/10 text-accent',
  }
  
  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full flex items-center justify-center ${className}`}>
      <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} />
    </div>
  )
}

