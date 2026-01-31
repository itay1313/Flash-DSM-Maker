'use client'

import { useState, useEffect } from 'react'
import { FlashButton } from '../ui/FlashButton'
import { Token, TokenCategory, ColorGroup, TokenStatus } from '@/lib/types/tokens'
import { exportAllFormats } from '@/lib/utils/tokenExport'
import { detectTokenUsage } from '@/lib/utils/tokenUsage'
import NewTokenModal from '../NewTokenModal'

// Local assets from public/assets/design-system/
const imgArrowDown = "/assets/design-system/keyboard_arrow_down.svg"
const imgSearch = "/assets/design-system/search.svg"
const imgCopy = "/assets/design-system/copy_icon.svg"
const imgSun = "/assets/design-system/clear_day.svg"
const imgMoon = "/assets/design-system/bedtime.svg"
const imgDoubleArrowRight = "/assets/design-system/Arrow_icon.svg"
const imgAdd = "/assets/design-system/add.svg"
const imgNoteStackAdd = "/assets/design-system/note_stack_add.svg"
const imgArrowBack = "/assets/design-system/arrow_back.svg"
const imgViewGrid = "/assets/design-system/view_comfy_alt.svg"
const imgViewList = "/assets/design-system/format_list_bulleted.svg"

const getDefaultColorGroups = (): ColorGroup[] => [
  {
    name: 'Primary Colors',
    tokens: [
      { name: 'color-primary', value: '#0886E5', type: 'color', category: 'colors', status: 'active', description: 'Primary brand color', usedBy: ['button', 'chip'] },
      { name: 'color-primary-hover', value: '#0470C2', type: 'color', category: 'colors', status: 'active', description: 'Primary hover state', usedBy: ['button'] },
      { name: 'color-primary-active', value: '#035A9E', type: 'color', category: 'colors', status: 'active', description: 'Primary active state', usedBy: [] },
      { name: 'color-primary-disabled', value: '#6BB3E8', type: 'color', category: 'colors', status: 'active', description: 'Primary disabled state', usedBy: [] },
      { name: 'color-primary-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on primary', usedBy: ['button'] },
    ]
  },
  {
    name: 'Secondary Colors',
    tokens: [
      { name: 'color-secondary', value: '#6366F1', type: 'color', category: 'colors', status: 'active', description: 'Secondary brand color', usedBy: [] },
      { name: 'color-secondary-hover', value: '#4F46E5', type: 'color', category: 'colors', status: 'active', description: 'Secondary hover state', usedBy: [] },
      { name: 'color-secondary-active', value: '#4338CA', type: 'color', category: 'colors', status: 'active', description: 'Secondary active state', usedBy: [] },
      { name: 'color-secondary-disabled', value: '#A5B4FC', type: 'color', category: 'colors', status: 'active', description: 'Secondary disabled state', usedBy: [] },
      { name: 'color-secondary-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on secondary', usedBy: [] },
    ]
  },
  {
    name: 'Background',
    tokens: [
      { name: 'color-bg', value: '#0D0D0D', type: 'color', category: 'colors', status: 'active', description: 'Main background', usedBy: ['input', 'icon-button'] },
      { name: 'color-bg-subtle', value: '#191919', type: 'color', category: 'colors', status: 'active', description: 'Subtle background', usedBy: [] },
      { name: 'color-bg-muted', value: '#252525', type: 'color', category: 'colors', status: 'active', description: 'Muted background', usedBy: [] },
      { name: 'color-bg-inverted', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Inverted background', usedBy: [] },
    ]
  },
  {
    name: 'Surface',
    tokens: [
      { name: 'color-surface', value: '#191919', type: 'color', category: 'colors', status: 'active', description: 'Surface background', usedBy: [] },
      { name: 'color-surface-hover', value: '#252525', type: 'color', category: 'colors', status: 'active', description: 'Surface hover state', usedBy: [] },
      { name: 'color-surface-active', value: '#313131', type: 'color', category: 'colors', status: 'active', description: 'Surface active state', usedBy: [] },
      { name: 'color-surface-elevated', value: '#2A2A2A', type: 'color', category: 'colors', status: 'active', description: 'Elevated surface', usedBy: [] },
    ]
  },
  {
    name: 'Text',
    tokens: [
      { name: 'color-text', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Primary text', usedBy: [] },
      { name: 'color-text-muted', value: '#9CA3AF', type: 'color', category: 'colors', status: 'active', description: 'Muted text', usedBy: [] },
      { name: 'color-text-subtle', value: '#6B7280', type: 'color', category: 'colors', status: 'active', description: 'Subtle text', usedBy: [] },
      { name: 'color-text-inverted', value: '#0D0D0D', type: 'color', category: 'colors', status: 'active', description: 'Text on light bg', usedBy: [] },
      { name: 'color-text-disabled', value: '#4B5563', type: 'color', category: 'colors', status: 'active', description: 'Disabled text', usedBy: [] },
    ]
  },
  {
    name: 'Border',
    tokens: [
      { name: 'color-border', value: '#313131', type: 'color', category: 'colors', status: 'active', description: 'Default border', usedBy: ['icon-button'] },
      { name: 'color-border-subtle', value: '#252525', type: 'color', category: 'colors', status: 'active', description: 'Subtle border', usedBy: [] },
      { name: 'color-border-strong', value: '#4A4A4A', type: 'color', category: 'colors', status: 'active', description: 'Strong border', usedBy: [] },
    ]
  },
  {
    name: 'State',
    tokens: [
      { name: 'color-success', value: '#10B981', type: 'color', category: 'colors', status: 'active', description: 'Success state', usedBy: [] },
      { name: 'color-success-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on success', usedBy: [] },
      { name: 'color-warning', value: '#F59E0B', type: 'color', category: 'colors', status: 'active', description: 'Warning state', usedBy: [] },
      { name: 'color-warning-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on warning', usedBy: [] },
      { name: 'color-error', value: '#EF4444', type: 'color', category: 'colors', status: 'active', description: 'Error state', usedBy: [] },
      { name: 'color-error-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on error', usedBy: [] },
      { name: 'color-info', value: '#3B82F6', type: 'color', category: 'colors', status: 'active', description: 'Info state', usedBy: [] },
      { name: 'color-info-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on info', usedBy: [] },
    ]
  },
  {
    name: 'Focus and Interaction',
    tokens: [
      { name: 'color-focus', value: '#0886E5', type: 'color', category: 'colors', status: 'active', description: 'Focus indicator', usedBy: [] },
      { name: 'color-focus-ring', value: 'rgba(8, 134, 229, 0.3)', type: 'color', category: 'colors', status: 'active', description: 'Focus ring', usedBy: [] },
      { name: 'color-overlay', value: 'rgba(0, 0, 0, 0.5)', type: 'color', category: 'colors', status: 'active', description: 'Overlay backdrop', usedBy: [] },
    ]
  },
  {
    name: 'Utility',
    tokens: [
      { name: 'color-link', value: '#0886E5', type: 'color', category: 'colors', status: 'active', description: 'Link color', usedBy: [] },
      { name: 'color-link-hover', value: '#0470C2', type: 'color', category: 'colors', status: 'active', description: 'Link hover', usedBy: [] },
      { name: 'color-selection', value: 'rgba(8, 134, 229, 0.2)', type: 'color', category: 'colors', status: 'active', description: 'Text selection', usedBy: [] },
    ]
  }
]

const getLightModeColorGroups = (): ColorGroup[] => [
  {
    name: 'Primary Colors',
    tokens: [
      { name: 'color-primary', value: '#0886E5', type: 'color', category: 'colors', status: 'active', description: 'Primary brand color', usedBy: ['button', 'chip'] },
      { name: 'color-primary-hover', value: '#0470C2', type: 'color', category: 'colors', status: 'active', description: 'Primary hover state', usedBy: ['button'] },
      { name: 'color-primary-active', value: '#035A9E', type: 'color', category: 'colors', status: 'active', description: 'Primary active state', usedBy: [] },
      { name: 'color-primary-disabled', value: '#B3D9F2', type: 'color', category: 'colors', status: 'active', description: 'Primary disabled state', usedBy: [] },
      { name: 'color-primary-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on primary', usedBy: ['button'] },
    ]
  },
  {
    name: 'Secondary Colors',
    tokens: [
      { name: 'color-secondary', value: '#6366F1', type: 'color', category: 'colors', status: 'active', description: 'Secondary brand color', usedBy: [] },
      { name: 'color-secondary-hover', value: '#4F46E5', type: 'color', category: 'colors', status: 'active', description: 'Secondary hover state', usedBy: [] },
      { name: 'color-secondary-active', value: '#4338CA', type: 'color', category: 'colors', status: 'active', description: 'Secondary active state', usedBy: [] },
      { name: 'color-secondary-disabled', value: '#C7D2FE', type: 'color', category: 'colors', status: 'active', description: 'Secondary disabled state', usedBy: [] },
      { name: 'color-secondary-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on secondary', usedBy: [] },
    ]
  },
  {
    name: 'Background',
    tokens: [
      { name: 'color-bg', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Main background', usedBy: [] },
      { name: 'color-bg-subtle', value: '#F9FAFB', type: 'color', category: 'colors', status: 'active', description: 'Subtle background', usedBy: [] },
      { name: 'color-bg-muted', value: '#F3F4F6', type: 'color', category: 'colors', status: 'active', description: 'Muted background', usedBy: [] },
      { name: 'color-bg-inverted', value: '#0D0D0D', type: 'color', category: 'colors', status: 'active', description: 'Inverted background', usedBy: [] },
    ]
  },
  {
    name: 'Surface',
    tokens: [
      { name: 'color-surface', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Surface background', usedBy: [] },
      { name: 'color-surface-hover', value: '#F9FAFB', type: 'color', category: 'colors', status: 'active', description: 'Surface hover state', usedBy: [] },
      { name: 'color-surface-active', value: '#F3F4F6', type: 'color', category: 'colors', status: 'active', description: 'Surface active state', usedBy: [] },
      { name: 'color-surface-elevated', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Elevated surface', usedBy: [] },
    ]
  },
  {
    name: 'Text',
    tokens: [
      { name: 'color-text', value: '#111827', type: 'color', category: 'colors', status: 'active', description: 'Primary text', usedBy: [] },
      { name: 'color-text-muted', value: '#6B7280', type: 'color', category: 'colors', status: 'active', description: 'Muted text', usedBy: [] },
      { name: 'color-text-subtle', value: '#9CA3AF', type: 'color', category: 'colors', status: 'active', description: 'Subtle text', usedBy: [] },
      { name: 'color-text-inverted', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on dark bg', usedBy: [] },
      { name: 'color-text-disabled', value: '#D1D5DB', type: 'color', category: 'colors', status: 'active', description: 'Disabled text', usedBy: [] },
    ]
  },
  {
    name: 'Border',
    tokens: [
      { name: 'color-border', value: '#E5E7EB', type: 'color', category: 'colors', status: 'active', description: 'Default border', usedBy: [] },
      { name: 'color-border-subtle', value: '#F3F4F6', type: 'color', category: 'colors', status: 'active', description: 'Subtle border', usedBy: [] },
      { name: 'color-border-strong', value: '#D1D5DB', type: 'color', category: 'colors', status: 'active', description: 'Strong border', usedBy: [] },
    ]
  },
  {
    name: 'State',
    tokens: [
      { name: 'color-success', value: '#10B981', type: 'color', category: 'colors', status: 'active', description: 'Success state', usedBy: [] },
      { name: 'color-success-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on success', usedBy: [] },
      { name: 'color-warning', value: '#F59E0B', type: 'color', category: 'colors', status: 'active', description: 'Warning state', usedBy: [] },
      { name: 'color-warning-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on warning', usedBy: [] },
      { name: 'color-error', value: '#EF4444', type: 'color', category: 'colors', status: 'active', description: 'Error state', usedBy: [] },
      { name: 'color-error-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on error', usedBy: [] },
      { name: 'color-info', value: '#3B82F6', type: 'color', category: 'colors', status: 'active', description: 'Info state', usedBy: [] },
      { name: 'color-info-contrast', value: '#FFFFFF', type: 'color', category: 'colors', status: 'active', description: 'Text on info', usedBy: [] },
    ]
  },
  {
    name: 'Focus and Interaction',
    tokens: [
      { name: 'color-focus', value: '#0886E5', type: 'color', category: 'colors', status: 'active', description: 'Focus indicator', usedBy: [] },
      { name: 'color-focus-ring', value: 'rgba(8, 134, 229, 0.3)', type: 'color', category: 'colors', status: 'active', description: 'Focus ring', usedBy: [] },
      { name: 'color-overlay', value: 'rgba(0, 0, 0, 0.3)', type: 'color', category: 'colors', status: 'active', description: 'Overlay backdrop', usedBy: [] },
    ]
  },
  {
    name: 'Utility',
    tokens: [
      { name: 'color-link', value: '#0886E5', type: 'color', category: 'colors', status: 'active', description: 'Link color', usedBy: [] },
      { name: 'color-link-hover', value: '#0470C2', type: 'color', category: 'colors', status: 'active', description: 'Link hover', usedBy: [] },
      { name: 'color-selection', value: 'rgba(8, 134, 229, 0.2)', type: 'color', category: 'colors', status: 'active', description: 'Text selection', usedBy: [] },
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

const getSpacingTokens = (): ColorGroup[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('design-tokens-spacing')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load spacing tokens:', e)
      }
    }
  }
  return [
  {
    name: 'Base Scale',
    tokens: [
      { name: 'space-1', value: '4px', type: 'size', category: 'spacing', status: 'active', description: 'Extra small spacing', usedBy: [] },
      { name: 'space-2', value: '8px', type: 'size', category: 'spacing', status: 'active', description: 'Small spacing', usedBy: ['button'] },
      { name: 'space-3', value: '12px', type: 'size', category: 'spacing', status: 'active', description: 'Medium spacing', usedBy: [] },
      { name: 'space-4', value: '16px', type: 'size', category: 'spacing', status: 'active', description: 'Default spacing', usedBy: ['button', 'input'] },
      { name: 'space-6', value: '24px', type: 'size', category: 'spacing', status: 'active', description: 'Large spacing', usedBy: [] },
      { name: 'space-8', value: '32px', type: 'size', category: 'spacing', status: 'active', description: 'Extra large spacing', usedBy: [] },
    ]
  },
  {
    name: 'Component Spacing',
    tokens: [
      { name: 'spacing-button-x', value: '24px', type: 'size', category: 'spacing', status: 'active', description: 'Button horizontal padding', usedBy: ['button'] },
      { name: 'spacing-button-y', value: '12px', type: 'size', category: 'spacing', status: 'active', description: 'Button vertical padding', usedBy: ['button'] },
      { name: 'spacing-input-x', value: '16px', type: 'size', category: 'spacing', status: 'active', description: 'Input horizontal padding', usedBy: ['input'] },
      { name: 'spacing-input-y', value: '12px', type: 'size', category: 'spacing', status: 'active', description: 'Input vertical padding', usedBy: ['input'] },
      { name: 'spacing-gap', value: '16px', type: 'size', category: 'spacing', status: 'active', description: 'Default gap', usedBy: [] },
    ]
  }
  ]
}

const getTypographyTokens = (): ColorGroup[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('design-tokens-typography')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load typography tokens:', e)
      }
    }
  }
  return [
  {
    name: 'Font Families',
    tokens: [
      { name: 'font-primary', value: "'Inter', sans-serif", type: 'font', category: 'typography', status: 'active', description: 'Primary font family', usedBy: [] },
      { name: 'font-heading', value: "'EightiesComeback_VAR', serif", type: 'font', category: 'typography', status: 'active', description: 'Heading font family', usedBy: [] },
      { name: 'font-mono', value: "'JetBrains Mono', monospace", type: 'font', category: 'typography', status: 'active', description: 'Monospace font', usedBy: [] },
    ]
  },
  {
    name: 'Font Sizes',
    tokens: [
      { name: 'text-xs', value: '12px', type: 'size', category: 'typography', status: 'active', description: 'Extra small text', usedBy: [] },
      { name: 'text-sm', value: '14px', type: 'size', category: 'typography', status: 'active', description: 'Small text', usedBy: [] },
      { name: 'text-base', value: '16px', type: 'size', category: 'typography', status: 'active', description: 'Base text size', usedBy: ['button'] },
      { name: 'text-lg', value: '18px', type: 'size', category: 'typography', status: 'active', description: 'Large text', usedBy: [] },
      { name: 'text-xl', value: '20px', type: 'size', category: 'typography', status: 'active', description: 'Extra large text', usedBy: [] },
      { name: 'text-2xl', value: '24px', type: 'size', category: 'typography', status: 'active', description: '2X large text', usedBy: [] },
    ]
  },
  {
    name: 'Headings',
    tokens: [
      { name: 'text-h1', value: '48px', type: 'size', category: 'typography', status: 'active', description: 'H1 heading', usedBy: [] },
      { name: 'text-h2', value: '36px', type: 'size', category: 'typography', status: 'active', description: 'H2 heading', usedBy: [] },
      { name: 'text-h3', value: '28px', type: 'size', category: 'typography', status: 'active', description: 'H3 heading', usedBy: [] },
      { name: 'text-h4', value: '24px', type: 'size', category: 'typography', status: 'active', description: 'H4 heading', usedBy: [] },
      { name: 'text-h5', value: '20px', type: 'size', category: 'typography', status: 'active', description: 'H5 heading', usedBy: [] },
    ]
  },
  {
    name: 'Font Weights',
    tokens: [
      { name: 'font-light', value: '300', type: 'font', category: 'typography', status: 'active', description: 'Light weight', usedBy: [] },
      { name: 'font-normal', value: '400', type: 'font', category: 'typography', status: 'active', description: 'Normal weight', usedBy: [] },
      { name: 'font-medium', value: '500', type: 'font', category: 'typography', status: 'active', description: 'Medium weight', usedBy: [] },
      { name: 'font-semibold', value: '600', type: 'font', category: 'typography', status: 'active', description: 'Semibold weight', usedBy: [] },
      { name: 'font-bold', value: '700', type: 'font', category: 'typography', status: 'active', description: 'Bold weight', usedBy: ['button'] },
    ]
  }
  ]
}

const getRadiusTokens = (): ColorGroup[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('design-tokens-radius')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load radius tokens:', e)
      }
    }
  }
  return [
  {
    name: 'Border Radius',
    tokens: [
      { name: 'radius-none', value: '0px', type: 'radius', category: 'radius', status: 'active', description: 'No rounding', usedBy: [] },
      { name: 'radius-sm', value: '4px', type: 'radius', category: 'radius', status: 'active', description: 'Small radius', usedBy: [] },
      { name: 'radius-base', value: '8px', type: 'radius', category: 'radius', status: 'active', description: 'Base radius', usedBy: [] },
      { name: 'radius-md', value: '12px', type: 'radius', category: 'radius', status: 'active', description: 'Medium radius', usedBy: ['button'] },
      { name: 'radius-lg', value: '16px', type: 'radius', category: 'radius', status: 'active', description: 'Large radius', usedBy: ['button'] },
      { name: 'radius-xl', value: '24px', type: 'radius', category: 'radius', status: 'active', description: 'Extra large radius', usedBy: [] },
      { name: 'radius-full', value: '9999px', type: 'radius', category: 'radius', status: 'active', description: 'Full rounding', usedBy: ['chip'] },
    ]
  }
  ]
}

