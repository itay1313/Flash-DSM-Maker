'use client'

import { useState, useEffect } from 'react'
import { Token, Binding, TokenLayer } from '@/lib/constants/tokens'
import { PROPERTY_DESCRIPTIONS } from '@/components/pages/TokensPage'

interface TokenCustomizationFlowProps {
  originalToken: Token
  updatedToken: Token
  tokenLocation: { layer: TokenLayer; groupIndex: number; tokenIndex: number }
  isOpen: boolean
  onClose: () => void
  onContinue: (selectedBindings: Binding[]) => void
}

export default function TokenCustomizationFlow({
  originalToken,
  updatedToken,
  tokenLocation,
  isOpen,
  onClose,
  onContinue,
}: TokenCustomizationFlowProps) {
  const [selectedBindings, setSelectedBindings] = useState<number[]>([])
  const bindings = originalToken.bindings || []

  // Initialize with all bindings selected
  useEffect(() => {
    if (bindings.length > 0 && isOpen) {
      setSelectedBindings(bindings.map((_, index) => index))
    }
  }, [isOpen, bindings.length])

  const handleToggleBinding = (index: number) => {
    setSelectedBindings(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleContinue = () => {
    const bindingsToApply = selectedBindings.map(index => bindings[index])
    onContinue(bindingsToApply)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
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
            <div>
              <h2 className="text-xl font-semibold text-white">Token Customization</h2>
              <p className="text-sm text-gray-400 mt-1">
                This token is used in {bindings.length} place{bindings.length !== 1 ? 's' : ''}
              </p>
            </div>
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
              <p className="text-sm text-gray-300">
                A new token variant will be created with your changes. Select the elements you wish to apply the changes to:
              </p>
            </div>

            <div className="space-y-3">
              {bindings.map((binding: Binding, index: number) => (
                <label
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500/50 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBindings.includes(index)}
                    onChange={() => handleToggleBinding(index)}
                    className="mt-1 w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
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
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-900">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={selectedBindings.length === 0}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

