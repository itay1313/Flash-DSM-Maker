'use client'

import { useState, useEffect } from 'react'

interface Token {
  name: string
  value: string
  type: 'color' | 'font' | 'size'
}

interface TokenCategory {
  name: string
  tokens: Token[]
}

const DEFAULT_TOKENS: TokenCategory[] = [
    {
      name: 'Colors',
      tokens: [
        { name: 'primary', value: '#6366f1', type: 'color' },
        { name: 'secondary', value: '#8b5cf6', type: 'color' },
        { name: 'success', value: '#10b981', type: 'color' },
        { name: 'error', value: '#ef4444', type: 'color' },
      ],
    },
    {
      name: 'Typography',
      tokens: [
        { name: 'font-family', value: 'Inter, sans-serif', type: 'font' },
        { name: 'font-size-14', value: '0.875rem', type: 'size' },
        { name: 'font-size-16', value: '1rem', type: 'size' },
        { name: 'font-size-18', value: '1.125rem', type: 'size' },
      ],
    },
    {
      name: 'Spacing',
      tokens: [
        { name: 'spacing-4', value: '0.25rem', type: 'size' },
        { name: 'spacing-8', value: '0.5rem', type: 'size' },
        { name: 'spacing-16', value: '1rem', type: 'size' },
        { name: 'spacing-24', value: '1.5rem', type: 'size' },
      ],
    },
]

export default function TokensPage() {
  const [tokenCategories, setTokenCategories] = useState<TokenCategory[]>(DEFAULT_TOKENS)
  const [editingToken, setEditingToken] = useState<{ categoryIndex: number; tokenIndex: number } | null>(null)
  const [colorPickerPosition, setColorPickerPosition] = useState<{ x: number; y: number } | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  // Load tokens from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-tokens')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTokenCategories(parsed)
          }
        } catch (e) {
          console.error('Failed to load tokens:', e)
        }
      }
    }
  }, [])

  // Save tokens to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && tokenCategories.length > 0) {
      localStorage.setItem('dsm-tokens', JSON.stringify(tokenCategories))
    }
  }, [tokenCategories])

  const handleEditClick = (categoryIndex: number, tokenIndex: number, e: React.MouseEvent) => {
    const token = tokenCategories[categoryIndex].tokens[tokenIndex]
    if (token.type === 'color') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const buttonRect = e.currentTarget.getBoundingClientRect()
      
      // Calculate position - try to place it to the right, but adjust if it would go off-screen
      let x = buttonRect.right + 10
      let y = buttonRect.top
      
      // If it would go off the right edge, place it to the left
      if (x + 300 > window.innerWidth) {
        x = buttonRect.left - 320
      }
      
      // If it would go off the bottom, adjust upward
      if (y + 250 > window.innerHeight) {
        y = window.innerHeight - 260
      }
      
      // Ensure it doesn't go off the top
      if (y < 10) {
        y = 10
      }
      
      setColorPickerPosition({ x, y })
      setEditingToken({ categoryIndex, tokenIndex })
    }
  }

  const handleColorChange = (color: string) => {
    if (editingToken) {
      const updated = [...tokenCategories]
      updated[editingToken.categoryIndex].tokens[editingToken.tokenIndex].value = color
      setTokenCategories(updated)
    }
  }

  const handleCloseColorPicker = () => {
    setEditingToken(null)
    setColorPickerPosition(null)
  }

  const parseCSSVariables = (cssText: string): { name: string; value: string; type: 'color' | 'font' | 'size' }[] => {
    const variables: { name: string; value: string; type: 'color' | 'font' | 'size' }[] = []
    
    // Match CSS custom properties: --variable-name: value;
    const regex = /--([^:]+):\s*([^;]+);/g
    let match
    
    while ((match = regex.exec(cssText)) !== null) {
      const name = match[1].trim()
      const value = match[2].trim()
      
      // Determine type based on value
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
      // Parse CSS variables
      const parsedVariables = parseCSSVariables(importText)
      
      if (parsedVariables.length === 0) {
        alert('No CSS variables found. Please check your input.')
        setIsImporting(false)
        return
      }

      // Send to API for AI validation and improvement
      const response = await fetch('/api/import-css-variables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cssVariables: parsedVariables,
          existingTokens: tokenCategories,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to import and validate CSS variables')
      }

      const { validatedTokens, improvements } = await response.json()
      
      // Update tokens with validated and improved versions
      setTokenCategories(validatedTokens)
      
      // Show success message with improvements
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

        <div className="space-y-6">
          {tokenCategories.map((category, categoryIndex) => (
            <div key={category.name} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.tokens.map((token, tokenIndex) => (
                  <div
                    key={token.name}
                    className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {token.type === 'color' && (
                        <div
                          className="w-8 h-8 rounded border border-gray-700"
                          style={{ backgroundColor: token.value }}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-white">{token.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{token.value}</div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleEditClick(categoryIndex, tokenIndex, e)}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors"
                    >
                      Edit
                    </button>
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={handleCloseColorPicker}
          />
          {/* Color Picker */}
          <div
            className="fixed z-50 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-5 min-w-[280px] transition-all duration-200"
            style={{
              left: `${colorPickerPosition.x}px`,
              top: `${colorPickerPosition.y}px`,
              animation: 'fadeIn 0.2s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {tokenCategories[editingToken.categoryIndex].tokens[editingToken.tokenIndex].name}
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
              
              {/* Color Input */}
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="color"
                    value={tokenCategories[editingToken.categoryIndex].tokens[editingToken.tokenIndex].value}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-20 h-20 rounded-lg border-2 border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors"
                    style={{
                      backgroundColor: tokenCategories[editingToken.categoryIndex].tokens[editingToken.tokenIndex].value,
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs text-gray-400 mb-1.5">Hex Color</label>
                  <input
                    type="text"
                    value={tokenCategories[editingToken.categoryIndex].tokens[editingToken.tokenIndex].value}
                    onChange={(e) => {
                      const value = e.target.value
                      // Allow typing hex codes
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

              {/* Preview */}
              <div className="pt-3 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-medium">Preview</span>
                  <div
                    className="flex-1 h-10 rounded-lg border-2 border-gray-700 shadow-lg"
                    style={{
                      backgroundColor: tokenCategories[editingToken.categoryIndex].tokens[editingToken.tokenIndex].value,
                    }}
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowImportModal(false)}
          />
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              {/* Header */}
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
              {/* Content */}
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
                  
                  {/* Example */}
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
              {/* Footer */}
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

