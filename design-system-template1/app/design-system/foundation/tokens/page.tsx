import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { ArrowRight, Palette } from 'lucide-react'
import Link from 'next/link'

const colorTokens = [
  {
    category: 'Primary',
    colors: [
      { name: 'primary-50', value: 'var(--color-primary-50)', hex: '#eff6ff' },
      { name: 'primary-100', value: 'var(--color-primary-100)', hex: '#dbeafe' },
      { name: 'primary-500', value: 'var(--color-primary-500)', hex: '#3b82f6' },
      { name: 'primary-600', value: 'var(--color-primary-600)', hex: '#2563eb' },
      { name: 'primary-700', value: 'var(--color-primary-700)', hex: '#1d4ed8' },
      { name: 'primary-900', value: 'var(--color-primary-900)', hex: '#1e3a8a' },
    ]
  },
  {
    category: 'Semantic',
    colors: [
      { name: 'success', value: 'var(--color-success)', hex: '#16a34a' },
      { name: 'warning', value: 'var(--color-warning)', hex: '#d97706' },
      { name: 'error', value: 'var(--color-error)', hex: '#dc2626' },
      { name: 'info', value: 'var(--color-info)', hex: '#2563eb' },
    ]
  },
  {
    category: 'Neutral',
    colors: [
      { name: 'neutral-50', value: 'var(--color-neutral-50)', hex: '#fafafa' },
      { name: 'neutral-500', value: 'var(--color-neutral-500)', hex: '#737373' },
      { name: 'neutral-900', value: 'var(--color-neutral-900)', hex: '#171717' },
    ]
  }
]

const shadowTokens = [
  { name: 'shadow-sm', value: 'var(--shadow-sm)', description: 'Subtle elevation' },
  { name: 'shadow-base', value: 'var(--shadow-base)', description: 'Default elevation' },
  { name: 'shadow-md', value: 'var(--shadow-md)', description: 'Medium elevation' },
  { name: 'shadow-lg', value: 'var(--shadow-lg)', description: 'Large elevation' },
  { name: 'shadow-xl', value: 'var(--shadow-xl)', description: 'Extra large elevation' },
]

export default function TokensPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <Link 
            href="/design-system/foundation"
            className="ds-inline-flex ds-items-center ds-gap-2 ds-text-text-secondary hover:ds-text-text ds-mb-6 ds-transition-colors"
          >
            <ArrowRight className="ds-w-4 ds-h-4 ds-rotate-180" />
            Back to Foundation
          </Link>
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Design Tokens</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            All design tokens are defined as CSS variables, enabling easy theming, 
            dark mode support, and consistent design language across your application.
          </p>
        </div>

        {/* Colors */}
        <div className="ds-space-y-8 ds-mb-12">
          <div>
            <h2 className="ds-text-2xl ds-font-bold ds-mb-6 ds-text-text">Colors</h2>
            <div className="ds-grid ds-grid-cols-1 lg:ds-grid-cols-2 ds-gap-6">
              {colorTokens.map((group) => (
                <Card key={group.category}>
                  <CardHeader>
                    <CardTitle>{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="ds-space-y-3">
                      {group.colors.map((color) => (
                        <div key={color.name} className="ds-flex ds-items-center ds-gap-4">
                          <div
                            className="ds-w-16 ds-h-16 ds-rounded-lg ds-border ds-border-border ds-shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="ds-flex-1">
                            <div className="ds-font-mono ds-text-sm ds-font-medium ds-text-text">
                              {color.name}
                            </div>
                            <div className="ds-text-xs ds-text-text-secondary ds-font-mono">
                              {color.value}
                            </div>
                            <div className="ds-text-xs ds-text-text-tertiary">
                              {color.hex}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shadows */}
          <div>
            <h2 className="ds-text-2xl ds-font-bold ds-mb-6 ds-text-text">Shadows</h2>
            <Card>
              <CardHeader>
                <CardTitle>Shadow Scale</CardTitle>
                <CardDescription>
                  Elevation system for depth and hierarchy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-4">
                  {shadowTokens.map((shadow) => (
                    <div key={shadow.name} className="ds-flex ds-flex-col ds-items-center ds-gap-3 ds-p-4 ds-rounded-lg ds-bg-background-secondary">
                      <div
                        className="ds-w-24 ds-h-24 ds-bg-background ds-border ds-border-border ds-rounded-lg"
                        style={{ boxShadow: shadow.value }}
                      />
                      <div className="ds-text-center">
                        <div className="ds-font-mono ds-text-sm ds-font-medium ds-text-text">
                          {shadow.name}
                        </div>
                        <div className="ds-text-xs ds-text-text-secondary">
                          {shadow.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Use tokens via Tailwind CSS classes with the `ds-` prefix
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
              <code>{`// Colors
<div className="ds-bg-primary ds-text-text-inverse">
  Primary background
</div>

// Shadows
<div className="ds-shadow-lg">
  Elevated element
</div>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

