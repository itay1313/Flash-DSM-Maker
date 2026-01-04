'use client'

import { Module, TokenReference, SpacingValue } from '@/lib/types/modules'
import { useState, useEffect } from 'react'
import { Token, TokenGroup, DEFAULT_TOKENS } from '@/lib/constants/tokens'

interface ModulePreviewProps {
  module: Module
  mode?: 'light' | 'dark'
}

export default function ModulePreview({ module, mode = 'light' }: ModulePreviewProps) {
  const [tokens, setTokens] = useState<Record<string, TokenGroup[]>>(DEFAULT_TOKENS)

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

  const resolveValue = (ref: TokenReference | string | SpacingValue | undefined): string => {
    if (!ref) return ''
    if (typeof ref === 'string') return ref
    if (typeof ref === 'object' && 'top' in ref) {
      // SpacingValue
      return `${ref.top} ${ref.right} ${ref.bottom} ${ref.left}`
    }
    if (ref && typeof ref === 'object' && 'type' in ref) {
      if (ref.type === 'token' && ref.tokenName) {
        const token = getAllTokens().find(t => t.name === ref.tokenName)
        return token?.value || ref.value || ''
      }
      return ref.value || ''
    }
    return ''
  }

  const getStyle = () => {
    const props = module.properties
    return {
      padding: typeof props.padding === 'object' && 'top' in props.padding
        ? `${props.padding.top} ${props.padding.right} ${props.padding.bottom} ${props.padding.left}`
        : resolveValue(props.padding),
      margin: typeof props.margin === 'object' && 'top' in props.margin
        ? `${props.margin.top} ${props.margin.right} ${props.margin.bottom} ${props.margin.left}`
        : resolveValue(props.margin),
      gap: resolveValue(props.gap),
      backgroundColor: resolveValue(props.backgroundColor),
      color: resolveValue(props.colors.text),
      fontSize: resolveValue(props.fontSize),
      fontWeight: resolveValue(props.fontWeight),
      fontFamily: resolveValue(props.fontFamily),
      lineHeight: resolveValue(props.lineHeight),
      borderColor: resolveValue(props.colors.border),
      borderWidth: resolveValue(props.borderWidth) || '1px',
      borderRadius: resolveValue(props.borderRadius) || '0px',
      boxShadow: resolveValue(props.boxShadow) || 'none',
    }
  }

  const renderModule = () => {
    const style = getStyle()
    const isDark = mode === 'dark'
    
    // Adjust colors for dark mode - invert if needed
    const bgColor = resolveValue(module.properties.backgroundColor)
    const textColor = resolveValue(module.properties.colors.text)
    
    const adjustedStyle = {
      ...style,
      backgroundColor: isDark && (bgColor === '#ffffff' || bgColor === 'white' || !bgColor) 
        ? '#1a1a1a' 
        : (!isDark && (bgColor === '#1a1a1a' || bgColor === '#000000' || bgColor === 'black'))
        ? '#ffffff'
        : style.backgroundColor,
      color: isDark && (textColor === '#000000' || textColor === 'black' || !textColor)
        ? '#ffffff'
        : (!isDark && (textColor === '#ffffff' || textColor === 'white'))
        ? '#000000'
        : style.color,
    }
    
    switch (module.type) {
      case 'combo-box':
        return (
          <div style={adjustedStyle} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full px-4 py-2 border rounded"
                style={{
                  borderColor: adjustedStyle.borderColor,
                  borderRadius: adjustedStyle.borderRadius,
                  backgroundColor: adjustedStyle.backgroundColor,
                  color: adjustedStyle.color,
                }}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: adjustedStyle.borderColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="mt-2 border rounded" style={{ borderColor: adjustedStyle.borderColor, borderRadius: adjustedStyle.borderRadius }}>
              <div className={`p-2 cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} style={{ color: adjustedStyle.color }}>Option 1</div>
              <div className={`p-2 cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} style={{ color: adjustedStyle.color }}>Option 2</div>
              <div className={`p-2 cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} style={{ color: adjustedStyle.color }}>Option 3</div>
            </div>
          </div>
        )

      case 'accordion':
        return (
          <div style={adjustedStyle} className="w-full">
            <div className="border rounded" style={{ borderColor: adjustedStyle.borderColor, borderRadius: adjustedStyle.borderRadius }}>
              <div className={`p-4 flex items-center justify-between cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`} style={{ color: adjustedStyle.color }}>
                <span>Section 1</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: adjustedStyle.borderColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="p-4 border-t" style={{ borderColor: adjustedStyle.borderColor, color: adjustedStyle.color }}>
                <p>Content for section 1</p>
              </div>
            </div>
            <div className="border rounded mt-2" style={{ borderColor: adjustedStyle.borderColor, borderRadius: adjustedStyle.borderRadius }}>
              <div className={`p-4 flex items-center justify-between cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`} style={{ color: adjustedStyle.color }}>
                <span>Section 2</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: adjustedStyle.borderColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )

      case 'modal':
        return (
          <div className="relative w-full" style={adjustedStyle}>
            <div
              className="border rounded-lg shadow-lg"
              style={{
                borderColor: adjustedStyle.borderColor,
                borderRadius: adjustedStyle.borderRadius,
                boxShadow: adjustedStyle.boxShadow,
                backgroundColor: adjustedStyle.backgroundColor,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: adjustedStyle.borderColor }}>
                <h3 className="font-semibold" style={{ color: adjustedStyle.color }}>Modal Title</h3>
              </div>
              <div className="p-4">
                <p style={{ color: adjustedStyle.color }}>Modal content goes here. This is a preview of how the modal will look.</p>
              </div>
              <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: adjustedStyle.borderColor }}>
                <button className="px-4 py-2 border rounded" style={{ borderColor: adjustedStyle.borderColor, borderRadius: adjustedStyle.borderRadius, color: adjustedStyle.color }}>
                  Cancel
                </button>
                <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: adjustedStyle.backgroundColor, borderRadius: adjustedStyle.borderRadius }}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )

      case 'navbar':
        return (
          <nav style={adjustedStyle} className="w-full">
            <div className="flex items-center justify-between" style={{ gap: adjustedStyle.gap }}>
              <div className="font-semibold" style={{ color: adjustedStyle.color }}>Brand</div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:underline" style={{ color: adjustedStyle.color }}>Home</a>
                <a href="#" className="hover:underline" style={{ color: adjustedStyle.color }}>About</a>
                <a href="#" className="hover:underline" style={{ color: adjustedStyle.color }}>Contact</a>
              </div>
            </div>
          </nav>
        )

      case 'drawer':
        return (
          <div className="relative w-full" style={adjustedStyle}>
            <div
              className="border rounded-lg"
              style={{
                borderColor: adjustedStyle.borderColor,
                borderRadius: adjustedStyle.borderRadius,
                backgroundColor: adjustedStyle.backgroundColor,
              }}
            >
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: adjustedStyle.borderColor }}>
                <h3 className="font-semibold" style={{ color: adjustedStyle.color }}>Drawer Title</h3>
                <button style={{ color: adjustedStyle.color }}>×</button>
              </div>
              <div className="p-4">
                <p style={{ color: adjustedStyle.color }}>Drawer content goes here.</p>
              </div>
            </div>
          </div>
        )

      case 'dropdown-menu':
        return (
          <div style={adjustedStyle} className="w-full">
            <button
              className="w-full px-4 py-2 border rounded flex items-center justify-between"
              style={{
                borderColor: adjustedStyle.borderColor,
                borderRadius: adjustedStyle.borderRadius,
                backgroundColor: adjustedStyle.backgroundColor,
                color: adjustedStyle.color,
              }}
            >
              <span>Select option</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: adjustedStyle.borderColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="mt-2 border rounded" style={{ borderColor: adjustedStyle.borderColor, borderRadius: adjustedStyle.borderRadius }}>
              <div className={`p-2 cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} style={{ color: adjustedStyle.color }}>Option 1</div>
              <div className={`p-2 cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} style={{ color: adjustedStyle.color }}>Option 2</div>
              <div className={`p-2 cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} style={{ color: adjustedStyle.color }}>Option 3</div>
            </div>
          </div>
        )

      case 'empty-state':
        return (
          <div style={adjustedStyle} className="w-full text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: adjustedStyle.borderColor }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="font-semibold mb-2" style={{ color: adjustedStyle.color }}>No items found</h3>
            <p style={{ color: adjustedStyle.color, opacity: 0.7 }}>There are no items to display.</p>
          </div>
        )

      case 'form':
        return (
          <form style={adjustedStyle} className="w-full space-y-4">
            <div>
              <label className="block mb-2" style={{ color: adjustedStyle.color }}>Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                style={{
                  borderColor: adjustedStyle.borderColor,
                  borderRadius: adjustedStyle.borderRadius,
                  backgroundColor: adjustedStyle.backgroundColor,
                  color: adjustedStyle.color,
                }}
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: adjustedStyle.color }}>Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded"
                style={{
                  borderColor: adjustedStyle.borderColor,
                  borderRadius: adjustedStyle.borderRadius,
                  backgroundColor: adjustedStyle.backgroundColor,
                  color: adjustedStyle.color,
                }}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white"
              style={{
                backgroundColor: adjustedStyle.backgroundColor,
                borderRadius: adjustedStyle.borderRadius,
              }}
            >
              Submit
            </button>
          </form>
        )

      case 'table':
        return (
          <div style={adjustedStyle} className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderColor: adjustedStyle.borderColor }}>
                  <th className="p-3 border text-left" style={{ color: adjustedStyle.color }}>Name</th>
                  <th className="p-3 border text-left" style={{ color: adjustedStyle.color }}>Email</th>
                  <th className="p-3 border text-left" style={{ color: adjustedStyle.color }}>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderColor: adjustedStyle.borderColor }}>
                  <td className="p-3 border" style={{ color: adjustedStyle.color }}>John Doe</td>
                  <td className="p-3 border" style={{ color: adjustedStyle.color }}>john@example.com</td>
                  <td className="p-3 border" style={{ color: adjustedStyle.color }}>Admin</td>
                </tr>
                <tr style={{ borderColor: adjustedStyle.borderColor }}>
                  <td className="p-3 border" style={{ color: adjustedStyle.color }}>Jane Smith</td>
                  <td className="p-3 border" style={{ color: adjustedStyle.color }}>jane@example.com</td>
                  <td className="p-3 border" style={{ color: adjustedStyle.color }}>User</td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      default:
        return (
          <div
            className="w-full p-4 border rounded"
            style={{
              ...adjustedStyle,
              borderColor: adjustedStyle.borderColor,
              borderRadius: adjustedStyle.borderRadius,
            }}
          >
            <p style={{ color: adjustedStyle.color }}>Preview for {module.name}</p>
            <p className="text-sm mt-2" style={{ color: adjustedStyle.color, opacity: 0.7 }}>{module.description}</p>
          </div>
        )
    }
  }

  return (
    <div className="w-full min-w-0" style={{ minHeight: '100%' }}>
      {renderModule()}
    </div>
  )
}

