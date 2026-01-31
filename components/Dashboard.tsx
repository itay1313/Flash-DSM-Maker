'use client'

import { useState, useEffect } from 'react'
import { DesignSystemPreview } from './ui/DesignSystemPreview'
import { FlashButton } from './ui/FlashButton'

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

const MAX_FREE_SYSTEMS = 3

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

  const canCreateNew = designSystems.length < MAX_FREE_SYSTEMS

  return (
    <div className="h-screen bg-[#0d0d0d] relative overflow-hidden flex flex-col">
      {/* Global Decorative Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#FF20DD]/5 blur-[120px] pointer-events-none" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-8 py-12 relative z-10 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-gray-800 pb-12 shrink-0">
          <div>
            <h1 className="text-[96px] text-gray-150 tracking-[4.8px] font-light leading-none mb-6" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              My Workspace
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
                {designSystems.length} / {MAX_FREE_SYSTEMS} Design Systems
              </p>
              <div className="h-1 w-32 bg-gray-900 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000" 
                  style={{ width: `${(designSystems.length / MAX_FREE_SYSTEMS) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <FlashButton onClick={onCreateNew} disabled={!canCreateNew}>
            Create New System
          </FlashButton>
        </div>

        {/* Design Systems Grid Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12">
          {designSystems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-gray-900/20 rounded-[40px] border-2 border-dashed border-gray-800/50 backdrop-blur-sm">
              <div className="w-24 h-24 rounded-full bg-gray-950 flex items-center justify-center mb-8 border border-gray-800 shadow-inner">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif italic text-gray-400 mb-2">Your shelf is empty</h3>
              <p className="text-gray-600 mb-10 text-center max-w-xs font-sans text-sm uppercase tracking-widest leading-relaxed">
                Bring your vision to life. Use AI to generate a complete system.
              </p>
              <FlashButton onClick={onCreateNew}>
                Start Generating
              </FlashButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
              {designSystems.map((system) => (
                <div
                  key={system.id}
                  onClick={() => onSelectDesignSystem(system)}
                  className="group relative bg-gray-900/40 border border-gray-800 rounded-[40px] p-3 hover:border-[#FF20DD]/30 transition-all cursor-pointer hover:shadow-2xl hover:bg-gray-900/60"
                >
                  <div className="bg-black/40 rounded-[32px] overflow-hidden flex flex-col h-full">
                    {/* Preview Area */}
                    <div className="h-52 relative bg-gray-950/50">
                      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#FF20DD] to-blue-500" />
                      <div className="absolute inset-0 flex items-center justify-center scale-90">
                        <DesignSystemPreview accent={system.accent} name={system.projectName} />
                      </div>
                    </div>

                    {/* Info Area */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-150 uppercase tracking-wide truncate max-w-[180px]">
                            {system.projectName}
                          </h3>
                          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-2">
                            Futuristic DNA Assembly
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-center shadow-inner group-hover:border-[#FF20DD]/40 transition-colors">
                          <img src="/assets/design-system/keyboard_arrow_right.svg" alt="Open system" className="w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                      
                      {system.shortDescription && (
                        <p className="text-sm text-gray-500 line-clamp-2 italic font-serif leading-relaxed mb-8 opacity-80">
                          "{system.shortDescription}"
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-800/50">
                        <span className="text-[10px] text-gray-700 uppercase font-black tracking-widest">
                          DNA Built {new Date(system.updatedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={(e) => handleDelete(system.id, e)}
                          className="p-2 text-gray-800 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty Slots */}
              {canCreateNew && Array.from({ length: MAX_FREE_SYSTEMS - designSystems.length }).map((_, i) => (
                <div key={i} className="border-2 border-dashed border-gray-900 rounded-[40px] h-full min-h-[400px] flex items-center justify-center opacity-20 hover:opacity-40 transition-opacity">
                  <p className="text-gray-700 uppercase font-black tracking-[0.3em] text-[10px]">Assembly Slot Available</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
