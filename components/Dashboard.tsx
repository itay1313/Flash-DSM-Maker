'use client'

import { useState, useEffect } from 'react'
import { DesignSystemPreview } from './ui/DesignSystemPreview'

import { Module } from '@/lib/types/modules'

export interface SavedDesignSystem {
  id: string
  projectName: string
  shortDescription?: string
  createdAt: string
  updatedAt: string
  accent: string
  nodes: any[]
  edges?: any[]
  components?: any[]
  tokens?: any[]
  modules?: Module[]
}

interface DashboardProps {
  onSelectDesignSystem: (system: SavedDesignSystem) => void
  onCreateNew: () => void
}

export default function Dashboard({ onSelectDesignSystem, onCreateNew }: DashboardProps) {
  const [designSystems, setDesignSystems] = useState<SavedDesignSystem[]>([])

  useEffect(() => {
    loadDesignSystems()
  }, [])

  const loadDesignSystems = () => {
    if (typeof window === 'undefined') return
    
    const saved = localStorage.getItem('dsm-design-systems')
    if (saved) {
      try {
        const systems = JSON.parse(saved)
        setDesignSystems(systems)
      } catch (e) {
        console.error('Failed to load design systems:', e)
      }
    }
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this design system?')) {
      const updated = designSystems.filter(s => s.id !== id)
      setDesignSystems(updated)
      localStorage.setItem('dsm-design-systems', JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Design Systems</h1>
            <p className="text-gray-400">Manage and create your design systems</p>
          </div>
          <button
            onClick={onCreateNew}
            className="px-6 py-3 hover:bg-primary-600 text-white rounded-[8px] font-medium transition-all shadow-lg shadow-palette-slate/20 flex items-center gap-2 hover:shadow-xl hover:shadow-palette-slate/30"
            style={{ backgroundColor: 'rgba(45, 30, 128, 1)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Design System
          </button>
        </div>

        {/* Design Systems Grid */}
        {designSystems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
            <div className="w-20 h-20 rounded-full bg-palette-slate/20 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-palette-cornflower" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Design Systems</h3>
            <p className="text-gray-400 mb-6 text-center max-w-md">
              Create your first design system to get started. Build flows, components, tokens, and more.
            </p>
            <button
              onClick={onCreateNew}
              className="px-6 py-3 hover:bg-primary-600 text-white rounded-[8px] font-medium transition-all shadow-lg shadow-palette-slate/20 hover:shadow-xl hover:shadow-palette-slate/30"
              style={{ backgroundColor: 'rgba(45, 30, 128, 1)' }}
            >
              Create Design System
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designSystems.map((system) => (
              <div
                key={system.id}
                onClick={() => onSelectDesignSystem(system)}
                className="group relative bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-palette-slate/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-palette-slate/10"
              >
                {/* Preview */}
                <div className="mb-4">
                  <DesignSystemPreview accent={system.accent} name={system.projectName} />
                </div>

                {/* Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{system.projectName}</h3>
                  {system.shortDescription && (
                    <p className="text-sm text-gray-400 line-clamp-2">{system.shortDescription}</p>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Updated {new Date(system.updatedAt).toLocaleDateString()}</span>
                  <button
                    onClick={(e) => handleDelete(system.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 rounded-xl bg-palette-slate/0 group-hover:bg-palette-slate/5 transition-all pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

