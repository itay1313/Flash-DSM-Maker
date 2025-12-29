'use client'

import { useState } from 'react'

type ComponentCategory = 'primitives' | 'patterns' | 'composite' | 'navigation' | 'layout' | 'feedback'

interface Component {
  name: string
  category: ComponentCategory
  description: string
  status: 'available' | 'pending' | 'in-progress'
  path?: string
}

const COMPONENT_CATEGORIES: Record<ComponentCategory, Component[]> = {
  primitives: [
    { name: 'Button', category: 'primitives', description: 'Primary button component', status: 'available', path: 'primitives/button' },
    { name: 'Input', category: 'primitives', description: 'Text input field', status: 'available', path: 'primitives/input' },
    { name: 'Select', category: 'primitives', description: 'Dropdown select component', status: 'available', path: 'primitives/select' },
    { name: 'Checkbox', category: 'primitives', description: 'Checkbox input', status: 'available', path: 'primitives/checkbox' },
    { name: 'Radio', category: 'primitives', description: 'Radio button input', status: 'available', path: 'primitives/radio' },
    { name: 'Switch', category: 'primitives', description: 'Toggle switch component', status: 'available', path: 'primitives/switch' },
    { name: 'Badge', category: 'primitives', description: 'Badge component', status: 'available', path: 'primitives/badge' },
    { name: 'Tag', category: 'primitives', description: 'Tag component', status: 'available', path: 'primitives/tag' },
    { name: 'Icon', category: 'primitives', description: 'Icon component', status: 'available', path: 'primitives/icon' },
    { name: 'Textarea', category: 'primitives', description: 'Textarea input', status: 'available', path: 'primitives/textarea' },
    { name: 'Tooltip', category: 'primitives', description: 'Tooltip component', status: 'available', path: 'primitives/tooltip' },
    { name: 'Dialog', category: 'primitives', description: 'Modal dialog component', status: 'available', path: 'primitives/dialog' },
    { name: 'Alert', category: 'primitives', description: 'Alert component', status: 'available', path: 'primitives/alert' },
    { name: 'Separator', category: 'primitives', description: 'Divider separator', status: 'available', path: 'primitives/separator' },
    { name: 'Accordion', category: 'primitives', description: 'Accordion component', status: 'available', path: 'primitives/accordion' },
  ],
  patterns: [
    { name: 'TextField', category: 'patterns', description: 'Text field with label and validation', status: 'available', path: 'form/text-field' },
    { name: 'SelectField', category: 'patterns', description: 'Select field with label', status: 'available', path: 'form/select-field' },
    { name: 'CheckboxField', category: 'patterns', description: 'Checkbox field with label', status: 'available', path: 'form/checkbox-field' },
    { name: 'SwitchField', category: 'patterns', description: 'Switch field with label', status: 'available', path: 'form/switch-field' },
    { name: 'TextareaField', category: 'patterns', description: 'Textarea field with label', status: 'available', path: 'form/textarea-field' },
    { name: 'Card', category: 'patterns', description: 'Card component', status: 'available', path: 'layout/card' },
    { name: 'Alert', category: 'patterns', description: 'Alert pattern component', status: 'available', path: 'primitives/alert' },
    { name: 'Toast', category: 'patterns', description: 'Toast notification', status: 'available', path: 'feedback/toast' },
  ],
  composite: [
    { name: 'AvatarWithStatus', category: 'composite', description: 'Avatar with status indicator', status: 'available', path: 'composite/avatar-with-status' },
    { name: 'ChatInput', category: 'composite', description: 'Chat input component', status: 'available', path: 'composite/chat-input' },
    { name: 'ChatBubble', category: 'composite', description: 'Chat bubble component', status: 'available', path: 'composite/chat-bubble' },
    { name: 'MentionList', category: 'composite', description: 'Mention list component', status: 'available', path: 'composite/mention-list' },
    { name: 'DataCard', category: 'composite', description: 'Data card component', status: 'available', path: 'composite/data-card' },
    { name: 'FileIcon', category: 'composite', description: 'File icon component', status: 'available', path: 'composite/file-icon' },
    { name: 'Table', category: 'composite', description: 'Table component', status: 'available', path: 'composite/table' },
    { name: 'Pagination', category: 'composite', description: 'Pagination component', status: 'available', path: 'composite/pagination' },
  ],
  navigation: [
    { name: 'Navbar', category: 'navigation', description: 'Navigation bar', status: 'available', path: 'navigation/navbar' },
    { name: 'Sidebar', category: 'navigation', description: 'Sidebar navigation', status: 'available', path: 'navigation/sidebar' },
    { name: 'Breadcrumb', category: 'navigation', description: 'Breadcrumb navigation', status: 'available', path: 'navigation/breadcrumb' },
    { name: 'DropdownMenu', category: 'navigation', description: 'Dropdown menu', status: 'available', path: 'navigation/dropdown-menu' },
    { name: 'Tabs', category: 'navigation', description: 'Tabs component', status: 'available', path: 'navigation/tabs' },
  ],
  layout: [
    { name: 'Card', category: 'layout', description: 'Card layout component', status: 'available', path: 'layout/card' },
    { name: 'DashboardWidget', category: 'layout', description: 'Dashboard widget', status: 'available', path: 'layout/dashboard-widget' },
    { name: 'Grid', category: 'layout', description: 'Grid layout system', status: 'available', path: 'layout/grid' },
  ],
  feedback: [
    { name: 'ProgressBar', category: 'feedback', description: 'Progress bar component', status: 'available', path: 'feedback/progress-bar' },
    { name: 'Skeleton', category: 'feedback', description: 'Skeleton loader', status: 'available', path: 'feedback/skeleton' },
    { name: 'Spinner', category: 'feedback', description: 'Loading spinner', status: 'available', path: 'feedback/spinner' },
    { name: 'Toast', category: 'feedback', description: 'Toast notification', status: 'available', path: 'feedback/toast' },
  ],
}

