import React from 'react'

interface DashboardPreviewProps {
  accent: string
  name: string
  className?: string
}

export function DashboardPreview({ accent, name, className = '' }: DashboardPreviewProps) {
  // Generate comprehensive color scheme based on accent
  const getColors = () => {
    switch (accent) {
      case 'bg-gray-500':
        return {
          primary: 'bg-gray-600',
          primaryForeground: 'text-white',
          secondary: 'bg-gray-700',
          secondaryForeground: 'text-gray-300',
          accent: 'bg-green-500',
          accentForeground: 'text-white',
          background: 'bg-gray-900',
          foreground: 'text-white',
          card: 'bg-gray-800',
          cardForeground: 'text-white',
          muted: 'bg-gray-800',
          mutedForeground: 'text-gray-400',
          border: 'border-gray-700',
          chart1: 'bg-green-500',
          chart2: 'bg-green-400',
        }
      case 'bg-slate-500':
        return {
          primary: 'bg-slate-600',
          primaryForeground: 'text-white',
          secondary: 'bg-slate-700',
          secondaryForeground: 'text-slate-300',
          accent: 'bg-blue-500',
          accentForeground: 'text-white',
          background: 'bg-slate-900',
          foreground: 'text-white',
          card: 'bg-slate-800',
          cardForeground: 'text-white',
          muted: 'bg-slate-800',
          mutedForeground: 'text-slate-400',
          border: 'border-slate-700',
          chart1: 'bg-blue-500',
          chart2: 'bg-blue-400',
        }
      case 'bg-purple-500':
        return {
          primary: 'bg-purple-600',
          primaryForeground: 'text-white',
          secondary: 'bg-purple-700',
          secondaryForeground: 'text-purple-200',
          accent: 'bg-blue-400',
          accentForeground: 'text-white',
          background: 'bg-purple-950',
          foreground: 'text-white',
          card: 'bg-white',
          cardForeground: 'text-purple-950',
          muted: 'bg-purple-100',
          mutedForeground: 'text-purple-600',
          border: 'border-purple-200',
          chart1: 'bg-purple-600',
          chart2: 'bg-purple-400',
        }
      case 'bg-green-400':
        return {
          primary: 'bg-yellow-400',
          primaryForeground: 'text-gray-900',
          secondary: 'bg-pink-400',
          secondaryForeground: 'text-white',
          accent: 'bg-yellow-500',
          accentForeground: 'text-gray-900',
          background: 'bg-gray-900',
          foreground: 'text-white',
          card: 'bg-gray-800',
          cardForeground: 'text-white',
          muted: 'bg-gray-800',
          mutedForeground: 'text-gray-400',
          border: 'border-gray-700',
          chart1: 'bg-yellow-400',
          chart2: 'bg-pink-400',
        }
      case 'bg-red-500':
        return {
          primary: 'bg-red-600',
          primaryForeground: 'text-white',
          secondary: 'bg-red-700',
          secondaryForeground: 'text-white',
          accent: 'bg-red-500',
          accentForeground: 'text-white',
          background: 'bg-black',
          foreground: 'text-white',
          card: 'bg-gray-900',
          cardForeground: 'text-white',
          muted: 'bg-gray-900',
          mutedForeground: 'text-gray-400',
          border: 'border-gray-800',
          chart1: 'bg-red-500',
          chart2: 'bg-red-400',
        }
      case 'bg-amber-600':
        return {
          primary: 'bg-amber-700',
          primaryForeground: 'text-white',
          secondary: 'bg-amber-800',
          secondaryForeground: 'text-white',
          accent: 'bg-red-800',
          accentForeground: 'text-white',
          background: 'bg-amber-50',
          foreground: 'text-amber-950',
          card: 'bg-white',
          cardForeground: 'text-amber-950',
          muted: 'bg-amber-100',
          mutedForeground: 'text-amber-700',
          border: 'border-amber-200',
          chart1: 'bg-amber-700',
          chart2: 'bg-red-800',
        }
      case 'bg-blue-500':
        return {
          primary: 'bg-blue-600',
          primaryForeground: 'text-white',
          secondary: 'bg-blue-700',
          secondaryForeground: 'text-white',
          accent: 'bg-blue-400',
          accentForeground: 'text-white',
          background: 'bg-gray-900',
          foreground: 'text-white',
          card: 'bg-gray-800',
          cardForeground: 'text-white',
          muted: 'bg-gray-800',
          mutedForeground: 'text-gray-400',
          border: 'border-gray-700',
          chart1: 'bg-blue-500',
          chart2: 'bg-blue-400',
        }
      case 'bg-pink-400':
        return {
          primary: 'bg-pink-500',
          primaryForeground: 'text-white',
          secondary: 'bg-pink-600',
          secondaryForeground: 'text-white',
          accent: 'bg-pink-400',
          accentForeground: 'text-white',
          background: 'bg-gray-900',
          foreground: 'text-white',
          card: 'bg-gray-800',
          cardForeground: 'text-white',
          muted: 'bg-gray-800',
          mutedForeground: 'text-gray-400',
          border: 'border-gray-700',
          chart1: 'bg-pink-500',
          chart2: 'bg-pink-400',
        }
      default:
        return {
          primary: 'bg-indigo-600',
          primaryForeground: 'text-white',
          secondary: 'bg-indigo-700',
          secondaryForeground: 'text-white',
          accent: 'bg-indigo-500',
          accentForeground: 'text-white',
          background: 'bg-gray-900',
          foreground: 'text-white',
          card: 'bg-gray-800',
          cardForeground: 'text-white',
          muted: 'bg-gray-800',
          mutedForeground: 'text-gray-400',
          border: 'border-gray-700',
          chart1: 'bg-indigo-500',
          chart2: 'bg-indigo-400',
        }
    }
  }

  const colors = getColors()

  return (
    <div className={`${colors.background} ${className} rounded-lg p-4 min-h-[500px]`}>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${colors.foreground}`}>Dashboard</h2>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg ${colors.muted} ${colors.mutedForeground} hover:opacity-80`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button className={`px-4 py-2 rounded-lg ${colors.primary} ${colors.primaryForeground} text-sm font-medium`}>
            Save
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Total Revenue Card */}
        <div className={`${colors.card} ${colors.border} border rounded-lg p-4`}>
          <div className={`${colors.cardForeground} text-2xl font-bold mb-1`}>$1,250.00</div>
          <div className={`${colors.mutedForeground} text-xs mb-2`}>Total Revenue</div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className={`${colors.mutedForeground} text-xs`}>Trending up this month</span>
            <span className={`${colors.accentForeground} text-xs font-medium`}>+12.5%</span>
          </div>
        </div>

        {/* New Customers Card */}
        <div className={`${colors.card} ${colors.border} border rounded-lg p-4`}>
          <div className={`${colors.cardForeground} text-2xl font-bold mb-1`}>1,234</div>
          <div className={`${colors.mutedForeground} text-xs mb-2`}>New Customers</div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l5-5m0 0l-5-5m5 5H6" />
            </svg>
            <span className={`${colors.mutedForeground} text-xs`}>Down 20% this period</span>
            <span className="text-red-500 text-xs font-medium">-20%</span>
          </div>
        </div>

        {/* Active Accounts Card */}
        <div className={`${colors.card} ${colors.border} border rounded-lg p-4`}>
          <div className={`${colors.cardForeground} text-2xl font-bold mb-1`}>45,678</div>
          <div className={`${colors.mutedForeground} text-xs mb-2`}>Active Accounts</div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className={`${colors.mutedForeground} text-xs`}>Strong user retention</span>
            <span className={`${colors.accentForeground} text-xs font-medium`}>+12.5%</span>
          </div>
        </div>

        {/* Growth Rate Card */}
        <div className={`${colors.card} ${colors.border} border rounded-lg p-4`}>
          <div className={`${colors.cardForeground} text-2xl font-bold mb-1`}>4.5%</div>
          <div className={`${colors.mutedForeground} text-xs mb-2`}>Growth Rate</div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className={`${colors.mutedForeground} text-xs`}>Steady performance increase</span>
            <span className={`${colors.accentForeground} text-xs font-medium`}>+4.5%</span>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className={`${colors.card} ${colors.border} border rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`${colors.cardForeground} font-semibold mb-1`}>Total Visitors</h3>
            <p className={`${colors.mutedForeground} text-xs`}>Total for the last 3 months</p>
          </div>
          <div className="flex gap-1">
            <button className={`px-2 py-1 text-xs rounded ${colors.primary} ${colors.primaryForeground}`}>
              Last 3 months
            </button>
            <button className={`px-2 py-1 text-xs rounded ${colors.muted} ${colors.mutedForeground}`}>
              Last 30 days
            </button>
            <button className={`px-2 py-1 text-xs rounded ${colors.muted} ${colors.mutedForeground}`}>
              Last 7 days
            </button>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-32 flex items-end gap-1">
          <div className={`${colors.chart1} flex-1 rounded-t opacity-80`} style={{ height: '60%' }}></div>
          <div className={`${colors.chart2} w-2 rounded-t opacity-60`} style={{ height: '40%' }}></div>
          <div className={`${colors.chart1} w-1.5 rounded-t opacity-70`} style={{ height: '70%' }}></div>
          <div className={`${colors.chart2} w-2 rounded-t opacity-60`} style={{ height: '45%' }}></div>
          <div className={`${colors.chart1} flex-1 rounded-t opacity-80`} style={{ height: '55%' }}></div>
          <div className={`${colors.chart2} w-2 rounded-t opacity-65`} style={{ height: '50%' }}></div>
          <div className={`${colors.chart1} w-1.5 rounded-t opacity-75`} style={{ height: '65%' }}></div>
          <div className={`${colors.chart2} w-2 rounded-t opacity-60`} style={{ height: '48%' }}></div>
          <div className={`${colors.chart1} flex-1 rounded-t opacity-80`} style={{ height: '58%' }}></div>
        </div>
      </div>
    </div>
  )
}

