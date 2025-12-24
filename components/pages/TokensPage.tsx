'use client'

import { useState, useEffect } from 'react'

type TokenLayer = 'core' | 'semantic' | 'component'
type TokenCategory = 'colors' | 'typography' | 'spacing' | 'radius' | 'shadows' | 'theme'
type TokenState = 'default' | 'hover' | 'focus' | 'disabled'

interface Token {
  name: string
  value: string
  type: 'color' | 'font' | 'size' | 'radius' | 'shadow' | 'theme'
  state?: TokenState
  layer: TokenLayer
  category: TokenCategory
}

interface TokenGroup {
  category: TokenCategory
  layer: TokenLayer
  tokens: Token[]
}

const DEFAULT_TOKENS: Record<TokenLayer, TokenGroup[]> = {
  core: [
    {
      layer: 'core',
      category: 'colors',
      tokens: [
        { name: 'text-primary', value: '#ffffff', type: 'color', layer: 'core', category: 'colors', state: 'default' },
        { name: 'bg-surface', value: '#1a1a1a', type: 'color', layer: 'core', category: 'colors', state: 'default' },
        { name: 'border-default', value: '#333333', type: 'color', layer: 'core', category: 'colors', state: 'default' },
      ],
    },
    {
      layer: 'core',
      category: 'typography',
      tokens: [
        { name: 'font-family-base', value: 'Inter, sans-serif', type: 'font', layer: 'core', category: 'typography' },
        { name: 'font-size-md', value: '1rem', type: 'size', layer: 'core', category: 'typography' },
        { name: 'font-weight-regular', value: '400', type: 'size', layer: 'core', category: 'typography' },
        { name: 'line-height-normal', value: '1.5', type: 'size', layer: 'core', category: 'typography' },
      ],
    },
    {
      layer: 'core',
      category: 'spacing',
      tokens: [
        { name: 'space-4', value: '0.25rem', type: 'size', layer: 'core', category: 'spacing' },
        { name: 'space-8', value: '0.5rem', type: 'size', layer: 'core', category: 'spacing' },
        { name: 'space-16', value: '1rem', type: 'size', layer: 'core', category: 'spacing' },
      ],
    },
    {
      layer: 'core',
      category: 'radius',
      tokens: [
        { name: 'radius-md', value: '0.375rem', type: 'radius', layer: 'core', category: 'radius' },
        { name: 'radius-sm', value: '0.25rem', type: 'radius', layer: 'core', category: 'radius' },
        { name: 'radius-lg', value: '0.5rem', type: 'radius', layer: 'core', category: 'radius' },
      ],
    },
    {
      layer: 'core',
      category: 'shadows',
      tokens: [
        { name: 'shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', type: 'shadow', layer: 'core', category: 'shadows' },
        { name: 'shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', type: 'shadow', layer: 'core', category: 'shadows' },
      ],
    },
    {
      layer: 'core',
      category: 'theme',
      tokens: [
        { name: 'light', value: 'light', type: 'theme', layer: 'core', category: 'theme' },
        { name: 'dark', value: 'dark', type: 'theme', layer: 'core', category: 'theme' },
      ],
    },
  ],
  semantic: [
    {
      layer: 'semantic',
      category: 'colors',
      tokens: [
        { name: 'text-primary', value: '#ffffff', type: 'color', layer: 'semantic', category: 'colors', state: 'default' },
        { name: 'text-primary', value: '#e0e0e0', type: 'color', layer: 'semantic', category: 'colors', state: 'hover' },
        { name: 'bg-surface', value: '#1a1a1a', type: 'color', layer: 'semantic', category: 'colors', state: 'default' },
        { name: 'bg-surface', value: '#242424', type: 'color', layer: 'semantic', category: 'colors', state: 'hover' },
        { name: 'border-default', value: '#333333', type: 'color', layer: 'semantic', category: 'colors', state: 'default' },
        { name: 'border-default', value: '#404040', type: 'color', layer: 'semantic', category: 'colors', state: 'focus' },
      ],
    },
  ],
  component: [
    {
      layer: 'component',
      category: 'colors',
      tokens: [
        { name: 'button-bg', value: '#6366f1', type: 'color', layer: 'component', category: 'colors', state: 'default' },
        { name: 'button-bg', value: '#4f46e5', type: 'color', layer: 'component', category: 'colors', state: 'hover' },
        { name: 'button-bg', value: '#4338ca', type: 'color', layer: 'component', category: 'colors', state: 'focus' },
        { name: 'button-bg', value: '#6b7280', type: 'color', layer: 'component', category: 'colors', state: 'disabled' },
      ],
    },
  ],
}

