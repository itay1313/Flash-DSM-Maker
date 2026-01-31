import React from 'react'
import { typography } from './typographyClasses'

interface FlowNodeFileCardProps {
  name: string
  subtitle?: string
  icon?: React.ReactNode
  onChange?: () => void
  selected?: boolean
  className?: string
}

export function FlowNodeFileCard({ name, subtitle, icon, onChange, selected = false, className = '' }: FlowNodeFileCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selected && onChange) {
      onChange()
    }
  }

  return (
    <div 
      className={`p-3 rounded bg-white/10 border border-white/0 ${selected && onChange ? 'cursor-pointer hover:bg-white/15 transition-colors' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {icon && (
            <span className="flex-shrink-0 w-4 h-4 text-purple-400">
              {icon}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <p className={`${typography.small} font-medium truncate`}>
              {name}
            </p>
            {subtitle && (
              <p className={`${typography.smallMuted} truncate`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {selected && onChange && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onChange()
            }}
            className={`ml-2 px-2 py-1 ${typography.small} hover:text-white transition-colors`}
          >
            Change
          </button>
        )}
      </div>
    </div>
  )
}

