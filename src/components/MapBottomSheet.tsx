import { Mosque } from '../api/osmService'
import MosqueCard from './MosqueCard'
import { X } from 'lucide-react'

interface MapBottomSheetProps {
  mosques: Mosque[]
  selectedMosque: Mosque | null
  onSelectMosque: (mosque: Mosque) => void
  isOpen: boolean
  onToggle: () => void
}

export default function MapBottomSheet({
  mosques,
  selectedMosque,
  onSelectMosque,
  isOpen,
  onToggle,
}: MapBottomSheetProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
          onClick={onToggle}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 card rounded-t-[32px] z-50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-120px)]'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle */}
        <div
          className="flex justify-center p-3 cursor-grab active:cursor-grabbing"
          onClick={onToggle}
        >
          <div className="w-10 h-1.5 bg-gold/40 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-3">
          <h2 className="text-xl font-bold text-white">Nearby Mosques</h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-islamic hover:bg-primary-light transition-colors"
          >
            <X size={24} className="text-gold" strokeWidth={1.5} />
          </button>
        </div>

        {/* Mosque List */}
        <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: 'calc(85vh - 100px)' }}>
          {mosques.length === 0 ? (
            <p className="text-gray-300 text-center py-8">No mosques found nearby.</p>
          ) : (
            <div className="space-y-3">
              {mosques.map((mosque) => (
                <MosqueCard
                  key={mosque.id}
                  mosque={mosque}
                  isSelected={selectedMosque?.id === mosque.id}
                  onSelect={() => onSelectMosque(mosque)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
