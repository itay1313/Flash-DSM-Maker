'use client'

import { useState, useEffect } from 'react'
import { Token, TokenLayer, Binding, TokenState } from '@/lib/constants/tokens'
import { PROPERTY_DESCRIPTIONS } from '@/components/pages/TokensPage'
import TokenCustomizationFlow from './TokenCustomizationFlow'

interface TokenDetailModalProps {
  token: Token | null
  tokenLocation: { layer: TokenLayer; groupIndex: number; tokenIndex: number } | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedToken: Token, location: { layer: TokenLayer; groupIndex: number; tokenIndex: number }, selectedBindings?: Binding[]) => void
  tokens: Record<TokenLayer, any[]>
}

export default function TokenDetailModal({ 
  token, 
  tokenLocation, 
  isOpen, 
  onClose, 
  onSave,
  tokens 
}: TokenDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'customize' | 'usage'>('customize')
  const [editedToken, setEditedToken] = useState<Token | null>(null)
  const [showCustomizationFlow, setShowCustomizationFlow] = useState(false)
  const [originalToken, setOriginalToken] = useState<Token | null>(null)

  useEffect(() => {
    if (token) {
      const tokenCopy = JSON.parse(JSON.stringify(token))
      setEditedToken(tokenCopy)
      setOriginalToken(tokenCopy)
    }
  }, [token])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !token || !tokenLocation || !editedToken) return null

  const handleSave = () => {
    if (editedToken && tokenLocation) {
      // Check if token has bindings - if yes, show customization flow
      if (editedToken.bindings && editedToken.bindings.length > 0) {
        setShowCustomizationFlow(true)
      } else {
        // No bindings, save directly
        onSave(editedToken, tokenLocation)
        onClose()
      }
    }
  }

  const handleCustomizationContinue = (selectedBindings: Binding[]) => {
    if (editedToken && tokenLocation) {
      // Create new token variant with selected bindings
      onSave(editedToken, tokenLocation, selectedBindings)
      setShowCustomizationFlow(false)
      onClose()
    }
  }

  const renderCustomize = () => {
    if (!editedToken) return null

    return (
      <div className="space-y-4">
        {/* Token Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
          <input
            type="text"
            value={editedToken.name}
            onChange={(e) => setEditedToken({ ...editedToken, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Token Value based on type */}
        {editedToken.type === 'color' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Light Value</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editedToken.lightValue || editedToken.value}
                    onChange={(e) => setEditedToken({ ...editedToken, lightValue: e.target.value, value: e.target.value })}
                    className="w-12 h-12 rounded border border-gray-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editedToken.lightValue || editedToken.value}
                    onChange={(e) => setEditedToken({ ...editedToken, lightValue: e.target.value, value: e.target.value })}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dark Value</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editedToken.darkValue || editedToken.value}
                    onChange={(e) => setEditedToken({ ...editedToken, darkValue: e.target.value })}
                    className="w-12 h-12 rounded border border-gray-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editedToken.darkValue || editedToken.value}
                    onChange={(e) => setEditedToken({ ...editedToken, darkValue: e.target.value })}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium">Preview</span>
                <div
                  className="flex-1 h-12 rounded-lg border-2 border-gray-700"
                  style={{ backgroundColor: editedToken.value }}
                />
              </div>
            </div>
          </div>
        )}

        {editedToken.type === 'font' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
              <input
                type="text"
                value={editedToken.value}
                onChange={(e) => setEditedToken({ ...editedToken, value: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Inter, sans-serif"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weight</label>
                <select
                  value={editedToken.styleObject?.weight || '400'}
                  onChange={(e) => setEditedToken({ 
                    ...editedToken, 
                    styleObject: { ...editedToken.styleObject, weight: e.target.value } 
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semibold</option>
                  <option value="700">Bold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
                <input
                  type="text"
                  value={editedToken.styleObject?.size || '1rem'}
                  onChange={(e) => setEditedToken({ 
                    ...editedToken, 
                    styleObject: { ...editedToken.styleObject, size: e.target.value } 
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="1rem"
                />
              </div>
            </div>
          </div>
        )}

        {(editedToken.type === 'size' || editedToken.type === 'radius') && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
            <input
              type="text"
              value={editedToken.value}
              onChange={(e) => setEditedToken({ ...editedToken, value: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="16px"
            />
          </div>
        )}

        {editedToken.type === 'shadow' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Shadow Value</label>
            <input
              type="text"
              value={editedToken.value}
              onChange={(e) => setEditedToken({ ...editedToken, value: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0 2px 4px rgba(0,0,0,.08)"
            />
          </div>
        )}

        {editedToken.type === 'motion' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                value={editedToken.value}
                onChange={(e) => setEditedToken({ ...editedToken, value: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="200ms"
              />
            </div>
            {editedToken.styleObject && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Easing</label>
                <input
                  type="text"
                  value={editedToken.styleObject.easing || 'ease'}
                  onChange={(e) => setEditedToken({ 
                    ...editedToken, 
                    styleObject: { ...editedToken.styleObject, easing: e.target.value } 
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ease"
                />
              </div>
            )}
          </div>
        )}

        {editedToken.type === 'icon' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pack</label>
                <input
                  type="text"
                  value={editedToken.iconData?.pack || 'Lucide'}
                  onChange={(e) => setEditedToken({ 
                    ...editedToken, 
                    iconData: { ...editedToken.iconData, pack: e.target.value, name: editedToken.iconData?.name || '', sizeRef: editedToken.iconData?.sizeRef || '16px' } 
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon Name</label>
                <input
                  type="text"
                  value={editedToken.iconData?.name || ''}
                  onChange={(e) => setEditedToken({ 
                    ...editedToken, 
                    iconData: { ...editedToken.iconData, name: e.target.value, pack: editedToken.iconData?.pack || 'Lucide', sizeRef: editedToken.iconData?.sizeRef || '16px' } 
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Size Reference</label>
              <input
                type="text"
                value={editedToken.iconData?.sizeRef || '16px'}
                onChange={(e) => setEditedToken({ 
                  ...editedToken, 
                  iconData: { ...editedToken.iconData, sizeRef: e.target.value, pack: editedToken.iconData?.pack || 'Lucide', name: editedToken.iconData?.name || '' } 
                })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {/* State selector for colors */}
        {editedToken.type === 'color' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
            <select
              value={editedToken.state || 'default'}
              onChange={(e) => setEditedToken({ ...editedToken, state: e.target.value as TokenState })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="default">Default</option>
              <option value="hover">Hover</option>
              <option value="focus">Focus</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        )}
      </div>
    )
  }

  const renderUsage = () => {
    if (!token.bindings || token.bindings.length === 0) {
      return (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <p className="text-gray-400">This token is not currently used anywhere.</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {token.bindings.map((binding: Binding, index: number) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{binding.targetId}</span>
                  <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded">
                    {binding.targetType}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mb-1">
                  {PROPERTY_DESCRIPTIONS[binding.propertyPath] || binding.propertyPath}
                </div>
                {binding.note && (
                  <div className="text-xs text-gray-500 italic">{binding.note}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900 flex-shrink-0">
            <h2 className="text-xl font-semibold text-white">--{token.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 bg-gray-900">
            <button
              onClick={() => setActiveTab('customize')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'customize'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Customize
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'usage'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Usage
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'customize' ? renderCustomize() : renderUsage()}
          </div>

          {/* Footer */}
          {activeTab === 'customize' && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-900">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customization Flow Modal */}
      {showCustomizationFlow && originalToken && editedToken && tokenLocation && (
        <TokenCustomizationFlow
          originalToken={originalToken}
          updatedToken={editedToken}
          tokenLocation={tokenLocation}
          isOpen={showCustomizationFlow}
          onClose={() => setShowCustomizationFlow(false)}
          onContinue={handleCustomizationContinue}
        />
      )}
    </>
  )
}

