'use client'

import { useState, useEffect } from 'react'
import { TokenLayer, TokenCategory, TokenState, Binding, Token, TokenGroup, DEFAULT_TOKENS } from '@/lib/constants/tokens'

const CATEGORY_LABELS: Record<TokenCategory, string> = {
  colors: 'Colors',
  typography: 'Typography',
  spacing: 'Spacing',
  radius: 'Radius',
  shadows: 'Shadows',
  theme: 'Theme',
  motion: 'Motion',
  icons: 'Icons',
}

const AVAILABLE_COMPONENTS = [
  'Button',
  'Input',
  'Card',
  'Badge',
  'Checkbox',
  'Switch',
  'Modal',
  'Dropdown',
  'Radio',
  'Table',
  'Tabs',
  'Tooltip',
  'Avatar',
  'Breadcrumb',
  'Tag',
  'HeroSection',
  'Navbar',
  'Footer',
  'PricingTable',
]

const PROPERTY_DESCRIPTIONS: Record<string, string> = {
  'styles.bg': 'Component Background',
  'styles.text': 'Text Color',
  'styles.border': 'Border Color',
  'styles.radius': 'Corner Radius',
  'styles.padding': 'Inner Spacing',
  'styles.gap': 'Element Spacing',
  'container.bg': 'Outer Container Background',
  'container.radius': 'Outer Container Radius',
  'layout.gap': 'Grid/Layout Spacing',
  'content.typography': 'Content Font Style',
  'styles.typography': 'Main Typography',
  'styles.transitionDuration': 'Animation Speed',
  'styles.easing': 'Animation Easing',
  'styles.iconName': 'Icon Symbol',
  'styles.iconSize': 'Icon Dimensions',
}

