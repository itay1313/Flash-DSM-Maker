'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SystemComponentsProps {
  designSystemName: string
  availableSystems: { id: string; projectName: string }[]
  onSwitchSystem: (id: string) => void
}

type Theme = 'saas' | 'brutalist' | 'glass' | 'minimal' | 'cyber'

type ComponentCategory = 'components' | 'controls' | 'video'

interface ComponentCard {
  name: string
  description: string
  category: ComponentCategory
  icon?: string
}

const COMPONENT_CATEGORIES: Record<ComponentCategory, { title: string; description: string; components: ComponentCard[] }> = {
  components: {
    title: 'Components',
    description: 'Atomic UI elements. They do NOT compose other components. They may have states and variants.',
    components: [
      { name: 'Toast', description: 'A type of alert which appears in a layer above other content, visually similar to a mobile or desktop push notification', category: 'components' },
      { name: 'Accordion', description: 'Vertical stack of interactive headings to toggle content display', category: 'components' },
      { name: 'Alert', description: 'A way of informing the user of important changes in a prominent way', category: 'components' },
      { name: 'Avatar', description: 'A graphical representation of a user: usually a photo, illustration, or initial', category: 'components' },
      { name: 'Badge', description: 'A small label representing a status, property, or metadata', category: 'components' },
      { name: 'Breadcrumbs', description: 'A list of links showing the location of the current page in the navigational hierarchy', category: 'components' },
      { name: 'Button', description: 'Buttons trigger an action such as submitting a form or showing/hiding an interface component', category: 'components' },
      { name: 'Button group', description: 'A wrapper for multiple, related buttons', category: 'components' },
      { name: 'Card', description: 'A container for content representing a single entity. e.g. a contact, article, or task', category: 'components' },
      { name: 'Carousel', description: 'A means of displaying multiple slides of content, one or more at a time', category: 'components' },
      { name: 'Divider', description: 'A separator between two elements, usually consisting of a horizontal line', category: 'components' },
      { name: 'Icon', description: 'An icon is a graphic symbol designed to visually indicate the purpose of an interface element', category: 'components' },
      { name: 'Image', description: 'An element for embedding images', category: 'components' },
      { name: 'Link', description: 'A link is a reference to a resource. This can be external or internal', category: 'components' },
      { name: 'List', description: 'Lists are used for grouping a collection of related items', category: 'components' },
      { name: 'Modal', description: 'A modal is an interface element that appears over other content', category: 'components' },
      { name: 'Navigation', description: 'A container for navigation links; these can be to other pages or to elements within the current page', category: 'components' },
      { name: 'Popover', description: 'An element that pops up from another element over other content', category: 'components' },
      { name: 'Progress bar', description: 'A horizontal bar indicating the current completion status of a long-running task', category: 'components' },
      { name: 'Progress indicator', description: 'A representation of a user\'s progress through a series of discrete steps', category: 'components' },
      { name: 'Separator', description: 'A separator between two elements, usually consisting of a horizontal or vertical line', category: 'components' },
      { name: 'Skeleton', description: 'A placeholder layout for content which hasn\'t yet loaded', category: 'components' },
      { name: 'Tabs', description: 'Tabbed interfaces are a way of navigating between multiple panels', category: 'components' },
      { name: 'Tooltip', description: 'A means of displaying a description or extra information about an element', category: 'components' },
      { name: 'Tree view', description: 'A component for displaying nested hierarchical information', category: 'components' },
      { name: 'Video', description: 'Video players are used for displaying video content; they often include controls to control playback', category: 'components' },
    ],
  },
  controls: {
    title: 'Control Components',
    description: 'Interactive components with state. Still atomic — they do NOT compose other components.',
    components: [
      { name: 'Checkbox', description: 'An input for choosing from predefined options: when used alone, it gives a binary choice', category: 'controls' },
      { name: 'Color picker', description: 'An input for choosing a color', category: 'controls' },
      { name: 'Combobox', description: 'An input that behaves similarly to a select, with the addition of a free text input to filter options', category: 'controls' },
      { name: 'Date input', description: 'A means of inputting a date – often separated into multiple individual fields for day/month/year', category: 'controls' },
      { name: 'Datepicker', description: 'A visual way to choose a date using a calendar view', category: 'controls' },
      { name: 'File upload', description: 'An input which allows users to upload a file from their device', category: 'controls' },
      { name: 'Label', description: 'A text label for form inputs', category: 'controls' },
      { name: 'Radio button', description: 'Radio buttons allow a user to select a single option from a list of predefined options', category: 'controls' },
      { name: 'Rating', description: 'Ratings let users see and/or set a star rating for a product or other item', category: 'controls' },
      { name: 'Search input', description: 'Search inputs allow users to find content by entering a search term', category: 'controls' },
      { name: 'Segmented control', description: 'A hybrid somewhere between a button group, radio buttons, and tabs', category: 'controls' },
      { name: 'Select', description: 'A form input used for selecting a value: when collapsed it shows the currently selected option', category: 'controls' },
      { name: 'Slider', description: 'A form control for choosing a value within a preset range of values', category: 'controls' },
      { name: 'Spinner', description: 'A visual indicator that a process is happening in the background', category: 'controls' },
      { name: 'Stepper', description: 'A control for editing a numeric value with buttons for decrementing / incrementing', category: 'controls' },
      { name: 'Text input', description: 'A form control that accepts a single line of text', category: 'controls' },
      { name: 'Textarea', description: 'A form control for editing multi-line text', category: 'controls' },
      { name: 'Toggle', description: 'A control used to switch between two states: often on or off', category: 'controls' },
    ],
  },
  video: {
    title: 'Video-Specific Modules',
    description: 'Specialized video playback, review, and workflow modules.',
    components: [
      { name: 'Basic Video Player', description: 'Complete video player with controls', category: 'video' },
      { name: 'Mini Player', description: 'Compact floating video player', category: 'video' },
      { name: 'Split View Player', description: 'Side-by-side frames, synced playback', category: 'video' },
      { name: 'Timeline with Markers', description: 'Video timeline with annotation markers', category: 'video' },
      { name: 'Annotation Panel', description: 'Side panel for video annotations', category: 'video' },
      { name: 'Clip / Capture Strip', description: 'Thumbnail strip of video clips', category: 'video' },
      { name: 'Keyframe Grid', description: 'Grid view of keyframe thumbnails', category: 'video' },
      { name: 'Compare Frames Module', description: 'Side-by-side frame comparison', category: 'video' },
      { name: 'Upload / Processing Status', description: 'Video upload and processing progress', category: 'video' },
      { name: 'Export / Share Module', description: 'Video export and sharing interface', category: 'video' },
      { name: 'Escalation / Review Module', description: 'Review workflow and escalation', category: 'video' },
    ],
  },
}

