'use client'

import { useState } from 'react'
import { FlashButton } from '../ui/FlashButton'
import NewComponentModal from '../NewComponentModal'

// Local assets from public/assets/design-system/
const imgArrowDown = "/assets/design-system/keyboard_arrow_down.svg"
const imgSearch = "/assets/design-system/search.svg"
const imgFilter = "/assets/design-system/filter_alt.svg"
const imgViewGrid = "/assets/design-system/view_comfy_alt.svg"
const imgViewList = "/assets/design-system/format_list_bulleted.svg"
const imgDoubleArrowRight = "/assets/design-system/Arrow_icon.svg"
const imgAdd = "/assets/design-system/add.svg"
const imgCopy = "/assets/design-system/copy_icon.svg"

type ComponentCategory = 'all' | 'actions' | 'inputs' | 'controls' | 'navigation' | 'containers' | 'feedback' | 'media'

interface ComponentData {
  name: string
  category: ComponentCategory
  variants: number
  sizes: number
  states: number
  previewColor?: string
  description: string
  code: string
}

const COMPONENTS: ComponentData[] = [
  { 
    name: 'button', 
    category: 'actions', 
    variants: 3, 
    sizes: 3, 
    states: 6, 
    previewColor: '#2e80eb',
    description: 'Interactive button used for primary actions.',
    code: `<button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
  Action label
</button>`
  },
  { 
    name: 'icon-button', 
    category: 'actions', 
    variants: 2, 
    sizes: 3, 
    states: 5,
    description: 'Compact button for icon-only actions.',
    code: `<button className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl flex items-center justify-center border border-gray-700 shadow-xl transition-all">
  <PlusIcon className="w-6 h-6 text-blue-400" />
</button>`
  },
  { 
    name: 'split-button', 
    category: 'actions', 
    variants: 3, 
    sizes: 3, 
    states: 6, 
    previewColor: '#2e80eb',
    description: 'Dual-action button with a primary action and dropdown.',
    code: `<div className="flex bg-blue-500 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
  <button className="px-6 py-3 text-white font-bold border-r border-white/10 hover:bg-blue-600 transition-colors">Action</button>
  <button className="px-3 py-3 text-white hover:bg-blue-600 transition-colors">
    <ChevronDownIcon className="w-4 h-4" />
  </button>
</div>`
  },
  { 
    name: 'chip', 
    category: 'actions', 
    variants: 3, 
    sizes: 3, 
    states: 6,
    description: 'Compact element for tags or filters.',
    code: `<div className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
  Featured Asset
</div>`
  },
  { 
    name: 'input', 
    category: 'inputs', 
    variants: 3, 
    sizes: 3, 
    states: 6,
    description: 'Clean, modern text input field.',
    code: `<div className="w-full bg-gray-950 border border-gray-800 focus-within:border-blue-500 rounded-2xl px-6 py-4 transition-all shadow-inner">
  <input type="text" placeholder="Enter vision..." className="bg-transparent border-none outline-none text-white w-full" />
</div>`
  },
]

const TABS: { id: ComponentCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'actions', label: 'Actions' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'controls', label: 'Controls' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'containers', label: 'Containers' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'media', label: 'Media' },
]

