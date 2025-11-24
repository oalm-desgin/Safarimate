import { Outlet } from 'react-router-dom'
import BottomNavBar from './BottomNavBar'

export default function MobileLayout() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  )
}

