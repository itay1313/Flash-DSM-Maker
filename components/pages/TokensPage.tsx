'use client'

import { useState } from 'react'
import { FlashButton } from '../ui/FlashButton'

// Local assets from public/assets/design-system/
const imgArrowDown = "/assets/design-system/keyboard_arrow_down.svg"
const imgSearch = "/assets/design-system/search.svg"
const imgCopy = "/assets/design-system/copy_icon.svg"
const imgSun = "/assets/design-system/clear_day.svg"
const imgMoon = "/assets/design-system/bedtime.svg"
const imgDoubleArrowRight = "/assets/design-system/keyboard_double_arrow_right.svg"
const imgAdd = "/assets/design-system/add.svg"
const imgNoteStackAdd = "/assets/design-system/note_stack_add.svg"
const imgArrowBack = "/assets/design-system/arrow_back.svg"
const imgViewGrid = "/assets/design-system/view_comfy_alt.svg"
const imgViewList = "/assets/design-system/format_list_bulleted.svg"

type TokenCategory = 'colors' | 'spacing' | 'typography' | 'radius' | 'motion' | 'shadow'

interface Token {
  name: string
  value: string
  type: 'color' | 'font' | 'size' | 'radius' | 'shadow' | 'motion'
  category: TokenCategory
}

interface ColorGroup {
  name: string
  tokens: Token[]
}

const DEFAULT_COLOR_GROUPS: ColorGroup[] = [
  {
    name: 'PRIMARY/',
    tokens: [
      { name: 'blue-500', value: '#0886E5', type: 'color', category: 'colors' },
      { name: 'blue-600', value: '#0470C2', type: 'color', category: 'colors' },
    ]
  },
  {
    name: 'GRAY/',
    tokens: [
      { name: 'gray-950', value: '#0d0d0d', type: 'color', category: 'colors' },
      { name: 'gray-900', value: '#191919', type: 'color', category: 'colors' },
      { name: 'gray-850', value: '#252525', type: 'color', category: 'colors' },
      { name: 'gray-800', value: '#313131', type: 'color', category: 'colors' },
      { name: 'gray-700', value: '#4a4a4a', type: 'color', category: 'colors' },
      { name: 'gray-600', value: '#626262', type: 'color', category: 'colors' },
    ]
  },
  {
    name: 'ACCENTS/',
    tokens: [
      { name: 'magenta', value: '#ff20dd', type: 'color', category: 'colors' },
      { name: 'orange', value: '#ff6b35', type: 'color', category: 'colors' },
      { name: 'cyan', value: '#00d4ff', type: 'color', category: 'colors' },
    ]
  }
]

const TABS: { id: TokenCategory; label: string }[] = [
  { id: 'colors', label: 'Colors' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'typography', label: 'Typography' },
  { id: 'radius', label: 'Radius' },
  { id: 'motion', label: 'Motion' },
  { id: 'shadow', label: 'Shadow' },
]

