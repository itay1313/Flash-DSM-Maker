/**
 * Icon Registry
 * 
 * Central registry for all SVG icons in the design system.
 * Icons are stored as React components for tree-shaking and type safety.
 */

import * as React from 'react'
import * as Icons from 'lucide-react'

export type IconName = keyof typeof Icons

export const iconRegistry: Record<string, React.ComponentType<any>> = {
  // Common icons from lucide-react
  ...Icons,
}

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

