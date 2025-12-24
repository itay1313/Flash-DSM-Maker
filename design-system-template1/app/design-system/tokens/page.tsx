import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'

const colorTokens = [
  {
    category: 'Primary',
    colors: [
      { name: 'primary-50', value: 'var(--color-primary-50)', hex: '#f0f9ff' },
      { name: 'primary-100', value: 'var(--color-primary-100)', hex: '#e0f2fe' },
      { name: 'primary-500', value: 'var(--color-primary-500)', hex: '#0ea5e9' },
      { name: 'primary-600', value: 'var(--color-primary-600)', hex: '#0284c7' },
      { name: 'primary-700', value: 'var(--color-primary-700)', hex: '#0369a1' },
      { name: 'primary-900', value: 'var(--color-primary-900)', hex: '#0c4a6e' },
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

const spacingTokens = [
  { name: 'spacing-1', value: 'var(--spacing-1)', rem: '0.25rem', px: '4px' },
  { name: 'spacing-2', value: 'var(--spacing-2)', rem: '0.5rem', px: '8px' },
  { name: 'spacing-4', value: 'var(--spacing-4)', rem: '1rem', px: '16px' },
  { name: 'spacing-6', value: 'var(--spacing-6)', rem: '1.5rem', px: '24px' },
  { name: 'spacing-8', value: 'var(--spacing-8)', rem: '2rem', px: '32px' },
  { name: 'spacing-12', value: 'var(--spacing-12)', rem: '3rem', px: '48px' },
  { name: 'spacing-16', value: 'var(--spacing-16)', rem: '4rem', px: '64px' },
]

const radiusTokens = [
  { name: 'radius-sm', value: 'var(--radius-sm)', rem: '0.125rem' },
  { name: 'radius-base', value: 'var(--radius-base)', rem: '0.25rem' },
  { name: 'radius-md', value: 'var(--radius-md)', rem: '0.375rem' },
  { name: 'radius-lg', value: 'var(--radius-lg)', rem: '0.5rem' },
  { name: 'radius-xl', value: 'var(--radius-xl)', rem: '0.75rem' },
  { name: 'radius-full', value: 'var(--radius-full)', rem: '9999px' },
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
    <main className="min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-12">
        <div className="ds-mb-12">
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
                            className="ds-w-16 ds-h-16 ds-rounded-lg ds-border ds-border-border"
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

          {/* Spacing */}
          <div>
            <h2 className="ds-text-2xl ds-font-bold ds-mb-6 ds-text-text">Spacing</h2>
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>
                  Consistent spacing values for margins, padding, and gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-space-y-4">
                  {spacingTokens.map((spacing) => (
                    <div key={spacing.name} className="ds-flex ds-items-center ds-gap-4">
                      <div className="ds-w-32 ds-font-mono ds-text-sm ds-font-medium ds-text-text">
                        {spacing.name}
                      </div>
                      <div className="ds-flex-1 ds-h-8 ds-bg-primary-100 ds-rounded" style={{ width: spacing.rem }} />
                      <div className="ds-w-24 ds-text-right ds-text-sm ds-text-text-secondary ds-font-mono">
                        {spacing.rem}
                      </div>
                      <div className="ds-w-16 ds-text-right ds-text-xs ds-text-text-tertiary">
                        {spacing.px}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Border Radius */}
          <div>
            <h2 className="ds-text-2xl ds-font-bold ds-mb-6 ds-text-text">Border Radius</h2>
            <Card>
              <CardHeader>
                <CardTitle>Radius Scale</CardTitle>
                <CardDescription>
                  Consistent border radius values for rounded corners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-grid ds-grid-cols-2 md:ds-grid-cols-3 ds-gap-4">
                  {radiusTokens.map((radius) => (
                    <div key={radius.name} className="ds-flex ds-flex-col ds-items-center ds-gap-2">
                      <div
                        className="ds-w-20 ds-h-20 ds-bg-primary-100 ds-border-2 ds-border-primary"
                        style={{ borderRadius: radius.rem }}
                      />
                      <div className="ds-text-center">
                        <div className="ds-font-mono ds-text-sm ds-font-medium ds-text-text">
                          {radius.name}
                        </div>
                        <div className="ds-text-xs ds-text-text-secondary ds-font-mono">
                          {radius.rem}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
            <pre className="ds-p-4 ds-rounded-lg ds-bg-background-secondary ds-border ds-border-border ds-text-sm ds-font-mono ds-overflow-x-auto">
              <code>{`// Colors
<div className="ds-bg-primary ds-text-text-inverse">
  Primary background
</div>

// Spacing
<div className="ds-p-4 ds-m-6">
  Padding and margin
</div>

// Radius
<div className="ds-rounded-lg">
  Rounded corners
</div>

// Shadows
<div className="ds-shadow-lg">
  Elevated element
</div>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

