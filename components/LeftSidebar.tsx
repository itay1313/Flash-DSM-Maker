'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Local assets from public/assets/design-system/
const imgCheckBox = "/assets/design-system/check_box_outline_blank.svg"
const imgNearby = "/assets/design-system/nearby.svg"
const imgGridView = "/assets/design-system/grid_view.svg"
const imgDocs = "/assets/design-system/docs.svg"
const imgAccountCircle = "/assets/design-system/account_circle.svg"
const imgSettings = "/assets/design-system/settings.svg"

interface LeftSidebarProps {
  activeView: string
  onViewChange?: (view: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  onShowPrompt?: () => void
  hasGeneratedPrompt?: boolean
}

export default function LeftSidebar({ 
  activeView, 
  onViewChange, 
  isCollapsed = false, 
  onToggleCollapse,
  onShowPrompt,
  hasGeneratedPrompt = false 
}: LeftSidebarProps) {
  const pathname = usePathname()
  
  const pathParts = pathname?.split('/') || []
  const systemId = pathParts[2] || 'new'

  return (
    <div className="flex h-screen">
      {/* Collapse/Expand Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-6 h-12 bg-gray-900 border border-gray-800 border-l-0 rounded-r-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6 h-full transition-all duration-300 ${
        isCollapsed ? 'w-0 overflow-hidden' : 'w-16'
      }`}>

      {/* Sidebar Items */}
      <div className={`flex-1 flex flex-col items-center gap-3 w-full px-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {/* Square/Frame Icon */}
        <Link
          href={`/ds/${systemId}/flow`}
          onClick={() => onViewChange?.('flow')}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all ${
            activeView === 'flow' ? 'bg-blue-500/20 rounded-full' : ''
          }`}
        >
          <img src={imgCheckBox} alt="" className={`w-5 h-5 object-contain ${activeView === 'flow' ? 'opacity-100' : 'opacity-40'}`} />
        </Link>

        {/* Diamond Icon - Active with blue pill background */}
        <Link
          href={`/ds/${systemId}/tokens`}
          onClick={() => onViewChange?.('tokens')}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all ${
            activeView === 'tokens' ? 'bg-blue-500/20 rounded-full' : ''
          }`}
        >
          <img src={imgNearby} alt="" className={`w-5 h-5 object-contain ${activeView === 'tokens' ? 'opacity-100' : 'opacity-40'}`} />
        </Link>

        {/* Grid Icon */}
        <Link
          href={`/ds/${systemId}/components`}
          onClick={() => onViewChange?.('components')}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all ${
            activeView === 'components' ? 'bg-blue-500/20 rounded-full' : ''
          }`}
        >
          <img src={imgGridView} alt="" className={`w-5 h-5 object-contain ${activeView === 'components' ? 'opacity-100' : 'opacity-40'}`} />
        </Link>

        {/* Separator Line */}
        <div className="w-6 h-px bg-gray-800 my-1 shrink-0" />

        {/* Document Icon */}
        <Link
          href={`/ds/${systemId}/modules`}
          onClick={() => onViewChange?.('modules')}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all ${
            activeView === 'modules' ? 'bg-blue-500/20 rounded-full' : ''
          }`}
        >
          <img src={imgDocs} alt="" className={`w-5 h-5 object-contain ${activeView === 'modules' ? 'opacity-100' : 'opacity-40'}`} />
        </Link>

        {/* Bar Chart Icon */}
        <Link
          href={`/ds/${systemId}/versions`}
          onClick={() => onViewChange?.('versions')}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all ${
            activeView === 'versions' ? 'bg-blue-500/20 rounded-full' : ''
          }`}
        >
          <svg className={`w-5 h-5 shrink-0 ${activeView === 'versions' ? 'opacity-100' : 'opacity-40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Link>

        {/* Separator Line */}
        <div className="w-6 h-px bg-gray-800 my-1 shrink-0" />

        {/* Crown/Gift Icon */}
        <Link
          href={`/ds/${systemId}/sync`}
          onClick={() => onViewChange?.('sync')}
          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all ${
            activeView === 'sync' ? 'bg-blue-500/20 rounded-full' : ''
          }`}
        >
          <svg className={`w-5 h-5 shrink-0 ${activeView === 'sync' ? 'opacity-100' : 'opacity-40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        </Link>
      </div>

        {/* User & Settings Section - Bottom */}
        <div className="mt-auto flex flex-col gap-3 items-center w-full px-3 pb-2">
          <button className="w-10 h-10 flex items-center justify-center shrink-0 opacity-40 hover:opacity-100 transition-opacity">
            <img alt="Profile" className="w-5 h-5 object-contain" src={imgAccountCircle} />
          </button>
          <Link
            href={`/ds/${systemId}/settings`}
            onClick={() => onViewChange?.('settings')}
            className={`w-10 h-10 flex items-center justify-center shrink-0 transition-opacity ${
              activeView === 'settings' ? 'opacity-100' : 'opacity-40 hover:opacity-100'
            }`}
          >
            <img alt="Settings" className="w-5 h-5 object-contain" src={imgSettings} />
          </Link>
        </div>
      </div>
    </div>
  )
}
