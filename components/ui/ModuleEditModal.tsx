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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          className="bg-gradient-to-r from-gray-850 to-gray-850/50 border border-gray-600 rounded-[40px] shadow-2xl w-full h-full max-w-[95vw] max-h-[90vh] flex gap-6 overflow-hidden p-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Panel - Preview */}
          <div className="flex-1 flex flex-col gap-6 h-full overflow-hidden pl-6 py-6">
            <div className="flex items-center justify-between pr-6">
              <h2 className="text-[32px] text-gray-150 tracking-[1.6px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
                {module.name}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Dark/Light Mode Toggle */}
            <div className="flex bg-gray-950 border-b-[1.5px] border-gray-700 gap-1 h-12 items-center p-1 rounded-2xl w-fit">
              <button
                onClick={() => setPreviewMode('light')}
                className={`w-11 h-9 flex items-center justify-center rounded-xl transition-all ${
                  previewMode === 'light'
                    ? 'bg-gray-800 shadow-xl border border-gray-700'
                    : 'opacity-30 hover:opacity-100'
                }`}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <button
                onClick={() => setPreviewMode('dark')}
                className={`w-11 h-9 flex items-center justify-center rounded-xl transition-all ${
                  previewMode === 'dark'
                    ? 'bg-gray-800 shadow-xl border border-gray-700'
                    : 'opacity-30 hover:opacity-100'
                }`}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>

            {/* Preview Container */}
            <div className={`flex-1 rounded-[32px] overflow-auto transition-colors shadow-inner border border-gray-800 ${previewMode === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
              <div className="p-8">
                <ModulePreview module={module} mode={previewMode} />
              </div>
            </div>
          </div>

          {/* Right Panel - Properties */}
          <div className="bg-gray-950 h-full rounded-[40px] flex-[0.5] flex flex-col overflow-hidden border border-gray-800 shadow-2xl relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="flex-1 overflow-auto p-6 custom-scrollbar relative z-10">
              <ModulePropertyEditor
                module={module}
                onPropertyChange={onPropertyChange}
              />
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 p-6 bg-gray-950 border-t border-gray-800 z-10">
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-accent-magenta hover:bg-accent-magenta/90 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent-magenta/20 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

