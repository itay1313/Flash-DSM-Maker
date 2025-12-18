'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SidebarItem {
  id: string
  icon: React.ReactNode
  label: string
}

interface LeftSidebarProps {
  activeView: string
  onViewChange?: (view: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export default function LeftSidebar({ activeView, onViewChange, isCollapsed = false, onToggleCollapse }: LeftSidebarProps) {
  const pathname = usePathname()
  
  // Extract system ID from pathname (e.g., /ds/[id]/[view])
  const pathParts = pathname?.split('/') || []
  const systemId = pathParts[2] || 'new'

  const sidebarItems: SidebarItem[] = [
    {
      id: 'flow',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: 'Flow Builder',
    },
    {
      id: 'components',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      ),
      label: 'Components',
    },
    {
      id: 'tokens',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      label: 'Design Tokens',
    },
    {
      id: 'templates',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Templates',
    },
    {
      id: 'versions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Version History',
    },
    {
      id: 'sync',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      label: 'Sync & Integration',
    },
    {
      id: 'export',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Export',
    },
    {
      id: 'settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Settings',
    },
  ]

  return (
    <div className="relative">
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 z-50 w-6 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-r-lg flex items-center justify-center transition-all duration-300 group shadow-lg ${
          isCollapsed ? 'left-0' : 'left-full -translate-x-1/2'
        }`}
      >
        <svg 
          className={`w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`bg-gray-950 border-r border-gray-800 flex flex-col items-center py-4 h-full transition-all duration-300 ${
        isCollapsed ? 'w-0 overflow-hidden' : 'w-16'
      }`}>

      {/* Sidebar Items */}
      <div className={`flex-1 flex flex-col space-y-1 w-full px-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {sidebarItems.map((item) => {
          const href = `/ds/${systemId}/${item.id}`
          const isActive = activeView === item.id
          
          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => onViewChange?.(item.id)}
              className={`w-full p-3 rounded-lg transition-all relative group ${
                isActive
                  ? 'bg-palette-slate/20 text-palette-cornflower border border-palette-slate/30'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/50'
              }`}
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-palette-cornflower rounded-r-full" />
              )}
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-700">
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* AI Badge */}
      <div className={`mt-auto pt-4 border-t border-gray-800 w-full px-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full p-2 rounded-[8px] bg-palette-slate/10 border border-palette-slate/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-palette-cornflower" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      </div>
    </div>
  )
}

