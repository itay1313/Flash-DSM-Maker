'use client'

import { useState, useEffect, useRef } from 'react'

interface SystemComponentsProps {
  designSystemName: string
  availableSystems: { id: string; projectName: string }[]
  onSwitchSystem: (id: string) => void
}

type Theme = 'light' | 'dark' | 'blue' | 'purple' | 'green'

const COMPONENT_CARDS = [
  { name: 'Button', description: 'Primary action buttons with multiple variants' },
  { name: 'Input', description: 'Text input fields with validation states' },
  { name: 'Card', description: 'Container component for grouping content' },
  { name: 'Modal', description: 'Overlay dialogs for important interactions' },
  { name: 'Dropdown', description: 'Select menus with search and filtering' },
  { name: 'Checkbox', description: 'Selection controls for multiple options' },
  { name: 'Radio', description: 'Single selection from a group' },
  { name: 'Switch', description: 'Toggle switches for on/off states' },
  { name: 'Badge', description: 'Status indicators and labels' },
  { name: 'Table', description: 'Data tables with sorting and pagination' },
  { name: 'Tabs', description: 'Tabbed navigation for content sections' },
  { name: 'Tooltip', description: 'Contextual help and information' },
  { name: 'Avatar', description: 'User profile images and initials' },
  { name: 'Breadcrumb', description: 'Navigation hierarchy indicators' },
  { name: 'Tag', description: 'Categorization and filtering tags' },
]

const THEMES: { id: Theme; name: string; colors: { primary: string; bg: string; text: string; border: string } }[] = [
  { 
    id: 'dark', 
    name: 'Dark', 
    colors: { primary: '#715AFF', bg: '#111827', text: '#F9FAFB', border: '#374151' } 
  },
  { 
    id: 'light', 
    name: 'Light', 
    colors: { primary: '#715AFF', bg: '#FFFFFF', text: '#111827', border: '#E5E7EB' } 
  },
  { 
    id: 'blue', 
    name: 'Blue', 
    colors: { primary: '#3B82F6', bg: '#1E3A8A', text: '#EFF6FF', border: '#3B82F6' } 
  },
  { 
    id: 'purple', 
    name: 'Purple', 
    colors: { primary: '#A855F7', bg: '#581C87', text: '#F3E8FF', border: '#A855F7' } 
  },
  { 
    id: 'green', 
    name: 'Green', 
    colors: { primary: '#10B981', bg: '#064E3B', text: '#D1FAE5', border: '#10B981' } 
  },
]

// Component Preview Renderer
function ComponentPreview({ componentName, theme }: { componentName: string; theme: Theme }) {
  const themeColors = THEMES.find(t => t.id === theme)?.colors || THEMES[0].colors
  
  const previewStyles = {
    backgroundColor: themeColors.bg,
    color: themeColors.text,
    borderColor: themeColors.border,
  }

  switch (componentName) {
    case 'Button':
      return (
        <div className="space-y-2">
          <button 
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
            style={{ backgroundColor: themeColors.primary, color: '#FFFFFF' }}
          >
            Primary Button
          </button>
          <button 
            className="px-4 py-2 rounded-lg font-medium text-sm border transition-all"
            style={{ borderColor: themeColors.border, color: themeColors.text }}
          >
            Secondary Button
          </button>
        </div>
      )
    case 'Input':
      return (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full px-3 py-2 rounded-lg text-sm border transition-all"
            style={{ 
              backgroundColor: themeColors.bg,
              borderColor: themeColors.border,
              color: themeColors.text
            }}
          />
          <input
            type="text"
            placeholder="Focused state"
            className="w-full px-3 py-2 rounded-lg text-sm border-2 transition-all"
            style={{ 
              backgroundColor: themeColors.bg,
              borderColor: themeColors.primary,
              color: themeColors.text
            }}
          />
        </div>
      )
    case 'Card':
      return (
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: themeColors.bg,
            borderColor: themeColors.border,
            color: themeColors.text
          }}
        >
          <h4 className="font-semibold mb-2">Card Title</h4>
          <p className="text-sm opacity-80">Card content goes here</p>
        </div>
      )
    case 'Badge':
      return (
        <div className="flex gap-2 flex-wrap">
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: themeColors.primary, color: '#FFFFFF' }}
          >
            New
          </span>
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium border"
            style={{ borderColor: themeColors.border, color: themeColors.text }}
          >
            Default
          </span>
        </div>
      )
    case 'Checkbox':
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: themeColors.primary }} />
            <span className="text-sm">Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked className="w-4 h-4 rounded" style={{ accentColor: themeColors.primary }} />
            <span className="text-sm">Option 2</span>
          </label>
        </div>
      )
    case 'Switch':
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div 
                className="w-10 h-6 rounded-full transition-all"
                style={{ backgroundColor: themeColors.border }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all translate-x-0.5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-sm">Toggle Off</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked className="sr-only" />
              <div 
                className="w-10 h-6 rounded-full transition-all"
                style={{ backgroundColor: themeColors.primary }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all translate-x-5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-sm">Toggle On</span>
          </label>
        </div>
      )
    default:
      return (
        <div 
          className="p-4 rounded-lg border text-center"
          style={{ 
            backgroundColor: themeColors.bg,
            borderColor: themeColors.border,
            color: themeColors.text
          }}
        >
          <p className="text-sm opacity-60">{componentName} Preview</p>
        </div>
      )
  }
}

