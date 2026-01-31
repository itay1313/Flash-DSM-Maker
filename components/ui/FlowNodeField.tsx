import React from 'react'
import { typography } from './typographyClasses'

interface FlowNodeFieldProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function FlowNodeField({ label, children, className = '' }: FlowNodeFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">
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
  // Textareas should be full width, regular inputs can have constrained width
  const widthClass = 'w-full'
  const baseClasses = `${widthClass} relative inline-flex items-start px-2 py-2 rounded bg-white/10 border border-white/0 text-xs ${
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
            className={`w-full bg-transparent text-xs text-white/90 placeholder:text-white/40 focus:outline-none caret-white resize-none ${rightAction ? 'pr-10' : 'pr-1'}`}
            style={{ 
              height: `${rows * 1.2}rem`,
              minHeight: `${rows * 1.2}rem`,
              maxHeight: `${rows * 1.2}rem`,
              overflow: 'auto',
              lineHeight: '1.2rem'
            }}
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
            className={`w-full bg-transparent text-xs text-white/90 placeholder:text-white/40 focus:outline-none caret-white ${rightAction ? 'pr-10' : 'pr-1'}`}
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
        className={`text-xs ${value ? 'text-white/90' : 'text-white/40'} ${type === 'textarea' ? 'line-clamp-2 flex-1 block' : ''} ${rightAction ? 'pr-10' : 'pr-1'}`}
        style={type === 'textarea' ? { 
          minHeight: `${rows * 1.2}rem`,
          maxHeight: `${rows * 1.2}rem`,
          height: `${rows * 1.2}rem`,
          display: 'block',
          overflow: 'hidden',
          lineHeight: '1.2rem'
        } : {}}
      >
        {value || placeholder}
      </span>
      {rightAction && (
        <div className="absolute bottom-1.5 right-1.5">
          {rightAction}
        </div>
      )}
    </div>
  )
}

