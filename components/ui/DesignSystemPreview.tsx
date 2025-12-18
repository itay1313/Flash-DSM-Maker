import React from 'react'

interface DesignSystemPreviewProps {
  accent: string
  name: string
  className?: string
}

export function DesignSystemPreview({ accent, name, className = '' }: DesignSystemPreviewProps) {
  // Generate preview colors based on accent
  const getColors = () => {
    switch (accent) {
      case 'bg-gray-500':
        return {
          primary: 'bg-gray-600',
          secondary: 'bg-gray-700',
          accent: 'bg-green-500',
          text: 'text-white',
          bg: 'bg-gray-900',
        }
      case 'bg-slate-500':
        return {
          primary: 'bg-slate-600',
          secondary: 'bg-slate-700',
          accent: 'bg-blue-500',
          text: 'text-white',
          bg: 'bg-slate-900',
        }
      case 'bg-purple-500':
        return {
          primary: 'bg-purple-600',
          secondary: 'bg-purple-700',
          accent: 'bg-blue-400',
          text: 'text-white',
          bg: 'bg-purple-950',
        }
      case 'bg-green-400':
        return {
          primary: 'bg-yellow-400',
          secondary: 'bg-pink-400',
          accent: 'bg-yellow-500',
          text: 'text-white',
          bg: 'bg-gray-900',
        }
      case 'bg-red-500':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'bg-red-500',
          text: 'text-white',
          bg: 'bg-black',
        }
      case 'bg-amber-600':
        return {
          primary: 'bg-amber-700',
          secondary: 'bg-amber-800',
          accent: 'bg-red-800',
          text: 'text-white',
          bg: 'bg-amber-50',
        }
      case 'bg-blue-500':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-700',
          accent: 'bg-blue-400',
          text: 'text-white',
          bg: 'bg-gray-900',
        }
      case 'bg-pink-400':
        return {
          primary: 'bg-pink-500',
          secondary: 'bg-pink-600',
          accent: 'bg-pink-400',
          text: 'text-white',
          bg: 'bg-gray-900',
        }
      default:
        return {
          primary: 'bg-indigo-600',
          secondary: 'bg-indigo-700',
          accent: 'bg-indigo-500',
          text: 'text-white',
          bg: 'bg-gray-900',
        }
    }
  }

  const colors = getColors()

  return (
    <div className={`${colors.bg} rounded-lg p-2 ${className}`} style={{ minHeight: '120px' }}>
      <div className="space-y-1.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className={`${colors.primary} h-2 w-16 rounded`}></div>
          <div className={`${colors.accent} h-2 w-2 rounded-full`}></div>
        </div>
        
        {/* Metrics */}
        <div className="space-y-1">
          <div className={`${colors.secondary} h-1.5 w-20 rounded`}></div>
          <div className={`${colors.accent} h-1 w-12 rounded`}></div>
        </div>
        
        {/* Chart area */}
        <div className="flex items-end space-x-0.5 h-8">
          <div className={`${colors.accent} h-4 flex-1 rounded opacity-60`}></div>
          <div className={`${colors.accent} h-3 w-2 rounded opacity-40`}></div>
          <div className={`${colors.accent} h-5 w-1.5 rounded opacity-50`}></div>
          <div className={`${colors.accent} h-3 w-2 rounded opacity-40`}></div>
          <div className={`${colors.accent} h-4 flex-1 rounded opacity-60`}></div>
        </div>
        
        {/* Bottom elements */}
        <div className="flex items-center justify-between pt-1">
          <div className={`${colors.secondary} h-1.5 w-16 rounded`}></div>
          <div className={`${colors.primary} h-1.5 w-8 rounded`}></div>
        </div>
      </div>
    </div>
  )
}













