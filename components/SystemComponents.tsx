'use client'

import { useState, useEffect, useRef } from 'react'

interface SystemComponentsProps {
  designSystemName: string
  availableSystems: { id: string; projectName: string }[]
  onSwitchSystem: (id: string) => void
}

type Theme = 'light' | 'dark' | 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'yellow' | 'pink' | 'teal'

type ComponentCategory = 'components' | 'controls' | 'modules' | 'video'

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
      { name: 'Toast', description: 'A type of alert which appears in a layer above other content, visually similar to a mobile or desktop push notification', category: 'components' },
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
  modules: {
    title: 'Modules',
    description: 'Composed patterns built from Components + Controls. They represent recognizable UI structures.',
    components: [
      { name: 'Drawer', description: 'A panel which slides out from the edge of the screen', category: 'modules' },
      { name: 'Dropdown menu', description: 'A menu in which options are hidden by default but can be shown by interacting with a button', category: 'modules' },
      { name: 'Empty state', description: 'An indication to the user that there is no data to display in the current view', category: 'modules' },
      { name: 'Fieldset', description: 'A wrapper for related form fields', category: 'modules' },
      { name: 'Form', description: 'A grouping of input controls that allow a user to submit information to a server', category: 'modules' },
      { name: 'Header', description: 'An element that appears across the top of all pages on a website or application', category: 'modules' },
      { name: 'Footer', description: 'Commonly appearing at the bottom of a page or section, a footer is used to display copyright and legal information', category: 'modules' },
      { name: 'Hero', description: 'A large banner, usually appearing as one of the first items on a page', category: 'modules' },
      { name: 'Pagination', description: 'Pagination is the process of splitting information over multiple pages', category: 'modules' },
      { name: 'Table', description: 'A component for displaying large amounts of data in rows and columns', category: 'modules' },
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

const THEMES: { id: Theme; name: string; colors: { primary: string; bg: string; text: string; border: string } }[] = [
  { 
    id: 'dark', 
    name: 'Dark', 
    colors: { primary: '#715AFF', bg: '#111827', text: '#F9FAFB', border: '#374151' } 
  },
  { 
    id: 'light', 
    name: 'Light', 
    colors: { primary: '#715AFF', bg: '#FFFFFF', text: '#111827', border: '#E5E7EB' } 
  },
  { 
    id: 'blue', 
    name: 'Blue', 
    colors: { primary: '#3B82F6', bg: '#1E3A8A', text: '#EFF6FF', border: '#3B82F6' } 
  },
  { 
    id: 'purple', 
    name: 'Purple', 
    colors: { primary: '#A855F7', bg: '#581C87', text: '#F3E8FF', border: '#A855F7' } 
  },
  { 
    id: 'green', 
    name: 'Green', 
    colors: { primary: '#10B981', bg: '#064E3B', text: '#D1FAE5', border: '#10B981' } 
  },
  { 
    id: 'red', 
    name: 'Red', 
    colors: { primary: '#EF4444', bg: '#7F1D1D', text: '#FEE2E2', border: '#EF4444' } 
  },
  { 
    id: 'orange', 
    name: 'Orange', 
    colors: { primary: '#F97316', bg: '#7C2D12', text: '#FFEDD5', border: '#F97316' } 
  },
  { 
    id: 'yellow', 
    name: 'Yellow', 
    colors: { primary: '#EAB308', bg: '#713F12', text: '#FEF9C3', border: '#EAB308' } 
  },
  { 
    id: 'pink', 
    name: 'Pink', 
    colors: { primary: '#EC4899', bg: '#831843', text: '#FCE7F3', border: '#EC4899' } 
  },
  { 
    id: 'teal', 
    name: 'Teal', 
    colors: { primary: '#14B8A6', bg: '#134E4A', text: '#CCFBF1', border: '#14B8A6' } 
  },
]

// Component Preview Renderer
function ComponentPreview({ 
  componentName, 
  theme, 
  styles,
  tokens
}: { 
  componentName: string
  theme: Theme
  styles?: ComponentStyles
  tokens?: any
}) {
  const themeColors = THEMES.find(t => t.id === theme)?.colors || THEMES[0].colors
  
  // Resolve style from token bindings
  const resolveTokenStyle = (propertyPath: string, defaultValue: string): string => {
    if (!tokens) return defaultValue
    
    // Flatten tokens to find bindings
    const allTokens = Object.values(tokens).flatMap((layer: any) => 
      layer.flatMap((group: any) => group.tokens)
    )
    
    const tokenWithBinding = allTokens.find((token: any) => 
      token.bindings?.some((b: any) => 
        b.targetType === 'component' && 
        b.targetId === componentName && 
        (b.propertyPath === propertyPath || b.propertyPath === `styles.${propertyPath}`)
      )
    )
    
    if (tokenWithBinding) {
      // Support light/dark mode overrides
      if (theme === 'dark' && tokenWithBinding.darkValue) {
        return tokenWithBinding.darkValue
      }
      if (theme === 'light' && tokenWithBinding.lightValue) {
        return tokenWithBinding.lightValue
      }
      
      return tokenWithBinding.value.startsWith('var(') ? `var(--${tokenWithBinding.name})` : tokenWithBinding.value
    }
    
    return defaultValue
  }

  // Calculate border radius and shadow from styles
  const borderRadius = resolveTokenStyle('radius', styles?.radius ? `${styles.radius}rem` : '0.375rem')
  
  const boxShadow = styles?.shadow 
    ? `${styles.shadow.xOffset}px ${styles.shadow.yOffset}px ${styles.shadow.blur}px ${styles.shadow.spread}px ${styles.shadow.color}`
    : undefined
  
  const componentStyle = {
    borderRadius,
    boxShadow,
  }
  
  const previewStyles = {
    backgroundColor: resolveTokenStyle('bg', themeColors.bg),
    color: resolveTokenStyle('text', themeColors.text),
    borderColor: resolveTokenStyle('border', themeColors.border),
  }

  switch (componentName) {
    case 'Button':
      return (
        <div className="space-y-2">
          <button 
            className="px-4 py-2 font-medium text-sm transition-all"
            style={{ 
              backgroundColor: resolveTokenStyle('bg', themeColors.primary), 
              color: resolveTokenStyle('text', '#FFFFFF'),
              ...componentStyle
            }}
          >
            Primary Button
          </button>
          <button 
            className="px-4 py-2 font-medium text-sm border transition-all"
            style={{ 
              borderColor: resolveTokenStyle('border', themeColors.border), 
              color: resolveTokenStyle('text', themeColors.text),
              ...componentStyle
            }}
          >
            Secondary Button
          </button>
        </div>
      )
    case 'Input':
      return (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full px-3 py-2 text-sm border transition-all"
            style={{ 
              backgroundColor: themeColors.bg,
              borderColor: themeColors.border,
              color: themeColors.text,
              ...componentStyle
            }}
          />
          <input
            type="text"
            placeholder="Focused state"
            className="w-full px-3 py-2 text-sm border-2 transition-all"
            style={{ 
              backgroundColor: themeColors.bg,
              borderColor: themeColors.primary,
              color: themeColors.text,
              ...componentStyle
            }}
          />
        </div>
      )
    case 'Card':
      return (
        <div 
          className="p-4 border"
          style={{ 
            backgroundColor: themeColors.bg,
            borderColor: themeColors.border,
            color: themeColors.text,
            ...componentStyle
          }}
        >
          <h4 className="font-semibold mb-2">Card Title</h4>
          <p className="text-sm opacity-80">Card content goes here</p>
        </div>
      )
    case 'Badge':
      return (
        <div className="flex gap-2 flex-wrap">
          <span 
            className="px-2 py-1 text-xs font-medium"
            style={{ 
              backgroundColor: themeColors.primary, 
              color: '#FFFFFF',
              ...componentStyle
            }}
          >
            New
          </span>
          <span 
            className="px-2 py-1 text-xs font-medium border"
            style={{ 
              borderColor: themeColors.border, 
              color: themeColors.text,
              ...componentStyle
            }}
          >
            Default
          </span>
        </div>
      )
    case 'Checkbox':
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4" 
              style={{ 
                accentColor: themeColors.primary,
                borderRadius: styles?.radius ? `${styles.radius * 0.25}rem` : undefined
              }} 
            />
            <span className="text-sm">Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked 
              className="w-4 h-4" 
              style={{ 
                accentColor: themeColors.primary,
                borderRadius: styles?.radius ? `${styles.radius * 0.25}rem` : undefined
              }} 
            />
            <span className="text-sm">Option 2</span>
          </label>
        </div>
      )
    case 'Switch':
    case 'Toggle':
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div 
                className="w-10 h-6 transition-all"
                style={{ 
                  backgroundColor: themeColors.border,
                  borderRadius: styles?.radius ? `${styles.radius * 0.5}rem` : '9999px',
                  ...(styles?.shadow ? { boxShadow: boxShadow } : {})
                }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all translate-x-0.5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-sm">Toggle Off</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked className="sr-only" />
              <div 
                className="w-10 h-6 transition-all"
                style={{ 
                  backgroundColor: themeColors.primary,
                  borderRadius: styles?.radius ? `${styles.radius * 0.5}rem` : '9999px',
                  ...(styles?.shadow ? { boxShadow: boxShadow } : {})
                }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all translate-x-5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-sm">Toggle On</span>
          </label>
        </div>
      )
    case 'Toast':
      // Theme-specific Toast styling inspired by component.gallery
      const getToastStyles = () => {
        switch (theme) {
          case 'light':
            return {
              bg: resolveTokenStyle('bg', '#FFFFFF'),
              text: resolveTokenStyle('text', '#111827'),
              border: resolveTokenStyle('border', '#E5E7EB'),
              shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              successBg: '#F0FDF4',
              successBorder: '#86EFAC',
              errorBg: '#FEF2F2',
              errorBorder: '#FCA5A5',
              warningBg: '#FFFBEB',
              warningBorder: '#FDE047',
              infoBg: '#EFF6FF',
              infoBorder: '#93C5FD'
            }
          case 'blue':
            return {
              bg: resolveTokenStyle('bg', '#1E3A8A'),
              text: resolveTokenStyle('text', '#EFF6FF'),
              border: resolveTokenStyle('border', '#3B82F6'),
              shadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2)',
              successBg: '#065F46',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
          case 'purple':
            return {
              bg: resolveTokenStyle('bg', '#581C87'),
              text: resolveTokenStyle('text', '#F3E8FF'),
              border: resolveTokenStyle('border', '#A855F7'),
              shadow: '0 10px 15px -3px rgba(168, 85, 247, 0.3), 0 4px 6px -2px rgba(168, 85, 247, 0.2)',
              successBg: '#065F46',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#581C87',
              infoBorder: '#A855F7'
            }
          case 'green':
            return {
              bg: resolveTokenStyle('bg', '#064E3B'),
              text: resolveTokenStyle('text', '#D1FAE5'),
              border: resolveTokenStyle('border', '#10B981'),
              shadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.2)',
              successBg: '#064E3B',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
          case 'red':
            return {
              bg: resolveTokenStyle('bg', '#7F1D1D'),
              text: resolveTokenStyle('text', '#FEE2E2'),
              border: resolveTokenStyle('border', '#EF4444'),
              shadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3), 0 4px 6px -2px rgba(239, 68, 68, 0.2)',
              successBg: '#065F46',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
          case 'orange':
            return {
              bg: resolveTokenStyle('bg', '#7C2D12'),
              text: resolveTokenStyle('text', '#FFEDD5'),
              border: resolveTokenStyle('border', '#F97316'),
              shadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.2)',
              successBg: '#065F46',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
          case 'yellow':
            return {
              bg: resolveTokenStyle('bg', '#713F12'),
              text: resolveTokenStyle('text', '#FEF9C3'),
              border: resolveTokenStyle('border', '#EAB308'),
              shadow: '0 10px 15px -3px rgba(234, 179, 8, 0.3), 0 4px 6px -2px rgba(234, 179, 8, 0.2)',
              successBg: '#065F46',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#713F12',
              warningBorder: '#EAB308',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
          case 'pink':
            return {
              bg: resolveTokenStyle('bg', '#831843'),
              text: resolveTokenStyle('text', '#FCE7F3'),
              border: resolveTokenStyle('border', '#EC4899'),
              shadow: '0 10px 15px -3px rgba(236, 72, 153, 0.3), 0 4px 6px -2px rgba(236, 72, 153, 0.2)',
              successBg: '#065F46',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
          case 'teal':
            return {
              bg: resolveTokenStyle('bg', '#134E4A'),
              text: resolveTokenStyle('text', '#CCFBF1'),
              border: resolveTokenStyle('border', '#14B8A6'),
              shadow: '0 10px 15px -3px rgba(20, 184, 166, 0.3), 0 4px 6px -2px rgba(20, 184, 166, 0.2)',
              successBg: '#064E3B',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#134E4A',
              infoBorder: '#14B8A6'
            }
          default: // dark
            return {
              bg: resolveTokenStyle('bg', '#1F2937'),
              text: resolveTokenStyle('text', '#F9FAFB'),
              border: resolveTokenStyle('border', '#374151'),
              shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
              successBg: '#064E3B',
              successBorder: '#10B981',
              errorBg: '#7F1D1D',
              errorBorder: '#EF4444',
              warningBg: '#78350F',
              warningBorder: '#F59E0B',
              infoBg: '#1E3A8A',
              infoBorder: '#3B82F6'
            }
        }
      }
      
      const toastStyles = getToastStyles()
      
      return (
        <div className="space-y-3 w-full">
          {/* Success Toast */}
          <div 
            className="px-4 py-3 rounded-lg flex items-center gap-3 border-l-4"
            style={{ 
              backgroundColor: toastStyles.successBg,
              color: toastStyles.text,
              borderLeftColor: toastStyles.successBorder,
              boxShadow: toastStyles.shadow,
              ...componentStyle
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#10B981' }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Success</p>
              <p className="text-xs opacity-90 mt-0.5">Your changes have been saved</p>
            </div>
            <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: toastStyles.text }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Error Toast */}
          <div 
            className="px-4 py-3 rounded-lg flex items-center gap-3 border-l-4"
            style={{ 
              backgroundColor: toastStyles.errorBg,
              color: toastStyles.text,
              borderLeftColor: toastStyles.errorBorder,
              boxShadow: toastStyles.shadow,
              ...componentStyle
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#EF4444' }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Error</p>
              <p className="text-xs opacity-90 mt-0.5">Something went wrong</p>
            </div>
            <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: toastStyles.text }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Warning Toast */}
          <div 
            className="px-4 py-3 rounded-lg flex items-center gap-3 border-l-4"
            style={{ 
              backgroundColor: toastStyles.warningBg,
              color: toastStyles.text,
              borderLeftColor: toastStyles.warningBorder,
              boxShadow: toastStyles.shadow,
              ...componentStyle
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Warning</p>
              <p className="text-xs opacity-90 mt-0.5">Please review your changes</p>
            </div>
            <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: toastStyles.text }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Info Toast */}
          <div 
            className="px-4 py-3 rounded-lg flex items-center gap-3 border-l-4"
            style={{ 
              backgroundColor: toastStyles.infoBg,
              color: toastStyles.text,
              borderLeftColor: toastStyles.infoBorder,
              boxShadow: toastStyles.shadow,
              ...componentStyle
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#3B82F6' }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Information</p>
              <p className="text-xs opacity-90 mt-0.5">New update available</p>
            </div>
            <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: toastStyles.text }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )
    case 'Alert':
      return (
        <div className="space-y-2">
          <div 
            className="px-4 py-3 rounded-lg border-l-4"
            style={{ 
              backgroundColor: theme === 'dark' ? '#1E3A8A' : '#DBEAFE',
              borderLeftColor: themeColors.primary,
              color: theme === 'dark' ? '#DBEAFE' : '#1E40AF',
              ...componentStyle
            }}
          >
            <p className="text-sm font-medium">Information</p>
            <p className="text-xs mt-1 opacity-90">This is an informational alert message</p>
          </div>
          <div 
            className="px-4 py-3 rounded-lg border-l-4"
            style={{ 
              backgroundColor: theme === 'dark' ? '#7F1D1D' : '#FEE2E2',
              borderLeftColor: '#EF4444',
              color: theme === 'dark' ? '#FEE2E2' : '#991B1B',
              ...componentStyle
            }}
          >
            <p className="text-sm font-medium">Warning</p>
            <p className="text-xs mt-1 opacity-90">This is a warning alert message</p>
          </div>
        </div>
      )
    case 'Avatar':
      return (
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ 
              backgroundColor: themeColors.primary,
              color: '#FFFFFF'
            }}
          >
            JD
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2"
            style={{ 
              borderColor: themeColors.border,
              color: themeColors.text
            }}
          >
            AB
          </div>
          <div 
            className="w-10 h-10 rounded-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://i.pravatar.cc/150?img=12)'
            }}
          />
        </div>
      )
    case 'Accordion':
      return (
        <div className="space-y-2 w-full">
          <div 
            className="border rounded-lg overflow-hidden"
            style={{ 
              borderColor: themeColors.border,
              backgroundColor: themeColors.bg
            }}
          >
            <button 
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              style={{ color: themeColors.text }}
            >
              <span className="text-sm font-medium">Section 1</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="px-4 pb-3">
              <p className="text-xs opacity-70" style={{ color: themeColors.text }}>
                Accordion content goes here
              </p>
            </div>
          </div>
        </div>
      )
    case 'Progress bar':
    case 'Progress indicator':
      return (
        <div className="space-y-3 w-full">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: '60%',
                backgroundColor: themeColors.primary
              }}
            />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: '100%',
                backgroundColor: themeColors.primary
              }}
            />
          </div>
        </div>
      )
    case 'Spinner':
    case 'Loading Spinner':
      return (
        <div className="flex items-center justify-center">
          <div 
            className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: themeColors.primary }}
          />
        </div>
      )
    case 'Skeleton':
    case 'Skeleton Loader':
      return (
        <div className="space-y-2 w-full">
          <div 
            className="h-4 rounded animate-pulse"
            style={{ backgroundColor: themeColors.border }}
          />
          <div 
            className="h-4 rounded w-5/6 animate-pulse"
            style={{ backgroundColor: themeColors.border }}
          />
          <div 
            className="h-20 rounded animate-pulse"
            style={{ backgroundColor: themeColors.border }}
          />
        </div>
      )
    case 'Separator':
    case 'Divider':
      return (
        <div className="w-full flex items-center gap-2">
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: themeColors.border }}
          />
          <span className="text-xs opacity-60" style={{ color: themeColors.text }}>OR</span>
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: themeColors.border }}
          />
        </div>
      )
    case 'Text input':
    case 'Search input':
      return (
        <div className="space-y-2 w-full">
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full px-3 py-2 text-sm border transition-all"
            style={{ 
              backgroundColor: themeColors.bg,
              borderColor: themeColors.border,
              color: themeColors.text,
              ...componentStyle
            }}
          />
        </div>
      )
    case 'Textarea':
      return (
        <textarea
          placeholder="Enter multi-line text..."
          className="w-full px-3 py-2 text-sm border transition-all resize-none"
          rows={3}
          style={{ 
            backgroundColor: themeColors.bg,
            borderColor: themeColors.border,
            color: themeColors.text,
            ...componentStyle
          }}
        />
      )
    case 'Select':
      return (
        <select
          className="w-full px-3 py-2 text-sm border transition-all"
          style={{ 
            backgroundColor: themeColors.bg,
            borderColor: themeColors.border,
            color: themeColors.text,
            ...componentStyle
          }}
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      )
    case 'Radio button':
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="radio-demo"
              className="w-4 h-4" 
              style={{ 
                accentColor: themeColors.primary
              }} 
            />
            <span className="text-sm">Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="radio-demo"
              checked
              className="w-4 h-4" 
              style={{ 
                accentColor: themeColors.primary
              }} 
            />
            <span className="text-sm">Option 2</span>
          </label>
        </div>
      )
    case 'Slider':
      return (
        <div className="w-full px-2">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${themeColors.primary} 50%, ${themeColors.border} 50%)`
            }}
          />
        </div>
      )
    case 'Breadcrumbs':
      return (
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="opacity-60 hover:opacity-100" style={{ color: themeColors.text }}>Home</a>
          <span className="opacity-40" style={{ color: themeColors.text }}>/</span>
          <a href="#" className="opacity-60 hover:opacity-100" style={{ color: themeColors.text }}>Category</a>
          <span className="opacity-40" style={{ color: themeColors.text }}>/</span>
          <span style={{ color: themeColors.text }}>Current</span>
        </nav>
      )
    case 'Tabs':
      return (
        <div className="w-full">
          <div className="flex border-b" style={{ borderColor: themeColors.border }}>
            <button 
              className="px-4 py-2 text-sm font-medium border-b-2"
              style={{ 
                borderBottomColor: themeColors.primary,
                color: themeColors.primary
              }}
            >
              Tab 1
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100"
              style={{ color: themeColors.text }}
            >
              Tab 2
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100"
              style={{ color: themeColors.text }}
            >
              Tab 3
            </button>
          </div>
        </div>
      )
    case 'Pagination':
      return (
        <div className="flex items-center gap-1">
          <button 
            className="px-3 py-1 text-sm border rounded"
            style={{ 
              borderColor: themeColors.border,
              color: themeColors.text
            }}
          >
            Previous
          </button>
          <button 
            className="px-3 py-1 text-sm rounded"
            style={{ 
              backgroundColor: themeColors.primary,
              color: '#FFFFFF'
            }}
          >
            1
          </button>
          <button 
            className="px-3 py-1 text-sm border rounded"
            style={{ 
              borderColor: themeColors.border,
              color: themeColors.text
            }}
          >
            2
          </button>
          <button 
            className="px-3 py-1 text-sm border rounded"
            style={{ 
              borderColor: themeColors.border,
              color: themeColors.text
            }}
          >
            3
          </button>
          <button 
            className="px-3 py-1 text-sm border rounded"
            style={{ 
              borderColor: themeColors.border,
              color: themeColors.text
            }}
          >
            Next
          </button>
        </div>
      )
    default:
      return (
        <div 
          className="p-4 border text-center"
          style={{ 
            backgroundColor: themeColors.bg,
            borderColor: themeColors.border,
            color: themeColors.text,
            ...componentStyle
          }}
        >
          <p className="text-sm opacity-60">{componentName} Preview</p>
        </div>
      )
  }
}

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

export default function SystemComponents({ designSystemName, availableSystems, onSwitchSystem }: SystemComponentsProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark')
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [componentStyles, setComponentStyles] = useState<Record<string, ComponentStyles>>({})
  const [tokens, setTokens] = useState<any>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    components: true,
    controls: true,
    modules: false,
    video: false,
    colors: false,
    typography: false,
    other: true,
  })
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load tokens from localStorage
  useEffect(() => {
    const loadTokens = () => {
      const saved = localStorage.getItem('dsm-tokens-v2')
      if (saved) {
        try {
          setTokens(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse tokens:', e)
        }
      }
    }
    loadTokens()
    
    // Listen for storage changes (works across tabs/windows)
    window.addEventListener('storage', (e) => {
      if (e.key === 'dsm-tokens-v2') loadTokens()
    })
    
    // Listen for custom event (works in same window)
    window.addEventListener('dsm-tokens-updated', loadTokens)
    
    return () => {
      window.removeEventListener('storage', loadTokens)
      window.removeEventListener('dsm-tokens-updated', loadTokens)
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
      {/* Header */}
      <div className="px-8 py-8 flex items-center justify-between border-b border-gray-800/50 bg-gray-950/50 backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">Component Gallery</h1>
          <p className="text-gray-400 mb-1">Viewing: <span className="text-palette-cornflower font-medium">{designSystemName}</span></p>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Organized by architecture: <span className="text-indigo-400 font-medium">Components</span> (atomic) → <span className="text-palette-cornflower font-medium">Controls</span> (interactive) → <span className="text-green-400 font-medium">Modules</span> (composed) → <span className="text-purple-400 font-medium">Video</span> (specialized)
          </p>
        </div>
      </div>

      {/* Components by Category */}
      <div className="px-8 pb-16 pt-8 space-y-12">
        {(Object.keys(COMPONENT_CATEGORIES) as ComponentCategory[]).map((categoryKey) => {
          const category = COMPONENT_CATEGORIES[categoryKey]
          const isExpanded = expandedSections[categoryKey] !== false
          
          return (
            <div key={categoryKey} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">{category.title}</h2>
                    <span className="px-2.5 py-0.5 bg-gray-800/50 text-gray-300 text-xs font-semibold rounded-md border border-gray-700/50">
                      {category.components.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">{category.description}</p>
                </div>
                <button
                  onClick={() => setExpandedSections({ ...expandedSections, [categoryKey]: !isExpanded })}
                  className="ml-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <svg 
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
                  {category.components.map((component) => (
                    <div 
                      key={component.name} 
                      className="bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all group backdrop-blur-sm"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-base font-semibold text-white leading-tight">{component.name}</h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">{component.description}</p>
                        
                        {/* Preview Area */}
                        <div 
                          className="mb-4 p-5 rounded-md border border-gray-800/50 bg-gray-950/50 transition-all min-h-[140px] flex items-center justify-center"
                        >
                          <ComponentPreview 
                            componentName={
                              component.name.includes('Button') && !component.name.includes('group') ? 'Button' : 
                              component.name.includes('Input') && !component.name.includes('Search') && !component.name.includes('Text') ? 'Input' : 
                              component.name.includes('Text input') || component.name.includes('Search input') ? 'Text input' :
                              component.name.includes('Card') ? 'Card' : 
                              component.name.includes('Badge') || component.name.includes('Tag') ? 'Badge' :
                              component.name.includes('Checkbox') ? 'Checkbox' :
                              component.name.includes('Switch') || component.name.includes('Toggle') ? 'Switch' :
                              component.name.includes('Toast') ? 'Toast' :
                              component.name.includes('Alert') ? 'Alert' :
                              component.name.includes('Avatar') ? 'Avatar' :
                              component.name.includes('Accordion') ? 'Accordion' :
                              component.name.includes('Progress bar') ? 'Progress bar' :
                              component.name.includes('Progress indicator') ? 'Progress indicator' :
                              component.name.includes('Spinner') || component.name.includes('Loading') ? 'Spinner' :
                              component.name.includes('Skeleton') ? 'Skeleton' :
                              component.name.includes('Separator') || component.name.includes('Divider') ? 'Separator' :
                              component.name.includes('Textarea') ? 'Textarea' :
                              component.name.includes('Select') && !component.name.includes('Multi') ? 'Select' :
                              component.name.includes('Radio') ? 'Radio button' :
                              component.name.includes('Slider') ? 'Slider' :
                              component.name.includes('Breadcrumb') ? 'Breadcrumbs' :
                              component.name.includes('Tab') ? 'Tabs' :
                              component.name.includes('Pagination') ? 'Pagination' :
                              component.name
                            } 
                            theme={selectedTheme}
                            styles={componentStyles[component.name]}
                            tokens={tokens}
                          />
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2 pt-2 border-t border-gray-800/30">
                          <button className="flex-1 px-3 py-2 text-xs font-medium bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-md transition-all">
                            View
                          </button>
                          <button 
                            onClick={() => {
                              setEditingComponent(component.name)
                              if (!componentStyles[component.name]) {
                                setComponentStyles({
                                  ...componentStyles,
                                  [component.name]: {
                                    radius: 1.25,
                                    shadow: {
                                      xOffset: 4,
                                      yOffset: 4,
                                      blur: 0,
                                      spread: 0,
                                      color: '#000000',
                                    },
                                  },
                                })
                              }
                            }}
                            className="flex-1 px-3 py-2 text-xs font-medium bg-palette-cornflower/20 hover:bg-palette-cornflower/30 text-palette-cornflower rounded-md transition-all"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Theme Dropdown - Sticky Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 shadow-xl hover:border-palette-slate/50 transition-all flex items-center gap-2 group"
          >
            <div 
              className="w-4 h-4 rounded-full border-2"
              style={{ 
                backgroundColor: THEMES.find(t => t.id === selectedTheme)?.colors.primary || '#715AFF',
                borderColor: THEMES.find(t => t.id === selectedTheme)?.colors.primary || '#715AFF'
              }}
            />
            <span className="text-sm text-white font-medium">
              {THEMES.find(t => t.id === selectedTheme)?.name || 'Dark'} Theme
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
              className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden min-w-[200px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setSelectedTheme(theme.id)
                      setIsThemeDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                      selectedTheme === theme.id
                        ? 'bg-palette-slate/20 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: theme.colors.primary,
                        borderColor: theme.colors.primary
                      }}
                    />
                    <span className="text-sm font-medium">{theme.name}</span>
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
