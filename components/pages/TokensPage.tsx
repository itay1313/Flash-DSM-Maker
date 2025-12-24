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
        { name: 'color-white', value: '#ffffff', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-black', value: '#000000', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-gray-50', value: '#f5f5f5', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-gray-100', value: '#e5e5e5', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-gray-300', value: '#b3b3b3', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-gray-600', value: '#666666', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-gray-900', value: '#1a1a1a', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-blue-500', value: '#3b82f6', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-red-500', value: '#ef4444', type: 'color', layer: 'core', category: 'colors' },
        { name: 'color-green-500', value: '#22c55e', type: 'color', layer: 'core', category: 'colors' },
      ],
    },
    {
      layer: 'core',
      category: 'typography',
      tokens: [
        { name: 'font-sans', value: 'Inter, system-ui, Arial', type: 'font', layer: 'core', category: 'typography' },
        { name: 'font-mono', value: 'Menlo, monospace', type: 'font', layer: 'core', category: 'typography' },
        { name: 'font-size-xs', value: '12px', type: 'size', layer: 'core', category: 'typography' },
        { name: 'font-size-sm', value: '14px', type: 'size', layer: 'core', category: 'typography' },
        { name: 'font-size-md', value: '16px', type: 'size', layer: 'core', category: 'typography' },
        { name: 'font-size-lg', value: '18px', type: 'size', layer: 'core', category: 'typography' },
      ],
    },
    {
      layer: 'core',
      category: 'spacing',
      tokens: [
        { name: 'space-2', value: '4px', type: 'size', layer: 'core', category: 'spacing' },
        { name: 'space-4', value: '8px', type: 'size', layer: 'core', category: 'spacing' },
        { name: 'space-6', value: '12px', type: 'size', layer: 'core', category: 'spacing' },
        { name: 'space-8', value: '16px', type: 'size', layer: 'core', category: 'spacing' },
      ],
    },
    {
      layer: 'core',
      category: 'radius',
      tokens: [
        { name: 'radius-sm', value: '4px', type: 'radius', layer: 'core', category: 'radius' },
        { name: 'radius-md', value: '8px', type: 'radius', layer: 'core', category: 'radius' },
        { name: 'radius-lg', value: '12px', type: 'radius', layer: 'core', category: 'radius' },
      ],
    },
    {
      layer: 'core',
      category: 'shadows',
      tokens: [
        { name: 'shadow-sm', value: '0 2px 4px rgba(0,0,0,.08)', type: 'shadow', layer: 'core', category: 'shadows' },
        { name: 'shadow-md', value: '0 6px 16px rgba(0,0,0,.12)', type: 'shadow', layer: 'core', category: 'shadows' },
      ],
    },
  ],
  semantic: [
    {
      layer: 'semantic',
      category: 'colors',
      tokens: [
        { name: 'text-primary', value: 'var(--color-gray-900)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'text-secondary', value: 'var(--color-gray-600)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'text-inverse', value: 'var(--color-white)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'bg-app', value: 'var(--color-gray-50)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'bg-surface', value: 'var(--color-white)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'bg-subtle', value: 'var(--color-gray-100)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'border-default', value: 'var(--color-gray-300)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'accent-primary', value: 'var(--color-blue-500)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'accent-success', value: 'var(--color-green-500)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'accent-danger', value: 'var(--color-red-500)', type: 'color', layer: 'semantic', category: 'colors' },
      ],
    },
  ],
  component: [
    {
      layer: 'component',
      category: 'colors',
      tokens: [
        { name: 'btn-primary-bg', value: 'var(--accent-primary)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'btn-primary-text', value: 'var(--text-inverse)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'btn-outline-bg', value: 'transparent', type: 'color', layer: 'component', category: 'colors' },
        { name: 'btn-outline-text', value: 'var(--text-primary)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'btn-outline-border', value: 'var(--border-default)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'card-bg', value: 'var(--bg-surface)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'card-text', value: 'var(--text-primary)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'input-bg', value: 'var(--bg-surface)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'input-text', value: 'var(--text-primary)', type: 'color', layer: 'component', category: 'colors' },
        { name: 'input-border', value: 'var(--border-default)', type: 'color', layer: 'component', category: 'colors' },
      ],
    },
    {
      layer: 'component',
      category: 'typography',
      tokens: [
        { name: 'btn-font', value: 'var(--font-sans)', type: 'font', layer: 'component', category: 'typography' },
      ],
    },
    {
      layer: 'component',
      category: 'spacing',
      tokens: [
        { name: 'btn-padding-y', value: 'var(--space-4)', type: 'size', layer: 'component', category: 'spacing' },
        { name: 'btn-padding-x', value: 'var(--space-8)', type: 'size', layer: 'component', category: 'spacing' },
      ],
    },
    {
      layer: 'component',
      category: 'radius',
      tokens: [
        { name: 'btn-radius', value: 'var(--radius-md)', type: 'radius', layer: 'component', category: 'radius' },
        { name: 'card-radius', value: 'var(--radius-lg)', type: 'radius', layer: 'component', category: 'radius' },
        { name: 'input-radius', value: 'var(--radius-sm)', type: 'radius', layer: 'component', category: 'radius' },
      ],
    },
    {
      layer: 'component',
      category: 'shadows',
      tokens: [
        { name: 'card-shadow', value: 'var(--shadow-md)', type: 'shadow', layer: 'component', category: 'shadows' },
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
  const [editValue, setEditValue] = useState('')
  const [editModalPosition, setEditModalPosition] = useState<{ x: number; y: number } | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [addingToken, setAddingToken] = useState<{ layer: TokenLayer; category: TokenCategory } | null>(null)
  const [newToken, setNewToken] = useState<{ name: string; value: string; type: Token['type']; state?: TokenState }>({
    name: '',
    value: '',
    type: 'size',
    state: undefined,
  })
  const [addModalPosition, setAddModalPosition] = useState<{ x: number; y: number } | null>(null)

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

  // Apply tokens to CSS variables in :root
  useEffect(() => {
    if (typeof window !== 'undefined' && document.documentElement) {
      const root = document.documentElement
      
      // Apply Core tokens first (primitives)
      tokens.core.forEach((group) => {
        group.tokens.forEach((token) => {
          const cssVarName = `--${token.name}`
          // Only set if value doesn't start with var() (to avoid circular references)
          if (!token.value.startsWith('var(')) {
            root.style.setProperty(cssVarName, token.value)
          }
        })
      })

      // Apply Semantic tokens (depend on Core)
      tokens.semantic.forEach((group) => {
        group.tokens.forEach((token) => {
          const cssVarName = `--${token.name}`
          root.style.setProperty(cssVarName, token.value)
        })
      })

      // Apply Component tokens (depend on Semantic/Core)
      tokens.component.forEach((group) => {
        group.tokens.forEach((token) => {
          const cssVarName = `--${token.name}`
          root.style.setProperty(cssVarName, token.value)
        })
      })
    }
  }, [tokens])

  // Helper function to get computed CSS variable value
  const getComputedValue = (token: Token): string => {
    if (typeof window === 'undefined') return token.value
    
    if (token.value.startsWith('var(')) {
      // For var() references, try to get the computed value
      const cssVarName = `--${token.name}`
      const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim()
      return computed || token.value
    }
    
    return token.value
  }

  const handleEditClick = (layer: TokenLayer, groupIndex: number, tokenIndex: number, e: React.MouseEvent) => {
    const token = tokens[layer][groupIndex].tokens[tokenIndex]
    const buttonRect = e.currentTarget.getBoundingClientRect()
    
    let x = buttonRect.right + 10
    let y = buttonRect.top
    
    if (x + 320 > window.innerWidth) {
      x = buttonRect.left - 340
    }
    
    if (y + 300 > window.innerHeight) {
      y = window.innerHeight - 310
    }
    
    if (y < 10) {
      y = 10
    }
    
    setEditModalPosition({ x, y })
    setEditValue(token.value)
    setEditingToken({ layer, groupIndex, tokenIndex })
  }

  const handleValueChange = (newValue: string) => {
    if (editingToken) {
      const updated = { ...tokens }
      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value = newValue
      setTokens(updated)
      setEditValue(newValue)
    }
  }

  const handleCloseEditModal = () => {
    setEditingToken(null)
    setEditModalPosition(null)
    setEditValue('')
  }

  const handleSaveEdit = () => {
    if (editingToken && editValue.trim()) {
      handleValueChange(editValue.trim())
      handleCloseEditModal()
    }
  }

  const handleAddTokenClick = (layer: TokenLayer, category: TokenCategory, e: React.MouseEvent) => {
    const buttonRect = e.currentTarget.getBoundingClientRect()
    
    let x = buttonRect.right + 10
    let y = buttonRect.top
    
    if (x + 320 > window.innerWidth) {
      x = buttonRect.left - 340
    }
    
    if (y + 350 > window.innerHeight) {
      y = window.innerHeight - 360
    }
    
    if (y < 10) {
      y = 10
    }
    
    setAddModalPosition({ x, y })
    setAddingToken({ layer, category })
    setNewToken({
      name: '',
      value: '',
      type: category === 'colors' ? 'color' : category === 'typography' ? 'font' : category === 'shadows' ? 'shadow' : category === 'theme' ? 'theme' : category === 'radius' ? 'radius' : 'size',
      state: category === 'colors' ? 'default' : undefined,
    })
  }

  const handleCloseAddModal = () => {
    setAddingToken(null)
    setAddModalPosition(null)
    setNewToken({ name: '', value: '', type: 'size', state: undefined })
  }

  const handleSaveNewToken = () => {
    if (!addingToken || !newToken.name.trim() || !newToken.value.trim()) {
      return
    }

    const updated = { ...tokens }
    const groupIndex = updated[addingToken.layer].findIndex(g => g.category === addingToken.category)
    
    if (groupIndex >= 0) {
      const newTokenObj: Token = {
        name: newToken.name.trim(),
        value: newToken.value.trim(),
        type: newToken.type,
        layer: addingToken.layer,
        category: addingToken.category,
        state: newToken.state,
      }
      
      updated[addingToken.layer][groupIndex].tokens.push(newTokenObj)
      setTokens(updated)
      handleCloseAddModal()
    }
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
  const currentEditingToken = editingToken ? tokens[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex] : null

  const renderEditInput = () => {
    if (!currentEditingToken) return null

    switch (currentEditingToken.type) {
      case 'color':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <input
                  type="color"
                  value={editValue}
                  onChange={(e) => {
                    setEditValue(e.target.value)
                    handleValueChange(e.target.value)
                  }}
                  className="w-20 h-20 rounded-lg border-2 border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors"
                  style={{ backgroundColor: editValue }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-xs text-gray-400 mb-1.5">Value</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value.match(/^#|rgb|rgba|hsl|hsla|^[a-zA-Z]/) || value === '') {
                      setEditValue(value)
                      handleValueChange(value)
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="#000000 or rgb(...)"
                />
              </div>
            </div>
            <div className="pt-2 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium">Preview</span>
                <div
                  className="flex-1 h-10 rounded-lg border-2 border-gray-700 shadow-lg"
                  style={{ backgroundColor: editValue }}
                />
              </div>
            </div>
          </div>
        )
      
      case 'font':
        return (
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Font Family</label>
            <input
              type="text"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                handleValueChange(e.target.value)
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Inter, sans-serif"
            />
          </div>
        )
      
      case 'size':
      case 'radius':
        return (
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Value</label>
            <input
              type="text"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                handleValueChange(e.target.value)
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0.25rem, 1rem, etc."
            />
            <p className="text-xs text-gray-500 mt-1">Use rem, em, px, or %</p>
          </div>
        )
      
      case 'shadow':
        return (
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Shadow Value</label>
            <textarea
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                handleValueChange(e.target.value)
              }}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
            />
            <p className="text-xs text-gray-500 mt-1">CSS box-shadow syntax</p>
          </div>
        )
      
      case 'theme':
        return (
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Theme Value</label>
            <select
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                handleValueChange(e.target.value)
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        )
      
      default:
        return (
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Value</label>
            <input
              type="text"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                handleValueChange(e.target.value)
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        )
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
                    key={`${token.name}-${token.state || ''}`}
                    className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors group"
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
                          --{token.name}
                          {token.state && (
                            <span className="ml-2 text-xs text-gray-500">({token.state})</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 font-mono truncate" title={getComputedValue(token)}>
                          {getComputedValue(token)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleEditClick(activeTab, groupIndex, tokenIndex, e)}
                      className="p-2 text-gray-400 hover:text-palette-cornflower hover:bg-gray-800 rounded transition-colors flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100"
                      title="Edit token"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                ))}
                {/* Add Token Button */}
                <button
                  onClick={(e) => handleAddTokenClick(activeTab, group.category, e)}
                  className="flex items-center justify-center p-4 bg-gray-950 border-2 border-dashed border-gray-700 rounded-lg hover:border-indigo-500/50 hover:bg-gray-900 transition-colors group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingToken && editModalPosition && currentEditingToken && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={handleCloseEditModal}
          />
          <div
            className="fixed z-50 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-5 min-w-[320px] max-w-[400px] transition-all duration-200"
            style={{
              left: `${editModalPosition.x}px`,
              top: `${editModalPosition.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {currentEditingToken.name}
                    {currentEditingToken.state && (
                      <span className="ml-2 text-xs text-gray-400">({currentEditingToken.state})</span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{currentEditingToken.type}</p>
                </div>
                <button
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {renderEditInput()}
              
              <div className="flex gap-2 pt-2 border-t border-gray-800">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCloseEditModal}
                  className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Token Modal */}
      {addingToken && addModalPosition && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={handleCloseAddModal}
          />
          <div
            className="fixed z-50 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-5 min-w-[320px] max-w-[400px] transition-all duration-200"
            style={{
              left: `${addModalPosition.x}px`,
              top: `${addModalPosition.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Add New Token</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{CATEGORY_LABELS[addingToken.category]}</p>
                </div>
                <button
                  onClick={handleCloseAddModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Token Name */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Token Name</label>
                <input
                  type="text"
                  value={newToken.name}
                  onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="token-name"
                />
              </div>

              {/* Token Type (if not auto-determined) */}
              {addingToken.category === 'colors' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">State (optional)</label>
                  <select
                    value={newToken.state || 'default'}
                    onChange={(e) => setNewToken({ ...newToken, state: e.target.value as TokenState })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="default">Default</option>
                    <option value="hover">Hover</option>
                    <option value="focus">Focus</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              )}

              {/* Token Value Input */}
              {newToken.type === 'color' ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <input
                        type="color"
                        value={newToken.value || '#000000'}
                        onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
                        className="w-20 h-20 rounded-lg border-2 border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors"
                        style={{ backgroundColor: newToken.value || '#000000' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs text-gray-400 mb-1.5">Value</label>
                      <input
                        type="text"
                        value={newToken.value}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value.match(/^#|rgb|rgba|hsl|hsla|^[a-zA-Z]/) || value === '') {
                            setNewToken({ ...newToken, value })
                          }
                        }}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="#000000 or rgb(...)"
                      />
                    </div>
                  </div>
                  {newToken.value && (
                    <div className="pt-2 border-t border-gray-800">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium">Preview</span>
                        <div
                          className="flex-1 h-10 rounded-lg border-2 border-gray-700 shadow-lg"
                          style={{ backgroundColor: newToken.value }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : newToken.type === 'font' ? (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Font Family</label>
                  <input
                    type="text"
                    value={newToken.value}
                    onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Inter, sans-serif"
                  />
                </div>
              ) : newToken.type === 'shadow' ? (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Shadow Value</label>
                  <textarea
                    value={newToken.value}
                    onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                  />
                  <p className="text-xs text-gray-500 mt-1">CSS box-shadow syntax</p>
                </div>
              ) : newToken.type === 'theme' ? (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Theme Value</label>
                  <select
                    value={newToken.value}
                    onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Value</label>
                  <input
                    type="text"
                    value={newToken.value}
                    onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.25rem, 1rem, etc."
                  />
                  <p className="text-xs text-gray-500 mt-1">Use rem, em, px, or %</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-2 border-t border-gray-800">
                <button
                  onClick={handleSaveNewToken}
                  disabled={!newToken.name.trim() || !newToken.value.trim()}
                  className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Add Token
                </button>
                <button
                  onClick={handleCloseAddModal}
                  className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
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
