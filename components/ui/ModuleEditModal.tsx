'use client'

import { useEffect, useState } from 'react'
import { Module } from '@/lib/types/modules'
import ModulePropertyEditor from '@/components/ui/ModulePropertyEditor'
import ModulePreview from '@/components/ui/ModulePreview'

interface ModuleEditModalProps {
  module: Module | null
  isOpen: boolean
  onClose: () => void
  onPropertyChange: (propertyPath: string, value: any) => void
  onSubmit?: () => void
}

export default function ModuleEditModal({ module, isOpen, onClose, onPropertyChange, onSubmit }: ModuleEditModalProps) {
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light')

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
    }
    onClose()
  }

  if (!isOpen || !module) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div
          className="bg-gray-900 border border-gray-700/50 rounded-xl shadow-2xl w-[90vw] h-[90vh] max-w-[95vw] max-h-[95vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700/50 bg-gray-900 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white truncate pr-4">{module.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-400 hover:text-white flex-shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content - Split Layout */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
            {/* Left Panel - Preview */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-700/50 overflow-auto relative">
              {/* Dark/Light Mode Toggle */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setPreviewMode('light')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    previewMode === 'light'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setPreviewMode('dark')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    previewMode === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dark
                </button>
              </div>
              <div className={`p-4 sm:p-8 min-h-full transition-colors ${previewMode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <ModulePreview module={module} mode={previewMode} />
              </div>
            </div>

            {/* Right Panel - Properties */}
            <div className="w-full md:w-1/2 bg-gray-900 overflow-auto">
              <div className="p-4 sm:p-6">
                <ModulePropertyEditor
                  module={module}
                  onPropertyChange={onPropertyChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

