import React from 'react'

interface FlowNodeButtonGroupProps {
  children: React.ReactNode
  className?: string
}

export function FlowNodeButtonGroup({ children, className = '' }: FlowNodeButtonGroupProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {children}
    </div>
  )
}

