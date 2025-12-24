import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { ArrowRight, Palette } from 'lucide-react'
import Link from 'next/link'

export default function TokensDocsPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-4xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <Link 
            href="/design-system/docs"
            className="ds-inline-flex ds-items-center ds-gap-2 ds-text-text-secondary hover:ds-text-text ds-mb-6 ds-transition-colors"
          >
            <ArrowRight className="ds-w-4 ds-h-4 ds-rotate-180" />
            Back to Documentation
          </Link>
          <h1 className="ds-text-4xl md:ds-text-5xl ds-font-bold ds-mb-4 ds-text-text ds-leading-tight">
            Design Tokens
          </h1>
          <p className="ds-text-xl ds-text-text-secondary ds-leading-relaxed">
            Understand how design tokens work and how to use them in your components
          </p>
        </div>

        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">What are Design Tokens?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="ds-text-text-secondary ds-mb-4">
              Design tokens are the visual design atoms of the design system — specifically, they are named entities 
              that store visual design attributes. We use them in place of hard-coded values to maintain consistency 
              and enable theming.
            </p>
            <p className="ds-text-text-secondary">
              All tokens are defined as CSS variables, making them easy to override and customize for different themes.
            </p>
          </CardContent>
        </Card>

        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Token Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-4">
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Colors</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Semantic color tokens for primary, secondary, success, warning, error, and info states.
                </p>
                <code className="ds-text-sm ds-font-mono ds-bg-background-secondary ds-px-2 ds-py-1 ds-rounded">
                  --color-primary-600
                </code>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Typography</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Font sizes and line heights using numeric naming (e.g., font-size-16 for 16px).
                </p>
                <code className="ds-text-sm ds-font-mono ds-bg-background-secondary ds-px-2 ds-py-1 ds-rounded">
                  --font-size-16, --line-height-24
                </code>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Spacing</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Consistent spacing scale based on 4px increments.
                </p>
                <code className="ds-text-sm ds-font-mono ds-bg-background-secondary ds-px-2 ds-py-1 ds-rounded">
                  --spacing-4, --spacing-8, --spacing-16
                </code>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Border Radius</h3>
                <p className="ds-text-secondary ds-mb-2">
                  Border radius values using numeric naming (e.g., radius-8 for 8px).
                </p>
                <code className="ds-text-sm ds-font-mono ds-bg-background-secondary ds-px-2 ds-py-1 ds-rounded">
                  --radius-6, --radius-12, --radius-24
                </code>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Shadows</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Elevation system for depth and hierarchy.
                </p>
                <code className="ds-text-sm ds-font-mono ds-bg-background-secondary ds-px-2 ds-py-1 ds-rounded">
                  --shadow-sm, --shadow-md, --shadow-lg
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="ds-text-2xl">Using Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="ds-text-text-secondary ds-mb-4">
              Use tokens via Tailwind CSS classes with the <code className="ds-bg-background-secondary ds-px-1 ds-rounded">ds-</code> prefix:
            </p>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
              <code>{`<div className="ds-bg-primary ds-text-text-inverse ds-p-6 ds-rounded-lg ds-shadow-md">
  Content
</div>`}</code>
            </pre>
          </CardContent>
        </Card>

        <div className="ds-mt-8">
          <Link href="/design-system/tokens">
            <Card className="ds-group ds-transition-all hover:ds-shadow-lg hover:ds-border-primary-200 ds-cursor-pointer">
              <CardContent className="ds-p-6">
                <div className="ds-flex ds-items-center ds-gap-3">
                  <Palette className="ds-w-6 ds-h-6 ds-text-primary-600" />
                  <div className="ds-flex-1">
                    <h3 className="ds-font-semibold ds-text-lg ds-text-text ds-mb-1">
                      View Token Reference
                    </h3>
                    <p className="ds-text-sm ds-text-text-secondary">
                      Explore all available design tokens with live examples
                    </p>
                  </div>
                  <ArrowRight className="ds-w-5 ds-h-5 ds-text-text-secondary ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

