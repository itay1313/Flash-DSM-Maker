import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { ArrowRight, Layout } from 'lucide-react'
import Link from 'next/link'

const spacingTokens = [
  { name: 'spacing-1', value: 'var(--spacing-1)', rem: '0.25rem', px: '4px' },
  { name: 'spacing-2', value: 'var(--spacing-2)', rem: '0.5rem', px: '8px' },
  { name: 'spacing-4', value: 'var(--spacing-4)', rem: '1rem', px: '16px' },
  { name: 'spacing-6', value: 'var(--spacing-6)', rem: '1.5rem', px: '24px' },
  { name: 'spacing-8', value: 'var(--spacing-8)', rem: '2rem', px: '32px' },
  { name: 'spacing-12', value: 'var(--spacing-12)', rem: '3rem', px: '48px' },
  { name: 'spacing-16', value: 'var(--spacing-16)', rem: '4rem', px: '64px' },
  { name: 'spacing-24', value: 'var(--spacing-24)', rem: '6rem', px: '96px' },
  { name: 'spacing-32', value: 'var(--spacing-32)', rem: '8rem', px: '128px' },
]

export default function SpacingPage() {
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
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Spacing</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Consistent spacing scale based on 4px increments. Use these tokens for margins, padding, and gaps 
            to maintain visual consistency across your application.
          </p>
        </div>

        {/* Spacing Scale */}
        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Spacing Scale</CardTitle>
            <CardDescription>
              All spacing values are multiples of 4px for consistency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-4">
              {spacingTokens.map((spacing) => (
                <div key={spacing.name} className="ds-flex ds-items-center ds-gap-6">
                  <div className="ds-w-32 ds-font-mono ds-text-sm ds-font-medium ds-text-text">
                    {spacing.name}
                  </div>
                  <div className="ds-flex-1 ds-h-8 ds-bg-primary-100 ds-rounded ds-border ds-border-primary-200" style={{ width: spacing.rem }} />
                  <div className="ds-w-24 ds-text-right ds-text-sm ds-text-text-secondary ds-font-mono">
                    {spacing.rem}
                  </div>
                  <div className="ds-w-20 ds-text-right ds-text-xs ds-text-text-tertiary">
                    {spacing.px}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 ds-gap-6 ds-mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Padding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="ds-space-y-3">
                <div className="ds-p-4 ds-bg-primary-100 ds-rounded-lg ds-border ds-border-primary-200">
                  <code className="ds-text-sm ds-font-mono">ds-p-4</code>
                </div>
                <div className="ds-p-6 ds-bg-primary-100 ds-rounded-lg ds-border ds-border-primary-200">
                  <code className="ds-text-sm ds-font-mono">ds-p-6</code>
                </div>
                <div className="ds-p-8 ds-bg-primary-100 ds-rounded-lg ds-border ds-border-primary-200">
                  <code className="ds-text-sm ds-font-mono">ds-p-8</code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="ds-flex ds-gap-4 ds-flex-wrap">
                <div className="ds-w-16 ds-h-16 ds-bg-primary-100 ds-rounded ds-border ds-border-primary-200" />
                <div className="ds-w-16 ds-h-16 ds-bg-primary-100 ds-rounded ds-border ds-border-primary-200" />
                <div className="ds-w-16 ds-h-16 ds-bg-primary-100 ds-rounded ds-border ds-border-primary-200" />
              </div>
              <code className="ds-text-sm ds-font-mono ds-mt-4 ds-block">ds-gap-4</code>
            </CardContent>
          </Card>
        </div>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Use spacing tokens via Tailwind classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
              <code>{`// Padding
<div className="ds-p-4">Padding 16px</div>
<div className="ds-p-6">Padding 24px</div>

// Margin
<div className="ds-m-4">Margin 16px</div>
<div className="ds-mt-8">Top margin 32px</div>

// Gap
<div className="ds-flex ds-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

