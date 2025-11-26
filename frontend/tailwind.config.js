/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E4F45',
          dark: '#0A3A31',
          light: '#126B5E',
        },
        emerald: '#0E4F45',
        accent: '#D9C17A',
        gold: '#D9C17A',
        card: '#0E4F45',
        background: {
          DEFAULT: '#0A0F0E',
          gradient: '#0E4F45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        'islamic': '16px',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'islamic': '0 8px 24px -4px rgba(14, 79, 69, 0.4)',
        'gold': '0 4px 16px -2px rgba(217, 193, 122, 0.3)',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(180deg, #0A0F0E 0%, rgba(14, 79, 69, 0.04) 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(14, 79, 69, 0.95) 0%, rgba(10, 58, 49, 0.98) 100%)',
        'gradient-header': 'linear-gradient(180deg, #0E4F45 0%, #0A3A31 100%)',
      },
    },
  },
  plugins: [],
}

