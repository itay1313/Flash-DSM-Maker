'use client'

import { useState, useEffect } from 'react'
import { Module, ModuleProperties } from '@/lib/types/modules'
import ModuleEditModal from '@/components/ui/ModuleEditModal'
import { usePathname } from 'next/navigation'

// Module definitions from SystemComponents
const MODULE_DEFINITIONS = [
  { name: 'Combo-box', type: 'combo-box' as const, description: 'An input that behaves similarly to a select, with the addition of a free text input to filter options' },
  { name: 'Accordion', type: 'accordion' as const, description: 'Vertical stack of interactive headings to toggle content display' },
  { name: 'Modal', type: 'modal' as const, description: 'A modal is an interface element that appears over other content' },
  { name: 'Navbar', type: 'navbar' as const, description: 'A container for navigation links; these can be to other pages or to elements within the current page' },
  { name: 'Drawer', type: 'drawer' as const, description: 'A panel which slides out from the edge of the screen' },
  { name: 'Dropdown menu', type: 'dropdown-menu' as const, description: 'A menu in which options are hidden by default but can be shown by interacting with a button' },
  { name: 'Empty state', type: 'empty-state' as const, description: 'An indication to the user that there is no data to display in the current view' },
  { name: 'Fieldset', type: 'fieldset' as const, description: 'A wrapper for related form fields' },
  { name: 'Form', type: 'form' as const, description: 'A grouping of input controls that allow a user to submit information to a server' },
  { name: 'Header', type: 'header' as const, description: 'An element that appears across the top of all pages on a website or application' },
  { name: 'Footer', type: 'footer' as const, description: 'Commonly appearing at the bottom of a page or section, a footer is used to display copyright and legal information' },
  { name: 'Hero', type: 'hero' as const, description: 'A large banner, usually appearing as one of the first items on a page' },
  { name: 'Pagination', type: 'pagination' as const, description: 'Pagination is the process of splitting information over multiple pages' },
  { name: 'Table', type: 'table' as const, description: 'A component for displaying large amounts of data in rows and columns' },
]

const createDefaultProperties = (): ModuleProperties => ({
  padding: { top: '16px', right: '16px', bottom: '16px', left: '16px' },
  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  gap: '8px',
  backgroundColor: '#ffffff',
  colors: {
    text: '#000000',
    border: '#e5e5e5',
    icon: '#666666',
  },
  fontSize: '16px',
  fontWeight: '400',
  fontFamily: 'Inter, system-ui, Arial',
  lineHeight: '1.5',
})

export default function ModulesPage() {
  const pathname = usePathname()
  const [modules, setModules] = useState<Module[]>([])
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Extract system ID from pathname
  const pathParts = pathname?.split('/') || []
  const systemId = pathParts[2] || 'new'

  // Load modules from design system
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-design-systems')
      if (saved) {
        try {
          const systems = JSON.parse(saved)
          const system = systems.find((s: any) => s.id === systemId)
          if (system && system.modules) {
            setModules(system.modules)
          }
        } catch (e) {
          console.error('Failed to load modules:', e)
        }
      }
    }
  }, [systemId])

  // Save modules to design system
  const saveModules = (updatedModules: Module[]) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-design-systems')
      if (saved) {
        try {
          const systems = JSON.parse(saved)
          const systemIndex = systems.findIndex((s: any) => s.id === systemId)
          if (systemIndex >= 0) {
            systems[systemIndex].modules = updatedModules
            systems[systemIndex].updatedAt = new Date().toISOString()
            localStorage.setItem('dsm-design-systems', JSON.stringify(systems))
          }
        } catch (e) {
          console.error('Failed to save modules:', e)
        }
      }
    }
  }

  const handleModuleSelect = (module: Module) => {
    setEditingModule(module)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingModule(null)
  }

  const handlePropertyChange = (propertyPath: string, value: any) => {
    if (!editingModule) return

    const updatedModule = { ...editingModule }
    const pathParts = propertyPath.split('.')
    let current: any = updatedModule.properties

    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {}
      }
      current = current[pathParts[i]]
    }

    current[pathParts[pathParts.length - 1]] = value
    updatedModule.updatedAt = new Date().toISOString()

    const updatedModules = modules.map(m => m.id === updatedModule.id ? updatedModule : m)
    setModules(updatedModules)
    setEditingModule(updatedModule)
    saveModules(updatedModules)
  }

  const handleCreateModule = (moduleDef: typeof MODULE_DEFINITIONS[0]) => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      name: moduleDef.name,
      category: 'modules',
      description: moduleDef.description,
      type: moduleDef.type,
      properties: createDefaultProperties(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedModules = [...modules, newModule]
    setModules(updatedModules)
    setEditingModule(newModule)
    setIsModalOpen(true)
    saveModules(updatedModules)
  }

  const filteredModules = modules.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const availableModules = MODULE_DEFINITIONS.filter(
    def => !modules.some(m => m.type === def.type)
  )

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Modules</h1>
            <p className="text-sm text-gray-400 mt-1">Multi-component patterns and composed UI structures</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredModules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleSelect(module)}
              className="p-4 rounded-lg text-left transition-all bg-gray-900/50 border border-gray-800 hover:bg-gray-900 hover:border-indigo-500/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{module.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{module.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Available Modules to Add */}
        {availableModules.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">Available Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableModules
                .filter(def => 
                  def.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  def.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((moduleDef) => (
                  <button
                    key={moduleDef.type}
                    onClick={() => handleCreateModule(moduleDef)}
                    className="p-4 rounded-lg bg-gray-900/30 border border-gray-800 hover:bg-gray-900/50 text-left transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">{moduleDef.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{moduleDef.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {filteredModules.length === 0 && availableModules.filter(def => 
          def.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          def.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-400">No modules found matching your search</p>
            </div>
          </div>
        )}
      </div>

      {/* Module Edit Modal */}
      <ModuleEditModal
        module={editingModule}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPropertyChange={handlePropertyChange}
        onSubmit={() => {
          // Changes are already saved in real-time via handlePropertyChange
          // This is just for closing the modal after explicit submit
          handleCloseModal()
        }}
      />
    </div>
  )
}

