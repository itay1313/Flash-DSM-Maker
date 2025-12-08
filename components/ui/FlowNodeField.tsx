import React from 'react'
import { typography } from './typography'

interface FlowNodeFieldProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function FlowNodeField({ label, children, className = '' }: FlowNodeFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className={typography.label}>
        {label}
      </span>
      {children}
    </div>
  )
}

interface FlowNodeInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  selected?: boolean
  editing?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onClick?: () => void
  type?: 'text' | 'textarea'
  rows?: number
  className?: string
  rightAction?: React.ReactNode
}

export function FlowNodeInput({
  value,
  onChange,
  placeholder,
  selected = false,
  editing = false,
  onFocus,
  onBlur,
  onClick,
  type = 'text',
  rows = 4,
  className = '',
  rightAction,
}: FlowNodeInputProps) {
  const baseClasses = `w-full md:w-[240px] relative inline-flex items-start px-3 py-3 rounded-[8px] bg-white/10 border border-white/0 ${
    selected ? 'cursor-text' : ''
  } ${className}`

  if (editing && selected) {
    return (
      <div className={baseClasses} onClick={onClick}>
        {type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            autoFocus
            rows={rows}
            className={`w-full bg-transparent ${typography.input} placeholder:text-white/40 focus:outline-none caret-white resize-none pr-8`}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholder}
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            autoFocus
            className={`w-full bg-transparent ${typography.input} placeholder:text-white/40 focus:outline-none caret-white`}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholder}
          />
        )}
        {rightAction && (
          <div className="absolute bottom-2 right-2">
            {rightAction}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      <span
        className={`${value ? typography.body : typography.bodyMuted} ${type === 'textarea' ? 'line-clamp-4 flex-1' : ''}`}
      >
        {value || placeholder}
      </span>
      {rightAction && (
        <div className="absolute bottom-2 right-2">
          {rightAction}
        </div>
      )}
    </div>
  )
}

