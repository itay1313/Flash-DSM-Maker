'use client'

import { useState } from 'react'
import { IconLibrary } from '@/lib/services/iconLibraries'

interface IconLibraryIntegrationProps {
  selectedLibrary: IconLibrary | null
  onSelectLibrary: (library: IconLibrary | null) => void
  onCustomIntegration: (url: string) => void
}

export default function IconLibraryIntegration({
  selectedLibrary,
  onSelectLibrary,
  onCustomIntegration,
}: IconLibraryIntegrationProps) {
  const [customUrl, setCustomUrl] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleCustomSubmit = () => {
    if (customUrl.trim()) {
      onCustomIntegration(customUrl.trim())
      setCustomUrl('')
      setShowCustomInput(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => onSelectLibrary('material')}
          className={`px-4 py-3 rounded-lg border-2 transition-all ${
            selectedLibrary === 'material'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">M</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Material Icons</div>
              <div className="text-xs text-gray-400">Google Fonts</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectLibrary('tabler')}
          className={`px-4 py-3 rounded-lg border-2 transition-all ${
            selectedLibrary === 'tabler'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-white">T</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Tabler Icons</div>
              <div className="text-xs text-gray-400">4,985+ icons</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectLibrary('lucide')}
          className={`px-4 py-3 rounded-lg border-2 transition-all ${
            selectedLibrary === 'lucide'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-white">L</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Lucide Icons</div>
              <div className="text-xs text-gray-400">1,000+ icons</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setShowCustomInput(!showCustomInput)
            if (!showCustomInput) {
              onSelectLibrary(null)
            }
          }}
          className={`px-4 py-3 rounded-lg border-2 transition-all ${
            showCustomInput
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Custom</div>
              <div className="text-xs text-gray-400">Add integration</div>
            </div>
          </div>
        </button>
      </div>

      {showCustomInput && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Integration URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://api.example.com/icons"
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!customUrl.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              Connect
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false)
                setCustomUrl('')
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Provide an API endpoint that returns icon data in JSON format
          </p>
        </div>
      )}
    </div>
  )
}

