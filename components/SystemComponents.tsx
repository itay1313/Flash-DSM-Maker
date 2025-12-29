'use client'

import { useState, useEffect, useRef } from 'react'

interface SystemComponentsProps {
  designSystemName: string
  availableSystems: { id: string; projectName: string }[]
  onSwitchSystem: (id: string) => void
}

type Theme = 'material' | 'ant' | 'chakra' | 'tailwind' | 'bootstrap' | 'custom'

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
}

// Get primary color from tokens or use default
const getPrimaryColor = (tokens: any): string => {
  if (!tokens) return '#715AFF'
  
  const allTokens = Object.values(tokens).flatMap((layer: any) => 
    layer.flatMap((group: any) => group.tokens)
  )
  
  const accentPrimary = allTokens.find((token: any) => 
    token.name === 'accent-primary' || token.name === 'primary'
  )
  
  if (accentPrimary) {
    return accentPrimary.value.startsWith('#') 
      ? accentPrimary.value 
      : accentPrimary.value.startsWith('var(') 
        ? `var(--${accentPrimary.name})` 
        : accentPrimary.value
  }
  
  return '#715AFF'
}

const THEMES: { 
  id: Theme
  name: string
  primaryColor: string // Will be set dynamically from tokens
  styles: ThemeStyle
}[] = [
  {
    id: 'material',
    name: 'Material Design',
    primaryColor: '#715AFF', // Will be overridden by getPrimaryColor
    styles: {
      padding: { sm: '8px', md: '12px', lg: '16px' },
      border: { width: '0px', style: 'none', radius: '4px' },
      shadow: { sm: '0 1px 3px rgba(0,0,0,0.12)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 20px rgba(0,0,0,0.15)', none: 'none' },
      spacing: { gap: '8px', margin: '16px' },
      position: { toast: 'bottom-right' },
      variant: 'elevated'
    }
  },
  {
    id: 'ant',
    name: 'Ant Design',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '6px', md: '10px', lg: '14px' },
      border: { width: '1px', style: 'solid', radius: '6px' },
      shadow: { sm: '0 2px 8px rgba(0,0,0,0.15)', md: '0 4px 12px rgba(0,0,0,0.15)', lg: '0 8px 24px rgba(0,0,0,0.12)', none: 'none' },
      spacing: { gap: '12px', margin: '12px' },
      position: { toast: 'top-right' },
      variant: 'bordered'
    }
  },
  {
    id: 'chakra',
    name: 'Chakra UI',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '10px', md: '14px', lg: '18px' },
      border: { width: '1px', style: 'solid', radius: '8px' },
      shadow: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.07)', lg: '0 10px 15px rgba(0,0,0,0.1)', none: 'none' },
      spacing: { gap: '16px', margin: '20px' },
      position: { toast: 'center' },
      variant: 'minimal'
    }
  },
  {
    id: 'tailwind',
    name: 'Tailwind / Headless',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '8px', md: '12px', lg: '16px' },
      border: { width: '0px', style: 'none', radius: '8px' },
      shadow: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 15px rgba(0,0,0,0.1)', none: 'none' },
      spacing: { gap: '8px', margin: '12px' },
      position: { toast: 'top-center' },
      variant: 'minimal'
    }
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '4px', md: '8px', lg: '12px' },
      border: { width: '2px', style: 'solid', radius: '0px' },
      shadow: { sm: '0 1px 3px rgba(0,0,0,0.12)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 20px rgba(0,0,0,0.15)', none: 'none' },
      spacing: { gap: '8px', margin: '16px' },
      position: { toast: 'bottom-left' },
      variant: 'bordered'
    }
  },
  {
    id: 'custom',
    name: 'Custom',
    primaryColor: '#715AFF',
    styles: {
      padding: { sm: '10px', md: '14px', lg: '18px' },
      border: { width: '1px', style: 'dashed', radius: '12px' },
      shadow: { sm: '0 2px 4px rgba(0,0,0,0.1)', md: '0 4px 8px rgba(0,0,0,0.12)', lg: '0 8px 16px rgba(0,0,0,0.15)', none: 'none' },
      spacing: { gap: '10px', margin: '14px' },
      position: { toast: 'top-left' },
      variant: 'outlined'
    }
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
  // Get current theme styles
  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0]
  const themeStyles = currentTheme.styles
  
  // Get primary color from tokens or use default
  const primaryColor = getPrimaryColor(tokens)
  
  // Base colors (consistent across all themes - dark mode)
  const baseColors = {
    bg: '#111827',
    text: '#F9FAFB',
    border: '#374151',
    bgLight: '#FFFFFF',
    textLight: '#111827',
    borderLight: '#E5E7EB'
  }
  
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
      return tokenWithBinding.value.startsWith('var(') ? `var(--${tokenWithBinding.name})` : tokenWithBinding.value
    }
    
    return defaultValue
  }

  // Apply theme-specific styles
  const getThemeStyle = () => {
    const borderWidth = themeStyles.border.width
    const borderStyle = themeStyles.border.style
    const borderRadius = resolveTokenStyle('radius', themeStyles.border.radius)
    
    // Choose shadow based on variant
    let shadow = themeStyles.shadow.none
    if (themeStyles.variant === 'elevated') {
      shadow = themeStyles.shadow.md
    } else if (themeStyles.variant === 'filled') {
      shadow = themeStyles.shadow.sm
    } else if (themeStyles.variant === 'bordered' && borderWidth === '0px') {
      shadow = themeStyles.shadow.sm
    }
    
    return {
      padding: themeStyles.padding.md,
      borderWidth,
      borderStyle,
      borderRadius,
      boxShadow: shadow,
      gap: themeStyles.spacing.gap
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
  }

  switch (componentName) {
    case 'Button':
      const buttonPadding = themeStyles.padding.md
      const buttonBorder = themeStyles.variant === 'outlined' || themeStyles.variant === 'bordered'
        ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`
        : 'none'
      
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <button 
            className="font-medium text-sm transition-all"
            style={{ 
              padding: buttonPadding,
              backgroundColor: themeStyles.variant === 'filled' || themeStyles.variant === 'elevated' 
                ? primaryColor 
                : 'transparent',
              color: themeStyles.variant === 'filled' || themeStyles.variant === 'elevated'
                ? '#FFFFFF'
                : primaryColor,
              border: buttonBorder,
              ...componentStyle
            }}
          >
            Primary Button
          </button>
          <button 
            className="font-medium text-sm transition-all"
            style={{ 
              padding: buttonPadding,
              backgroundColor: 'transparent',
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              ...componentStyle
            }}
          >
            Secondary Button
          </button>
        </div>
      )
    case 'Input':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full text-sm transition-all"
            style={{ 
              padding: themeStyles.padding.md,
              backgroundColor: baseColors.bg,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              ...componentStyle
            }}
          />
          <input
            type="text"
            placeholder="Focused state"
            className="w-full text-sm transition-all"
            style={{ 
              padding: themeStyles.padding.md,
              backgroundColor: baseColors.bg,
              border: `2px solid ${primaryColor}`,
              color: baseColors.text,
              ...componentStyle
            }}
          />
        </div>
      )
    case 'Card':
      return (
        <div 
          style={{ 
            padding: themeStyles.padding.lg,
            backgroundColor: baseColors.bg,
            border: themeStyles.variant === 'bordered' || themeStyles.variant === 'outlined'
              ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`
              : 'none',
            color: baseColors.text,
            ...componentStyle
          }}
        >
          <h4 className="font-semibold mb-2">Card Title</h4>
          <p className="text-sm opacity-80">Card content goes here</p>
        </div>
      )
    case 'Badge':
      return (
        <div style={{ display: 'flex', gap: themeStyle.gap, flexWrap: 'wrap' }}>
          <span 
            className="text-xs font-medium"
            style={{ 
              padding: themeStyles.padding.sm,
              backgroundColor: themeStyles.variant === 'filled' ? primaryColor : 'transparent',
              color: themeStyles.variant === 'filled' ? '#FFFFFF' : primaryColor,
              border: themeStyles.variant === 'outlined' || themeStyles.variant === 'bordered'
                ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${primaryColor}`
                : 'none',
              ...componentStyle
            }}
          >
            New
          </span>
          <span 
            className="text-xs font-medium"
            style={{ 
              padding: themeStyles.padding.sm,
              backgroundColor: 'transparent',
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              ...componentStyle
            }}
          >
            Default
          </span>
        </div>
      )
    case 'Checkbox':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4" 
              style={{ 
                accentColor: primaryColor,
                borderRadius: themeStyle.borderRadius
              }} 
            />
            <span className="text-sm" style={{ color: baseColors.text }}>Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked 
              className="w-4 h-4" 
              style={{ 
                accentColor: primaryColor,
                borderRadius: themeStyle.borderRadius
              }} 
            />
            <span className="text-sm" style={{ color: baseColors.text }}>Option 2</span>
          </label>
        </div>
      )
    case 'Switch':
    case 'Toggle':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div 
                className="w-10 h-6 transition-all"
                style={{ 
                  backgroundColor: baseColors.border,
                  borderRadius: themeStyle.borderRadius,
                  ...(styles?.shadow ? { boxShadow: componentStyle.boxShadow } : {})
                }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all translate-x-0.5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-sm" style={{ color: baseColors.text }}>Toggle Off</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked className="sr-only" />
              <div 
                className="w-10 h-6 transition-all"
                style={{ 
                  backgroundColor: primaryColor,
                  borderRadius: themeStyle.borderRadius,
                  ...(styles?.shadow ? { boxShadow: componentStyle.boxShadow } : {})
                }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all translate-x-5 translate-y-0.5"></div>
              </div>
            </div>
            <span className="text-sm" style={{ color: baseColors.text }}>Toggle On</span>
          </label>
        </div>
      )
    case 'Toast':
      // Get toast position from theme
      const toastPosition = themeStyles.position.toast
      
      // Get position styles for container
      const getPositionStyles = (): React.CSSProperties => {
        const base: React.CSSProperties = { position: 'relative', width: '100%' }
        switch (toastPosition) {
          case 'top-left':
            return { ...base, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }
          case 'top-right':
            return { ...base, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }
          case 'top-center':
            return { ...base, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }
          case 'bottom-left':
            return { ...base, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }
          case 'bottom-right':
            return { ...base, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }
          case 'bottom-center':
            return { ...base, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }
          case 'center':
            return { ...base, display: 'flex', justifyContent: 'center', alignItems: 'center' }
          default:
            return { ...base, display: 'flex', flexDirection: 'column', gap: themeStyle.gap }
        }
      }
      
      // Get toast variant based on theme variant
      const getToastVariant = () => {
        switch (themeStyles.variant) {
          case 'elevated':
            return 'elevated' // Material Design style
          case 'bordered':
            return 'bordered' // Ant Design style
          case 'outlined':
            return 'outlined' // Custom style
          case 'minimal':
            return 'minimal' // Chakra/Tailwind style
          case 'filled':
            return 'filled' // Filled style
          default:
            return 'minimal'
        }
      }
      
      const toastVariant = getToastVariant()
      
      // Base toast styles using theme
      const toastBaseStyle = {
        padding: themeStyles.padding.md,
        borderRadius: themeStyle.borderRadius,
        border: themeStyles.variant === 'bordered' || themeStyles.variant === 'outlined'
          ? `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`
          : 'none',
        boxShadow: themeStyles.variant === 'elevated' ? themeStyle.boxShadow : themeStyles.shadow.sm,
        backgroundColor: baseColors.bg,
        color: baseColors.text,
        maxWidth: '400px',
        width: '100%'
      }
      
      // Remove boxShadow from componentStyle to avoid duplication
      const { boxShadow: _, ...toastComponentStyle } = componentStyle
      
      // Render toast based on variant
      const renderToast = (type: 'success' | 'error', message: string, description?: string) => {
        const iconColor = type === 'success' ? '#10B981' : '#EF4444'
        const borderLeftColor = type === 'success' ? '#10B981' : '#EF4444'
        
        if (toastVariant === 'elevated') {
          // Material Design - Elevated with shadow
          return (
            <div 
              className="flex items-center gap-3"
              style={{ 
                ...toastBaseStyle,
                ...toastComponentStyle
              }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconColor }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {type === 'success' ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{message}</p>
                {description && <p className="text-xs opacity-90 mt-0.5">{description}</p>}
              </div>
              <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: baseColors.text }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        } else if (toastVariant === 'bordered') {
          // Ant Design - Bordered style
          return (
            <div 
              className="flex items-center gap-3"
              style={{ 
                ...toastBaseStyle,
                ...toastComponentStyle
              }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconColor }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {type === 'success' ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{message}</p>
                {description && <p className="text-xs opacity-90 mt-0.5">{description}</p>}
              </div>
              <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: baseColors.text }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        } else if (toastVariant === 'outlined') {
          // Outlined style with border-left
          return (
            <div 
              className="flex items-center gap-3 border-l-4"
              style={{ 
                ...toastBaseStyle,
                borderLeftColor: borderLeftColor,
                ...toastComponentStyle
              }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconColor }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {type === 'success' ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{message}</p>
                {description && <p className="text-xs opacity-90 mt-0.5">{description}</p>}
              </div>
              <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: baseColors.text }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        } else {
          // Minimal style (default)
          return (
            <div 
              className="flex items-center gap-3"
              style={{ 
                ...toastBaseStyle,
                ...toastComponentStyle
              }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconColor }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {type === 'success' ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{message}</p>
                {description && <p className="text-xs opacity-90 mt-0.5">{description}</p>}
              </div>
              <button className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: baseColors.text }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        }
      }
      
      return (
        <div style={getPositionStyles()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
            {renderToast('success', 'Success', 'Your changes have been saved')}
            {renderToast('error', 'Error', 'Something went wrong')}
          </div>
        </div>
      )
    case 'Alert':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <div 
            className="rounded-lg border-l-4"
            style={{ 
              padding: themeStyles.padding.md,
              backgroundColor: baseColors.bg,
              borderLeftColor: primaryColor,
              color: baseColors.text,
              ...componentStyle
            }}
          >
            <p className="text-sm font-medium">Information</p>
            <p className="text-xs mt-1 opacity-90">This is an informational alert message</p>
          </div>
          <div 
            className="rounded-lg border-l-4"
            style={{ 
              padding: themeStyles.padding.md,
              backgroundColor: baseColors.bg,
              borderLeftColor: '#EF4444',
              color: baseColors.text,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: themeStyle.gap }}>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ 
              backgroundColor: primaryColor,
              color: '#FFFFFF'
            }}
          >
            JD
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2"
            style={{ 
              borderColor: baseColors.border,
              color: baseColors.text
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <div 
            className="rounded-lg overflow-hidden"
            style={{ 
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              backgroundColor: baseColors.bg,
              borderRadius: themeStyle.borderRadius
            }}
          >
            <button 
              className="w-full flex items-center justify-between text-left"
              style={{ 
                padding: themeStyles.padding.md,
                color: baseColors.text 
              }}
            >
              <span className="text-sm font-medium">Section 1</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div style={{ padding: `0 ${themeStyles.padding.md} ${themeStyles.padding.md}` }}>
              <p className="text-xs opacity-70" style={{ color: baseColors.text }}>
                Accordion content goes here
              </p>
            </div>
          </div>
        </div>
      )
    case 'Progress bar':
    case 'Progress indicator':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: '60%',
                backgroundColor: primaryColor
              }}
            />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: '100%',
                backgroundColor: primaryColor
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
            style={{ borderColor: primaryColor }}
          />
        </div>
      )
    case 'Skeleton':
    case 'Skeleton Loader':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <div 
            className="h-4 rounded animate-pulse"
            style={{ backgroundColor: baseColors.border }}
          />
          <div 
            className="h-4 rounded w-5/6 animate-pulse"
            style={{ backgroundColor: baseColors.border }}
          />
          <div 
            className="h-20 rounded animate-pulse"
            style={{ backgroundColor: baseColors.border }}
          />
        </div>
      )
    case 'Separator':
    case 'Divider':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: themeStyle.gap, width: '100%' }}>
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: baseColors.border }}
          />
          <span className="text-xs opacity-60" style={{ color: baseColors.text }}>OR</span>
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: baseColors.border }}
          />
        </div>
      )
    case 'Text input':
    case 'Search input':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap, width: '100%' }}>
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full text-sm transition-all"
            style={{ 
              padding: themeStyles.padding.md,
              backgroundColor: baseColors.bg,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              ...componentStyle
            }}
          />
        </div>
      )
    case 'Textarea':
      return (
        <textarea
          placeholder="Enter multi-line text..."
          className="w-full text-sm transition-all resize-none"
          rows={3}
          style={{ 
            padding: themeStyles.padding.md,
            backgroundColor: baseColors.bg,
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
            color: baseColors.text,
            ...componentStyle
          }}
        />
      )
    case 'Select':
      return (
        <select
          className="w-full text-sm transition-all"
          style={{ 
            padding: themeStyles.padding.md,
            backgroundColor: baseColors.bg,
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
            color: baseColors.text,
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: themeStyle.gap }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="radio-demo"
              className="w-4 h-4" 
              style={{ 
                accentColor: primaryColor
              }} 
            />
            <span className="text-sm" style={{ color: baseColors.text }}>Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="radio-demo"
              checked
              className="w-4 h-4" 
              style={{ 
                accentColor: primaryColor
              }} 
            />
            <span className="text-sm" style={{ color: baseColors.text }}>Option 2</span>
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
              background: `linear-gradient(to right, ${primaryColor} 50%, ${baseColors.border} 50%)`
            }}
          />
        </div>
      )
    case 'Breadcrumbs':
      return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: themeStyle.gap }} className="text-sm">
          <a href="#" className="opacity-60 hover:opacity-100" style={{ color: baseColors.text }}>Home</a>
          <span className="opacity-40" style={{ color: baseColors.text }}>/</span>
          <a href="#" className="opacity-60 hover:opacity-100" style={{ color: baseColors.text }}>Category</a>
          <span className="opacity-40" style={{ color: baseColors.text }}>/</span>
          <span style={{ color: baseColors.text }}>Current</span>
        </nav>
      )
    case 'Tabs':
      return (
        <div className="w-full">
          <div className="flex border-b" style={{ borderColor: baseColors.border }}>
            <button 
              className="text-sm font-medium border-b-2"
              style={{ 
                padding: themeStyles.padding.md,
                borderBottomColor: primaryColor,
                color: primaryColor
              }}
            >
              Tab 1
            </button>
            <button 
              className="text-sm font-medium opacity-60 hover:opacity-100"
              style={{ 
                padding: themeStyles.padding.md,
                color: baseColors.text 
              }}
            >
              Tab 2
            </button>
            <button 
              className="text-sm font-medium opacity-60 hover:opacity-100"
              style={{ 
                padding: themeStyles.padding.md,
                color: baseColors.text 
              }}
            >
              Tab 3
            </button>
          </div>
        </div>
      )
    case 'Pagination':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: themeStyle.gap }}>
          <button 
            className="text-sm rounded"
            style={{ 
              padding: themeStyles.padding.sm,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              borderRadius: themeStyle.borderRadius
            }}
          >
            Previous
          </button>
          <button 
            className="text-sm rounded"
            style={{ 
              padding: themeStyles.padding.sm,
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              borderRadius: themeStyle.borderRadius
            }}
          >
            1
          </button>
          <button 
            className="text-sm rounded"
            style={{ 
              padding: themeStyles.padding.sm,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              borderRadius: themeStyle.borderRadius
            }}
          >
            2
          </button>
          <button 
            className="text-sm rounded"
            style={{ 
              padding: themeStyles.padding.sm,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              borderRadius: themeStyle.borderRadius
            }}
          >
            3
          </button>
          <button 
            className="text-sm rounded"
            style={{ 
              padding: themeStyles.padding.sm,
              border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
              color: baseColors.text,
              borderRadius: themeStyle.borderRadius
            }}
          >
            Next
          </button>
        </div>
      )
    default:
      return (
        <div 
          className="text-center"
          style={{ 
            padding: themeStyles.padding.lg,
            backgroundColor: baseColors.bg,
            border: `${themeStyle.borderWidth} ${themeStyle.borderStyle} ${baseColors.border}`,
            color: baseColors.text,
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
  const [selectedTheme, setSelectedTheme] = useState<Theme>('material')
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
                backgroundColor: getPrimaryColor(tokens),
                borderColor: getPrimaryColor(tokens)
              }}
            />
            <span className="text-sm text-white font-medium">
              {THEMES.find(t => t.id === selectedTheme)?.name || 'Material Design'} Theme
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
                        backgroundColor: getPrimaryColor(tokens),
                        borderColor: getPrimaryColor(tokens)
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