const getMotionTokens = (): ColorGroup[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('design-tokens-motion')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load motion tokens:', e)
      }
    }
  }
  return [
  {
    name: 'Duration',
    tokens: [
      { name: 'duration-instant', value: '100ms', type: 'motion', category: 'motion', status: 'active', description: 'Instant transition', usedBy: [] },
      { name: 'duration-fast', value: '200ms', type: 'motion', category: 'motion', status: 'active', description: 'Fast transition', usedBy: ['button'] },
      { name: 'duration-normal', value: '300ms', type: 'motion', category: 'motion', status: 'active', description: 'Normal transition', usedBy: [] },
      { name: 'duration-slow', value: '500ms', type: 'motion', category: 'motion', status: 'active', description: 'Slow transition', usedBy: [] },
    ]
  },
  {
    name: 'Easing',
    tokens: [
      { name: 'ease-linear', value: 'linear', type: 'motion', category: 'motion', status: 'active', description: 'Linear easing', usedBy: [] },
      { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', type: 'motion', category: 'motion', status: 'active', description: 'Ease in', usedBy: [] },
      { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', type: 'motion', category: 'motion', status: 'active', description: 'Ease out', usedBy: [] },
      { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', type: 'motion', category: 'motion', status: 'active', description: 'Ease in-out', usedBy: ['button'] },
    ]
  }
  ]
}

const getShadowTokens = (): ColorGroup[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('design-tokens-shadow')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load shadow tokens:', e)
      }
    }
  }
  return [
  {
    name: 'Elevation',
    tokens: [
      { name: 'shadow-none', value: 'none', type: 'shadow', category: 'shadow', status: 'active', description: 'No shadow', usedBy: [] },
      { name: 'shadow-sm', value: '0 1px 2px rgba(0, 0, 0, 0.05)', type: 'shadow', category: 'shadow', status: 'active', description: 'Small shadow', usedBy: [] },
      { name: 'shadow-base', value: '0 2px 4px rgba(0, 0, 0, 0.1)', type: 'shadow', category: 'shadow', status: 'active', description: 'Base shadow', usedBy: [] },
      { name: 'shadow-md', value: '0 4px 8px rgba(0, 0, 0, 0.15)', type: 'shadow', category: 'shadow', status: 'active', description: 'Medium shadow', usedBy: ['button'] },
      { name: 'shadow-lg', value: '0 8px 16px rgba(0, 0, 0, 0.2)', type: 'shadow', category: 'shadow', status: 'active', description: 'Large shadow', usedBy: [] },
      { name: 'shadow-xl', value: '0 16px 32px rgba(0, 0, 0, 0.25)', type: 'shadow', category: 'shadow', status: 'active', description: 'Extra large shadow', usedBy: [] },
    ]
  },
  {
    name: 'Special Effects',
    tokens: [
      { name: 'shadow-inner', value: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', type: 'shadow', category: 'shadow', status: 'active', description: 'Inner shadow', usedBy: [] },
      { name: 'shadow-glow', value: '0 0 20px rgba(8, 134, 229, 0.3)', type: 'shadow', category: 'shadow', status: 'active', description: 'Glow effect', usedBy: [] },
    ]
  }
  ]
}