function ComponentPreview({ name, state = 'default' }: { name: string; state?: string }) {
  const isHover = state === 'hover'
  const isActive = state === 'active'
  const isLoading = state === 'loading'
  
  switch (name) {
    case 'button':
      return (
        <button 
          className={`px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl 
            ${isActive ? 'scale-95 brightness-90' : ''}`}
          style={{ 
            backgroundColor: isHover 
              ? 'var(--color-primary-hover, #0470C2)' 
              : isActive 
                ? 'var(--color-primary-active, #035A9E)'
                : 'var(--color-primary, #0886E5)',
            color: 'var(--color-primary-contrast, #FFFFFF)',
            boxShadow: '0 10px 40px rgba(8, 134, 229, 0.2)'
          }}
        >
          {isLoading ? 'Loading...' : 'Action label'}
        </button>
      )
    case 'icon-button':
      return (
        <div className={`w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 transition-all 
          ${isHover ? 'border-blue-500 bg-black shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}`}>
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
      )
    case 'chip':
      const chipBg = isHover ? 'var(--color-primary, #0886E5)' : 'var(--color-primary, #0886E5)'
      const chipOpacity = isHover ? '1' : '0.1'
      return (
        <div 
          className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${chipBg} ${chipOpacity === '1' ? '100%' : '10%'}, transparent)`,
            color: isHover ? 'var(--color-primary-contrast, #FFFFFF)' : 'var(--color-primary, #0886E5)',
            borderColor: `color-mix(in srgb, var(--color-primary, #0886E5) 20%, transparent)`,
            boxShadow: isHover ? '0 0 20px rgba(8, 134, 229, 0.3)' : 'none'
          }}
        >
          Featured Asset
        </div>
      )
    case 'input':
      return (
        <div 
          className="w-64 rounded-2xl px-6 py-4 text-sm transition-all"
          style={{
            backgroundColor: 'var(--color-surface, #191919)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isHover ? 'var(--color-focus, #0886E5)' : 'var(--color-border, #313131)',
            color: isHover ? 'var(--color-text, #FFFFFF)' : 'var(--color-text-muted, #6b7280)',
            boxShadow: isHover ? '0 0 0 3px var(--color-focus-ring, rgba(8, 134, 229, 0.3))' : 'none'
          }}
        >
          Enter vision...
        </div>
      )
    case 'split-button':
      return (
        <div 
          className={`flex rounded-2xl overflow-hidden shadow-xl transition-all ${isHover ? 'scale-105' : ''}`}
          style={{ 
            backgroundColor: isHover 
              ? 'var(--color-primary-hover, #0470C2)' 
              : 'var(--color-primary, #0886E5)',
            boxShadow: '0 10px 40px rgba(8, 134, 229, 0.2)'
          }}
        >
          <div className="px-6 py-4 font-black text-[10px] uppercase tracking-widest border-r border-white/10" style={{ color: 'var(--color-primary-contrast, #FFFFFF)' }}>Action</div>
          <div className="px-3 py-4">
            <img src={imgArrowDown} alt="Dropdown" className="w-4 h-4 invert" />
          </div>
        </div>
      )
    default:
      return <div className="text-gray-700 font-serif italic text-lg opacity-50 capitalize">{name}</div>
  }
}

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<ComponentCategory>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(COMPONENTS[0])
  const [previewState, setPreviewState] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewComponentModal, setShowNewComponentModal] = useState(false)
  
  const handleCreateComponent = (description: string) => {
    console.log('Generating component from description:', description)
    // TODO: Implement AI component generation
    alert(`AI Component Generator\n\nGenerating component based on:\n"${description}"\n\nThis will create:\n- Component code\n- TypeScript types\n- Multiple variants\n- Usage examples`)
  }

  const filteredComponents = COMPONENTS.filter(c => {
    const matchesTab = activeTab === 'all' || c.category === activeTab
    const matchesSearch = searchQuery === '' || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="flex-1 flex gap-6 p-2 overflow-hidden h-full">
      <div className="bg-gradient-to-r from-gray-850 to-gray-850/50 border-t border-gray-600 rounded-[40px] flex flex-col lg:flex-row gap-6 h-full p-2 overflow-hidden w-full">
        
        {/* Gallery Panel */}
        <div className="flex flex-col gap-4 lg:gap-6 h-full overflow-hidden px-4 lg:pl-6 py-4 lg:py-6 flex-1 lg:flex-[0.5] min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-4 lg:pr-6">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] text-gray-150 tracking-[1.2px] sm:tracking-[1.4px] lg:tracking-[1.6px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              Gallery
            </h2>
            <button 
              onClick={() => setShowNewComponentModal(true)}
              className="bg-gray-950 flex gap-2 h-9 sm:h-11 items-center px-4 sm:px-6 py-2 rounded-2xl shadow-button border border-white/5 transition-all active:scale-95 group shrink-0 hover:bg-gray-900"
            >
              <img src={imgAdd} alt="Add component" className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-90 transition-transform" />
              <span className="text-gray-100 text-[10px] sm:text-xs font-black uppercase tracking-widest">New Component</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-gray-950 border-b border-gray-700 flex items-center p-1 rounded-[46px] shadow-[0px_15px_14px_0px_rgba(0,0,0,0.08)] relative shrink-0 overflow-x-auto scrollbar-hide">
            <div className="flex items-center min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center justify-center gap-1 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3 rounded-[52px] transition-all relative z-10 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-t from-gray-950 to-gray-850 shadow-button border-t border-gray-600'
                      : ''
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className="hidden sm:block w-2 h-2 rounded-[4px] border-2 border-black/60 shadow-[0px_-1.5px_5px_0.5px_rgba(57,202,254,0.4)] mr-2" 
                         style={{ backgroundImage: "radial-gradient(circle at center, rgba(57,202,255,1) 23%, rgba(7,78,103,1) 100%)" }} />
                  )}
                  <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${activeTab === tab.id ? 'text-gray-300' : 'text-gray-500'}`}>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3)]" />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-gray-950 w-16 h-full flex items-center justify-end pr-4 rounded-r-[46px] pointer-events-none">
              <img src={imgDoubleArrowRight} alt="More tabs" className="w-6 h-6" />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center shrink-0 pr-4 lg:pr-6">
            <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex h-12 sm:h-14 items-center px-4 sm:px-6 rounded-2xl flex-1 shadow-inner group">
              <img src={imgSearch} alt="Search" className="w-4 sm:w-5 h-4 sm:h-5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none ml-3 sm:ml-4 text-xs sm:text-sm text-gray-100 w-full uppercase tracking-widest font-black placeholder:opacity-20" 
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="flex gap-2 sm:gap-4">
              <button className="bg-gray-950 border-b-[1.5px] border-gray-700 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-2xl shadow-button active:scale-95 transition-all">
                <img src={imgFilter} alt="Filter" className="w-5 sm:w-6 h-5 sm:h-6 opacity-50" />
              </button>

              <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex gap-1 sm:gap-2 h-12 sm:h-14 items-center p-1 sm:p-1.5 rounded-2xl">
                <button onClick={() => setViewMode('grid')} className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                  <img src={imgViewGrid} alt="Grid view" className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button onClick={() => setViewMode('list')} className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                  <img src={imgViewList} alt="List view" className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Components Grid */}
          <div className="flex-1 overflow-y-auto pr-2 lg:pr-4 custom-scrollbar">
            {filteredComponents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-40">
                <img src={imgSearch} alt="No results" className="w-12 sm:w-16 h-12 sm:h-16 mb-4 opacity-40" />
                <p className="text-gray-500 text-xs sm:text-sm font-black uppercase tracking-widest">No components found</p>
                <p className="text-gray-600 text-[10px] sm:text-xs mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8" : "flex flex-col gap-3 sm:gap-4"}>
                {filteredComponents.map((component, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedComponent(component)}
                  className={`group relative bg-gray-900/40 border border-gray-800 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden transition-all cursor-pointer hover:border-accent-magenta/30 hover:bg-gray-900/60
                    ${selectedComponent?.name === component.name ? 'border-[#FF20DD] ring-1 ring-[#FF20DD]/20 bg-gray-900 shadow-2xl scale-[0.98]' : ''}
                    ${viewMode === 'list' ? 'flex items-center p-2 sm:p-3 h-20 sm:h-28' : 'p-2 sm:p-3'}`}
                >
                  <div className={`${viewMode === 'list' ? 'w-20 sm:w-32 h-full' : 'h-32 sm:h-40 lg:h-48'} rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-black/40 flex items-center justify-center relative overflow-hidden group-hover:bg-black/60 transition-all shadow-inner`}>
                    <div className="scale-[0.6] sm:scale-[0.7] lg:scale-[0.8] pointer-events-none transform group-hover:scale-75 sm:group-hover:scale-[0.85] lg:group-hover:scale-95 transition-transform duration-500">
                      <ComponentPreview name={component.name} />
                    </div>
                  </div>
                  <div className={`${viewMode === 'list' ? 'flex-1 pl-4 sm:pl-8' : 'p-4 sm:p-6 lg:p-8'}`}>
                    <h3 className="text-gray-200 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm mb-1 sm:mb-2">{component.name}</h3>
                    <div className="flex gap-2 sm:gap-4">
                      <span className="text-[8px] sm:text-[10px] text-gray-600 font-black uppercase tracking-widest">{component.variants} Variants</span>
                      <span className="text-[8px] sm:text-[10px] text-gray-600 font-black uppercase tracking-widest">{component.states} States</span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sandbox Panel */}
        <div className="hidden lg:flex bg-gray-950 h-full rounded-[40px] flex-[0.5] flex-col overflow-hidden border border-gray-800 shadow-2xl relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          {selectedComponent ? (
            <>
              <div className="h-64 flex items-center justify-center relative p-6 bg-gray-950/50 border-b border-gray-900">
                <div className="absolute w-48 h-48 bg-blue-500/10 blur-[80px] animate-pulse" />
                <div className="scale-[1.3] drop-shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all duration-700">
                  <ComponentPreview name={selectedComponent.name} state={previewState} />
                </div>
                {/* State Controls */}
                <div className="absolute bottom-4 flex bg-black/60 backdrop-blur-2xl border border-gray-800 p-1 rounded-[16px] gap-0.5 shadow-2xl">
                  {['default', 'hover', 'active', 'loading'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setPreviewState(s)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${previewState === s ? 'bg-gray-900 text-white shadow-button border border-gray-700' : 'text-gray-600 hover:text-gray-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 custom-scrollbar">
                <div>
                  <h3 className="text-gray-100 text-[32px] font-serif font-light leading-none mb-3" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
                    {selectedComponent.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-bold italic opacity-60">{selectedComponent.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: 'Variants', v: selectedComponent.variants },
                    { l: 'Sizes', v: selectedComponent.sizes },
                    { l: 'States', v: selectedComponent.states },
                    { l: 'DNA Match', v: '99.2%' }
                  ].map(p => (
                    <div key={p.l} className="bg-gray-900/40 p-4 rounded-[20px] border border-gray-800 shadow-inner">
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1.5">{p.l}</p>
                      <p className="text-xl text-gray-200 font-serif italic">{p.v}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] px-2">Production Assembly</h4>
                  <div className="bg-[#050505] p-4 rounded-[20px] border border-gray-900 shadow-inner overflow-x-auto relative group/code">
                    <pre className="text-gray-500 font-mono text-[10px] leading-relaxed">{selectedComponent.code}</pre>
                    <button className="absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 transition-all p-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 shadow-2xl">
                      <img src={imgCopy} alt="Copy code" className="w-3.5 h-3.5 invert opacity-60" />
                    </button>
                  </div>
                </div>

                <FlashButton className="w-full">
                  Inject into Assembly
                </FlashButton>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-20">
              <div className="w-32 h-32 bg-gray-900 rounded-[48px] mb-8 flex items-center justify-center border-2 border-dashed border-gray-800 animate-pulse">
                <img src={imgViewGrid} alt="Select component" className="w-12 h-12" />
              </div>
              <h3 className="text-gray-500 font-serif italic text-3xl tracking-widest">Assembly Awaits Selection</h3>
            </div>
          )}
        </div>
      </div>

      {/* New Component Modal */}
      <NewComponentModal
        isOpen={showNewComponentModal}
        onClose={() => setShowNewComponentModal(false)}
        onCreateComponent={handleCreateComponent}
      />
    </div>
  )
}
