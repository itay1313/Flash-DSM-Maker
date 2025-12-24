/**
 * Icon Registry
 * 
 * Central registry for all SVG icons in the design system.
 * Icons are stored as React components for tree-shaking and type safety.
 */

import * as React from 'react'
import * as LucideIcons from 'lucide-react'

// Filter to only React components (functions that can be rendered)
const iconEntries = Object.entries(LucideIcons).filter(
  ([_, value]) => typeof value === 'function' || (typeof value === 'object' && value !== null && '$$typeof' in value)
) as [string, React.ComponentType<any>][]

export type IconName = typeof iconEntries[number][0]

export const iconRegistry: Record<string, React.ComponentType<any>> = Object.fromEntries(iconEntries)

/**
 * Get an icon component by name
 */
export function getIcon(name: IconName): React.ComponentType<any> | undefined {
  return iconRegistry[name]
}

/**
 * Get all available icon names
 */
export function getAllIconNames(): IconName[] {
  return Object.keys(iconRegistry) as IconName[]
}

