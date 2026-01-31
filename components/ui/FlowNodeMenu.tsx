'use client'

import { useState, useRef, useEffect } from 'react'
import { typography } from './typographyClasses'

export interface MenuItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
  danger?: boolean
}

interface FlowNodeMenuProps {
  items: MenuItem[]
  className?: string
}

export function FlowNodeMenu({ items, className = '' }: FlowNodeMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      item.onClick()
      setIsOpen(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="flex flex-col items-center justify-center h-[18px] w-[18px] rounded hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span className="w-[3px] h-[3px] rounded-full bg-white/90"></span>
        <span className="w-[3px] h-[3px] rounded-full bg-white/90 mt-0.5"></span>
        <span className="w-[3px] h-[3px] rounded-full bg-white/90 mt-0.5"></span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden animate-slideInFromTop"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  handleItemClick(item)
                }}
                disabled={item.disabled}
                className={`w-full px-4 py-2.5 text-left ${typography.small} transition-colors flex items-center space-x-3 ${
                  item.disabled
                    ? 'text-gray-500 cursor-not-allowed'
                    : item.danger
                    ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon && (
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

