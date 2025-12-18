'use client'

import { useState, useEffect, useRef } from 'react'

interface SystemComponentsProps {
  designSystemName: string
  availableSystems: { id: string; projectName: string }[]
  onSwitchSystem: (id: string) => void
}

type Theme = 'light' | 'dark' | 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'yellow' | 'pink' | 'teal'

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
  { 
    id: 'red', 
    name: 'Red', 
    colors: { primary: '#EF4444', bg: '#7F1D1D', text: '#FEE2E2', border: '#EF4444' } 
  },
  { 
    id: 'orange', 
    name: 'Orange', 
    colors: { primary: '#F97316', bg: '#7C2D12', text: '#FFEDD5', border: '#F97316' } 
  },
  { 
    id: 'yellow', 
    name: 'Yellow', 
    colors: { primary: '#EAB308', bg: '#713F12', text: '#FEF9C3', border: '#EAB308' } 
  },
  { 
    id: 'pink', 
    name: 'Pink', 
    colors: { primary: '#EC4899', bg: '#831843', text: '#FCE7F3', border: '#EC4899' } 
  },
  { 
    id: 'teal', 
    name: 'Teal', 
    colors: { primary: '#14B8A6', bg: '#134E4A', text: '#CCFBF1', border: '#14B8A6' } 
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

interface ComponentStyles {
  radius: number
  shadow: {
    xOffset: number
    yOffset: number
    blur: number
    spread: number
    color: string
  }
}

export default function SystemComponents({ designSystemName, availableSystems, onSwitchSystem }: SystemComponentsProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark')
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [componentStyles, setComponentStyles] = useState<Record<string, ComponentStyles>>({})
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    colors: false,
    typography: false,
    other: true,
  })
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
                  <button 
                    onClick={() => {
                      setEditingComponent(component.name)
                      if (!componentStyles[component.name]) {
                        setComponentStyles({
                          ...componentStyles,
                          [component.name]: {
                            radius: 1.25,
                            shadow: {
                              xOffset: 4,
                              yOffset: 4,
                              blur: 0,
                              spread: 0,
                              color: '#000000',
                            },
                          },
                        })
                      }
                    }}
                    className="px-3 py-1 text-xs bg-palette-slate hover:bg-primary-600 rounded transition-colors"
                  >
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

      {/* Component Edit Modal - Right Sidebar */}
      {editingComponent && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setEditingComponent(null)}
          />
          {/* Modal - Right Side */}
          <div className="fixed inset-y-0 right-0 z-50 flex items-center">
            <div className="bg-gray-900 border-l border-gray-800 shadow-2xl w-full max-w-md h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
                <h2 className="text-xl font-semibold text-white">Edit {editingComponent}</h2>
                <button
                  onClick={() => setEditingComponent(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {/* Colors Section */}
                  <div>
                    <button
                      onClick={() => setExpandedSections({ ...expandedSections, colors: !expandedSections.colors })}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-gray-300">Colors</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.colors ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.colors && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs text-gray-500">Color options coming soon...</p>
                      </div>
                    )}
                  </div>

                  {/* Typography Section */}
                  <div>
                    <button
                      onClick={() => setExpandedSections({ ...expandedSections, typography: !expandedSections.typography })}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-gray-300">Typography</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.typography ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.typography && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs text-gray-500">Typography options coming soon...</p>
                      </div>
                    )}
                  </div>

                  {/* Other Section */}
                  <div>
                    <button
                      onClick={() => setExpandedSections({ ...expandedSections, other: !expandedSections.other })}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-gray-300">Other</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.other ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.other && (
                      <div className="mt-4 space-y-6">
                        {/* Radius */}
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Radius</label>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                              <input
                                type="range"
                                min="0"
                                max="3"
                                step="0.05"
                                value={componentStyles[editingComponent]?.radius || 1.25}
                                onChange={(e) => {
                                  const newStyles = {
                                    ...componentStyles,
                                    [editingComponent]: {
                                      ...componentStyles[editingComponent],
                                      radius: parseFloat(e.target.value),
                                    },
                                  }
                                  setComponentStyles(newStyles)
                                }}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                  background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.radius || 1.25) / 3) * 100}%, #374151 ${((componentStyles[editingComponent]?.radius || 1.25) / 3) * 100}%, #374151 100%)`,
                                }}
                              />
                            </div>
                            <input
                              type="number"
                              min="0"
                              max="3"
                              step="0.05"
                              value={componentStyles[editingComponent]?.radius || 1.25}
                              onChange={(e) => {
                                const newStyles = {
                                  ...componentStyles,
                                  [editingComponent]: {
                                    ...componentStyles[editingComponent],
                                    radius: parseFloat(e.target.value) || 0,
                                  },
                                }
                                setComponentStyles(newStyles)
                              }}
                              className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                            />
                            <span className="text-xs text-gray-400">rem</span>
                          </div>
                        </div>

                        {/* Shadow */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-3">Shadow</h4>
                          <div className="space-y-4">
                            {/* X Offset */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">X Offset</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="-20"
                                    max="20"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.xOffset || 4}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            xOffset: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.xOffset || 4) + 20) / 40 * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.xOffset || 4) + 20) / 40 * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="-20"
                                  max="20"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.xOffset || 4}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          xOffset: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Y Offset */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Y Offset</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="-20"
                                    max="20"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.yOffset || 4}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            yOffset: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.yOffset || 4) + 20) / 40 * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.yOffset || 4) + 20) / 40 * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="-20"
                                  max="20"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.yOffset || 4}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          yOffset: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Blur */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Blur</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.blur || 0}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            blur: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.blur || 0) / 50) * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.blur || 0) / 50) * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="0"
                                  max="50"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.blur || 0}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          blur: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Spread */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Spread</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.spread || 0}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            spread: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.spread || 0) / 50) * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.spread || 0) / 50) * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="0"
                                  max="50"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.spread || 0}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          spread: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Color */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Color</label>
                              <div className="flex items-center gap-3">
                                <input
                                  type="color"
                                  value={componentStyles[editingComponent]?.shadow.color || '#000000'}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          color: e.target.value,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-12 h-12 rounded border-2 border-gray-700 cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={componentStyles[editingComponent]?.shadow.color || '#000000'}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    if (value.match(/^#[0-9A-Fa-f]{0,6}$/) || value === '') {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            color: value || '#000000',
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }
                                  }}
                                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                  placeholder="#000000"
                                  maxLength={7}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="p-6 border-t border-gray-800 flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => setEditingComponent(null)}
                  className="flex-1 px-4 py-2 bg-palette-slate hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingComponent(null)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