interface ThemeStyle {
  padding: {
    sm: string
    md: string
    lg: string
  }
  border: {
    width: string
    style: 'solid' | 'dashed' | 'none'
    radius: string
  }
  shadow: {
    sm: string
    md: string
    lg: string
    none: string
  }
  spacing: {
    gap: string
    margin: string
  }
  position: {
    toast: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center'
  }
  variant: 'minimal' | 'outlined' | 'filled' | 'elevated' | 'bordered'
  shadowType: 'soft' | 'hard' | 'glass' | 'glow' | 'none'
  density: 'compact' | 'comfortable' | 'spacious'
  borderWeight: string
}

// Get primary color from tokens or use default
const getPrimaryColor = (tokens: any): string => {
  if (!tokens || typeof tokens !== 'object') return '#715AFF'
  
  try {
    const allTokens = Object.values(tokens).flatMap((layer: any) => 
      Array.isArray(layer) ? layer.flatMap((group: any) => group.tokens || []) : []
    )
    
    const accentPrimary = allTokens.find((token: any) => 
      token && (token.name === 'accent-primary' || token.name === 'primary')
    )
    
    if (accentPrimary && accentPrimary.value) {
      return accentPrimary.value.startsWith('#') 
        ? accentPrimary.value 
        : accentPrimary.value.startsWith('var(') 
          ? `var(--${accentPrimary.name})` 
          : accentPrimary.value
    }
  } catch (e) {
    console.error('Error in getPrimaryColor:', e)
  }
  
  return '#715AFF'
}

const THEMES: { 
  id: Theme
  name: string
  primaryColor: string 
  styles: ThemeStyle
}[] = [
  {
    id: 'saas',
    name: 'Modern SaaS',
    primaryColor: '#715AFF', 
    styles: {
      padding: { sm: '8px', md: '12px', lg: '16px' },
      border: { width: '1px', style: 'solid', radius: '8px' },
      shadow: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 15px rgba(0,0,0,0.1)', none: 'none' },
      spacing: { gap: '12px', margin: '16px' },
      position: { toast: 'top-right' },
      variant: 'elevated',
      shadowType: 'soft',
      density: 'comfortable',
      borderWeight: '1px'
    }
  },
  {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '10px', md: '14px', lg: '20px' },
      border: { width: '2px', style: 'solid', radius: '0px' },
      shadow: { sm: '2px 2px 0px #000', md: '4px 4px 0px #000', lg: '8px 8px 0px #000', none: 'none' },
      spacing: { gap: '16px', margin: '20px' },
      position: { toast: 'bottom-left' },
      variant: 'bordered',
      shadowType: 'hard',
      density: 'spacious',
      borderWeight: '2px'
    }
  },
  {
    id: 'glass',
    name: 'Glassmorphic',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '12px', md: '16px', lg: '24px' },
      border: { width: '1px', style: 'solid', radius: '16px' },
      shadow: { sm: '0 4px 6px rgba(0,0,0,0.05)', md: '0 8px 16px rgba(0,0,0,0.1)', lg: '0 16px 32px rgba(0,0,0,0.15)', none: 'none' },
      spacing: { gap: '16px', margin: '24px' },
      position: { toast: 'top-center' },
      variant: 'minimal',
      shadowType: 'glass',
      density: 'comfortable',
      borderWeight: '1px'
    }
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '6px', md: '10px', lg: '14px' },
      border: { width: '1px', style: 'solid', radius: '4px' },
      shadow: { sm: 'none', md: 'none', lg: 'none', none: 'none' },
      spacing: { gap: '8px', margin: '12px' },
      position: { toast: 'bottom-right' },
      variant: 'minimal',
      shadowType: 'none',
      density: 'compact',
      borderWeight: '1px'
    }
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '8px', md: '12px', lg: '16px' },
      border: { width: '2px', style: 'solid', radius: '2px' },
      shadow: { sm: '0 0 10px rgba(113,90,255,0.3)', md: '0 0 20px rgba(113,90,255,0.5)', lg: '0 0 30px rgba(113,90,255,0.7)', none: 'none' },
      spacing: { gap: '12px', margin: '16px' },
      position: { toast: 'top-left' },
      variant: 'outlined',
      shadowType: 'glow',
      density: 'comfortable',
      borderWeight: '2px'
    }
  },
]

interface ComponentStyles {
  radius: number
  shadow: {
    xOffset: number
    yOffset: number
    blur: number
    spread: number
    color: string
  }
}

