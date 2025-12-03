interface CalligraphyPatternProps {
  opacity?: number
  className?: string
}

export default function CalligraphyPattern({ opacity = 0.15, className = '' }: CalligraphyPatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Top Right Calligraphy */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96"
        style={{ opacity }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 20C100 20 120 40 140 60C160 80 180 100 180 120C180 140 160 160 140 160C120 160 100 140 80 120C60 100 40 80 40 60C40 40 60 20 80 20C100 20 100 20 100 20Z"
            stroke="#D9C17A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M100 40C100 40 115 55 130 70C145 85 160 100 160 115C160 130 145 145 130 145C115 145 100 130 85 115C70 100 55 85 55 70C55 55 70 40 85 40C100 40 100 40 100 40Z"
            stroke="#D9C17A"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom Left Calligraphy */}
      <div 
        className="absolute -bottom-20 -left-20 w-96 h-96"
        style={{ opacity }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 100C20 100 40 120 60 140C80 160 100 180 120 180C140 180 160 160 160 140C160 120 140 100 120 80C100 60 80 40 60 40C40 40 20 60 20 80C20 100 20 100 20 100Z"
            stroke="#D9C17A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M40 100C40 100 55 115 70 130C85 145 100 160 115 160C130 160 145 145 145 130C145 115 130 100 115 85C100 70 85 55 70 55C55 55 40 70 40 85C40 100 40 100 40 100Z"
            stroke="#D9C17A"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}

