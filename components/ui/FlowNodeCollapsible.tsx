import React, { useState } from 'react'
import { typography } from './typographyClasses'

interface FlowNodeCollapsibleProps {
  label: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  selected?: boolean
  className?: string
}

export function FlowNodeCollapsible({ label, children, isOpen, onToggle, selected = false, className = '' }: FlowNodeCollapsibleProps) {
  return (
    <div className={className}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (selected) {
            onToggle()
          }
        }}
        className={`w-full flex items-center justify-between ${typography.small} hover:text-white transition-colors`}
      >
        <span>{label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {isOpen && selected && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  )
}

