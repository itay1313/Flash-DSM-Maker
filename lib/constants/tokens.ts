export type TokenLayer = 'primitives' | 'semantic'
export type TokenCategory = 'colors' | 'typography' | 'spacing' | 'radius' | 'shadows' | 'theme' | 'motion' | 'icons'
export type TokenState = 'default' | 'hover' | 'focus' | 'disabled'

export interface Binding {
  targetType: 'component' | 'module'
  targetId: string
  propertyPath: string
  note?: string
  isNew?: boolean
}

export interface Token {
  name: string
  value: string
  lightValue?: string
  darkValue?: string
  styleObject?: Record<string, string | number>
  iconData?: { pack: string; name: string; sizeRef: string }
  type: 'color' | 'font' | 'size' | 'radius' | 'shadow' | 'theme' | 'motion' | 'icon'
  state?: TokenState
  layer: TokenLayer
  category: TokenCategory
  bindings?: Binding[]
}

export interface TokenGroup {
  category: TokenCategory
  layer: TokenLayer
  tokens: Token[]
}

export const DEFAULT_TOKENS: Record<TokenLayer, TokenGroup[]> = {
  primitives: [
    {
      layer: 'primitives',
      category: 'colors',
      tokens: [
        { name: 'color-white', value: '#ffffff', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-black', value: '#000000', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-gray-50', value: '#f5f5f5', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-gray-100', value: '#e5e5e5', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-gray-300', value: '#b3b3b3', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-gray-600', value: '#666666', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-gray-900', value: '#1a1a1a', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-blue-500', value: '#3b82f6', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-red-500', value: '#ef4444', type: 'color', layer: 'primitives', category: 'colors' },
        { name: 'color-green-500', value: '#22c55e', type: 'color', layer: 'primitives', category: 'colors' },
      ],
    },
    {
      layer: 'primitives',
      category: 'typography',
      tokens: [
        { name: 'font-sans', value: 'Inter, system-ui, Arial', type: 'font', layer: 'primitives', category: 'typography' },
        { name: 'font-mono', value: 'Menlo, monospace', type: 'font', layer: 'primitives', category: 'typography' },
        { name: 'font-size-xs', value: '12px', type: 'size', layer: 'primitives', category: 'typography' },
        { name: 'font-size-sm', value: '14px', type: 'size', layer: 'primitives', category: 'typography' },
        { name: 'font-size-md', value: '16px', type: 'size', layer: 'primitives', category: 'typography' },
        { name: 'font-size-lg', value: '18px', type: 'size', layer: 'primitives', category: 'typography' },
      ],
    },
    {
      layer: 'primitives',
      category: 'spacing',
      tokens: [
        { name: 'space-2', value: '4px', type: 'size', layer: 'primitives', category: 'spacing' },
        { name: 'space-4', value: '8px', type: 'size', layer: 'primitives', category: 'spacing' },
        { name: 'space-6', value: '12px', type: 'size', layer: 'primitives', category: 'spacing' },
        { name: 'space-8', value: '16px', type: 'size', layer: 'primitives', category: 'spacing' },
      ],
    },
    {
      layer: 'primitives',
      category: 'radius',
      tokens: [
        { name: 'radius-sm', value: '4px', type: 'radius', layer: 'primitives', category: 'radius' },
        { name: 'radius-md', value: '8px', type: 'radius', layer: 'primitives', category: 'radius' },
        { name: 'radius-lg', value: '12px', type: 'radius', layer: 'primitives', category: 'radius' },
      ],
    },
    {
      layer: 'primitives',
      category: 'shadows',
      tokens: [
        { name: 'shadow-sm', value: '0 2px 4px rgba(0,0,0,.08)', type: 'shadow', layer: 'primitives', category: 'shadows' },
        { name: 'shadow-md', value: '0 4px 6px rgba(0,0,0,.12)', type: 'shadow', layer: 'primitives', category: 'shadows' },
        { name: 'shadow-lg', value: '0 10px 15px rgba(0,0,0,.15)', type: 'shadow', layer: 'primitives', category: 'shadows' },
      ],
    },
  ],
  semantic: [
    {
      layer: 'semantic',
      category: 'colors',
      tokens: [
        { name: 'text-primary', value: 'var(--color-gray-900)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'text-secondary', value: 'var(--color-gray-600)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'text-inverse', value: 'var(--color-white)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'bg-app', value: 'var(--color-gray-50)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'bg-surface', value: 'var(--color-white)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'bg-subtle', value: 'var(--color-gray-100)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'border-default', value: 'var(--color-gray-300)', type: 'color', layer: 'semantic', category: 'colors' },
        { 
          name: 'accent-primary', 
          value: 'var(--color-blue-500)', 
          type: 'color', 
          layer: 'semantic', 
          category: 'colors',
          bindings: [
            { targetType: 'component', targetId: 'Button', propertyPath: 'styles.bg', note: 'Primary Action' },
            { targetType: 'component', targetId: 'Badge', propertyPath: 'styles.bg', note: 'New Status' }
          ]
        },
        { 
          name: 'accent-success', 
          value: 'var(--color-green-500)', 
          type: 'color', 
          layer: 'semantic', 
          category: 'colors',
          bindings: [
            { targetType: 'component', targetId: 'Switch', propertyPath: 'styles.bg', note: 'Active State' }
          ]
        },
        { name: 'accent-danger', value: 'var(--color-red-500)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'btn-primary-bg', value: 'var(--accent-primary)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'btn-primary-text', value: 'var(--text-inverse)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'card-bg', value: 'var(--bg-surface)', type: 'color', layer: 'semantic', category: 'colors' },
        { name: 'card-radius', value: 'var(--radius-lg)', type: 'radius', layer: 'semantic', category: 'radius' },
      ],
    },
  ]
}
