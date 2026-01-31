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

  const sidebarItems: SidebarItem[] = [
    { id: 'flow', icon: imgCheckBoxOutlineBlank, label: 'Flow Builder' },
    { id: 'tokens', icon: imgNearby, label: 'Design Tokens' },
    { id: 'components', icon: imgGridView, label: 'Components' },
    { id: 'templates', icon: imgDocs, label: 'Documentation' },
    { id: 'sync', icon: imgDiversity4, label: 'Members' },
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
        <div className={`w-11 h-11 flex items-center justify-center transition-all ${
          isActive
            ? 'bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/20 rounded-lg'
            : 'hover:bg-gray-900/50 rounded-lg'
        }`}>
          <div className="w-6 h-6 flex items-center justify-center">
            <img 
              src={item.icon} 
              alt={item.label} 
              className={`max-w-full max-h-full w-full h-full object-contain ${isActive ? 'brightness-125' : 'opacity-40 group-hover:opacity-100'} transition-all`} 
            />
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-700">
          {item.label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
        </div>
      </Link>
    )
  }

  return (
    <div className="relative h-full flex flex-col bg-[#0d0d0d] border-r border-gray-800 transition-all duration-300 w-16">
      <div className="flex flex-col items-center pt-5 pb-6 h-full w-full">
        {/* Navigation items */}
        <div className="flex flex-col gap-3 items-center w-full">
          {sidebarItems.map(renderItem)}
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
