export type TokenCategory = 'colors' | 'spacing' | 'typography' | 'radius' | 'motion' | 'shadow'

export type TokenType = 'color' | 'font' | 'size' | 'radius' | 'shadow' | 'motion'

export type TokenStatus = 'active' | 'deprecated' | 'legacy'

export interface Token {
  name: string
  value: string
  type: TokenType
  category: TokenCategory
  // Advanced metadata fields
  status?: TokenStatus
  description?: string
  aliases?: string[]  // Other tokens referencing this
  usedBy?: string[]   // Component names using this token
  metadata?: Record<string, any>  // Custom properties
  documentation?: string
}

export interface ColorGroup {
  name: string
  tokens: Token[]
}