const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  primitives: 'Primitives',
  patterns: 'Patterns',
  composite: 'Composite',
  navigation: 'Navigation',
  layout: 'Layout',
  feedback: 'Feedback',
}

const CATEGORY_DESCRIPTIONS: Record<ComponentCategory, string> = {
  primitives: 'Basic building blocks',
  patterns: 'Reusable component patterns',
  composite: 'Complex composite components',
  navigation: 'Navigation components',
  layout: 'Layout components',
  feedback: 'User feedback components',
}

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: Component['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-400'
      case 'in-progress':
        return 'bg-yellow-400'
      case 'pending':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusLabel = (status: Component['status']) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'in-progress':
        return 'In Progress'
      case 'pending':
        return 'Pending'
      default:
        return 'Unknown'
    }
  }

  const filteredComponents = () => {
    let components: Component[] = []

    if (selectedCategory === 'all') {
      Object.values(COMPONENT_CATEGORIES).forEach(categoryComponents => {
        components.push(...categoryComponents)
      })
    } else {
      components = COMPONENT_CATEGORIES[selectedCategory] || []
    }

    if (searchQuery) {
      components = components.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return components
  }

  const handleComponentClick = (component: Component) => {
    // Navigate to component detail or open preview
    console.log('Opening component:', component)
    // TODO: Implement navigation to component detail page
  }

  const categories: ComponentCategory[] = ['primitives', 'patterns', 'composite', 'navigation', 'layout', 'feedback']

  return (
    <div className="min-h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Design System Components</h1>
          <p className="text-gray-400">Manage and preview your design system components</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-palette-slate focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedCategory === 'all'
                ? 'border-palette-cornflower text-palette-cornflower'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
          >
            All ({Object.values(COMPONENT_CATEGORIES).flat().length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                selectedCategory === category
                  ? 'border-palette-cornflower text-palette-cornflower'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              {CATEGORY_LABELS[category]} ({COMPONENT_CATEGORIES[category].length})
            </button>
          ))}
        </div>

        {/* Components Grid */}
        {selectedCategory !== 'all' && (
          <div className="mb-4">
            <p className="text-sm text-gray-400">{CATEGORY_DESCRIPTIONS[selectedCategory]}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents().map((component) => (
            <div
              key={`${component.category}-${component.name}`}
              onClick={() => handleComponentClick(component)}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-palette-cornflower transition-colors">
                  {component.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(component.status)}`}></div>
                  <span className="text-xs text-gray-500">{getStatusLabel(component.status)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{component.description}</p>
              {component.path && (
                <div className="mb-4">
                  <span className="text-xs text-gray-600 font-mono bg-gray-950 px-2 py-1 rounded">
                    {component.path}
                  </span>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleComponentClick(component)
                  }}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Edit component:', component)
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredComponents().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No components found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
