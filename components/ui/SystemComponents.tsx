'use client'

import { useState } from 'react'

// Local assets from public/assets/design-system/
const imgDoubleArrowRight = "/assets/design-system/Arrow icon.svg"

interface TabBarProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: any) => void
  showArrow?: boolean
}

export function TabBar({ tabs, activeTab, onTabChange, showArrow = true }: TabBarProps) {
  return (
    <div className="bg-gray-950 border-b border-gray-700 flex items-center overflow-clip p-1 rounded-[46px] shadow-[0px_15px_14px_0px_rgba(0,0,0,0.08)] relative w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center p-3 rounded-[52px] transition-all relative z-10 ${
            activeTab === tab.id ? 'bg-gradient-to-t from-gray-950 to-gray-850 shadow-button' : ''
          }`}
        >
          {activeTab === tab.id && (
            <div className="w-2 h-2 rounded-[4px] border-2 border-black/60 shadow-[0px_-1.5px_5px_0.5px_rgba(57,202,254,0.4)] mr-3" 
                 style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(57,202,255,1) 23%, rgba(7,78,103,1) 100%)" }} />
          )}
          <span className={`text-base font-medium whitespace-nowrap ${activeTab === tab.id ? 'text-gray-300' : 'text-gray-500'}`}>
            {tab.label}
          </span>
          {activeTab === tab.id && (
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3)]" />
          )}
        </button>
      ))}
      {showArrow && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 backdrop-blur-[2.5px] bg-gradient-to-r from-transparent to-gray-950 w-15 h-[50px] flex items-center justify-center pointer-events-none">
          <img src={imgDoubleArrowRight} alt="More tabs" className="w-6 h-6" />
        </div>
      )}
    </div>
  )
}

interface SearchInputProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = "" }: SearchInputProps) {
  const imgSearch = "/assets/design-system/search.svg"
  return (
    <div className="flex-1 bg-gray-950 border-b-[1.5px] border-gray-700 flex items-center px-2 py-2 rounded-xl h-11">
      <img src={imgSearch} alt="Search" className="w-6 h-6" />
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-gray-150 ml-2 w-full text-sm"
      />
    </div>
  )
}

interface ViewToggleProps {
  mode: 'grid' | 'list'
  onChange: (mode: 'grid' | 'list') => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  const imgViewGrid = "/assets/design-system/view_comfy_alt.svg"
  const imgViewList = "/assets/design-system/format_list_bulleted.svg"
  
  return (
    <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex gap-2 p-1 rounded-xl h-11 items-center">
      <button onClick={() => onChange('grid')} className={`w-8 h-8 flex items-center justify-center rounded-lg ${mode === 'grid' ? 'bg-gradient-to-t from-gray-950 to-gray-850 shadow-button' : ''}`}>
        <img src={imgViewGrid} alt="Grid view" className="w-5 h-5" />
      </button>
      <button onClick={() => onChange('list')} className={`w-8 h-8 flex items-center justify-center rounded-[20px] ${mode === 'list' ? '' : 'opacity-40'}`}>
        <img src={imgViewList} alt="List view" className="w-5 h-5" />
      </button>
    </div>
  )
}
