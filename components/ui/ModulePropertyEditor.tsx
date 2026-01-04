'use client'

import { useState, useEffect } from 'react'
import { Module, TokenReference, SpacingValue } from '@/lib/types/modules'
import { Token, TokenGroup, DEFAULT_TOKENS } from '@/lib/constants/tokens'

interface ModulePropertyEditorProps {
  module: Module
  onPropertyChange: (propertyPath: string, value: any) => void
}

export default function ModulePropertyEditor({ module, onPropertyChange }: ModulePropertyEditorProps) {
  const [tokens, setTokens] = useState<Record<string, TokenGroup[]>>(DEFAULT_TOKENS)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    spacing: true,
    colors: true,
    typography: true,
    border: false,
  })

  // Load tokens
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

  const getAllTokens = (): Token[] => {
    const allTokens: Token[] = []
    Object.values(tokens).forEach((groups: TokenGroup[]) => {
      groups.forEach(group => {
        allTokens.push(...group.tokens)
      })
    })
    return allTokens
  }

  const getSpacingTokens = (): Token[] => {
    return getAllTokens().filter(t => t.category === 'spacing' && t.type === 'size')
  }

  const getColorTokens = (): Token[] => {
    return getAllTokens().filter(t => t.category === 'colors' && t.type === 'color')
  }

  const getTypographyTokens = (type: 'font' | 'size'): Token[] => {
    return getAllTokens().filter(t => t.category === 'typography' && t.type === type)
  }

  const getRadiusTokens = (): Token[] => {
    return getAllTokens().filter(t => t.category === 'radius' && t.type === 'radius')
  }

  const handleSpacingTokenSelect = (property: 'padding' | 'margin', side: keyof SpacingValue, tokenName: string) => {
    const token = getSpacingTokens().find(t => t.name === tokenName)
    if (!token) return

    const current = module.properties[property]
    let spacing: SpacingValue
    
    if (typeof current === 'object' && 'top' in current) {
      spacing = { ...current }
    } else {
      // If current is a TokenReference, initialize with default values
      spacing = { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    }

    spacing[side] = token.value

    // Convert to TokenReference format for each side
    const ref: TokenReference = {
      type: 'token',
      tokenName: token.name,
      tokenId: token.name,
      value: token.value,
    }

    // For now, store as SpacingValue with token values
    // In a more advanced implementation, each side could reference a different token
    onPropertyChange(property, spacing)
  }

  const handleTokenSelect = (propertyPath: string, tokenName: string, tokenCategory: 'spacing' | 'colors' | 'typography', tokenType?: 'size' | 'color' | 'font') => {
    let token: Token | undefined
    
    if (tokenCategory === 'spacing') {
      token = getSpacingTokens().find(t => t.name === tokenName)
    } else if (tokenCategory === 'colors') {
      token = getColorTokens().find(t => t.name === tokenName)
    } else if (tokenCategory === 'typography' && tokenType && (tokenType === 'font' || tokenType === 'size')) {
      token = getTypographyTokens(tokenType).find(t => t.name === tokenName)
    }

    if (token) {
      const ref: TokenReference = {
        type: 'token',
        tokenName: token.name,
        tokenId: token.name,
        value: token.value,
      }
      onPropertyChange(propertyPath, ref)
    }
  }

  const getCurrentTokenName = (value: TokenReference | string | SpacingValue | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') return ''
    if (typeof value === 'object' && 'top' in value) return '' // SpacingValue
    if (value && typeof value === 'object' && 'tokenName' in value) {
      return value.tokenName || ''
    }
    return ''
  }

  const getCurrentTokenValue = (value: TokenReference | string | SpacingValue | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object' && 'top' in value) {
      return `${value.top} ${value.right} ${value.bottom} ${value.left}`
    }
    if (value && typeof value === 'object' && 'value' in value) {
      return value.value || ''
    }
    return ''
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const renderSpacingTokenSelector = (property: 'padding' | 'margin', label: string) => {
    const spacingTokens = getSpacingTokens()
    const current = module.properties[property]
    const spacing: SpacingValue = typeof current === 'object' && 'top' in current
      ? current
      : { top: '0px', right: '0px', bottom: '0px', left: '0px' }

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        {spacingTokens.length === 0 ? (
          <div className="text-sm text-gray-500 p-3 bg-gray-800 rounded border border-gray-700">
            No spacing tokens available. <a href="#" className="text-indigo-400 hover:underline">Create tokens</a>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => {
              const currentValue = spacing[side]
              const matchingToken = spacingTokens.find(t => t.value === currentValue)
              
              return (
                <div key={side}>
                  <label className="block text-xs text-gray-500 mb-1 capitalize">{side}</label>
                  <select
                    value={matchingToken?.name || ''}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleSpacingTokenSelect(property, side, e.target.value)
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select token</option>
                    {spacingTokens.map(token => (
                      <option key={token.name} value={token.name}>
                        {token.name}
                      </option>
                    ))}
                  </select>
                  {matchingToken ? (
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <span className="text-indigo-400">●</span>
                      <span>{matchingToken.value}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-600 mt-1">No token selected</div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderTokenOnlySelector = (
    propertyPath: string,
    label: string,
    currentValue: TokenReference | string | undefined,
    tokenCategory: 'spacing' | 'colors' | 'typography',
    tokenType?: 'size' | 'color' | 'font'
  ) => {
    let availableTokens: Token[] = []
    
    if (tokenCategory === 'spacing') {
      availableTokens = getSpacingTokens()
    } else if (tokenCategory === 'colors') {
      availableTokens = getColorTokens()
    } else if (tokenCategory === 'typography' && tokenType && (tokenType === 'font' || tokenType === 'size')) {
      availableTokens = getTypographyTokens(tokenType)
    }

    const currentTokenName = getCurrentTokenName(currentValue)
    const currentToken = availableTokens.find(t => t.name === currentTokenName)

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        {availableTokens.length === 0 ? (
          <div className="text-sm text-gray-500 p-3 bg-gray-800 rounded border border-gray-700">
            No {tokenCategory} tokens available. <a href="#" className="text-indigo-400 hover:underline">Create tokens</a>
          </div>
        ) : (
          <div className="space-y-2">
            <select
              value={currentTokenName || ''}
              onChange={(e) => {
                if (e.target.value) {
                  handleTokenSelect(propertyPath, e.target.value, tokenCategory, tokenType)
                }
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select token</option>
              {availableTokens.map(token => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
            {currentToken && (
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded border border-gray-700">
                {tokenCategory === 'colors' && (
                  <div
                    className="w-6 h-6 rounded border border-gray-700"
                    style={{ backgroundColor: currentToken.value }}
                  />
                )}
                <div className="flex-1">
                  <div className="text-xs font-medium text-white">{currentToken.name}</div>
                  <div className="text-xs text-gray-500">{currentToken.value}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderRadiusSelector = (
    propertyPath: string,
    label: string,
    currentValue: TokenReference | string | undefined
  ) => {
    const radiusTokens = getRadiusTokens()
    const currentTokenName = getCurrentTokenName(currentValue)
    const currentToken = radiusTokens.find(t => t.name === currentTokenName)

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        {radiusTokens.length === 0 ? (
          <div className="text-sm text-gray-500 p-3 bg-gray-800 rounded border border-gray-700">
            No radius tokens available. <a href="#" className="text-indigo-400 hover:underline">Create tokens</a>
          </div>
        ) : (
          <div className="space-y-2">
            <select
              value={currentTokenName || ''}
              onChange={(e) => {
                if (e.target.value) {
                  const token = radiusTokens.find(t => t.name === e.target.value)
                  if (token) {
                    const ref: TokenReference = {
                      type: 'token',
                      tokenName: token.name,
                      tokenId: token.name,
                      value: token.value,
                    }
                    onPropertyChange(propertyPath, ref)
                  }
                }
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select token</option>
              {radiusTokens.map(token => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
            {currentToken && (
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded border border-gray-700">
                <div className="flex-1">
                  <div className="text-xs font-medium text-white">{currentToken.name}</div>
                  <div className="text-xs text-gray-500">{currentToken.value}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Properties</h3>

      {/* Spacing Section */}
      <div className="border border-gray-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection('spacing')}
          className="w-full flex items-center justify-between text-left"
        >
          <h4 className="font-semibold text-white">Spacing</h4>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.spacing ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.spacing && (
          <div className="mt-4 space-y-4">
            {renderSpacingTokenSelector('padding', 'Padding')}
            {renderSpacingTokenSelector('margin', 'Margin')}
            {renderTokenOnlySelector('gap', 'Gap', module.properties.gap, 'spacing', 'size')}
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className="border border-gray-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full flex items-center justify-between text-left"
        >
          <h4 className="font-semibold text-white">Colors</h4>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.colors ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.colors && (
          <div className="mt-4 space-y-4">
            {renderTokenOnlySelector('backgroundColor', 'Background Color', module.properties.backgroundColor, 'colors', 'color')}
            {renderTokenOnlySelector('colors.text', 'Text Color', module.properties.colors.text, 'colors', 'color')}
            {renderTokenOnlySelector('colors.border', 'Border Color', module.properties.colors.border, 'colors', 'color')}
            {renderTokenOnlySelector('colors.icon', 'Icon Color', module.properties.colors.icon, 'colors', 'color')}
            {renderTokenOnlySelector('colors.hover', 'Hover Color', module.properties.colors.hover, 'colors', 'color')}
            {renderTokenOnlySelector('colors.focus', 'Focus Color', module.properties.colors.focus, 'colors', 'color')}
            {renderTokenOnlySelector('colors.active', 'Active Color', module.properties.colors.active, 'colors', 'color')}
          </div>
        )}
      </div>

      {/* Typography Section */}
      <div className="border border-gray-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection('typography')}
          className="w-full flex items-center justify-between text-left"
        >
          <h4 className="font-semibold text-white">Typography</h4>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.typography ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.typography && (
          <div className="mt-4 space-y-4">
            {renderTokenOnlySelector('fontSize', 'Font Size', module.properties.fontSize, 'typography', 'size')}
            {renderTokenOnlySelector('fontWeight', 'Font Weight', module.properties.fontWeight, 'typography', 'size')}
            {renderTokenOnlySelector('fontFamily', 'Font Family', module.properties.fontFamily, 'typography', 'font')}
            {renderTokenOnlySelector('lineHeight', 'Line Height', module.properties.lineHeight, 'typography', 'size')}
          </div>
        )}
      </div>

      {/* Border & Effects Section */}
      <div className="border border-gray-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection('border')}
          className="w-full flex items-center justify-between text-left"
        >
          <h4 className="font-semibold text-white">Border & Effects</h4>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.border ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.border && (
          <div className="mt-4 space-y-4">
            {renderRadiusSelector('borderRadius', 'Border Radius', module.properties.borderRadius)}
            {renderTokenOnlySelector('borderWidth', 'Border Width', module.properties.borderWidth, 'spacing', 'size')}
            {renderTokenOnlySelector('boxShadow', 'Box Shadow', module.properties.boxShadow, 'colors', 'color')}
          </div>
        )}
      </div>
    </div>
  )
}
