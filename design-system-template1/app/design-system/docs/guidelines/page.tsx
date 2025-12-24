import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function GuidelinesPage() {
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
            Component Guidelines
          </h1>
          <p className="ds-text-xl ds-text-text-secondary ds-leading-relaxed">
            Best practices and patterns for using components effectively
          </p>
        </div>

        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Atomic Design Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-6">
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Components</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Start with components - basic building blocks like Button, Input, Badge. These are the smallest, 
                  most fundamental elements that cannot be broken down further.
                </p>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Patterns</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Combine components to create patterns - simple UI components like TextField (Input + Label), 
                  Card (Container + Content), or Alert (Icon + Text).
                </p>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Layouts</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Build complex layouts from patterns and components - components like Navbar, Table, or 
                  DataCard that form distinct interface sections.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-4">
              <div className="ds-flex ds-gap-3">
                <CheckCircle2 className="ds-w-5 ds-h-5 ds-text-success-600 ds-flex-shrink-0 ds-mt-0.5" />
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Use Design Tokens</h4>
                  <p className="ds-text-text-secondary">
                    Always use design tokens instead of hard-coded values for colors, spacing, and typography.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-gap-3">
                <CheckCircle2 className="ds-w-5 ds-h-5 ds-text-success-600 ds-flex-shrink-0 ds-mt-0.5" />
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Compose from Smaller Parts</h4>
                  <p className="ds-text-text-secondary">
                    Build complex components by composing basic components and patterns rather than creating monolithic components.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-gap-3">
                <CheckCircle2 className="ds-w-5 ds-h-5 ds-text-success-600 ds-flex-shrink-0 ds-mt-0.5" />
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Maintain Accessibility</h4>
                  <p className="ds-text-text-secondary">
                    All components are accessible by default. Don't override accessibility features without good reason.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-gap-3">
                <XCircle className="ds-w-5 ds-h-5 ds-text-error-600 ds-flex-shrink-0 ds-mt-0.5" />
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Avoid Inline Styles</h4>
                  <p className="ds-text-text-secondary">
                    Use Tailwind classes with the ds- prefix instead of inline styles for consistency.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="ds-text-2xl">Naming Conventions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-4">
              <div>
                <h4 className="ds-font-semibold ds-text-text ds-mb-2">Component Names</h4>
                <p className="ds-text-text-secondary ds-mb-2">
                  Use PascalCase for component names: <code className="ds-bg-background-secondary ds-px-1 ds-rounded">Button</code>, 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> TextField</code>, 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> DataCard</code>
                </p>
              </div>
              <div>
                <h4 className="ds-font-semibold ds-text-text ds-mb-2">CSS Classes</h4>
                <p className="ds-text-text-secondary ds-mb-2">
                  All Tailwind classes must use the <code className="ds-bg-background-secondary ds-px-1 ds-rounded">ds-</code> prefix: 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> ds-bg-primary</code>, 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> ds-p-6</code>, 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> ds-rounded-lg</code>
                </p>
              </div>
              <div>
                <h4 className="ds-font-semibold ds-text-text ds-mb-2">File Structure</h4>
                <p className="ds-text-text-secondary">
                  Organize components by atomic design level: <code className="ds-bg-background-secondary ds-px-1 ds-rounded">components/</code>, 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> patterns/</code>, 
                  <code className="ds-bg-background-secondary ds-px-1 ds-rounded"> layouts/</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