const CATEGORY_LABELS: Record<TokenCategory, string> = {
  colors: 'Colors',
  typography: 'Typography',
  spacing: 'Spacing',
  radius: 'Radius',
  shadows: 'Shadows',
  theme: 'Theme',
}

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState<TokenLayer>('core')
  const [tokens, setTokens] = useState<Record<TokenLayer, TokenGroup[]>>(DEFAULT_TOKENS)
  const [editingToken, setEditingToken] = useState<{ layer: TokenLayer; groupIndex: number; tokenIndex: number } | null>(null)
  const [colorPickerPosition, setColorPickerPosition] = useState<{ x: number; y: number } | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  // Load tokens from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-tokens-v2')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && typeof parsed === 'object') {
            setTokens(parsed)
          }
        } catch (e) {
          console.error('Failed to load tokens:', e)
        }
      }
    }
  }, [])

  // Save tokens to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dsm-tokens-v2', JSON.stringify(tokens))
    }
  }, [tokens])

  const handleEditClick = (layer: TokenLayer, groupIndex: number, tokenIndex: number, e: React.MouseEvent) => {
    const token = tokens[layer][groupIndex].tokens[tokenIndex]
    if (token.type === 'color') {
      const buttonRect = e.currentTarget.getBoundingClientRect()
      
      let x = buttonRect.right + 10
      let y = buttonRect.top
      
      if (x + 300 > window.innerWidth) {
        x = buttonRect.left - 320
      }
      
      if (y + 250 > window.innerHeight) {
        y = window.innerHeight - 260
      }
      
      if (y < 10) {
        y = 10
      }
      
      setColorPickerPosition({ x, y })
      setEditingToken({ layer, groupIndex, tokenIndex })
    }
  }

  const handleColorChange = (color: string) => {
    if (editingToken) {
      const updated = { ...tokens }
      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value = color
      setTokens(updated)
    }
  }

  const handleCloseColorPicker = () => {
    setEditingToken(null)
    setColorPickerPosition(null)
  }

  const parseCSSVariables = (cssText: string): { name: string; value: string; type: 'color' | 'font' | 'size' }[] => {
    const variables: { name: string; value: string; type: 'color' | 'font' | 'size' }[] = []
    const regex = /--([^:]+):\s*([^;]+);/g
    let match
    
    while ((match = regex.exec(cssText)) !== null) {
      const name = match[1].trim()
      const value = match[2].trim()
      
      let type: 'color' | 'font' | 'size' = 'size'
      if (value.match(/^#|rgb|rgba|hsl|hsla/)) {
        type = 'color'
      } else if (value.match(/rem|em|px|pt|%/)) {
        type = 'size'
      } else if (value.match(/['"]/)) {
        type = 'font'
      }
      
      variables.push({ name, value, type })
    }
    
    return variables
  }

  const handleImportCSSVariables = async () => {
    if (!importText.trim()) {
      alert('Please paste CSS variables')
      return
    }

    setIsImporting(true)
    try {
      const parsedVariables = parseCSSVariables(importText)
      
      if (parsedVariables.length === 0) {
        alert('No CSS variables found. Please check your input.')
        setIsImporting(false)
        return
      }

      const response = await fetch('/api/import-css-variables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cssVariables: parsedVariables,
          existingTokens: tokens,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to import and validate CSS variables')
      }

      const { validatedTokens, improvements } = await response.json()
      
      if (validatedTokens) {
        setTokens(validatedTokens)
      }
      
      if (improvements && improvements.length > 0) {
        alert(`Successfully imported ${parsedVariables.length} CSS variables!\n\nAI Improvements:\n${improvements.join('\n')}`)
      } else {
        alert(`Successfully imported ${parsedVariables.length} CSS variables!`)
      }
      
      setShowImportModal(false)
      setImportText('')
    } catch (error) {
      console.error('Error importing CSS variables:', error)
      alert('Failed to import CSS variables. Please try again.')
    } finally {
      setIsImporting(false)
    }
  }

  const currentTokens = tokens[activeTab] || []

  return (
    <div className="min-h-full flex flex-col overflow-y-auto relative">
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Design Tokens</h1>
            <p className="text-gray-400">Manage colors, typography, spacing, and other design tokens</p>
          </div>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-palette-slate hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import CSS Variables
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-2 border-b border-gray-800">
          {(['core', 'semantic', 'component'] as TokenLayer[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-palette-cornflower text-palette-cornflower'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Token Groups */}
        <div className="space-y-6">
          {currentTokens.map((group, groupIndex) => (
            <div key={`${group.layer}-${group.category}`} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">{CATEGORY_LABELS[group.category]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.tokens.map((token, tokenIndex) => (
                  <div
                    key={token.name}
                    className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {token.type === 'color' && (
                        <div
                          className="w-8 h-8 rounded border border-gray-700 flex-shrink-0"
                          style={{ backgroundColor: token.value }}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white truncate">
                          {token.name}
                          {token.state && (
                            <span className="ml-2 text-xs text-gray-500">({token.state})</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 font-mono truncate">{token.value}</div>
                      </div>
                    </div>
                    {token.type === 'color' && (
                      <button
                        onClick={(e) => handleEditClick(activeTab, groupIndex, tokenIndex, e)}
                        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors flex-shrink-0 ml-2"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Picker Modal */}
      {editingToken && colorPickerPosition && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={handleCloseColorPicker}
          />
          <div
            className="fixed z-50 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-5 min-w-[280px] transition-all duration-200"
            style={{
              left: `${colorPickerPosition.x}px`,
              top: `${colorPickerPosition.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {tokens[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].name}
                </h3>
                <button
                  onClick={handleCloseColorPicker}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="color"
                    value={tokens[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-20 h-20 rounded-lg border-2 border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors"
                    style={{
                      backgroundColor: tokens[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value,
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs text-gray-400 mb-1.5">Hex Color</label>
                  <input
                    type="text"
                    value={tokens[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value.match(/^#[0-9A-Fa-f]{0,6}$/) || value === '') {
                        handleColorChange(value)
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="#000000"
                    maxLength={7}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-medium">Preview</span>
                  <div
                    className="flex-1 h-10 rounded-lg border-2 border-gray-700 shadow-lg"
                    style={{
                      backgroundColor: tokens[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value,
                    }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCloseColorPicker}
                  className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Import CSS Variables Modal */}
      {showImportModal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowImportModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div>
                  <h2 className="text-xl font-semibold text-white">Import CSS Variables</h2>
                  <p className="text-sm text-gray-400 mt-1">Paste your CSS variables. AI will validate and improve them.</p>
                </div>
                <button
                  onClick={() => {
                    setShowImportModal(false)
                    setImportText('')
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CSS Variables
                    </label>
                    <textarea
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder=":root {&#10;  --primary-color: #6366f1;&#10;  --secondary-color: #8b5cf6;&#10;  --font-size-base: 1rem;&#10;  --spacing-unit: 0.25rem;&#10;}"
                      className="w-full h-64 px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-palette-slate resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Paste CSS custom properties (--variable-name: value;). AI will automatically categorize and improve them.
                    </p>
                  </div>
                  
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-400 mb-2">Example:</p>
                    <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap">
{`:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --font-size-base: 1rem;
  --spacing-unit: 0.25rem;
}`}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-800 flex space-x-2">
                <button
                  onClick={handleImportCSSVariables}
                  disabled={isImporting || !importText.trim()}
                  className="flex-1 px-4 py-2 bg-palette-slate hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isImporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Importing & Validating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Import & Validate</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowImportModal(false)
                    setImportText('')
                  }}
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
