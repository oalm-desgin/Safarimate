import { Mosque } from '../api/osmService'
import MosqueCard from './MosqueCard'

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
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-120px)]'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2" onClick={onToggle}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Nearby Mosques
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {mosques.length} mosque{mosques.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Scrollable List */}
        <div className="overflow-y-auto pb-safe" style={{ maxHeight: 'calc(85vh - 120px)' }}>
          <div className="px-4 space-y-3 pb-6">
            {mosques.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600">No mosques found nearby</p>
                <p className="text-sm text-gray-500 mt-2">Try zooming out on the map</p>
              </div>
            ) : (
              mosques.map((mosque) => (
                <MosqueCard
                  key={mosque.id}
                  mosque={mosque}
                  isSelected={selectedMosque?.id === mosque.id}
                  onSelect={() => onSelectMosque(mosque)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