function TokenCard({ token, isSelected, onClick }: { token: Token; isSelected: boolean; onClick: () => void }) {
  // Use CSS variable if available, fallback to token value
  const actualColor = token.type === 'color' 
    ? `var(--${token.name}, ${token.value})` 
    : token.value

  const renderPreview = () => {
    switch (token.type) {
      case 'color':
        return (
          <div 
            className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex-shrink-0 shadow-lg border border-white/5 transition-colors duration-300" 
            style={{ backgroundColor: actualColor }} 
          />
        )
      case 'size':
        if (token.category === 'spacing') {
          return (
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex-shrink-0 bg-gray-850 border border-gray-700 flex items-center justify-center">
              <div 
                className="bg-blue-500 rounded" 
                style={{ width: token.value, height: token.value, maxWidth: '40px', maxHeight: '40px' }} 
              />
            </div>
          )
        } else if (token.category === 'typography') {
          return (
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex-shrink-0 bg-gray-850 border border-gray-700 flex items-center justify-center">
              <span className="text-gray-400 font-bold" style={{ fontSize: token.value }}>Aa</span>
            </div>
          )
        }
        break
      case 'radius':
        return (
          <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 bg-gray-850 border border-gray-700 flex items-center justify-center">
            <div 
              className="w-8 h-8 bg-blue-500" 
              style={{ borderRadius: token.value }} 
            />
          </div>
        )
      case 'shadow':
        return (
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex-shrink-0 bg-gray-850 border border-gray-700 flex items-center justify-center">
            <div 
              className="w-6 h-6 bg-blue-500 rounded" 
              style={{ boxShadow: token.value }} 
            />
          </div>
        )
      case 'font':
        return (
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex-shrink-0 bg-gray-850 border border-gray-700 flex items-center justify-center">
            <span className="text-gray-400 font-bold text-lg">Aa</span>
          </div>
        )
      case 'motion':
        return (
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex-shrink-0 bg-gray-850 border border-gray-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )
    }
    return null
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-gray-900/40 border border-gray-800 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-[#FF20DD]/30 transition-all group cursor-pointer
        ${isSelected ? 'border-[#FF20DD] ring-1 ring-[#FF20DD]/20 bg-gray-900 shadow-xl' : ''}`}
    >
      {renderPreview()}
      <div className="flex-1 min-w-0">
        <p className="text-[8px] sm:text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">--{token.name}</p>
        <p className="text-xs sm:text-sm text-gray-300 font-mono truncate">{token.value}</p>
      </div>
      <button className="opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity shrink-0">
        <img src={imgNoteStackAdd} alt="Copy token" className="w-4 sm:w-5 h-4 sm:h-5 invert" />
      </button>
    </div>
  )
}

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState<TokenCategory>('colors')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [colorGroups, setColorGroups] = useState<ColorGroup[]>(() => {
    // Load saved tokens from localStorage on initial mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('design-tokens-dark-colors')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load saved tokens:', e)
        }
      }
    }
    return getDefaultColorGroups()
  })
  const [selectedToken, setSelectedComponent] = useState<Token | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [detailTab, setDetailTab] = useState<'customize' | 'usage'>('customize')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showNewTokenModal, setShowNewTokenModal] = useState(false)
  
  // Switch token sets when theme changes
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    
    // Load saved tokens for the new theme
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`design-tokens-${newTheme}-colors`)
      if (saved) {
        try {
          const loadedGroups = JSON.parse(saved)
          setColorGroups(loadedGroups)
          if (loadedGroups.length > 0 && loadedGroups[0].tokens.length > 0) {
            setSelectedComponent(loadedGroups[0].tokens[0])
          }
          return
        } catch (e) {
          console.error('Failed to load saved tokens:', e)
        }
      }
    }
    
    // Fallback to defaults if no saved tokens
    const newGroups = newTheme === 'dark' ? getDefaultColorGroups() : getLightModeColorGroups()
    setColorGroups(newGroups)
    if (newGroups.length > 0 && newGroups[0].tokens.length > 0) {
      setSelectedComponent(newGroups[0].tokens[0])
    }
  }
  
  // Persist color groups to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && colorGroups.length > 0) {
      localStorage.setItem(`design-tokens-${theme}-colors`, JSON.stringify(colorGroups))
    }
  }, [colorGroups, theme])
  
  // Get current token groups based on active tab
  const getCurrentTokenGroups = (): ColorGroup[] => {
    switch (activeTab) {
      case 'colors':
        return colorGroups
      case 'spacing':
        return getSpacingTokens()
      case 'typography':
        return getTypographyTokens()
      case 'radius':
        return getRadiusTokens()
      case 'motion':
        return getMotionTokens()
      case 'shadow':
        return getShadowTokens()
      default:
        return colorGroups
    }
  }
  
  const currentTokenGroups = getCurrentTokenGroups()
  
  // Initialize with first token and reset when tab changes
  useEffect(() => {
    const groups = getCurrentTokenGroups()
    if (groups.length > 0 && groups[0].tokens.length > 0) {
      setSelectedComponent(groups[0].tokens[0])
    }
  }, [activeTab, theme])
  
  // Initialize and update CSS variables
  useEffect(() => {
    // Apply all current tokens to CSS variables
    const allGroups = getCurrentTokenGroups()
    allGroups.forEach(group => {
      group.tokens.forEach(token => {
        document.documentElement.style.setProperty(`--${token.name}`, token.value)
      })
    })
  }, [colorGroups, activeTab, theme])
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log('Copied to clipboard:', text)
  }
  
  const handleCreateToken = (newToken: Token) => {
    // Add to the first group (or create a new group)
    const updatedGroups = [...colorGroups]
    if (updatedGroups.length > 0) {
      updatedGroups[0].tokens.push(newToken)
    } else {
      updatedGroups.push({
        name: 'Custom',
        tokens: [newToken]
      })
    }
    
    setColorGroups(updatedGroups)
    setSelectedComponent(newToken)
    
    // Apply CSS variable
    document.documentElement.style.setProperty(`--${newToken.name}`, newToken.value)
  }
  
  const handleUpdateToken = () => {
    if (!selectedToken) return
    
    // Get current groups for the active tab
    let updatedGroups: ColorGroup[] = []
    
    if (activeTab === 'colors') {
      updatedGroups = colorGroups.map(group => ({
        ...group,
        tokens: group.tokens.map(token => 
          token.name === selectedToken.name ? selectedToken : token
        )
      }))
      setColorGroups(updatedGroups)
    } else {
      // For non-color tokens, update the respective token set
      updatedGroups = getCurrentTokenGroups().map(group => ({
        ...group,
        tokens: group.tokens.map(token => 
          token.name === selectedToken.name ? selectedToken : token
        )
      }))
    }
    
    // Save to localStorage based on category
    if (typeof window !== 'undefined' && updatedGroups.length > 0) {
      if (activeTab === 'colors') {
        localStorage.setItem(`design-tokens-${theme}-colors`, JSON.stringify(updatedGroups))
      } else {
        localStorage.setItem(`design-tokens-${activeTab}`, JSON.stringify(updatedGroups))
      }
    }
    
    // Apply to CSS variables for live preview everywhere
    document.documentElement.style.setProperty(`--${selectedToken.name}`, selectedToken.value)
    
    // Show success feedback
    setUpdateSuccess(true)
    setTimeout(() => setUpdateSuccess(false), 2000)
    
    console.log('Token updated and applied:', selectedToken)
  }

  return (
    <div className="flex-1 flex gap-6 p-2 overflow-hidden h-full">
      <div className="bg-gradient-to-r from-gray-850 to-gray-850/50 border-t border-gray-600 rounded-[40px] flex flex-col lg:flex-row gap-6 h-full p-2 sm:p-3 overflow-hidden w-full">
        
        {/* Left Content Panel */}
        <div className="flex flex-col gap-4 lg:gap-6 h-full overflow-hidden px-4 lg:pl-6 py-4 lg:py-6 flex-1 lg:flex-[0.5] min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-4 lg:pr-6">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] text-gray-150 tracking-[1.2px] sm:tracking-[1.4px] lg:tracking-[1.6px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              Foundations
            </h2>
            <button 
              onClick={() => setShowNewTokenModal(true)}
              className="bg-gray-950 flex gap-2 h-9 sm:h-11 items-center px-4 sm:px-6 py-2 rounded-2xl shadow-button border border-white/5 transition-all group shrink-0 hover:bg-gray-900 active:scale-95"
            >
              <img src={imgAdd} alt="Add token" className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-90 transition-transform" />
              <span className="text-gray-100 text-[10px] sm:text-xs font-black uppercase tracking-widest">New Token</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-gray-950 border-b border-gray-700 flex items-center p-1 rounded-[46px] shadow-[0px_15px_14px_0px_rgba(0,0,0,0.08)] relative shrink-0 overflow-x-auto scrollbar-hide">
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center shrink-0 pr-4 lg:pr-6">
            <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex h-12 sm:h-14 items-center px-4 sm:px-6 rounded-2xl flex-1 shadow-inner group">
              <img src={imgSearch} alt="Search" className="w-4 sm:w-5 h-4 sm:h-5 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-3 sm:ml-4 text-xs sm:text-sm text-gray-100 w-full uppercase tracking-widest font-black placeholder:opacity-20" />
            </div>
            
            <div className="flex gap-2 sm:gap-4">
              <div className="bg-gray-950 border-b-[1.5px] border-gray-700 flex gap-1 sm:gap-2 h-12 sm:h-14 items-center p-1 sm:p-1.5 rounded-2xl">
                <button onClick={() => handleThemeChange('light')} className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-xl transition-all ${theme === 'light' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                  <img src={imgSun} alt="Light theme" className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button onClick={() => handleThemeChange('dark')} className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-xl transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-xl border border-gray-700' : 'opacity-30 hover:opacity-100'}`}>
                  <img src={imgMoon} alt="Dark theme" className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>

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

          {/* Tokens List */}
          <div className="flex-1 overflow-y-auto pr-2 lg:pr-4 custom-scrollbar">
            <div className="flex flex-col gap-8 lg:gap-12">
              {currentTokenGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-4 lg:space-y-6">
                  <h3 className="text-gray-500 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] border-b border-gray-800 pb-3 lg:pb-4">{group.name}</h3>
                  <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6" : "flex flex-col gap-2 sm:gap-3"}>
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
        <div className="hidden lg:flex bg-gray-950 h-full rounded-[40px] flex-[0.5] flex-col overflow-hidden border border-gray-800 shadow-2xl relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          {selectedToken ? (
            <>
              <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar relative z-10">
                <div className="flex items-center gap-3">
                  <button className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-accent-magenta/40 transition-colors">
                    <img src={imgArrowBack} alt="Back" className="w-4 h-4 opacity-40" />
                  </button>
                  <h3 className="text-gray-100 text-[32px] font-serif font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
                    {selectedToken.name}
                  </h3>
                </div>

                <div className="flex bg-black/40 border border-gray-800 p-1 rounded-[24px] gap-0.5 shadow-inner">
                  <button 
                    onClick={() => setDetailTab('customize')}
                    className={`flex-1 py-2.5 rounded-[20px] text-[9px] font-black uppercase tracking-widest transition-all ${
                      detailTab === 'customize' 
                        ? 'bg-gray-850 text-white shadow-xl border-t border-gray-700' 
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
                  >
                    Customize
                  </button>
                  <button 
                    onClick={() => setDetailTab('usage')}
                    className={`flex-1 py-2.5 rounded-[20px] text-[9px] font-black uppercase tracking-widest transition-all ${
                      detailTab === 'usage' 
                        ? 'bg-gray-850 text-white shadow-xl border-t border-gray-700' 
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
                  >
                    Usage
                  </button>
                </div>

                {detailTab === 'customize' ? (
                  <>
                    <div className="bg-gray-900/40 border border-gray-800 rounded-[20px] p-5 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        </div>
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Token Intelligence</span>
                      </div>
                      <p className="text-gray-500 text-xs font-sans leading-relaxed">
                        This foundation is linked to <span className="text-blue-400 font-bold">{selectedToken.usedBy?.length || 0} components</span>. 
                        Edits here will ripple through your entire system in real-time.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] px-1">Status</label>
                        <select 
                          value={selectedToken.status || 'active'}
                          onChange={(e) => {
                            setSelectedComponent({
                              ...selectedToken,
                              status: e.target.value as TokenStatus
                            })
                          }}
                          className="w-full bg-gray-950 border border-gray-800 p-3 rounded-[16px] text-gray-200 font-sans text-xs focus:outline-none focus:border-accent-magenta transition-all cursor-pointer"
                        >
                          <option value="active">Active</option>
                          <option value="deprecated">Deprecated</option>
                          <option value="legacy">Legacy</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] px-1">Description</label>
                        <input
                          type="text"
                          value={selectedToken.description || ''}
                          onChange={(e) => {
                            setSelectedComponent({
                              ...selectedToken,
                              description: e.target.value
                            })
                          }}
                          placeholder="Add token description..."
                          className="w-full bg-gray-950 border border-gray-800 p-3 rounded-[16px] text-gray-200 font-sans text-xs focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-700"
                        />
                      </div>

                      {selectedToken.type === 'color' ? (
                        <>
                          <div className="space-y-2">
                            <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] px-1">Hex Value</label>
                            <div className="bg-gray-950 border border-gray-800 p-4 rounded-[16px] flex items-center justify-between shadow-inner group">
                              <input
                                type="text"
                                value={selectedToken.value}
                                onChange={(e) => {
                                  const newValue = e.target.value
                                  if (newValue.match(/^#[0-9A-Fa-f]{0,6}$/) || newValue.startsWith('rgba')) {
                                    setSelectedComponent({...selectedToken, value: newValue})
                                  }
                                }}
                                className="text-lg text-gray-200 font-mono tracking-widest bg-transparent border-none outline-none flex-1"
                              />
                              <input
                                type="color"
                                value={selectedToken.value.startsWith('#') ? selectedToken.value : '#0886E5'}
                                onChange={(e) => setSelectedComponent({...selectedToken, value: e.target.value})}
                                className="w-10 h-10 rounded-lg border border-white/10 shadow-2xl cursor-pointer"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] px-1">Color Picker</label>
                            <div className="bg-gray-950 border border-gray-800 p-4 rounded-[16px] shadow-inner">
                              <input
                                type="color"
                                value={selectedToken.value.startsWith('#') ? selectedToken.value : '#0886E5'}
                                onChange={(e) => setSelectedComponent({...selectedToken, value: e.target.value})}
                                className="w-full h-20 rounded-lg cursor-pointer"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] px-1">Value</label>
                          <div className="bg-gray-950 border border-gray-800 p-4 rounded-[16px] shadow-inner">
                            <input
                              type="text"
                              value={selectedToken.value}
                              onChange={(e) => setSelectedComponent({...selectedToken, value: e.target.value})}
                              className="text-lg text-gray-200 font-mono tracking-widest bg-transparent border-none outline-none w-full"
                              placeholder={
                                selectedToken.type === 'size' ? '16px' :
                                selectedToken.type === 'font' ? "'Inter', sans-serif" :
                                selectedToken.type === 'motion' ? '300ms' :
                                selectedToken.type === 'shadow' ? '0 2px 4px rgba(0,0,0,0.1)' :
                                'Value'
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] px-1 mb-3">Used By Components</h4>
                        <div className="bg-gray-900/40 border border-gray-800 rounded-[20px] p-4">
                          {selectedToken.usedBy && selectedToken.usedBy.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedToken.usedBy.map((comp, idx) => (
                                <div key={idx} className="bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-500/20">
                                  {comp}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600 text-xs italic">No components using this token</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] px-1 mb-3">Export Formats</h4>
                        <div className="space-y-2">
                          {(() => {
                            const formats = exportAllFormats(selectedToken)
                            return (
                              <>
                                {Object.entries(formats).map(([format, code]) => (
                                  <div key={format} className="bg-gray-950 border border-gray-800 rounded-[16px] overflow-hidden">
                                    <div className="flex items-center justify-between p-3 border-b border-gray-800">
                                      <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{format}</span>
                                      <button 
                                        onClick={() => handleCopyToClipboard(code)}
                                        className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-all"
                                      >
                                        <img src={imgCopy} alt="Copy" className="w-3.5 h-3.5 invert opacity-60" />
                                      </button>
                                    </div>
                                    <div className="p-3">
                                      <code className="text-gray-400 font-mono text-[10px]">{code}</code>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )
                          })()}
                        </div>
                      </div>

                      <div className="bg-gray-900/40 border border-gray-800 rounded-[20px] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Usage Statistics</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Components</span>
                            <span className="text-xs text-blue-400 font-bold">{selectedToken.usedBy?.length || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Status</span>
                            <span className={`text-xs font-bold ${
                              selectedToken.status === 'active' ? 'text-green-400' :
                              selectedToken.status === 'deprecated' ? 'text-orange-400' :
                              'text-gray-400'
                            }`}>
                              {selectedToken.status || 'active'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {detailTab === 'customize' && (
                  <div className="sticky bottom-0 pt-3 bg-gray-950">
                    <FlashButton onClick={handleUpdateToken} className="w-full relative text-xs">
                      {updateSuccess ? (
                        <>
                          <svg className="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Updated!
                        </>
                      ) : (
                        'Update Design Foundation'
                      )}
                    </FlashButton>
                  </div>
                )}
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

      {/* New Token Modal */}
      <NewTokenModal
        isOpen={showNewTokenModal}
        onClose={() => setShowNewTokenModal(false)}
        onCreateToken={handleCreateToken}
        category={activeTab}
      />
    </div>
  )
}
