'use client'

import { useState, useMemo } from 'react'
import { IconData, getIconUrl } from '@/lib/services/iconLibraries'

interface IconBrowserProps {
  icons: IconData[]
  onSelectIcon: (icon: IconData) => void
  viewMode: 'gallery' | 'list'
  searchQuery: string
  onSearchChange: (query: string) => void
  isLoading?: boolean
}

export default function IconBrowser({
  icons,
  onSelectIcon,
  viewMode,
  searchQuery,
  onSearchChange,
  isLoading = false,
}: IconBrowserProps) {
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return icons
    const query = searchQuery.toLowerCase()
    return icons.filter(icon => 
      icon.name.toLowerCase().includes(query) ||
      icon.category?.toLowerCase().includes(query)
    )
  }, [icons, searchQuery])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading icons...</p>
        </div>
      </div>
    )
  }

  if (filteredIcons.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-400">No icons found matching "{searchQuery}"</p>
        </div>
      </div>
    )
  }

  if (viewMode === 'gallery') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredIcons.map((icon, index) => (
          <button
            key={`${icon.library}-${icon.name}-${index}`}
            onClick={() => onSelectIcon(icon)}
            className="flex flex-col items-center justify-center p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500 hover:bg-gray-750 transition-all group"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-2 text-gray-300 group-hover:text-white transition-colors">
              {icon.svg ? (
                <div 
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
              ) : icon.url ? (
                <img 
                  src={getIconUrl(icon, 24)} 
                  alt={icon.name}
                  className="w-6 h-6"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">{icon.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 truncate w-full text-center">
              {icon.name}
            </span>
          </button>
        ))}
      </div>
    )
  }

  // List view
  return (
    <div className="space-y-2">
      {filteredIcons.map((icon, index) => (
        <button
          key={`${icon.library}-${icon.name}-${index}`}
          onClick={() => onSelectIcon(icon)}
          className="w-full flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-indigo-500 hover:bg-gray-750 transition-all group"
        >
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-gray-300 group-hover:text-white transition-colors">
            {icon.svg ? (
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: icon.svg }}
              />
            ) : icon.url ? (
              <img 
                src={getIconUrl(icon, 24)} 
                alt={icon.name}
                className="w-5 h-5"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">{icon.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm font-medium text-white group-hover:text-indigo-400 truncate">
              {icon.name}
            </div>
            {icon.category && (
              <div className="text-xs text-gray-500">{icon.category}</div>
            )}
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
              {icon.library}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

