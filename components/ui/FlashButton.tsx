import React from 'react'

interface FlashButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'secondary'
  className?: string
}

export function FlashButton({ children, onClick, disabled, variant = 'default', className = '' }: FlashButtonProps) {
  const baseClasses = "flex gap-2 items-center justify-center px-4 py-2 rounded-xl shadow-button transition-all active:scale-95 relative font-sans text-base tracking-widest font-normal"
  
  const variantClasses = variant === 'default' 
    ? "bg-gray-950 text-gray-100 hover:opacity-90" 
    : "bg-gray-900 text-gray-300 hover:bg-gray-850"
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
      <img src="/assets/design-system/keyboard_arrow_right.svg" alt="Action arrow" className="w-6 h-6" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-button-inset" />
    </button>
  )
}
