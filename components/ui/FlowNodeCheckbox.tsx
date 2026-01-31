import React from 'react'
import { typography } from './typographyClasses'

interface FlowNodeCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
  selected?: boolean
  className?: string
}

export function FlowNodeCheckbox({ label, checked, onChange, selected = false, className = '' }: FlowNodeCheckboxProps) {
  return (
    <div
      className={`flex items-center space-x-1.5 ${selected ? 'cursor-pointer hover:bg-white/5 rounded px-1 py-0.5 transition-colors' : ''} ${className}`}
      onClick={selected ? onChange : undefined}
    >
      <div
        className={`w-3.5 h-3.5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-palette-slate border-palette-slate'
            : 'border-gray-500'
        }`}
      >
        {checked && (
          <svg className="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-xs text-white/90">
        {label}
      </span>
    </div>
  )
}

