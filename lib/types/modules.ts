/**
 * Module Types
 * Types for multi-component modules (combo-box, accordion, modal, navbar, etc.)
 */

export interface SpacingValue {
  top: string
  right: string
  bottom: string
  left: string
}

export interface TokenReference {
  tokenId?: string
  tokenName?: string
  value?: string // Direct value if no token reference
  type: 'token' | 'value' | 'component'
}

export interface ModuleProperties {
  // Spacing properties (linked to spacing tokens)
  padding: SpacingValue | TokenReference
  margin: SpacingValue | TokenReference
  gap: string | TokenReference

  // Color properties (linked to color tokens)
  backgroundColor: string | TokenReference
  colors: {
    text?: string | TokenReference
    border?: string | TokenReference
    icon?: string | TokenReference
    hover?: string | TokenReference
    focus?: string | TokenReference
    active?: string | TokenReference
  }

  // Typography properties (linked to typography tokens)
  fontSize: string | TokenReference
  fontWeight: string | TokenReference
  fontFamily: string | TokenReference
  lineHeight: string | TokenReference

  // Additional properties
  borderRadius?: string | TokenReference
  borderWidth?: string | TokenReference
  boxShadow?: string | TokenReference
}

export interface Module {
  id: string
  name: string
  category: 'modules'
  description: string
  type: 'combo-box' | 'accordion' | 'modal' | 'navbar' | 'drawer' | 'dropdown-menu' | 'empty-state' | 'fieldset' | 'form' | 'header' | 'footer' | 'hero' | 'pagination' | 'table' | 'other'
  properties: ModuleProperties
  componentReferences?: string[] // IDs of components used in this module
  createdAt?: string
  updatedAt?: string
}

export interface ModuleBinding {
  moduleId: string
  propertyPath: string
  tokenId?: string
  componentId?: string
  value?: string
}