function TokenCard({ token, isSelected, onClick }: { token: Token; isSelected: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-gray-900/40 border border-gray-800 rounded-[24px] p-4 flex items-center gap-4 hover:border-[#FF20DD]/30 transition-all group cursor-pointer
        ${isSelected ? 'border-[#FF20DD] ring-1 ring-[#FF20DD]/20 bg-gray-900 shadow-xl' : ''}`}
    >
      {token.type === 'color' && (
        <div className="w-12 h-12 rounded-xl flex-shrink-0 shadow-lg border border-white/5" style={{ backgroundColor: token.value }} />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">--{token.name}</p>
        <p className="text-sm text-gray-300 font-mono">{token.value}</p>
      </div>
      <button className="opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity">
        <img src={imgNoteStackAdd} alt="Copy token" className="w-5 h-5 invert" />
      </button>
    </div>
  )
}

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState<TokenCategory>('colors')
  const [selectedToken, setSelectedComponent] = useState<Token | null>(DEFAULT_COLOR_GROUPS[0].tokens[0])
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex-1 flex gap-6 p-2 overflow-hidden h-full">
      <div className="bg-gradient-to-r from-gray-850 to-gray-850/50 border-t border-gray-600 rounded-[40px] flex gap-6 h-full p-3 overflow-hidden w-full">
        
        {/* Left Content Panel */}
        <div className="flex flex-col gap-8 h-full overflow-hidden pl-6 py-6 flex-1 min-w-0">
          <div className="flex items-center justify-between pr-6">
            <h2 className="text-[96px] text-gray-150 tracking-[4.8px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              Foundations
            </h2>
            <button className="bg-gray-950 flex gap-2 h-11 items-center px-6 py-2 rounded-2xl shadow-button border border-white/5 transition-all group">
              <img src={imgAdd} alt="Add token" className="w-5 h-5" />
              <span className="text-gray-100 text-xs font-black uppercase tracking-widest">New Token</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-gray-950 border-b border-gray-700 flex items-center p-1 rounded-[46px] shadow-[0px_15px_14px_0px_rgba(0,0,0,0.08)] relative shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 p-3 rounded-[52px] transition-all relative z-10 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-t from-gray-950 to-gray-850 shadow-button border-t border-gray-600'
                    : ''
                }`}
              >
                {activeTab === tab.id && (
                  <div className="w-2 h-2 rounded-[4px] border-2 border-black/60 shadow-[0px_-1.5px_5px_0.5px_rgba(57,202,254,0.4)] mr-2" 
                       style={{ backgroundImage: "radial-gradient(circle at center, rgba(57,202,255,1) 23%, rgba(7,78,103,1) 100%)" }} />
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'text-gray-300' : 'text-gray-500'}`}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3)]" />
                )}
              </button>
            ))}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-gray-950 w-16 h-full flex items-center justify-end pr-4 rounded-r-[46px] pointer-events-none">
              <img src={imgDoubleArrowRight} alt="More tabs" className="w-6 h-6" />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center shrink-0 pr-6">
            <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex h-14 items-center px-6 rounded-2xl flex-1 shadow-inner group">
              <img src={imgSearch} alt="Search" className="w-5 h-5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              <input type="text" placeholder="Search tokens..." className="bg-transparent border-none outline-none ml-4 text-sm text-gray-100 w-full uppercase tracking-widest font-black placeholder:opacity-20" />
            </div>
            
            <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex gap-2 h-14 items-center p-1.5 rounded-2xl">
              <button onClick={() => setTheme('light')} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${theme === 'light' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                <img src={imgSun} alt="Light theme" className="w-5 h-5" />
              </button>
              <button onClick={() => setTheme('dark')} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                <img src={imgMoon} alt="Dark theme" className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex gap-2 h-14 items-center p-1.5 rounded-2xl">
              <button onClick={() => setViewMode('grid')} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                <img src={imgViewGrid} alt="Grid view" className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                <img src={imgViewList} alt="List view" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tokens List */}
          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="flex flex-col gap-12">
              {DEFAULT_COLOR_GROUPS.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-6">
                  <h3 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] border-b border-gray-800 pb-4">{group.name}</h3>
                  <div className={viewMode === 'grid' ? "grid grid-cols-2 gap-6" : "flex flex-col gap-3"}>
                    {group.tokens.map((token, tokenIndex) => (
                      <TokenCard 
                        key={tokenIndex} 
                        token={token} 
                        isSelected={selectedToken?.name === token.name}
                        onClick={() => setSelectedComponent(token)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sandbox Panel */}
        <div className="bg-gray-950 h-full rounded-[40px] flex-[0.8] min-w-[450px] flex flex-col overflow-hidden border border-gray-800 shadow-2xl relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          {selectedToken ? (
            <>
              <div className="p-12 flex flex-col gap-12 h-full relative z-10">
                <div className="flex items-center gap-4">
                  <button className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-accent-magenta/40 transition-colors">
                    <img src={imgArrowBack} alt="Back" className="w-6 h-6 opacity-40" />
                  </button>
                  <h3 className="text-gray-100 text-[48px] font-serif font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
                    {selectedToken.name}
                  </h3>
                </div>

                <div className="flex bg-black/40 border border-gray-800 p-1 rounded-[32px] gap-1 shadow-inner">
                  <button className="flex-1 bg-gray-850 text-white py-4 rounded-[28px] text-[10px] font-black uppercase tracking-widest shadow-xl border-t border-gray-700">Customize</button>
                  <button className="flex-1 text-gray-600 py-4 rounded-[28px] text-[10px] font-black uppercase tracking-widest">Usage</button>
                </div>

                <div className="bg-gray-900/40 border border-gray-800 rounded-[32px] p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Token Intelligence</span>
                  </div>
                  <p className="text-gray-500 text-sm font-sans leading-relaxed">
                    This foundation is linked to <span className="text-blue-400 font-bold">13 components</span>. 
                    Edits here will ripple through your entire futuristic DNA assembly in real-time.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] px-2">Hex Value</label>
                    <div className="bg-gray-950 border border-gray-800 p-6 rounded-[24px] flex items-center justify-between shadow-inner">
                      <span className="text-2xl text-gray-200 font-mono tracking-widest">{selectedToken.value}</span>
                      <div className="w-12 h-12 rounded-xl border border-white/10 shadow-2xl" style={{ backgroundColor: selectedToken.value }} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] px-2">Color Matrix</label>
                    <div className="h-24 rounded-[24px] relative overflow-hidden shadow-2xl border border-white/5">
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-500 to-white" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-2xl scale-110 active:scale-150 transition-transform cursor-grab" />
                    </div>
                  </div>
                </div>

                <FlashButton className="w-full mt-auto">
                  Update Design Foundation
                </FlashButton>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-20">
              <div className="w-32 h-32 bg-gray-900 rounded-[48px] mb-8 flex items-center justify-center border-2 border-dashed border-gray-800 animate-pulse">
                <img src={imgSearch} alt="Select token" className="w-12 h-12" />
              </div>
              <h3 className="text-gray-500 font-serif italic text-3xl tracking-widest">Select DNA Segment</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
