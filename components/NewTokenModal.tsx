'use client'

import { useState } from 'react'
import { Token, TokenType, TokenCategory } from '@/lib/types/tokens'

interface NewTokenModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateToken: (token: Token) => void
  category: TokenCategory
}

export default function NewTokenModal({ isOpen, onClose, onCreateToken, category }: NewTokenModalProps) {
  const [tokenName, setTokenName] = useState('')
  const [tokenValue, setTokenValue] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  const [tokenType, setTokenType] = useState<TokenType>('color')

  if (!isOpen) return null

  const handleCreate = () => {
    if (!tokenName || !tokenValue) {
      alert('Please fill in token name and value')
      return
    }

    const newToken: Token = {
      name: tokenName,
      value: tokenValue,
      type: tokenType,
      category,
      status: 'active',
      description: tokenDescription,
      usedBy: []
    }

    onCreateToken(newToken)
    
    // Reset form
    setTokenName('')
    setTokenValue('')
    setTokenDescription('')
    setTokenType('color')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-[32px] shadow-2xl border border-gray-800 w-full max-w-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-gray-100 mb-1" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              New Token
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">
              Add to {category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Token Name</label>
            <input
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="e.g., color-accent-blue"
              className="w-full bg-gray-950 border border-gray-800 p-4 rounded-[16px] text-gray-200 font-mono text-sm focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Type</label>
            <select
              value={tokenType}
              onChange={(e) => setTokenType(e.target.value as TokenType)}
              className="w-full bg-gray-950 border border-gray-800 p-4 rounded-[16px] text-gray-200 text-sm focus:outline-none focus:border-accent-magenta transition-all cursor-pointer"
            >
              <option value="color">Color</option>
              <option value="size">Size</option>
              <option value="font">Font</option>
              <option value="radius">Radius</option>
              <option value="shadow">Shadow</option>
              <option value="motion">Motion</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Value</label>
            {tokenType === 'color' ? (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  placeholder="#0886E5"
                  className="flex-1 bg-gray-950 border border-gray-800 p-4 rounded-[16px] text-gray-200 font-mono text-sm focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-700"
                />
                <input
                  type="color"
                  value={tokenValue.startsWith('#') ? tokenValue : '#0886E5'}
                  onChange={(e) => setTokenValue(e.target.value)}
                  className="w-16 h-full rounded-[16px] cursor-pointer border border-gray-800"
                />
              </div>
            ) : (
              <input
                type="text"
                value={tokenValue}
                onChange={(e) => setTokenValue(e.target.value)}
                placeholder={
                  tokenType === 'size' ? '16px' :
                  tokenType === 'font' ? "'Inter', sans-serif" :
                  tokenType === 'radius' ? '8px' :
                  tokenType === 'shadow' ? '0 2px 4px rgba(0,0,0,0.1)' :
                  tokenType === 'motion' ? '300ms' :
                  'Value'
                }
                className="w-full bg-gray-950 border border-gray-800 p-4 rounded-[16px] text-gray-200 font-mono text-sm focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-700"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Description (Optional)</label>
            <input
              type="text"
              value={tokenDescription}
              onChange={(e) => setTokenDescription(e.target.value)}
              placeholder="Add a description..."
              className="w-full bg-gray-950 border border-gray-800 p-4 rounded-[16px] text-gray-200 text-sm focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-700"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!tokenName || !tokenValue}
            className="flex-1 px-6 py-3 bg-accent-magenta hover:bg-accent-magenta/90 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors shadow-lg shadow-accent-magenta/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Token
          </button>
        </div>
      </div>
    </div>
  )
}
