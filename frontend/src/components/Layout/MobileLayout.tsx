import { Outlet } from 'react-router-dom'
import BottomNavBar from './BottomNavBar'

export default function MobileLayout() {
  return (
    <div 
      className="bg-background relative"
      style={{
        height: '852px',
        width: '393px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <main 
        className="overflow-y-auto"
        style={{
          flex: 1,
          paddingBottom: '80px',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  )
}