export default function SystemComponents({ designSystemName, availableSystems, onSwitchSystem }: SystemComponentsProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark')
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isThemeDropdownOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false)
      }
    }

    // Use setTimeout to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isThemeDropdownOpen])

  return (
    <div className="relative min-h-full bg-gray-950 text-white">
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold">Design System Components</h1>
          <p className="text-gray-400">Viewing: {designSystemName}</p>
        </div>
      </div>

      {/* Components Grid */}
      <div className="px-8 pb-12 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENT_CARDS.map((component) => (
            <div 
              key={component.name} 
              className="bg-gray-900 border border-gray-800 rounded-xl hover:border-palette-slate/50 transition-all"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{component.name}</h3>
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{component.description}</p>
                
                {/* Preview Area */}
                <div 
                  className="mb-4 p-4 rounded-lg border border-gray-800 transition-all"
                  style={{ 
                    backgroundColor: THEMES.find(t => t.id === selectedTheme)?.colors.bg || '#111827',
                    borderColor: THEMES.find(t => t.id === selectedTheme)?.colors.border || '#374151',
                    minHeight: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ComponentPreview componentName={component.name} theme={selectedTheme} />
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                    Preview
                  </button>
                  <button className="px-3 py-1 text-xs bg-palette-slate hover:bg-primary-600 rounded transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Dropdown - Sticky Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 shadow-xl hover:border-palette-slate/50 transition-all flex items-center gap-2 group"
          >
            <div 
              className="w-4 h-4 rounded-full border-2"
              style={{ 
                backgroundColor: THEMES.find(t => t.id === selectedTheme)?.colors.primary || '#715AFF',
                borderColor: THEMES.find(t => t.id === selectedTheme)?.colors.primary || '#715AFF'
              }}
            />
            <span className="text-sm text-white font-medium">
              {THEMES.find(t => t.id === selectedTheme)?.name || 'Dark'} Theme
            </span>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isThemeDropdownOpen && (
            <div 
              className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden min-w-[200px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setSelectedTheme(theme.id)
                      setIsThemeDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                      selectedTheme === theme.id
                        ? 'bg-palette-slate/20 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: theme.colors.primary,
                        borderColor: theme.colors.primary
                      }}
                    />
                    <span className="text-sm font-medium">{theme.name}</span>
                    {selectedTheme === theme.id && (
                      <svg className="w-4 h-4 ml-auto text-palette-cornflower" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Switcher */}
      {availableSystems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40" style={{ transform: 'translateY(-60px)' }}>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 shadow-xl">
            <label className="block text-xs text-gray-400 mb-1">Switch design system</label>
            <select
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
              onChange={(e) => onSwitchSystem(e.target.value)}
              value={availableSystems.find((s) => s.projectName === designSystemName)?.id || ''}
            >
              {availableSystems.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.projectName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
