import React from 'react'
import { FlowNodeMenu, MenuItem } from './FlowNodeMenu'
import { typography } from './typographyClasses'

interface FlowNodeCardProps {
  children: React.ReactNode
  selected?: boolean
  className?: string
}

export function FlowNodeCard({ children, selected, className = '' }: FlowNodeCardProps) {
  return (
    <div
      className={`min-w-[200px] max-w-[280px] inline-flex flex-col gap-1.5 rounded-lg border border-black/40 bg-white/10 px-1 pt-1.5 pb-1 shadow-card ${
        selected ? 'shadow-card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

interface FlowNodeHeaderProps {
  title: string
  menuItems?: MenuItem[]
  children?: React.ReactNode
}

export function FlowNodeHeader({ title, menuItems, children }: FlowNodeHeaderProps) {
  const defaultMenuItems: MenuItem[] = [
    {
      label: 'Duplicate',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => {},
    },
    {
      label: 'Delete',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: () => {},
      danger: true,
    },
  ]

  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <h4 className="text-xs font-semibold text-white/90">
        {title}
      </h4>
      <div className="flex items-center space-x-1.5">
        {children || (
          <FlowNodeMenu items={menuItems || defaultMenuItems} />
        )}
      </div>
    </div>
  )
}

interface FlowNodeBodyProps {
  children: React.ReactNode
  className?: string
}

export function FlowNodeBody({ children, className = '' }: FlowNodeBodyProps) {
  return (
    <div className={`flex flex-col gap-3 rounded-lg bg-black/10 px-2.5 py-2.5 ${className}`}>
      {children}
    </div>
  )
}

