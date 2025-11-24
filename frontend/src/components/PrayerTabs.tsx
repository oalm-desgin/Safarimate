interface PrayerTabsProps {
  activeTab: 'times' | 'information' | 'news' | 'calendar'
  onTabChange?: (tab: 'times' | 'information' | 'news' | 'calendar') => void
}

export default function PrayerTabs({ activeTab, onTabChange }: PrayerTabsProps) {
  const tabs = [
    { id: 'times' as const, label: 'Prayer times' },
    { id: 'information' as const, label: 'Information' },
    { id: 'news' as const, label: 'News' },
    { id: 'calendar' as const, label: 'Calendar' },
  ]

  return (
    <div className="flex border-b border-gray-200 bg-white px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  )
}