const ALLOWED_PROPERTIES: Record<string, string[]> = {
  color: ['styles.bg', 'styles.text', 'styles.border', 'container.bg'],
  size: ['styles.padding', 'styles.gap', 'styles.radius', 'layout.gap'],
  radius: ['styles.radius', 'container.radius'],
  font: ['styles.typography', 'content.typography'],
  motion: ['styles.transitionDuration', 'styles.easing'],
  icon: ['styles.iconName', 'styles.iconSize'],
}

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState<TokenLayer>('primitives')
  const [tokens, setTokens] = useState<Record<TokenLayer, TokenGroup[]>>(DEFAULT_TOKENS)
  const [history, setHistory] = useState<Record<TokenLayer, TokenGroup[]>[]>([])
  const [redoStack, setRedoStack] = useState<Record<TokenLayer, TokenGroup[]>[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  const pushToHistory = (stateToPush: Record<TokenLayer, TokenGroup[]>) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(stateToPush)))
    if (newHistory.length > 20) newHistory.shift()
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setRedoStack([]) // Clear redo stack on new action
  }

  const handleUndo = () => {
    if (historyIndex >= 0) {
      const prevState = history[historyIndex]
      const currentTokens = JSON.parse(JSON.stringify(tokens))
      setRedoStack([currentTokens, ...redoStack])
      setTokens(JSON.parse(JSON.stringify(prevState)))
      setHistoryIndex(historyIndex - 1)
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0]
      const remainingRedo = redoStack.slice(1)
      const currentTokens = JSON.parse(JSON.stringify(tokens))
      
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(currentTokens)
      
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setTokens(JSON.parse(JSON.stringify(nextState)))
      setRedoStack(remainingRedo)
    }
  }

  const [editingToken, setEditingToken] = useState<{ layer: TokenLayer; groupIndex: number; tokenIndex: number } | null>(null)
  const [beforeEditState, setBeforeEditState] = useState<Record<TokenLayer, TokenGroup[]> | null>(null)
  const [editValue, setEditValue] = useState('')
  const [editModalPosition, setEditModalPosition] = useState<{ x: number; y: number } | null>(null)
  
  // Binding State
  const [isBindingsExpanded, setIsBindingsExpanded] = useState(true)
  const [showAddBinding, setShowAddBinding] = useState(false)
  const [bindingSearch, setBindingSearch] = useState('')
  const [newBinding, setNewBinding] = useState<Binding>({
    targetType: 'component',
    targetId: AVAILABLE_COMPONENTS[0],
    propertyPath: '',
    note: '',
  })
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA' ||
          (document.activeElement as HTMLElement)?.isContentEditable
        ) {
          return
        }
        e.preventDefault()
        handleUndo()
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA' ||
          (document.activeElement as HTMLElement)?.isContentEditable
        ) {
          return
        }
        e.preventDefault()
        handleRedo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tokens, historyIndex, redoStack])

  // Load tokens from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-tokens-v2')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && typeof parsed === 'object') {
            // Migration: Check for old formats
            if (parsed.core || parsed.foundations || parsed.system || parsed.component) {
              const migrated: Record<TokenLayer, TokenGroup[]> = {
                primitives: [],
                semantic: [],
              }
              
              // Handle Primitives/Core/Foundations
              const oldPrimitives = parsed.primitives || parsed.core || parsed.foundations || []
              if (Array.isArray(oldPrimitives)) {
                migrated.primitives = oldPrimitives.map((group: TokenGroup) => ({
                  ...group,
                  layer: 'primitives' as TokenLayer,
                  tokens: group.tokens.map((token: Token) => ({
                    ...token,
                    layer: 'primitives' as TokenLayer,
                  })),
                }))
              }
              
              // Handle Semantic/System
              const oldSemantic = parsed.semantic || parsed.system || []
              if (Array.isArray(oldSemantic)) {
                migrated.semantic = oldSemantic.map((group: TokenGroup) => ({
                  ...group,
                  layer: 'semantic' as TokenLayer,
                  tokens: group.tokens.map((token: Token) => ({
                    ...token,
                    layer: 'semantic' as TokenLayer,
                  })),
                }))
              }
              
              // Handle Component tokens (merge into semantic)
              if (parsed.component && Array.isArray(parsed.component)) {
                const componentGroups = parsed.component.map((group: TokenGroup) => ({
                  ...group,
                  layer: 'semantic' as TokenLayer,
                  tokens: group.tokens.map((token: Token) => ({
                    ...token,
                    layer: 'semantic' as TokenLayer,
                  })),
                }))
                
                // Merge into semantic groups by category
                const mergedSemantic = new Map<string, TokenGroup>()
                migrated.semantic.forEach(g => mergedSemantic.set(g.category, g))
                
                componentGroups.forEach((group: TokenGroup) => {
                  if (mergedSemantic.has(group.category)) {
                    mergedSemantic.get(group.category)!.tokens.push(...group.tokens)
                  } else {
                    mergedSemantic.set(group.category, group)
                  }
                })
                
                migrated.semantic = Array.from(mergedSemantic.values())
              }
              
              setTokens(migrated)
              localStorage.setItem('dsm-tokens-v2', JSON.stringify(migrated))
            } else if (parsed.primitives || parsed.semantic) {
              // Already in new format (supports either layer or both)
              const validData: Record<TokenLayer, TokenGroup[]> = {
                primitives: Array.isArray(parsed.primitives) ? parsed.primitives : DEFAULT_TOKENS.primitives,
                semantic: Array.isArray(parsed.semantic) ? parsed.semantic : DEFAULT_TOKENS.semantic,
              }
              setTokens(validData)
            } else {
              // Invalid structure, use defaults
              setTokens(DEFAULT_TOKENS)
              localStorage.setItem('dsm-tokens-v2', JSON.stringify(DEFAULT_TOKENS))
            }
          } else {
            setTokens(DEFAULT_TOKENS)
          }
        } catch (e) {
          console.error('Failed to load tokens:', e)
          setTokens(DEFAULT_TOKENS)
          localStorage.setItem('dsm-tokens-v2', JSON.stringify(DEFAULT_TOKENS))
        }
      } else {
        // No saved data, use defaults
        setTokens(DEFAULT_TOKENS)
      }
    }
  }, [])

  // Save tokens to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dsm-tokens-v2', JSON.stringify(tokens))
      // Notify other components in the same window
      window.dispatchEvent(new Event('dsm-tokens-updated'))
    }
  }, [tokens])

  // Apply tokens to CSS variables in :root
  useEffect(() => {
    if (typeof window !== 'undefined' && document.documentElement) {
      const root = document.documentElement
      
      // Apply Primitives first (raw values)
      tokens.primitives?.forEach((group) => {
        group.tokens.forEach((token) => {
          const cssVarName = `--${token.name}`
          // Only set if value doesn't start with var() (to avoid circular references for raw values)
          if (!token.value.startsWith('var(')) {
            root.style.setProperty(cssVarName, token.value)
          }
        })
      })

      // Apply Semantic tokens (contextual usage)
      tokens.semantic?.forEach((group) => {
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
    setBeforeEditState(JSON.parse(JSON.stringify(tokens)))
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
    setBeforeEditState(null)
  }

  const handleSaveEdit = () => {
    if (editingToken && editValue.trim() && beforeEditState) {
      pushToHistory(beforeEditState)
      handleValueChange(editValue.trim())
      handleCloseEditModal()
    } else {
      handleCloseEditModal()
    }
  }

  const handleAddBinding = () => {
    if (editingToken && newBinding.propertyPath) {
      pushToHistory(tokens)
      const updated = { ...tokens }
      const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
      
      if (!token.bindings) token.bindings = []
      
      // Check for duplicates
      const isDuplicate = token.bindings.some(b => 
        b.targetType === newBinding.targetType && 
        b.targetId === newBinding.targetId && 
        b.propertyPath === newBinding.propertyPath
      )
      
      if (isDuplicate) {
        alert('This binding already exists.')
        return
      }

      // Add with animation flag
      const bindingToAdd = { ...newBinding, isNew: true }
      token.bindings.push(bindingToAdd)
      setTokens(updated)
      setShowAddBinding(false)
      
      // Clear animation flag after delay
      setTimeout(() => {
        const fresh = { ...tokens }
        const t = fresh[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
        if (t.bindings) {
          t.bindings = t.bindings.map(b => ({ ...b, isNew: false }))
          setTokens(fresh)
        }
      }, 2000)

      setNewBinding({
        targetType: 'component',
        targetId: AVAILABLE_COMPONENTS[0],
        propertyPath: '',
        note: '',
      })
    }
  }

  const handleRemoveBinding = (index: number) => {
    if (editingToken) {
      pushToHistory(tokens)
      const updated = { ...tokens }
      const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
      if (token.bindings) {
        token.bindings.splice(index, 1)
        setTokens(updated)
      }
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

    pushToHistory(tokens)
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
    if (!currentEditingToken || !editingToken) return null

    switch (currentEditingToken.type) {
      case 'color':
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Light Mode Value */}
              <div className="space-y-2">
                <label className="block text-[10px] text-gray-500 uppercase font-bold tracking-tight">Light Value</label>
                <div className="flex items-center gap-2">
                <input
                  type="color"
                    value={currentEditingToken.lightValue || currentEditingToken.value}
                  onChange={(e) => {
                      const updated = { ...tokens }
                      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].lightValue = e.target.value
                      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value = e.target.value // Update main value too
                      setTokens(updated)
                    }}
                    className="w-8 h-8 rounded border border-gray-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentEditingToken.lightValue || currentEditingToken.value}
                    onChange={(e) => {
                      const updated = { ...tokens }
                      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].lightValue = e.target.value
                      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value = e.target.value
                      setTokens(updated)
                    }}
                    className="flex-1 min-w-0 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white font-mono"
                />
              </div>
              </div>

              {/* Dark Mode Value */}
              <div className="space-y-2">
                <label className="block text-[10px] text-gray-500 uppercase font-bold tracking-tight">Dark Value</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentEditingToken.darkValue || currentEditingToken.value}
                    onChange={(e) => {
                      const updated = { ...tokens }
                      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].darkValue = e.target.value
                      setTokens(updated)
                    }}
                    className="w-8 h-8 rounded border border-gray-700 cursor-pointer"
                  />
                <input
                  type="text"
                    value={currentEditingToken.darkValue || currentEditingToken.value}
                  onChange={(e) => {
                      const updated = { ...tokens }
                      updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].darkValue = e.target.value
                      setTokens(updated)
                    }}
                    className="flex-1 min-w-0 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white font-mono"
                />
              </div>
            </div>
            </div>
            
            <div className="pt-2 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium">Active Preview</span>
                <div
                  className="flex-1 h-10 rounded-lg border-2 border-gray-700 shadow-lg"
                  style={{ backgroundColor: currentEditingToken.value }}
                />
              </div>
            </div>
          </div>
        )
      
      case 'font':
        return (
          <div className="space-y-4">
          <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Font Family</label>
            <input
              type="text"
                value={currentEditingToken.value}
              onChange={(e) => {
                  const updated = { ...tokens }
                  updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value = e.target.value
                  setTokens(updated)
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Inter, sans-serif"
            />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Weight</label>
                <select
                  value={currentEditingToken.styleObject?.weight || '400'}
                  onChange={(e) => {
                    const updated = { ...tokens }
                    const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                    if (!token.styleObject) token.styleObject = {}
                    token.styleObject.weight = e.target.value
                    setTokens(updated)
                  }}
                  className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white"
                >
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semibold</option>
                  <option value="700">Bold</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Size</label>
                <input
                  type="text"
                  value={currentEditingToken.styleObject?.size || '1rem'}
                  onChange={(e) => {
                    const updated = { ...tokens }
                    const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                    if (!token.styleObject) token.styleObject = {}
                    token.styleObject.size = e.target.value
                    setTokens(updated)
                  }}
                  className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white font-mono"
                  placeholder="1rem"
                />
              </div>
            </div>
          </div>
        )
      
      case 'size':
      case 'radius':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5 tracking-wider">Value</label>
              <input
                type="text"
                value={currentEditingToken.value}
                onChange={(e) => {
                  const updated = { ...tokens }
                  updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].value = e.target.value
                  setTokens(updated)
                }}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                placeholder="0.25rem, 1rem, etc."
              />
            </div>
            {/* Visual Preview for Size/Radius */}
            <div className="pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 uppercase font-bold">Preview</span>
                <div 
                  className="bg-indigo-500/20 border border-indigo-500/40"
                  style={{ 
                    width: currentEditingToken.type === 'size' ? currentEditingToken.value : '40px',
                    height: '40px',
                    borderRadius: currentEditingToken.type === 'radius' ? currentEditingToken.value : '4px'
                  }}
                ></div>
              </div>
            </div>
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
      
      case 'motion':
        return (
          <div className="grid grid-cols-2 gap-3">
          <div>
              <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Duration</label>
            <input
              type="text"
                value={currentEditingToken.styleObject?.duration || '200ms'}
              onChange={(e) => {
                  const updated = { ...tokens }
                  const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                  if (!token.styleObject) token.styleObject = {}
                  token.styleObject.duration = e.target.value
                  setTokens(updated)
                }}
                className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Easing</label>
              <select
                value={currentEditingToken.styleObject?.easing || 'ease-in-out'}
                onChange={(e) => {
                  const updated = { ...tokens }
                  const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                  if (!token.styleObject) token.styleObject = {}
                  token.styleObject.easing = e.target.value
                  setTokens(updated)
                }}
                className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white"
              >
                <option value="linear">Linear</option>
                <option value="ease">Ease</option>
                <option value="ease-in">Ease In</option>
                <option value="ease-out">Ease Out</option>
                <option value="ease-in-out">Ease In Out</option>
              </select>
            </div>
          </div>
        )
      
      case 'icon':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Pack</label>
                <input
                  type="text"
                  value={currentEditingToken.iconData?.pack || 'Lucide'}
                  onChange={(e) => {
                    const updated = { ...tokens }
                    const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                    if (!token.iconData) token.iconData = { pack: '', name: '', sizeRef: '' }
                    token.iconData.pack = e.target.value
                    setTokens(updated)
                  }}
                  className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Icon Name</label>
                <input
                  type="text"
                  value={currentEditingToken.iconData?.name || ''}
                  onChange={(e) => {
                    const updated = { ...tokens }
                    const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                    if (!token.iconData) token.iconData = { pack: '', name: '', sizeRef: '' }
                    token.iconData.name = e.target.value
                    setTokens(updated)
                  }}
                  className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Size Reference</label>
              <input
                type="text"
                value={currentEditingToken.iconData?.sizeRef || '16px'}
                onChange={(e) => {
                  const updated = { ...tokens }
                  const token = updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex]
                  if (!token.iconData) token.iconData = { pack: '', name: '', sizeRef: '' }
                  token.iconData.sizeRef = e.target.value
                  setTokens(updated)
                }}
                className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-white"
              />
            </div>
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
            <p className="text-gray-400 max-w-lg">
              Manage all your design tokens in one unified system. Define colors, typography, spacing, and more.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-1 mr-2">
              <button
                onClick={handleUndo}
                disabled={historyIndex < 0}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Undo (Ctrl+Z)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <div className="w-px h-4 bg-gray-800 mx-1" />
              <button
                onClick={handleRedo}
                disabled={redoStack.length === 0}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Redo (Ctrl+Shift+Z / Ctrl+Y)"
              >
                <svg className="w-4 h-4 scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
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
        </div>

        {/* Layer Tabs */}
        <div className="mb-6 flex space-x-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('primitives')}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'primitives'
                ? 'border-palette-cornflower text-palette-cornflower'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
          >
            <div className="flex flex-col items-start">
              <span>Primitives</span>
              <span className="text-[10px] opacity-50 font-normal">Raw Values</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('semantic')}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'semantic'
                ? 'border-palette-cornflower text-palette-cornflower'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
          >
            <div className="flex flex-col items-start">
              <span>Semantic</span>
              <span className="text-[10px] opacity-50 font-normal">Contextual Usage</span>
            </div>
          </button>
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
                        <div className="text-sm font-medium text-white truncate flex items-center gap-2">
                          --{token.name}
                          {token.state && (
                            <span className="text-xs text-gray-500">({token.state})</span>
                          )}
                          {token.bindings && token.bindings.length > 0 && (
                            <div 
                              className="flex -space-x-1 overflow-hidden" 
                              title={`Affects ${token.bindings.length} component${token.bindings.length > 1 ? 's' : ''}:\n${token.bindings.map(b => `• ${b.targetId} (${PROPERTY_DESCRIPTIONS[b.propertyPath] || b.propertyPath})`).join('\n')}`}
                            >
                              {Array.from(new Set(token.bindings.map(b => b.targetId))).slice(0, 3).map((target, i) => (
                                <div 
                                  key={i}
                                  className="w-5 h-5 rounded-full bg-indigo-600 border-2 border-gray-950 flex items-center justify-center text-[8px] font-black text-white"
                                >
                                  {target.charAt(0)}
                                </div>
                              ))}
                              {new Set(token.bindings.map(b => b.targetId)).size > 3 && (
                                <div className="w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-950 flex items-center justify-center text-[8px] font-bold text-gray-400">
                                  +{new Set(token.bindings.map(b => b.targetId)).size - 3}
                                </div>
                              )}
                            </div>
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
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Edit Token
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded uppercase font-bold tracking-wider">{currentEditingToken.type}</span>
                    {currentEditingToken.bindings && currentEditingToken.bindings.length > 0 && (
                      <span className="text-[10px] text-indigo-400 font-medium">
                        Affects {currentEditingToken.bindings.length} component{currentEditingToken.bindings.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleCloseEditModal}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5 tracking-wider">Token Variable</label>
                  <div className="flex items-center gap-2 group/input">
                    <span className="text-gray-600 font-mono text-sm group-focus-within/input:text-indigo-500 transition-colors">--</span>
                    <input
                      type="text"
                      value={currentEditingToken.name}
                      onChange={(e) => {
                        const updated = { ...tokens }
                        updated[editingToken.layer][editingToken.groupIndex].tokens[editingToken.tokenIndex].name = e.target.value
                        setTokens(updated)
                      }}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                      placeholder="token-name"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-950 border border-gray-800 rounded-xl shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.1em]">Value Configuration</label>
                    <div className="px-2 py-0.5 bg-indigo-500/10 rounded text-[9px] text-indigo-400 font-bold uppercase tracking-wider border border-indigo-500/20">
                      Live Sync Enabled
                    </div>
                  </div>
                  {renderEditInput()}
                </div>
              </div>

              {/* Bindings Section */}
              <div className="pt-4 mt-2 border-t border-gray-800">
                <button
                  onClick={() => setIsBindingsExpanded(!isBindingsExpanded)}
                  className="w-full flex items-center justify-between text-left mb-3 group/btn"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Impacted Components</span>
                    {currentEditingToken.bindings && currentEditingToken.bindings.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded-full font-bold animate-in fade-in zoom-in">
                        {currentEditingToken.bindings.length}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {currentEditingToken.bindings && currentEditingToken.bindings.length > 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(confirm('Clear all component links?')) {
                            const updated = { ...tokens };
                            updated[editingToken!.layer][editingToken!.groupIndex].tokens[editingToken!.tokenIndex].bindings = [];
                            setTokens(updated);
                          }
                        }}
                        className="text-[9px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-tighter opacity-0 group-hover/btn:opacity-100 transition-all"
                      >
                        Clear All
                      </button>
                    )}
                    <svg
                      className={`w-3.5 h-3.5 text-gray-500 group-hover/btn:text-gray-300 transition-all ${isBindingsExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isBindingsExpanded && (
                  <div className="space-y-4">
                    {/* Helpful Guide */}
                    <div className="px-3 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
                      <p className="text-[10px] text-indigo-300/80 leading-relaxed italic">
                        "Bindings define where this token is applied. They drive real usage and previews."
                      </p>
                    </div>
                    {/* Current Bindings List */}
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                      {currentEditingToken.bindings && currentEditingToken.bindings.length > 0 ? (
                        currentEditingToken.bindings.map((binding, idx) => (
                          <div 
                            key={idx} 
                            className={`flex items-center justify-between p-2.5 bg-gray-950 border ${binding.isNew ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 'border-gray-800'} rounded-xl group/binding hover:border-indigo-500/30 transition-all duration-500 animate-in slide-in-from-left-2`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-lg ${binding.isNew ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-900 text-gray-400'} border border-gray-800 flex items-center justify-center transition-colors`}>
                                {binding.targetType === 'component' ? (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                  </svg>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="text-[11px] font-bold text-white leading-tight flex items-center gap-1.5">
                                  {binding.targetId}
                                  {binding.note && (
                                    <span className="text-[9px] text-gray-500 font-normal truncate max-w-[100px] italic">
                                      — {binding.note}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1 mt-0.5">
                                  <span className="text-indigo-500/50">→</span> {binding.propertyPath}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveBinding(idx)}
                              className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover/binding:opacity-100 transition-all"
                              title="Remove link"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))
                      ) : !showAddBinding && (
                        <div className="flex flex-col items-center justify-center py-8 bg-indigo-500/[0.02] border border-dashed border-indigo-500/20 rounded-2xl group/empty hover:bg-indigo-500/[0.04] transition-all">
                          <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-indigo-500/40 mb-3 group-hover/empty:scale-110 group-hover/empty:text-indigo-500 transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                          </div>
                          <p className="text-[11px] text-gray-400 font-bold tracking-tight">No active connections</p>
                          <p className="text-[10px] text-gray-600 mt-1 max-w-[160px] text-center leading-relaxed">Connect this token to components to see live previews update.</p>
                          <button
                            onClick={() => {
                              setShowAddBinding(true)
                              const allowed = ALLOWED_PROPERTIES[currentEditingToken.type] || []
                              setNewBinding(prev => ({ ...prev, propertyPath: allowed[0] || '' }))
                            }}
                            className="mt-4 text-[10px] font-black text-white hover:text-white transition-all bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full shadow-lg shadow-indigo-600/20"
                          >
                            + Link Component
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Add Binding Form */}
                    {showAddBinding && (
                      <div className="p-4 bg-gray-950 border border-indigo-500/40 rounded-xl space-y-4 shadow-xl shadow-indigo-500/5 animate-in zoom-in-95 duration-200">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[9px] text-gray-500 uppercase font-black tracking-widest">Type</label>
                            <select
                              value={newBinding.targetType}
                              onChange={(e) => setNewBinding({ ...newBinding, targetType: e.target.value as 'component' | 'module' })}
                              className="w-full px-2 py-2 bg-gray-900 border border-gray-800 rounded-lg text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                            >
                              <option value="component">Component</option>
                              <option value="module">Module</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] text-gray-500 uppercase font-black tracking-widest">Target</label>
                            <div className="space-y-1">
                              <input
                                type="text"
                                value={bindingSearch}
                                onChange={(e) => setBindingSearch(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-2 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-[10px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-gray-700"
                              />
                              <select
                                value={newBinding.targetId}
                                onChange={(e) => setNewBinding({ ...newBinding, targetId: e.target.value })}
                                className="w-full px-2 py-2 bg-gray-900 border border-gray-800 rounded-lg text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                              >
                                {AVAILABLE_COMPONENTS
                                  .filter(comp => comp.toLowerCase().includes(bindingSearch.toLowerCase()))
                                  .map(comp => (
                                    <option key={comp} value={comp}>{comp}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] text-gray-500 uppercase font-black tracking-widest">Property Path</label>
                          <select
                            value={newBinding.propertyPath}
                            onChange={(e) => setNewBinding({ ...newBinding, propertyPath: e.target.value })}
                            className="w-full px-2 py-2 bg-gray-900 border border-gray-800 rounded-lg text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                          >
                            <option value="" disabled>Select property...</option>
                            {(ALLOWED_PROPERTIES[currentEditingToken.type] || []).map(prop => (
                              <option key={prop} value={prop}>{PROPERTY_DESCRIPTIONS[prop] || prop}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] text-gray-500 uppercase font-black tracking-widest">Note (Optional)</label>
                          <input
                            type="text"
                            value={newBinding.note || ''}
                            onChange={(e) => setNewBinding({ ...newBinding, note: e.target.value })}
                            placeholder="e.g. Primary background"
                            className="w-full px-2 py-2 bg-gray-900 border border-gray-800 rounded-lg text-[11px] text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleAddBinding}
                            disabled={!newBinding.propertyPath}
                            className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-[11px] font-bold transition-all shadow-lg shadow-indigo-600/20"
                          >
                            Add Connection
                          </button>
                          <button
                            onClick={() => setShowAddBinding(false)}
                            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-[11px] font-bold transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {!showAddBinding && currentEditingToken.bindings && currentEditingToken.bindings.length > 0 && (
                      <button
                        onClick={() => {
                          setShowAddBinding(true)
                          const allowed = ALLOWED_PROPERTIES[currentEditingToken.type] || []
                          setNewBinding(prev => ({ ...prev, propertyPath: allowed[0] || '' }))
                        }}
                        className="w-full py-2 border border-dashed border-gray-800 rounded-xl text-[11px] text-gray-500 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all font-medium"
                      >
                        + Link another component
                      </button>
                    )}
                  </div>
                )}
              </div>
              
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
