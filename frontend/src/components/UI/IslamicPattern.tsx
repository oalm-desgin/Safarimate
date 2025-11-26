export default function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="islamicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Central Star */}
          <path
            d="M40 10 L45 25 L60 25 L48 35 L53 50 L40 40 L27 50 L32 35 L20 25 L35 25 Z"
            fill="#D9C17A"
            opacity="0.6"
          />
          
          {/* Geometric Circles */}
          <circle cx="40" cy="40" r="25" fill="none" stroke="#D9C17A" strokeWidth="0.5" opacity="0.4" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#D9C17A" strokeWidth="0.5" opacity="0.4" />
          
          {/* Corner Ornaments */}
          <circle cx="5" cy="5" r="3" fill="#D9C17A" opacity="0.3" />
          <circle cx="75" cy="5" r="3" fill="#D9C17A" opacity="0.3" />
          <circle cx="5" cy="75" r="3" fill="#D9C17A" opacity="0.3" />
          <circle cx="75" cy="75" r="3" fill="#D9C17A" opacity="0.3" />
          
          {/* Connecting Lines */}
          <path
            d="M 0 40 Q 20 20 40 20 T 80 40"
            fill="none"
            stroke="#D9C17A"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M 40 0 Q 20 20 20 40 T 40 80"
            fill="none"
            stroke="#D9C17A"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#islamicPattern)" />
    </svg>
  )
}

