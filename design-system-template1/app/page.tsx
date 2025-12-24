import Link from 'next/link'
import { Button } from '@/design-system'
import { BookOpen, Code, Palette, Zap, Sparkles, Shield, Layers } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-16">
        {/* Hero Section */}
        <div className="ds-text-center ds-mb-16">
          <div className="ds-inline-flex ds-items-center ds-gap-2 ds-px-4 ds-py-2 ds-rounded-full ds-bg-primary-50 ds-text-primary ds-text-sm ds-font-medium ds-mb-6">
            <Sparkles className="ds-h-4 ds-w-4" />
            Production-Ready Design System
          </div>
          <h1 className="ds-text-6xl ds-font-bold ds-mb-6 ds-text-text ds-leading-tight">
            Build Beautiful, Consistent UIs
          </h1>
          <p className="ds-text-xl ds-text-text-secondary ds-mb-10 ds-max-w-3xl ds-mx-auto ds-leading-relaxed">
            A comprehensive, accessible design system built for modern SaaS applications. 
            Token-driven, type-safe, and ready to scale.
          </p>
          <div className="ds-flex ds-gap-4 ds-justify-center ds-flex-wrap">
            <Link href="/design-system">
              <Button size="lg" className="ds-group">
                <Code className="ds-mr-2 ds-h-5 ds-w-5 group-hover:ds-translate-x-1 ds-transition-transform" />
                Explore Components
              </Button>
            </Link>
            <Link href="/design-system/tokens">
              <Button variant="secondary" size="lg">
                <Palette className="ds-mr-2 ds-h-5 ds-w-5" />
                Design Tokens
              </Button>
            </Link>
            <Link href="/design-system/docs">
              <Button variant="tertiary" size="lg">
                <BookOpen className="ds-mr-2 ds-h-5 ds-w-5" />
                Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6 ds-mb-16">
          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary ds-transition-all hover:ds-shadow-lg hover:ds-border-primary-200">
            <div className="ds-w-14 ds-h-14 ds-rounded-xl ds-bg-primary-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
              <Palette className="ds-h-7 ds-w-7 ds-text-primary" />
            </div>
            <h3 className="ds-text-xl ds-font-semibold ds-mb-3 ds-text-text">Token-Driven</h3>
            <p className="ds-text-base ds-text-text-secondary ds-leading-relaxed">
              All design tokens defined as CSS variables for easy theming, dark mode support, and consistent design language across your entire application.
            </p>
          </div>

          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary ds-transition-all hover:ds-shadow-lg hover:ds-border-success-200">
            <div className="ds-w-14 ds-h-14 ds-rounded-xl ds-bg-success-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
              <Shield className="ds-h-7 ds-w-7 ds-text-success" />
            </div>
            <h3 className="ds-text-xl ds-font-semibold ds-mb-3 ds-text-text">Accessible</h3>
            <p className="ds-text-base ds-text-text-secondary ds-leading-relaxed">
              WCAG 2.1 AA compliant components built on Radix UI primitives with full keyboard navigation, ARIA attributes, and screen reader support.
            </p>
          </div>

          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary ds-transition-all hover:ds-shadow-lg hover:ds-border-info-200">
            <div className="ds-w-14 ds-h-14 ds-rounded-xl ds-bg-info-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
              <Code className="ds-h-7 ds-w-7 ds-text-info" />
            </div>
            <h3 className="ds-text-xl ds-font-semibold ds-mb-3 ds-text-text">Type-Safe</h3>
            <p className="ds-text-base ds-text-text-secondary ds-leading-relaxed">
              Full TypeScript support with strongly typed component APIs, variant props, and IntelliSense for faster development and fewer bugs.
            </p>
          </div>

          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary ds-transition-all hover:ds-shadow-lg hover:ds-border-secondary-200">
            <div className="ds-w-14 ds-h-14 ds-rounded-xl ds-bg-secondary-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
              <Zap className="ds-h-7 ds-w-7 ds-text-secondary" />
            </div>
            <h3 className="ds-text-xl ds-font-semibold ds-mb-3 ds-text-text">Production-Ready</h3>
            <p className="ds-text-base ds-text-text-secondary ds-leading-relaxed">
              Battle-tested components with loading states, error handling, and comprehensive edge cases covered. Ready for your next feature.
            </p>
          </div>

          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary ds-transition-all hover:ds-shadow-lg hover:ds-border-warning-200">
            <div className="ds-w-14 ds-h-14 ds-rounded-xl ds-bg-warning-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
              <Layers className="ds-h-7 ds-w-7 ds-text-warning" />
            </div>
            <h3 className="ds-text-xl ds-font-semibold ds-mb-3 ds-text-text">Composable</h3>
            <p className="ds-text-base ds-text-text-secondary ds-leading-relaxed">
              Build complex UIs from simple primitives. Components work together seamlessly, from buttons to forms to complex data displays.
            </p>
          </div>

          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary ds-transition-all hover:ds-shadow-lg hover:ds-border-error-200">
            <div className="ds-w-14 ds-h-14 ds-rounded-xl ds-bg-error-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
              <BookOpen className="ds-h-7 ds-w-7 ds-text-error" />
            </div>
            <h3 className="ds-text-xl ds-font-semibold ds-mb-3 ds-text-text">Well-Documented</h3>
            <p className="ds-text-base ds-text-text-secondary ds-leading-relaxed">
              Comprehensive documentation with live examples, API references, usage guidelines, and migration paths for existing components.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="ds-max-w-5xl ds-mx-auto">
          <div className="ds-text-center ds-mb-12">
            <h2 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Get Started in Minutes</h2>
            <p className="ds-text-lg ds-text-text-secondary ds-max-w-2xl ds-mx-auto">
              Import components, customize tokens, and start building. It's that simple.
            </p>
          </div>
          
          <div className="ds-grid ds-grid-cols-1 lg:ds-grid-cols-2 ds-gap-6 ds-mb-12">
            <div className="ds-p-6 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary">
              <h3 className="ds-text-lg ds-font-semibold ds-mb-3 ds-text-text">1. Import Components</h3>
              <pre className="ds-p-4 ds-rounded-lg ds-bg-background ds-border ds-border-border ds-text-sm ds-font-mono ds-overflow-x-auto">
                <code>{`import { 
  Button, 
  TextField, 
  Card,
  Select,
  Checkbox 
} from '@/design-system'`}</code>
              </pre>
            </div>

            <div className="ds-p-6 ds-rounded-xl ds-border ds-border-border ds-bg-background-secondary">
              <h3 className="ds-text-lg ds-font-semibold ds-mb-3 ds-text-text">2. Use Components</h3>
              <pre className="ds-p-4 ds-rounded-lg ds-bg-background ds-border ds-border-border ds-text-sm ds-font-mono ds-overflow-x-auto">
                <code>{`function MyForm() {
  return (
    <Card className="ds-p-6">
      <TextField 
        label="Email" 
        placeholder="you@example.com" 
      />
      <Button variant="primary">
        Submit
      </Button>
    </Card>
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div className="ds-p-8 ds-rounded-xl ds-border ds-border-border ds-bg-gradient-to-br ds-from-primary-50 ds-to-secondary-50">
            <div className="ds-flex ds-items-start ds-gap-4">
              <div className="ds-flex-shrink-0 ds-w-12 ds-h-12 ds-rounded-lg ds-bg-primary ds-flex ds-items-center ds-justify-center">
                <Sparkles className="ds-h-6 ds-w-6 ds-text-text-inverse" />
              </div>
              <div className="ds-flex-1">
                <h3 className="ds-text-xl ds-font-semibold ds-mb-2 ds-text-text">Ready to Build?</h3>
                <p className="ds-text-base ds-text-text-secondary ds-mb-4">
                  Explore all components, see live examples, and copy code snippets. Everything you need to build beautiful, consistent UIs.
                </p>
                <Link href="/design-system">
                  <Button size="lg">
                    Browse Component Library →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
