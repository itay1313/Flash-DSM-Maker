'use client'

import { useState, useRef, useEffect } from 'react'
import { typography } from './ui/typographyClasses'
import { DesignSystemPreview } from './ui/DesignSystemPreview'
import { DashboardPreview } from './ui/DashboardPreview'

export interface DesignSystem {
  id: string
  name: string
  accent: string
  preview: string
}

interface DesignSystemSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectSystem: (systemName: string) => void
  selectedSystem?: string
}

const defaultDesignSystems: DesignSystem[] = [
  { id: 'base', name: 'Base', accent: 'bg-gray-500', preview: '🎨' },
  { id: 'mono', name: 'Mono', accent: 'bg-slate-500', preview: '⚫' },
  { id: 'cosmic-night', name: 'Cosmic Night', accent: 'bg-purple-500', preview: '🌌' },
  { id: 'soft-pop', name: 'Soft Pop', accent: 'bg-green-400', preview: '💚' },
  { id: 'neo-brutalism', name: 'Neo Brutalism', accent: 'bg-red-500', preview: '🔴' },
  { id: 'vintage', name: 'Vintage Paper', accent: 'bg-amber-600', preview: '📜' },
  { id: 'modern-minimal', name: 'Modern Minimal', accent: 'bg-blue-500', preview: '🔵' },
  { id: 'bubblegum', name: 'Bubblegum', accent: 'bg-pink-400', preview: '💗' },
  { id: 'generic-ds', name: 'Generic DS (Test)', accent: 'bg-indigo-500', preview: '🧩' },
]

export default function DesignSystemSelectionModal({
  isOpen,
  onClose,
  onSelectSystem,
  selectedSystem,
}: DesignSystemSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [previewSystem, setPreviewSystem] = useState<DesignSystem | null>(
    selectedSystem 
      ? defaultDesignSystems.find(s => s.name === selectedSystem) || defaultDesignSystems[0]
      : defaultDesignSystems[0]
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update preview when selectedSystem changes
  useEffect(() => {
    if (selectedSystem) {
      const system = defaultDesignSystems.find(s => s.name === selectedSystem)
      if (system) {
        setPreviewSystem(system)
      }
    }
  }, [selectedSystem])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  if (!isOpen) return null

  const filteredSystems = defaultDesignSystems.filter((system) =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (systemName: string) => {
    onSelectSystem(systemName)
    onClose()
  }

  const handlePreviewClick = (system: DesignSystem) => {
    setPreviewSystem(system)
  }

  const handleDropdownSelect = (system: DesignSystem) => {
    setPreviewSystem(system)
    setIsDropdownOpen(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center animate-fadeIn"
        onClick={onClose}
        style={{ zIndex: 99999 }}
      >
        {/* Modal */}
        <div
          className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 w-full max-w-7xl mx-4 max-h-[90vh] flex flex-col animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-white">Select Design System</h2>
              
              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-750 transition-colors"
                >
                  <span className="text-sm">{previewSystem?.name || 'Select...'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                    <div className="p-2">
                      {defaultDesignSystems.map((system) => (
                        <button
                          key={system.id}
                          onClick={() => handleDropdownSelect(system)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            previewSystem?.id === system.id
                              ? 'bg-indigo-500/20 text-indigo-300'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${system.accent}`}></div>
                          <span className="text-sm">{system.name}</span>
                          {previewSystem?.id === system.id && (
                            <svg className="w-4 h-4 ml-auto text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Content - Split View */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar - Design System Thumbnails */}
            <div className="w-80 border-r border-gray-800 flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-800">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search design systems..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Thumbnails List */}
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Default Design Systems
                </h3>
                <div className="space-y-3">
                  {filteredSystems.map((system) => (
                    <button
                      key={system.id}
                      onClick={() => handlePreviewClick(system)}
                      className={`w-full relative rounded-xl border transition-all text-left ${
                        previewSystem?.id === system.id
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
                          : 'border-gray-800 hover:border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      {/* Preview Card */}
                      <div className="p-3">
                        <DesignSystemPreview accent={system.accent} name={system.name} />
                      </div>
                      
                      {/* Label */}
                      <div className="px-3 pb-3">
                        <div className={`${typography.body} font-medium text-center`}>{system.name}</div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {previewSystem?.id === system.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {filteredSystems.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No design systems found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-950">
              {previewSystem && (
                <div className="max-w-4xl mx-auto">
                  <DashboardPreview accent={previewSystem.accent} name={previewSystem.name} />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => previewSystem && handleSelect(previewSystem.name)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Select {previewSystem?.name || 'Design System'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

