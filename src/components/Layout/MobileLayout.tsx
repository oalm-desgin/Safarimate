import { Outlet } from 'react-router-dom'
import BottomNavBar from './BottomNavBar'

export default function MobileLayout() {
  return (
    <div 
      className="bg-background relative"
      style={{
        height: '100vh',
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        overflow: 'hidden'
      }}
    >
      <main 
        className="overflow-y-auto"
        style={{
          flex: 1,
          paddingBottom: '80px',
          WebkitOverflowScrolling: 'touch',
          overflowX: 'hidden'
        }}
      >
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  )
}

