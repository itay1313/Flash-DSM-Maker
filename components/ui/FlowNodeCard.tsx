import React from 'react'
import { FlowNodeMenu, MenuItem } from './FlowNodeMenu'
import { typography } from './typography'

interface FlowNodeCardProps {
  children: React.ReactNode
  selected?: boolean
  className?: string
}

export function FlowNodeCard({ children, selected, className = '' }: FlowNodeCardProps) {
  return (
    <div
      className={`min-w-[280px] inline-flex flex-col gap-2 rounded-[20px] border border-[rgba(0,0,0,0.40)] bg-white/10 px-1 pt-2 pb-1 shadow-[0_16px_20px_-8px_rgba(0,0,0,0.25)] ${
        selected ? 'shadow-[0_16px_20px_-8px_rgba(99,102,241,0.35)]' : ''
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
    <div className="flex items-center justify-between px-3 py-2">
      <h4 className={typography.title}>
        {title}
      </h4>
      <div className="flex items-center space-x-2">
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
    <div className={`flex flex-col gap-5 rounded-[16px] bg-black/10 px-3 py-3 md:px-4 md:py-4 ${className}`}>
      {children}
    </div>
  )
}

