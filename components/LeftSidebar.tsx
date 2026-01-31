'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Local assets from public/assets/design-system/ - ONLY THESE
const imgCheckBoxOutlineBlank = "/assets/design-system/check_box_outline_blank.svg"
const imgNearby = "/assets/design-system/nearby.svg"
const imgGridView = "/assets/design-system/grid_view.svg"
const imgDocs = "/assets/design-system/docs.svg"
const imgDiversity4 = "/assets/design-system/diversity_4.svg"
const imgAccountCircle = "/assets/design-system/account_circle.svg"
const imgSettings = "/assets/design-system/settings.svg"

interface SidebarItem {
  id: string
  icon: string
  label: string
  description?: string
  shortcut?: string
  badge?: string | number
}

interface LeftSidebarProps {
  activeView: string
  onViewChange?: (view: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export default function LeftSidebar({ 
  activeView, 
  onViewChange, 
  isCollapsed = false, 
  onToggleCollapse 
}: LeftSidebarProps) {
  const pathname = usePathname()
  
  const pathParts = pathname?.split('/') || []
  const systemId = pathParts[2] || 'new'

  const groups = [
    {
      title: 'Core Workspace',
      items: [
        {
          id: 'flow',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          ),
          label: 'Flow Builder',
          description: 'Architecture & Logic',
          shortcut: '1'
        },
        {
          id: 'tokens',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.53-9.53a2.122 2.122 0 000-3.001l-9.53 9.53m0 3.001a2.122 2.122 0 11-3.001-3.001 2.122 2.122 0 013.001 3.001z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25H9" />
            </svg>
          ),
          label: 'Design Tokens',
          description: 'Colors, Type & Spacing',
          shortcut: '2',
          badge: 12
        },
        {
          id: 'components',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          ),
          label: 'Component Library',
          description: 'UI Patterns & Variants',
          shortcut: '3'
        },
        {
          id: 'modules',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          ),
          label: 'Modules',
          description: 'Multi-Component Patterns',
          shortcut: '4'
        },
      ]
    },
    {
      title: 'Version Control',
      items: [
        {
          id: 'versions',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: 'Versions',
          description: 'History & Branches',
          shortcut: '5',
          badge: 3
        },
      ]
    },
    {
      title: 'Integration',
      items: [
        {
          id: 'sync',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          ),
          label: 'Integrations',
          description: 'Figma & Code Sync',
          shortcut: '6'
        },
        {
          id: 'export',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          ),
          label: 'Export',
          description: 'Packages & CSS',
          shortcut: '7'
        },
      ]
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'settings',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.127c-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          label: 'Settings',
          description: 'Configuration & Access',
          shortcut: '8'
        },
      ]
    }
  ]

  const renderItem = (item: SidebarItem) => {
    const href = `/ds/${systemId}/${item.id}`
    const isActive = activeView === item.id
    
    return (
      <Link
        key={item.id}
        href={href}
        onClick={() => onViewChange?.(item.id)}
        className="w-11 h-11 rounded-lg transition-all relative group flex items-center justify-center"
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
        {/* Quick Action */}
        {!isCollapsed && (
          <div className="mb-6 px-2">
            <button 
              onClick={() => onShowPrompt?.()}
              className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 transition-all hover:scale-110 active:scale-95 group relative"
              title="Quick Action"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-indigo-600 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl translate-x-[-10px] group-hover:translate-x-0">
                New Project
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-indigo-600"></div>
              </div>
            </button>
          </div>
        )}

      {/* Sidebar Items */}
      <div className={`flex-1 flex flex-col space-y-6 w-full px-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {groups.map((group, groupIdx) => (
          <div key={group.title} className="space-y-1">
            {groupIdx > 0 && <div className="mx-2 mb-4 border-t border-gray-800/50" />}
            {group.items.map((item) => {
              const href = `/ds/${systemId}/${item.id}`
              const isActive = activeView === item.id
              
              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={() => onViewChange?.(item.id)}
                  className={`w-full p-3 rounded-xl transition-all relative group ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/50'
                  }`}
                >
                  <div className="flex items-center justify-center relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-1.5 px-1 min-w-[14px] h-[14px] bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-gray-950">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  )}
                  {/* Enhanced Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 border border-gray-800 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl translate-x-[-10px] group-hover:translate-x-0 duration-200">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold">{item.label}</span>
                        {item.shortcut && (
                          <span className="text-[10px] text-gray-500 font-mono bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <span className="text-[10px] text-gray-500 font-medium">{item.description}</span>
                      )}
                    </div>
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                  </div>
                </Link>
              )
            })}
          </div>
        ))}
      </div>

        {/* User & Settings Section - Bottom */}
        <div className="mt-auto flex flex-col gap-3 items-center w-full">
          <button className="w-11 h-11 flex items-center justify-center cursor-pointer hover:opacity-100 opacity-40 transition-opacity rounded-lg">
            <div className="w-6 h-6 flex items-center justify-center">
              <img alt="Profile" className="max-w-full max-h-full w-full h-full object-contain" src={imgAccountCircle} />
            </div>
          </button>
          <Link
            href={`/ds/${systemId}/settings`}
            onClick={() => onViewChange?.('settings')}
            className={`w-11 h-11 flex items-center justify-center cursor-pointer hover:opacity-100 transition-opacity rounded-lg ${
              activeView === 'settings' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img alt="Settings" className="max-w-full max-h-full w-full h-full object-contain" src={imgSettings} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
