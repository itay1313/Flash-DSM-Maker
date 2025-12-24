'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { Input } from '@/design-system/primitives/input'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import * as Icons from 'lucide-react'

// Filter to only icon components
const iconEntries = Object.entries(Icons).filter(
  ([name, Component]) => 
    typeof Component === 'function' && 
    name[0] === name[0].toUpperCase() &&
    !['createLucideIcon', 'Icon', 'default'].includes(name)
) as [string, React.ComponentType<any>][]

// Common categories
const iconCategories: Record<string, string[]> = {
  'Actions': ['Plus', 'Minus', 'Edit', 'Trash', 'Save', 'Download', 'Upload', 'Copy', 'Search', 'Filter'],
  'Navigation': ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ChevronRight', 'ChevronLeft', 'Home', 'Menu'],
  'Status': ['Check', 'X', 'AlertCircle', 'Info', 'CheckCircle', 'XCircle', 'AlertTriangle'],
  'Media': ['Play', 'Pause', 'Stop', 'SkipForward', 'SkipBack', 'Volume', 'VolumeX'],
  'Communication': ['MessageSquare', 'Mail', 'Phone', 'Send', 'Bell'],
  'Files': ['File', 'Folder', 'Image', 'FileText', 'Download'],
  'Interface': ['Settings', 'User', 'Lock', 'Unlock', 'Eye', 'EyeOff', 'MoreVertical', 'MoreHorizontal'],
}

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredIcons = iconEntries.filter(([name]) => {
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || iconCategories[selectedCategory]?.includes(name)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <Link 
            href="/design-system/foundation"
            className="ds-inline-flex ds-items-center ds-gap-2 ds-text-text-secondary hover:ds-text-text ds-mb-6 ds-transition-colors"
          >
            <ArrowRight className="ds-w-4 ds-h-4 ds-rotate-180" />
            Back to Foundation
          </Link>
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Icons</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Comprehensive icon library from lucide-react. All icons are tree-shakeable and optimized for performance.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="ds-mb-8">
          <CardContent className="ds-p-6">
            <div className="ds-space-y-4">
              <div className="ds-relative">
                <Search className="ds-absolute ds-left-3 ds-top-1/2 ds--translate-y-1/2 ds-w-4 ds-h-4 ds-text-text-tertiary" />
                <Input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ds-pl-10"
                />
              </div>
              <div className="ds-flex ds-flex-wrap ds-gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`ds-px-3 ds-py-1 ds-rounded-md ds-text-sm ds-font-medium ds-transition-colors ${
                    selectedCategory === null
                      ? 'ds-bg-primary ds-text-text-inverse'
                      : 'ds-bg-background-secondary ds-text-text-secondary hover:ds-bg-background-tertiary'
                  }`}
                >
                  All
                </button>
                {Object.keys(iconCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`ds-px-3 ds-py-1 ds-rounded-md ds-text-sm ds-font-medium ds-transition-colors ${
                      selectedCategory === category
                        ? 'ds-bg-primary ds-text-text-inverse'
                        : 'ds-bg-background-secondary ds-text-text-secondary hover:ds-bg-background-tertiary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Icons Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="ds-text-2xl">
              {selectedCategory || 'All Icons'} ({filteredIcons.length})
            </CardTitle>
            <CardDescription>
              Click an icon to copy its import statement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ds-grid ds-grid-cols-2 sm:ds-grid-cols-3 md:ds-grid-cols-4 lg:ds-grid-cols-6 ds-gap-4">
              {filteredIcons.map(([name, IconComponent]) => (
                <button
                  key={name}
                  onClick={() => {
                    navigator.clipboard.writeText(`import { ${name} } from 'lucide-react'`)
                  }}
                  className="ds-group ds-flex ds-flex-col ds-items-center ds-gap-2 ds-p-4 ds-rounded-lg ds-border ds-border-border ds-bg-background hover:ds-bg-background-secondary hover:ds-border-primary-200 ds-transition-all ds-cursor-pointer"
                >
                  <IconComponent className="ds-w-6 ds-h-6 ds-text-text-secondary group-hover:ds-text-primary ds-transition-colors" />
                  <span className="ds-text-xs ds-font-mono ds-text-text-secondary ds-text-center ds-break-all">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage */}
        <Card className="ds-mt-8">
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Import icons from lucide-react
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
              <code>{`import { Search, User, Settings } from 'lucide-react'

function MyComponent() {
  return (
    <div>
      <Search className="ds-w-5 ds-h-5" />
      <User className="ds-w-6 ds-h-6" />
      <Settings className="ds-w-4 ds-h-4" />
    </div>
  )
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

