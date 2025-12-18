import React from 'react'
import { typography } from './typography'

interface FlowNodeButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  selected?: boolean
  icon?: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: 'default' | 'ghost'
  size?: 'default' | 'small'
}

export function FlowNodeButton({
  children,
  onClick,
  selected = false,
  icon,
  className = '',
  disabled = false,
  variant = 'default',
  size = 'default',
}: FlowNodeButtonProps) {
  const sizeClasses = size === 'small' 
    ? 'px-2 py-1.5' 
    : 'px-3 py-3'
  
  const typographyClass = size === 'small' ? typography.buttonSmall : typography.button
  
  const baseClasses = variant === 'default'
    ? `${size === 'default' ? 'w-full md:w-[240px]' : ''} ${sizeClasses} rounded-[8px] bg-white/10 border border-white/0 transition-colors flex items-center justify-center gap-2 ${typographyClass} ${
        selected && !disabled
          ? 'hover:bg-white/15 hover:border-white/20 cursor-pointer'
          : 'cursor-default'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`
    : `${size === 'default' ? 'w-full md:w-[240px]' : ''} ${sizeClasses} rounded-[8px] bg-white/10 border border-white/0 transition-colors flex items-center justify-center gap-2 ${typographyClass} ${
        selected && !disabled
          ? 'hover:bg-white/15 hover:border-white/20 cursor-pointer'
          : 'cursor-default'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