// Sub-component for individual component cards to handle local state and interactivity
function ComponentCard({ 
  component, 
  selectedTheme, 
  componentStyles, 
  tokens, 
  copyComponentCode, 
  setEditingComponent,
  setComponentStyles,
  index
}: { 
  component: any
  selectedTheme: Theme
  componentStyles: any
  tokens: any
  copyComponentCode: (name: string) => void
  setEditingComponent: (name: string) => void
  setComponentStyles: (styles: any) => void
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isShowingVariants, setIsShowingVariants] = useState(false)
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false)
  const [previewContext, setPreviewContext] = useState<'clean' | 'grid' | 'dots'>('clean')
  const [previewState, setPreviewState] = useState<'default' | 'hover' | 'active' | 'focus' | 'disabled'>('default')
  const [activeVariantTab, setActiveVariantTab] = useState<'states' | 'sizes' | 'colors'>('states')

  const copyCSSVariables = (name: string) => {
    const currentTheme = THEMES.find(t => t.id === selectedTheme)
    if (!currentTheme) return
    const styles = currentTheme.styles
    const css = `/* ${name} Variables */
:root {
  --radius: ${styles.border.radius};
  --shadow: ${styles.shadow.md};
  --padding: ${styles.padding.md};
  --primary: ${getPrimaryColor(tokens)};
}`
    navigator.clipboard.writeText(css)
    alert('CSS Variables copied!')
  }

  return (
    <motion.div 
      layout
      layoutId={component.name}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={!isShowingVariants ? { y: -4, transition: { duration: 0.2 } } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!isShowingVariants) setPreviewState('default')
      }}
      className={`bg-gray-900/50 border border-gray-800/50 rounded-xl transition-all group backdrop-blur-sm overflow-hidden flex flex-col shadow-lg ${
        isShowingVariants ? 'col-span-full md:col-span-2 lg:col-span-2 xl:col-span-2 ring-2 ring-indigo-500/50 bg-gray-900' : 'hover:border-indigo-500/30 hover:bg-gray-900/80 hover:shadow-indigo-500/10'
      }`}
    >
      {/* Preview Area */}
      <div 
        className={`relative flex flex-col items-center justify-center border-b border-gray-800/50 group-hover:bg-gray-950/30 transition-all overflow-hidden ${
          isShowingVariants ? 'h-80' : 'aspect-video'
        } ${
          previewContext === 'grid' ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' : 
          previewContext === 'dots' ? 'bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:16px_16px]' : 
          'bg-gray-950/50'
        }`}
      >
        {/* Archetype Indicator Badge */}
        {!isShowingVariants && (
          <div className="absolute top-3 left-3 flex gap-1 items-center z-10">
            <div className="px-2 py-0.5 bg-gray-900/80 border border-gray-800 rounded text-[10px] text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {selectedTheme.toUpperCase()} DNA
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPreviewContext(prev => prev === 'clean' ? 'grid' : prev === 'grid' ? 'dots' : 'clean')
              }}
              className="p-1 bg-gray-900/80 border border-gray-800 rounded text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Change Background"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
              </svg>
            </button>
          </div>
        )}

        {/* Close Variants Button */}
        {isShowingVariants && (
          <button 
            onClick={() => setIsShowingVariants(false)}
            className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full transition-all z-30 shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* State Switcher (only visible on hover or if showing variants) */}
        <AnimatePresence>
          {(isHovered || isShowingVariants) && !isShowingVariants && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-3 right-3 flex gap-1 bg-gray-900/90 p-1 border border-gray-800 rounded-lg shadow-xl z-20"
            >
              {(['default', 'hover', 'active', 'focus', 'disabled'] as const).map((state) => (
                <button
                  key={state}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPreviewState(state)
                  }}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                    previewState === state 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {state.charAt(0)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isShowingVariants ? (
          <div className="w-full h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                {(['states', 'sizes', 'colors'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveVariantTab(tab)}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] pb-1 transition-all border-b-2 ${
                      activeVariantTab === tab ? 'border-indigo-500 text-white' : 'border-transparent text-gray-600 hover:text-gray-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {activeVariantTab === 'states' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {(['default', 'hover', 'active', 'focus', 'disabled'] as const).map((s) => (
                    <div key={s} className="flex flex-col items-center gap-3">
                      <div className="flex-1 flex items-center justify-center min-h-[80px]">
                        <ComponentPreview 
                          componentName={component.name} 
                          theme={selectedTheme} 
                          styles={componentStyles[component.name]} 
                          tokens={tokens} 
                          state={s} 
                        />
                      </div>
                      <span className="text-[9px] font-bold uppercase text-gray-600 tracking-wider">{s}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeVariantTab === 'sizes' && (
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  <div className="text-gray-500 text-xs italic">Size variations coming soon for dynamic DNA</div>
                  <ComponentPreview 
                    componentName={component.name} 
                    theme={selectedTheme} 
                    styles={componentStyles[component.name]} 
                    tokens={tokens} 
                  />
                </div>
              )}
              {activeVariantTab === 'colors' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <ComponentPreview componentName={component.name} theme={selectedTheme} styles={componentStyles[component.name]} tokens={tokens} />
                    <span className="text-[9px] font-bold uppercase text-gray-600">Primary</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 opacity-50 grayscale">
                    <ComponentPreview componentName={component.name} theme={selectedTheme} styles={componentStyles[component.name]} tokens={tokens} />
                    <span className="text-[9px] font-bold uppercase text-gray-600">Secondary (Preview)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center w-full">
            <ComponentPreview 
              componentName={component.name} 
              theme={selectedTheme}
              styles={componentStyles[component.name]}
              tokens={tokens}
              state={previewState}
            />
          </div>
        )}

        {/* State Label */}
        {isHovered && !isShowingVariants && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-2 px-2 py-0.5 bg-indigo-600/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded border border-indigo-500/20"
          >
            State: {previewState}
          </motion.div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">{component.name}</h3>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-600 px-1.5 py-0.5 border border-gray-800 rounded">
            {component.category}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed line-clamp-2">{component.description}</p>
        
        {/* Actions */}
        <div className={`mt-auto flex gap-2 pt-4 border-t border-gray-800/30 transition-all transform ${isHovered || isShowingVariants ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button 
            onClick={() => setIsShowingVariants(!isShowingVariants)}
            className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 border ${
              isShowingVariants 
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/40' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            {isShowingVariants ? 'Hide Variants' : 'Variants'}
          </button>
          <button 
            onClick={() => copyComponentCode(component.name)}
            className="px-3 py-2 text-xs font-bold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all flex items-center justify-center gap-1.5 border border-indigo-500/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsMoreActionsOpen(!isMoreActionsOpen)}
              className={`p-2 rounded-lg transition-all border ${
                isMoreActionsOpen ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-gray-800 hover:bg-gray-700 text-gray-400 border-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            <AnimatePresence>
              {isMoreActionsOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-[60]"
                >
                  <div className="p-1.5 flex flex-col">
                    <button 
                      onClick={() => {
                        copyCSSVariables(component.name)
                        setIsMoreActionsOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Copy CSS Vars
                    </button>
                    <button 
                      onClick={() => {
                        setEditingComponent(component.name)
                        setIsMoreActionsOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Styles
                    </button>
                    <div className="h-px bg-gray-800 my-1" />
                    <button 
                      onClick={() => {
                        alert('Component documentation coming soon!')
                        setIsMoreActionsOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Documentation
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Component Preview Renderer
function ComponentPreview({ 
  componentName, 
  theme, 
  styles,
  tokens,
  state = 'default'
}: { 
  componentName: string
  theme: Theme
  styles?: ComponentStyles
  tokens?: any
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled'
}) {
  // Get current theme styles
  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0]
  const themeStyles = currentTheme.styles
  
  // Get primary color from tokens or use default
  const primaryColor = getPrimaryColor(tokens)
  
  // Base colors (consistent across all themes - dark mode)
  const baseColors = {
    bg: themeStyles.shadowType === 'glass' ? 'rgba(17, 24, 39, 0.7)' : '#111827',
    text: '#F9FAFB',
    border: themeStyles.shadowType === 'glass' ? 'rgba(255, 255, 255, 0.1)' : '#374151',
    bgLight: '#FFFFFF',
    textLight: '#111827',
    borderLight: '#E5E7EB'
  }
  
  // Resolve style from token bindings
  const resolveTokenStyle = (propertyPath: string, defaultValue: string): string => {
    if (!tokens) return defaultValue
    
    // Flatten tokens to find bindings
    const allTokens = Object.values(tokens).flatMap((layer: any) => 
      Array.isArray(layer) ? layer.flatMap((group: any) => group.tokens || []) : []
    )
    
    const tokenWithBinding = allTokens.find((token: any) => 
      token && token.bindings?.some((b: any) => 
        b.targetType === 'component' && 
        b.targetId === componentName && 
        (b.propertyPath === propertyPath || b.propertyPath === `styles.${propertyPath}`)
      )
    )
    
    if (tokenWithBinding) {
      return tokenWithBinding.value.startsWith('var(') ? `var(--${tokenWithBinding.name})` : tokenWithBinding.value
    }
    
    return defaultValue
  }

  // Apply theme-specific styles
  const getThemeStyle = () => {
    const borderWidth = themeStyles.borderWeight || themeStyles.border.width
    const borderStyle = themeStyles.border.style
    const borderRadius = resolveTokenStyle('radius', themeStyles.border.radius)
    
    // Density-based padding and gaps
    let padding = themeStyles.padding.md
    let gap = themeStyles.spacing.gap
    
    if (themeStyles.density === 'compact') {
      padding = themeStyles.padding.sm
      gap = '4px'
    } else if (themeStyles.density === 'spacious') {
      padding = themeStyles.padding.lg
      gap = '20px'
    }
    
    // Choose shadow based on shadowType and variant
    let shadow = themeStyles.shadow.none
    if (state === 'hover') {
      if (themeStyles.shadowType === 'glow') shadow = `0 0 20px ${primaryColor}80`
      else if (themeStyles.shadowType === 'hard') shadow = `6px 6px 0px #000`
      else shadow = themeStyles.shadow.lg
    } else if (state === 'focus') {
      shadow = `0 0 0 3px ${primaryColor}40`
    } else {
      if (themeStyles.shadowType === 'soft') shadow = themeStyles.shadow.md
      else if (themeStyles.shadowType === 'hard') shadow = themeStyles.shadow.md 
      else if (themeStyles.shadowType === 'glass') shadow = themeStyles.shadow.md
      else if (themeStyles.shadowType === 'glow') shadow = themeStyles.shadow.md
    }
    
    return {
      padding,
      borderWidth,
      borderStyle,
      borderRadius,
      boxShadow: shadow,
      gap
    }
  }

  const themeStyle = getThemeStyle()
  
  // Component-specific style (from editor)
  const componentStyle = {
    borderRadius: styles?.radius ? `${styles.radius}rem` : themeStyle.borderRadius,
    boxShadow: styles?.shadow 
      ? `${styles.shadow.xOffset}px ${styles.shadow.yOffset}px ${styles.shadow.blur}px ${styles.shadow.spread}px ${styles.shadow.color}`
      : themeStyle.boxShadow,
  }
  
  // Base styles for components
  const baseStyle = {
    backgroundColor: baseColors.bg,
    color: baseColors.text,
    borderColor: baseColors.border,
    backdropFilter: themeStyles.shadowType === 'glass' ? 'blur(12px)' : 'none',
    opacity: state === 'disabled' ? 0.5 : 1,
    cursor: state === 'disabled' ? 'not-allowed' : 'default',
    transform: state === 'active' ? 'scale(0.98)' : 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  switch (componentName) {
    case 'Button':
      const isFilled = themeStyles.variant === 'filled' || themeStyles.variant === 'elevated'
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <button 
            className="font-bold text-sm transition-all"
            style={{ 
              ...baseStyle,
              padding: themeStyle.padding,
              backgroundColor: isFilled ? primaryColor : (themeStyles.shadowType === 'glass' ? 'rgba(255,255,255,0.05)' : 'transparent'),
              color: isFilled ? '#FFFFFF' : primaryColor,
              border: themeStyles.variant === 'outlined' || themeStyles.variant === 'bordered' || themeStyles.shadowType === 'hard'
                ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${state === 'focus' ? primaryColor : baseColors.border}`
                : 'none',
              ...(state === 'hover' && isFilled ? { filter: 'brightness(1.1)' } : {}),
              ...componentStyle,
              boxShadow: themeStyle.boxShadow
            }}
          >
            {state.toUpperCase()} BUTTON
          </button>
          <button 
            className="font-medium text-sm transition-all"
            style={{ 
              ...baseStyle,
              padding: themeStyle.padding,
              backgroundColor: 'transparent',
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              ...componentStyle,
              boxShadow: state === 'hover' ? themeStyles.shadow.md : 'none'
            }}
          >
            Secondary
          </button>
        </div>
      )
    case 'Input':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <input
            type="text"
            readOnly
            value={state === 'disabled' ? 'Disabled input' : 'Interactive input'}
            className="w-full text-sm transition-all"
            style={{ 
              ...baseStyle,
              padding: themeStyle.padding,
              backgroundColor: state === 'disabled' ? 'rgba(255,255,255,0.05)' : baseColors.bg,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${state === 'focus' || state === 'hover' ? primaryColor : baseColors.border}`,
              ...componentStyle,
              boxShadow: state === 'focus' ? `0 0 0 3px ${primaryColor}20` : themeStyle.boxShadow
            }}
          />
        </div>
      )
    case 'Card':
      return (
        <div 
          style={{ 
            ...baseStyle,
            padding: themeStyles.padding.lg,
            border: themeStyles.variant === 'bordered' || themeStyles.variant === 'outlined' || themeStyles.shadowType === 'hard'
              ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`
              : 'none',
            ...(state === 'hover' ? { borderColor: primaryColor } : {}),
            ...componentStyle,
            boxShadow: themeStyle.boxShadow
          }}
        >
          <div className="w-12 h-2 bg-indigo-500/20 rounded mb-3" />
          <h4 className="font-bold text-sm mb-2">Card Title</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">Sample content for the {theme} archetype showcase.</p>
        </div>
      )
    case 'Badge':
      return (
        <div style={{ display: 'flex', gap: themeStyle.gap, flexWrap: 'wrap' }}>
          <span 
            className="text-[10px] font-black uppercase tracking-wider transition-all"
            style={{ 
              ...baseStyle,
              padding: '4px 8px',
              backgroundColor: themeStyles.variant === 'filled' ? primaryColor : (themeStyles.shadowType === 'glass' ? 'rgba(255,255,255,0.05)' : 'transparent'),
              color: themeStyles.variant === 'filled' ? '#FFFFFF' : primaryColor,
              border: themeStyles.variant === 'outlined' || themeStyles.variant === 'bordered' || themeStyles.shadowType === 'hard'
                ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${primaryColor}`
                : 'none',
              ...componentStyle,
              boxShadow: themeStyle.boxShadow
            }}
          >
            {state === 'disabled' ? 'Disabled' : 'Featured'}
          </span>
          <span 
            className="text-[10px] font-black uppercase tracking-wider transition-all opacity-60"
            style={{ 
              ...baseStyle,
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              ...componentStyle,
              boxShadow: themeStyle.boxShadow
            }}
          >
            New
          </span>
        </div>
      )
    case 'Checkbox':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              className="w-5 h-5 flex items-center justify-center transition-all border-2"
              style={{ 
                ...baseStyle,
                borderColor: state === 'focus' ? primaryColor : baseColors.border,
                backgroundColor: state === 'active' ? primaryColor : 'transparent',
                ...componentStyle,
                boxShadow: themeStyle.boxShadow
              }}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
            <span className="text-xs font-medium" style={{ color: baseColors.text }}>Option 1</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              className="w-5 h-5 flex items-center justify-center transition-all border-2"
              style={{ 
                ...baseStyle,
                borderColor: primaryColor,
                backgroundColor: primaryColor,
                ...componentStyle,
                boxShadow: themeStyle.boxShadow
              }}
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-medium" style={{ color: baseColors.text }}>Checked</span>
          </label>
        </div>
      )
    case 'Switch':
    case 'Toggle':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              className="relative w-10 h-6 flex items-center transition-all p-1"
              style={{ 
                ...baseStyle,
                backgroundColor: state === 'active' ? primaryColor : baseColors.border,
                ...componentStyle,
                borderRadius: '100px',
                boxShadow: themeStyle.boxShadow
              }}
            >
              <div 
                className="w-4 h-4 bg-white rounded-full shadow-sm transition-all"
                style={{ transform: state === 'active' ? 'translateX(16px)' : 'translateX(0)' }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: baseColors.text }}>{state === 'active' ? 'On' : 'Off'}</span>
          </label>
        </div>
      )
    case 'Toast':
      return (
        <div 
          className="flex items-center gap-3 transition-all" 
          style={{ 
            ...baseStyle,
            padding: '12px 16px',
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
            width: '100%',
            maxWidth: '280px',
            ...(state === 'hover' ? { transform: 'translateY(-2px)' } : {}),
            ...componentStyle,
            boxShadow: themeStyle.boxShadow
          }}
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500/20 text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Success!</p>
            <p className="text-[10px] text-gray-500 truncate">Operation completed.</p>
          </div>
        </div>
      )
    case 'Alert':
      return (
        <div 
          className="w-full rounded-lg border-l-4 transition-all overflow-hidden"
          style={{ 
            ...baseStyle,
            padding: '12px 16px',
            borderLeftColor: primaryColor,
            backgroundColor: `${primaryColor}08`,
            ...componentStyle,
            boxShadow: themeStyle.boxShadow
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: primaryColor }}>Notice</p>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">This is a contextual alert for {theme}.</p>
        </div>
      )
    case 'Avatar':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: themeStyle.gap }}>
          <div 
            className="w-10 h-10 transition-all flex items-center justify-center text-xs font-bold relative group"
            style={{ 
              ...baseStyle,
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              ...componentStyle,
              borderRadius: themeStyle.borderRadius === '0px' ? '0px' : '50%',
              boxShadow: themeStyle.boxShadow
            }}
          >
            DS
            {state === 'active' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-950 rounded-full" />
            )}
          </div>
          <div 
            className="w-10 h-10 transition-all flex items-center justify-center bg-gray-800 text-gray-400 border-2"
            style={{ 
              ...baseStyle,
              borderColor: baseColors.border,
              ...componentStyle,
              borderRadius: themeStyle.borderRadius === '0px' ? '0px' : '50%',
              boxShadow: themeStyle.boxShadow
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )
    case 'Accordion':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <div 
            className="overflow-hidden transition-all"
            style={{ 
              ...baseStyle,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${state === 'hover' ? primaryColor : baseColors.border}`,
              ...componentStyle,
              boxShadow: themeStyle.boxShadow
            }}
          >
            <div 
              className="w-full flex items-center justify-between text-left"
              style={{ padding: '8px 12px' }}
            >
              <span className="text-[10px] font-bold">Section 1</span>
              <svg className={`w-3 h-3 transition-transform ${state === 'active' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {state === 'active' && (
              <div className="px-3 pb-3 text-[9px] text-gray-500 animate-in fade-in slide-in-from-top-1">
                Expanded content for the {theme} theme.
              </div>
            )}
          </div>
        </div>
      )
    case 'Progress bar':
    case 'Progress indicator':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] font-bold text-gray-500">Processing</span>
            <span className="text-[9px] font-bold" style={{ color: primaryColor }}>65%</span>
          </div>
          <div 
            className="w-full h-2 overflow-hidden bg-gray-800 rounded-full border border-gray-700/50"
            style={{ ...componentStyle, boxShadow: themeStyle.boxShadow }}
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full relative overflow-hidden"
              style={{ 
                backgroundColor: primaryColor,
                boxShadow: themeStyles.shadowType === 'glow' ? `0 0 10px ${primaryColor}` : 'none'
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>
        </div>
      )
    case 'Spinner':
    case 'Loading Spinner':
      return (
        <div className="flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 rounded-full border-t-transparent shadow-lg"
            style={{ 
              ...componentStyle,
              borderColor: `${primaryColor}40`,
              borderTopColor: primaryColor,
              boxShadow: themeStyle.boxShadow
            }}
          />
        </div>
      )
    case 'Skeleton':
    case 'Skeleton Loader':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <div className="flex gap-3 items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-2 w-1/2 bg-gray-800 rounded animate-pulse" />
              <div className="h-2 w-1/3 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
          <div 
            className="h-16 w-full bg-gray-800/50 animate-pulse border border-gray-800"
            style={{ ...componentStyle, boxShadow: themeStyle.boxShadow }}
          />
        </div>
      )
    case 'Separator':
    case 'Divider':
      return (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Section</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="h-px w-full" style={{ backgroundColor: state === 'hover' ? primaryColor : baseColors.border }} />
        </div>
      )
    case 'Text input':
    case 'Search input':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              readOnly
              placeholder="Search..."
              className="w-full text-sm transition-all pl-9 pr-4"
              style={{ 
                ...baseStyle,
                padding: '8px 36px',
                border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${state === 'focus' ? primaryColor : baseColors.border}`,
                ...componentStyle,
                boxShadow: state === 'focus' ? `0 0 0 3px ${primaryColor}20` : themeStyle.boxShadow
              }}
            />
          </div>
        </div>
      )
    case 'Textarea':
      return (
        <textarea
          readOnly
          placeholder="Multi-line input..."
          className="w-full text-[11px] transition-all resize-none"
          rows={3}
          style={{ 
            ...baseStyle,
            padding: '8px 12px',
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${state === 'focus' ? primaryColor : baseColors.border}`,
            ...componentStyle,
            boxShadow: themeStyle.boxShadow
          }}
        />
      )
    case 'Select':
      return (
        <div 
          className="w-full flex items-center justify-between transition-all"
          style={{ 
            ...baseStyle,
            padding: '8px 12px',
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${state === 'hover' ? primaryColor : baseColors.border}`,
            ...componentStyle,
            boxShadow: themeStyle.boxShadow
          }}
        >
          <span className="text-[11px]">Choose option</span>
          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )
    case 'Radio button':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              className="w-5 h-5 flex items-center justify-center transition-all border-2 rounded-full"
              style={{ 
                ...baseStyle,
                borderColor: state === 'active' ? primaryColor : baseColors.border,
                ...componentStyle,
                boxShadow: themeStyle.boxShadow
              }}
            >
              {state === 'active' && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              )}
            </div>
            <span className="text-xs font-medium" style={{ color: baseColors.text }}>Option 1</span>
          </label>
        </div>
      )
    case 'Slider':
      return (
        <div className="w-full px-2 py-4">
          <div className="relative h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full"
              style={{ width: '45%', backgroundColor: primaryColor }}
            />
            <div 
              className="absolute left-[45%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all shadow-xl"
              style={{ 
                backgroundColor: '#FFF', 
                borderColor: primaryColor,
                transform: state === 'hover' ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%)'
              }}
            />
          </div>
        </div>
      )
    case 'Breadcrumbs':
      return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-[10px] font-bold uppercase tracking-widest">
          <span className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Home</span>
          <span className="opacity-20">/</span>
          <span className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">App</span>
          <span className="opacity-20">/</span>
          <span style={{ color: primaryColor }}>Current</span>
        </nav>
      )
    case 'Tabs':
      return (
        <div className="w-full">
          <div className="flex border-b border-gray-800 gap-4">
            {(['Profile', 'Settings']).map((tab, i) => (
              <div 
                key={tab}
                className="pb-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border-b-2"
                style={{ 
                  borderColor: (i === 0 || state === 'active') ? primaryColor : 'transparent',
                  color: (i === 0 || state === 'active') ? primaryColor : '#666'
                }}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      )
    case 'Pagination':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className="w-7 h-7 flex items-center justify-center text-[10px] font-bold transition-all border rounded-md cursor-pointer shadow-sm"
              style={{ 
                ...baseStyle,
                borderColor: num === 1 ? primaryColor : baseColors.border,
                backgroundColor: num === 1 ? `${primaryColor}15` : baseColors.bg,
                color: num === 1 ? primaryColor : baseColors.text,
                ...componentStyle,
                boxShadow: themeStyle.boxShadow
              }}
            >
              {num}
            </div>
          ))}
        </div>
      )
    default:
      return (
        <div 
          className="text-center transition-all"
          style={{ 
            ...baseStyle,
            padding: themeStyle.padding,
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
            ...componentStyle,
            boxShadow: themeStyle.boxShadow
          }}
        >
          <p className="text-sm opacity-60">{componentName} Preview</p>
        </div>
      )
  }
}

export default function SystemComponents({ designSystemName, availableSystems, onSwitchSystem }: SystemComponentsProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('saas')
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const [isArchetypeChanging, setIsArchetypeChanging] = useState(false)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [componentStyles, setComponentStyles] = useState<Record<string, ComponentStyles>>({})
  const [tokens, setTokens] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<ComponentCategory | 'all'>('all')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    components: true,
    controls: true,
    video: false,
    colors: false,
    typography: false,
    other: true,
  })
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filtered components logic
  const filteredCategories = useMemo(() => {
    const result: any = {}
    
    Object.entries(COMPONENT_CATEGORIES).forEach(([key, category]) => {
      if (filterCategory !== 'all' && key !== filterCategory) return
      
      const filteredComponents = category.components.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      if (filteredComponents.length > 0) {
        result[key] = {
          ...category,
          components: filteredComponents
        }
      }
    })
    
    return result
  }, [searchQuery, filterCategory])

  const copyComponentCode = (componentName: string) => {
    const currentThemeStyles = THEMES.find(t => t.id === selectedTheme)?.styles
    if (!currentThemeStyles) return

    const radiusClass = currentThemeStyles.border.radius === '0px' ? 'rounded-none' : 
                       currentThemeStyles.border.radius === '4px' ? 'rounded' : 
                       currentThemeStyles.border.radius === '8px' ? 'rounded-lg' : 
                       currentThemeStyles.border.radius === '12px' ? 'rounded-xl' : 'rounded-2xl'
    
    const shadowClass = currentThemeStyles.shadowType === 'soft' ? 'shadow-md' :
                       currentThemeStyles.shadowType === 'hard' ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' :
                       currentThemeStyles.shadowType === 'glass' ? 'bg-white/10 backdrop-blur-md border border-white/20' :
                       currentThemeStyles.shadowType === 'glow' ? 'shadow-[0_0_15px_rgba(113,90,255,0.5)]' : ''

    const paddingClass = currentThemeStyles.density === 'compact' ? 'p-3' :
                        currentThemeStyles.density === 'comfortable' ? 'p-5' : 'p-8'

    const code = `// ${componentName} for ${selectedTheme} architecture
import React from 'react';

export const ${componentName.replace(/\s+/g, '')} = () => {
  return (
    <div className="${paddingClass} ${radiusClass} ${shadowClass} transition-all border border-gray-800 bg-gray-950">
      <h3 className="text-white font-bold">${componentName}</h3>
      <p className="text-gray-400 text-sm">Generated by Flash-DSM</p>
    </div>
  );
};`
    navigator.clipboard.writeText(code)
    alert(`${componentName} code copied!`)
  }

  const exportSystemPrompt = () => {
    const theme = THEMES.find(t => t.id === selectedTheme)
    if (!theme) return

    const prompt = `Act as a senior UI engineer. I am using a Design System called "${designSystemName}" with a "${theme.name}" structural DNA. 
Follow these rules for all new components:
- Corner Radius: ${theme.styles.border.radius}
- Shadow Style: ${theme.styles.shadowType}
- Density/Spacing: ${theme.styles.density}
- Border Weight: ${theme.styles.borderWeight}
- Primary Color: ${getPrimaryColor(tokens)}
- Base Theme: Dark Mode (bg: #111827, text: #F9FAFB)

Always use Tailwind CSS for styling and ensure components match this structural DNA.`
    
    navigator.clipboard.writeText(prompt)
    alert('AI System Prompt copied! Paste it into Cursor Chat.')
  }

  // Load tokens from localStorage
  useEffect(() => {
    const loadTokens = () => {
      try {
        const saved = localStorage.getItem('dsm-tokens-v2')
        if (saved) {
          const parsed = JSON.parse(saved)
          setTokens(parsed)
        }
      } catch (e) {
        console.error('Failed to load tokens in SystemComponents:', e)
      }
    }

    // Initial load
    loadTokens()
    
    // Listen for storage changes (works across tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dsm-tokens-v2') loadTokens()
    }
    
    // Listen for custom event (works in same window)
    const handleCustomUpdate = () => loadTokens()
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('dsm-tokens-updated', handleCustomUpdate)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('dsm-tokens-updated', handleCustomUpdate)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isThemeDropdownOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false)
      }
    }

    // Use setTimeout to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isThemeDropdownOpen])

  return (
    <div className="relative min-h-full bg-gray-950 text-white">
      {/* Archetype Change Overlay */}
      <AnimatePresence>
        {isArchetypeChanging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-indigo-600/5 backdrop-blur-[2px]"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="bg-gray-900 border border-indigo-500/30 px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-500/20 flex flex-col items-center gap-2"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Structural DNA Updated</div>
              <div className="text-2xl font-bold text-white tracking-tight">{THEMES.find(t => t.id === selectedTheme)?.name}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-8 py-8 flex flex-col gap-6 border-b border-gray-800/50 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">Component Gallery</h1>
            <p className="text-gray-400 mb-1">Viewing: <span className="text-palette-cornflower font-medium">{designSystemName}</span></p>
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
              Organized by architecture: <span className="text-indigo-400 font-medium">Components</span> (atomic) → <span className="text-palette-cornflower font-medium">Controls</span> (interactive) → <span className="text-green-400 font-medium">Modules</span> (composed) → <span className="text-purple-400 font-medium">Video</span> (specialized)
            </p>
          </div>
          <button 
            onClick={exportSystemPrompt}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Export AI Prompt
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-lg blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full pl-10 pr-4 py-2 bg-gray-900/80 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-md"
            />
          </div>
          <div className="flex items-center gap-1 p-1 bg-gray-900/80 border border-gray-800 rounded-lg backdrop-blur-md">
            {(['all', 'components', 'controls', 'video'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                  filterCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-4 w-px bg-gray-800 mx-2" />
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
              {Object.values(filteredCategories).reduce((acc: number, cat: any) => acc + cat.components.length, 0)} Results
            </div>
          </div>
        </div>
      </div>

      {/* Components by Category */}
      <div className="px-8 pb-16 pt-8 space-y-16">
        <AnimatePresence mode="popLayout">
          {Object.keys(filteredCategories).length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-900 border border-gray-800 rounded-3xl flex items-center justify-center text-gray-700 mb-6 shadow-2xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No matching components</h3>
              <p className="text-gray-500 max-w-xs">We couldn't find any components matching "{searchQuery}" in this category.</p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setFilterCategory('all')
                }}
                className="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            (Object.keys(filteredCategories) as ComponentCategory[]).map((categoryKey) => {
            const category = filteredCategories[categoryKey]
            const isExpanded = expandedSections[categoryKey] !== false
            
            return (
              <motion.div 
                key={categoryKey} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-end justify-between mb-8 border-b border-gray-800/50 pb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-1">
                      <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                      <h2 className="text-3xl font-black text-white tracking-tight uppercase">{category.title}</h2>
                      <div className="flex items-center justify-center min-w-[2.5rem] h-6 px-2 bg-gray-900 border border-gray-800 text-indigo-400 text-[10px] font-black rounded-full">
                        {category.components.length}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 max-w-3xl ml-5 font-medium leading-relaxed italic">{category.description}</p>
                  </div>
                  <button
                    onClick={() => setExpandedSections({ ...expandedSections, [categoryKey]: !isExpanded })}
                    className={`ml-4 p-3 rounded-xl transition-all ${
                      isExpanded ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-500 bg-gray-900 hover:text-white'
                    }`}
                    title={isExpanded ? 'Collapse Section' : 'Expand Section'}
                  >
                    <svg 
                      className={`w-6 h-6 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Components Grid */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                      {category.components.map((component: any, index: number) => (
                        <ComponentCard 
                          key={`${selectedTheme}-${component.name}`}
                          component={component}
                          selectedTheme={selectedTheme}
                          componentStyles={componentStyles}
                          tokens={tokens}
                          copyComponentCode={copyComponentCode}
                          setEditingComponent={setEditingComponent}
                          setComponentStyles={setComponentStyles}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )
          })
        )}
      </AnimatePresence>
      </div>

      {/* Theme Dropdown - Sticky Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 shadow-xl hover:border-palette-slate/50 transition-all flex items-center gap-2 group"
          >
            <div 
              className="w-4 h-4 border-2 transition-all"
              style={{ 
                backgroundColor: selectedTheme === 'glass' ? 'rgba(255,255,255,0.2)' : getPrimaryColor(tokens),
                borderColor: getPrimaryColor(tokens),
                borderRadius: THEMES.find(t => t.id === selectedTheme)?.styles.border.radius === '0px' ? '0px' : '50%',
                boxShadow: THEMES.find(t => t.id === selectedTheme)?.styles.shadowType === 'glow' ? `0 0 10px ${getPrimaryColor(tokens)}` : 'none'
              }}
            />
            <span className="text-sm text-white font-medium">
              {THEMES.find(t => t.id === selectedTheme)?.name || 'Modern SaaS'} Archetype
            </span>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isThemeDropdownOpen && (
            <div 
              className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden min-w-[220px] z-50 animate-in slide-in-from-bottom-2 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                <div className="px-3 py-2 mb-1 border-b border-gray-800">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select DNA Archetype</span>
                </div>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      if (selectedTheme !== theme.id) {
                        setIsArchetypeChanging(true)
                        setSelectedTheme(theme.id)
                        setTimeout(() => setIsArchetypeChanging(false), 800)
                      }
                      setIsThemeDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                      selectedTheme === theme.id
                        ? 'bg-palette-slate/20 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div 
                      className="w-5 h-5 border-2 flex-shrink-0 transition-all"
                      style={{ 
                        backgroundColor: theme.id === 'glass' ? 'rgba(255,255,255,0.2)' : getPrimaryColor(tokens),
                        borderColor: getPrimaryColor(tokens),
                        borderRadius: theme.styles.border.radius === '0px' ? '0px' : '50%',
                        boxShadow: theme.styles.shadowType === 'glow' ? `0 0 8px ${getPrimaryColor(tokens)}` : 'none'
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{theme.name}</span>
                      <span className="text-[10px] text-gray-500">{theme.styles.density} • {theme.styles.shadowType}</span>
                    </div>
                    {selectedTheme === theme.id && (
                      <svg className="w-4 h-4 ml-auto text-palette-cornflower" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Component Edit Modal - Right Sidebar */}
      {editingComponent && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setEditingComponent(null)}
          />
          {/* Modal - Right Side */}
          <div className="fixed inset-y-0 right-0 z-50 flex items-center">
            <div className="bg-gray-900 border-l border-gray-800 shadow-2xl w-full max-w-md h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
                <h2 className="text-xl font-semibold text-white">Edit {editingComponent}</h2>
                <button
                  onClick={() => setEditingComponent(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {/* Colors Section */}
                  <div>
                    <button
                      onClick={() => setExpandedSections({ ...expandedSections, colors: !expandedSections.colors })}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-gray-300">Colors</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.colors ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.colors && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs text-gray-500">Color options coming soon...</p>
                      </div>
                    )}
                  </div>

                  {/* Typography Section */}
                  <div>
                    <button
                      onClick={() => setExpandedSections({ ...expandedSections, typography: !expandedSections.typography })}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-gray-300">Typography</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.typography ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.typography && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs text-gray-500">Typography options coming soon...</p>
                      </div>
                    )}
                  </div>

                  {/* Other Section */}
                  <div>
                    <button
                      onClick={() => setExpandedSections({ ...expandedSections, other: !expandedSections.other })}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-sm font-medium text-gray-300">Other</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.other ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSections.other && (
                      <div className="mt-4 space-y-6">
                        {/* Radius */}
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Radius</label>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                              <input
                                type="range"
                                min="0"
                                max="3"
                                step="0.05"
                                value={componentStyles[editingComponent]?.radius || 1.25}
                                onChange={(e) => {
                                  const newStyles = {
                                    ...componentStyles,
                                    [editingComponent]: {
                                      ...componentStyles[editingComponent],
                                      radius: parseFloat(e.target.value),
                                    },
                                  }
                                  setComponentStyles(newStyles)
                                }}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                  background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.radius || 1.25) / 3) * 100}%, #374151 ${((componentStyles[editingComponent]?.radius || 1.25) / 3) * 100}%, #374151 100%)`,
                                }}
                              />
                            </div>
                            <input
                              type="number"
                              min="0"
                              max="3"
                              step="0.05"
                              value={componentStyles[editingComponent]?.radius || 1.25}
                              onChange={(e) => {
                                const newStyles = {
                                  ...componentStyles,
                                  [editingComponent]: {
                                    ...componentStyles[editingComponent],
                                    radius: parseFloat(e.target.value) || 0,
                                  },
                                }
                                setComponentStyles(newStyles)
                              }}
                              className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                            />
                            <span className="text-xs text-gray-400">rem</span>
                          </div>
                        </div>

                        {/* Shadow */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-3">Shadow</h4>
                          <div className="space-y-4">
                            {/* X Offset */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">X Offset</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="-20"
                                    max="20"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.xOffset || 4}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            xOffset: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.xOffset || 4) + 20) / 40 * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.xOffset || 4) + 20) / 40 * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="-20"
                                  max="20"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.xOffset || 4}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          xOffset: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Y Offset */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Y Offset</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="-20"
                                    max="20"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.yOffset || 4}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            yOffset: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.yOffset || 4) + 20) / 40 * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.yOffset || 4) + 20) / 40 * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="-20"
                                  max="20"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.yOffset || 4}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          yOffset: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Blur */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Blur</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.blur || 0}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            blur: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.blur || 0) / 50) * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.blur || 0) / 50) * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="0"
                                  max="50"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.blur || 0}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          blur: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Spread */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Spread</label>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                  <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={componentStyles[editingComponent]?.shadow.spread || 0}
                                    onChange={(e) => {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            spread: parseInt(e.target.value),
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                      background: `linear-gradient(to right, #715AFF 0%, #715AFF ${((componentStyles[editingComponent]?.shadow.spread || 0) / 50) * 100}%, #374151 ${((componentStyles[editingComponent]?.shadow.spread || 0) / 50) * 100}%, #374151 100%)`,
                                    }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min="0"
                                  max="50"
                                  step="1"
                                  value={componentStyles[editingComponent]?.shadow.spread || 0}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          spread: parseInt(e.target.value) || 0,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                />
                                <span className="text-xs text-gray-400">px</span>
                              </div>
                            </div>

                            {/* Color */}
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Color</label>
                              <div className="flex items-center gap-3">
                                <input
                                  type="color"
                                  value={componentStyles[editingComponent]?.shadow.color || '#000000'}
                                  onChange={(e) => {
                                    const newStyles = {
                                      ...componentStyles,
                                      [editingComponent]: {
                                        ...componentStyles[editingComponent],
                                        shadow: {
                                          ...componentStyles[editingComponent]?.shadow,
                                          color: e.target.value,
                                        },
                                      },
                                    }
                                    setComponentStyles(newStyles)
                                  }}
                                  className="w-12 h-12 rounded border-2 border-gray-700 cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={componentStyles[editingComponent]?.shadow.color || '#000000'}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    if (value.match(/^#[0-9A-Fa-f]{0,6}$/) || value === '') {
                                      const newStyles = {
                                        ...componentStyles,
                                        [editingComponent]: {
                                          ...componentStyles[editingComponent],
                                          shadow: {
                                            ...componentStyles[editingComponent]?.shadow,
                                            color: value || '#000000',
                                          },
                                        },
                                      }
                                      setComponentStyles(newStyles)
                                    }
                                  }}
                                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-palette-slate"
                                  placeholder="#000000"
                                  maxLength={7}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="p-6 border-t border-gray-800 flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => setEditingComponent(null)}
                  className="flex-1 px-4 py-2 bg-palette-slate hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingComponent(null)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
