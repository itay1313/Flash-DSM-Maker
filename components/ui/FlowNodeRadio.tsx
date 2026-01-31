import React from 'react'
import { typography } from './typographyClasses'

interface FlowNodeRadioProps {
  label: string
  checked: boolean
  onChange: () => void
  selected?: boolean
  className?: string
}

export function FlowNodeRadio({ label, checked, onChange, selected = false, className = '' }: FlowNodeRadioProps) {
  return (
    <div
      className={`flex items-center space-x-2 ${selected ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      onClick={selected ? onChange : undefined}
    >
      <div
        className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
          checked
            ? 'border-palette-slate bg-palette-slate'
            : 'border-gray-500'
        }`}
      />
      <span className={typography.body}>
        {label}
      </span>
    </div>
  )
}

