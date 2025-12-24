import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { Code, Package, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function GettingStartedPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-4xl ds-mx-auto ds-px-6 ds-py-12">
        {/* Header */}
        <div className="ds-mb-12">
          <Link 
            href="/design-system/docs"
            className="ds-inline-flex ds-items-center ds-gap-2 ds-text-text-secondary hover:ds-text-text ds-mb-6 ds-transition-colors"
          >
            <ArrowRight className="ds-w-4 ds-h-4 ds-rotate-180" />
            Back to Documentation
          </Link>
          <h1 className="ds-text-4xl md:ds-text-5xl ds-font-bold ds-mb-4 ds-text-text ds-leading-tight">
            Getting Started
          </h1>
          <p className="ds-text-xl ds-text-text-secondary ds-leading-relaxed">
            Quick start guide to begin using the design system in your project
          </p>
        </div>

        {/* Installation */}
        <Card className="ds-mb-8">
          <CardHeader>
            <div className="ds-flex ds-items-center ds-gap-3 ds-mb-2">
              <Package className="ds-w-6 ds-h-6 ds-text-primary-600" />
              <CardTitle className="ds-text-2xl">Installation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="ds-text-text-secondary ds-mb-4">
              The design system is already included in this project. If you're starting a new project, install the dependencies:
            </p>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
              <code>{`npm install
# or
yarn install`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Basic Usage */}
        <Card className="ds-mb-8">
          <CardHeader>
            <div className="ds-flex ds-items-center ds-gap-3 ds-mb-2">
              <Code className="ds-w-6 ds-h-6 ds-text-primary-600" />
              <CardTitle className="ds-text-2xl">Basic Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="ds-text-text-secondary ds-mb-4">
              Import components from the design system:
            </p>
            <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800 ds-mb-4">
              <code>{`import { Button, TextField, Card } from '@/design-system'

function MyComponent() {
  return (
    <Card className="ds-p-6">
      <TextField label="Email" placeholder="you@example.com" />
      <Button className="ds-mt-4">Submit</Button>
    </Card>
  )
}`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Atomic Design Structure */}
        <Card className="ds-mb-8">
          <CardHeader>
            <div className="ds-flex ds-items-center ds-gap-3 ds-mb-2">
              <FileText className="ds-w-6 ds-h-6 ds-text-primary-600" />
              <CardTitle className="ds-text-2xl">Atomic Design Structure</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="ds-text-text-secondary ds-mb-6">
              Our design system follows Atomic Design principles:
            </p>
            <div className="ds-space-y-4">
              <div className="ds-p-4 ds-rounded-lg ds-bg-background-secondary ds-border ds-border-border">
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Components</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Basic building blocks: Button, Input, Badge, Icon
                </p>
                <Link href="/design-system/components" className="ds-text-primary-600 hover:ds-text-primary-700 ds-text-sm ds-font-medium">
                  Browse Components →
                </Link>
              </div>
              <div className="ds-p-4 ds-rounded-lg ds-bg-background-secondary ds-border ds-border-border">
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Patterns</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Simple combinations: TextField, Card, Alert
                </p>
                <Link href="/design-system/patterns" className="ds-text-primary-600 hover:ds-text-primary-700 ds-text-sm ds-font-medium">
                  Browse Patterns →
                </Link>
              </div>
              <div className="ds-p-4 ds-rounded-lg ds-bg-background-secondary ds-border ds-border-border">
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Layouts</h3>
                <p className="ds-text-text-secondary ds-mb-2">
                  Complex components: Navbar, Table, DataCard
                </p>
                <Link href="/design-system/layouts" className="ds-text-primary-600 hover:ds-text-primary-700 ds-text-sm ds-font-medium">
                  Browse Layouts →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="ds-text-2xl">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-3">
              <Link href="/design-system/docs/tokens" className="ds-block ds-p-4 ds-rounded-lg ds-bg-background-secondary hover:ds-bg-background-tertiary ds-transition-colors">
                <div className="ds-font-semibold ds-text-text ds-mb-1">Learn about Design Tokens</div>
                <div className="ds-text-sm ds-text-text-secondary">Understand colors, spacing, and typography</div>
              </Link>
              <Link href="/design-system/docs/guidelines" className="ds-block ds-p-4 ds-rounded-lg ds-bg-background-secondary hover:ds-bg-background-tertiary ds-transition-colors">
                <div className="ds-font-semibold ds-text-text ds-mb-1">Read Component Guidelines</div>
                <div className="ds-text-sm ds-text-text-secondary">Best practices for using components</div>
              </Link>
              <Link href="/design-system" className="ds-block ds-p-4 ds-rounded-lg ds-bg-background-secondary hover:ds-bg-background-tertiary ds-transition-colors">
                <div className="ds-font-semibold ds-text-text ds-mb-1">Explore Components</div>
                <div className="ds-text-sm ds-text-text-secondary">Browse all available components</div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

