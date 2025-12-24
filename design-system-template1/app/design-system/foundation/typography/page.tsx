import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { ArrowRight, Type } from 'lucide-react'
import Link from 'next/link'

const typographyScale = [
  { name: 'font-size-12', size: '0.75rem', px: '12px', lineHeight: '1rem', usage: 'Labels, captions' },
  { name: 'font-size-14', size: '0.875rem', px: '14px', lineHeight: '1.25rem', usage: 'Small text, helper text' },
  { name: 'font-size-16', size: '1rem', px: '16px', lineHeight: '1.5rem', usage: 'Body text (default)' },
  { name: 'font-size-18', size: '1.125rem', px: '18px', lineHeight: '1.75rem', usage: 'Large body text' },
  { name: 'font-size-20', size: '1.25rem', px: '20px', lineHeight: '1.875rem', usage: 'Small headings' },
  { name: 'font-size-24', size: '1.5rem', px: '24px', lineHeight: '2rem', usage: 'Section headings' },
  { name: 'font-size-30', size: '1.875rem', px: '30px', lineHeight: '2.25rem', usage: 'Page headings' },
  { name: 'font-size-36', size: '2.25rem', px: '36px', lineHeight: '2.5rem', usage: 'Large headings' },
  { name: 'font-size-48', size: '3rem', px: '48px', lineHeight: '3rem', usage: 'Hero headings' },
  { name: 'font-size-60', size: '3.75rem', px: '60px', lineHeight: '3.75rem', usage: 'Display text' },
]

export default function TypographyPage() {
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
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Typography</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Typography scale using numeric naming based on pixel values. All font sizes and line heights 
            are defined as CSS variables for consistency.
          </p>
        </div>

        {/* Typography Scale */}
        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Typography Scale</CardTitle>
            <CardDescription>
              Font sizes and line heights using numeric naming (e.g., font-size-16 for 16px)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-4">
              {typographyScale.map((item) => (
                <div key={item.name} className="ds-flex ds-items-center ds-gap-6 ds-p-4 ds-rounded-lg ds-bg-background-secondary ds-border ds-border-border">
                  <div className="ds-flex-1">
                    <div className="ds-font-mono ds-text-sm ds-font-medium ds-text-text ds-mb-1">
                      {item.name}
                    </div>
                    <div className="ds-text-xs ds-text-text-secondary ds-font-mono">
                      {item.size} / {item.lineHeight}
                    </div>
                    <div className="ds-text-xs ds-text-text-tertiary ds-mt-1">
                      {item.usage}
                    </div>
                  </div>
                  <div 
                    className="ds-text-text ds-font-sans"
                    style={{ 
                      fontSize: `var(--${item.name})`,
                      lineHeight: `var(--line-height-${item.px.replace('px', '')})`
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Font Families */}
        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Font Families</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-4">
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Sans Serif</h3>
                <p className="ds-text-text-secondary ds-mb-2 ds-font-mono ds-text-sm">
                  var(--font-sans)
                </p>
                <p className="ds-text-text" style={{ fontFamily: 'var(--font-sans)' }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Monospace</h3>
                <p className="ds-text-text-secondary ds-mb-2 ds-font-mono ds-text-sm">
                  var(--font-mono)
                </p>
                <p className="ds-text-text ds-font-mono">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Use typography tokens via Tailwind classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
              <code>{`// Font sizes
<h1 className="ds-text-4xl">Heading</h1>
<p className="ds-text-base">Body text</p>
<span className="ds-text-sm">Small text</span>

// Font families
<div className="ds-font-sans">Sans serif text</div>
<code className="ds-font-mono">Monospace code</code>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

