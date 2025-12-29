import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function MigrationPage() {
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
            Migration Guide
          </h1>
          <p className="ds-text-xl ds-text-text-secondary ds-leading-relaxed">
            Step-by-step guide to migrate from legacy components to the new design system
          </p>
        </div>

        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Migration Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="ds-text-text-secondary ds-mb-4">
              We recommend a gradual, incremental migration approach rather than a big-bang replacement. 
              This allows you to migrate components one at a time while maintaining a working application.
            </p>
            <div className="ds-space-y-3">
              <div className="ds-flex ds-items-start ds-gap-3">
                <div className="ds-w-6 ds-h-6 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-flex ds-items-center ds-justify-center ds-font-bold ds-text-sm ds-flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Identify Components</h4>
                  <p className="ds-text-text-secondary">
                    List all components that need migration and prioritize by usage frequency.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-items-start ds-gap-3">
                <div className="ds-w-6 ds-h-6 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-flex ds-items-center ds-justify-center ds-font-bold ds-text-sm ds-flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Update Imports</h4>
                  <p className="ds-text-text-secondary">
                    Replace legacy component imports with new design system imports.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-items-start ds-gap-3">
                <div className="ds-w-6 ds-h-6 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-flex ds-items-center ds-justify-center ds-font-bold ds-text-sm ds-flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Update Props</h4>
                  <p className="ds-text-text-secondary">
                    Adjust component props to match the new API. Most props remain the same.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-items-start ds-gap-3">
                <div className="ds-w-6 ds-h-6 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-flex ds-items-center ds-justify-center ds-font-bold ds-text-sm ds-flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Update Styles</h4>
                  <p className="ds-text-text-secondary">
                    Replace custom CSS classes with Tailwind classes using the ds- prefix.
                  </p>
                </div>
              </div>
              <div className="ds-flex ds-items-start ds-gap-3">
                <div className="ds-w-6 ds-h-6 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-flex ds-items-center ds-justify-center ds-font-bold ds-text-sm ds-flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="ds-font-semibold ds-text-text ds-mb-1">Test & Verify</h4>
                  <p className="ds-text-text-secondary">
                    Test each migrated component thoroughly before moving to the next.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle className="ds-text-2xl">Common Migration Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-6">
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Button Migration</h3>
                <div className="ds-p-4 ds-rounded-lg ds-bg-background-secondary">
                  <p className="ds-text-sm ds-text-text-secondary ds-mb-2">Before:</p>
                  <pre className="ds-p-3 ds-rounded ds-bg-neutral-900 ds-text-neutral-100 ds-text-xs ds-font-mono ds-overflow-x-auto">
                    <code>{`<button className="btn btn-primary">Click</button>`}</code>
                  </pre>
                  <p className="ds-text-sm ds-text-text-secondary ds-mb-2 ds-mt-3">After:</p>
                  <pre className="ds-p-3 ds-rounded ds-bg-neutral-900 ds-text-neutral-100 ds-text-xs ds-font-mono ds-overflow-x-auto">
                    <code>{`import { Button } from '@/design-system'
<Button variant="primary">Click</Button>`}</code>
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="ds-font-semibold ds-text-lg ds-mb-2 ds-text-text">Input Migration</h3>
                <div className="ds-p-4 ds-rounded-lg ds-bg-background-secondary">
                  <p className="ds-text-sm ds-text-text-secondary ds-mb-2">Before:</p>
                  <pre className="ds-p-3 ds-rounded ds-bg-neutral-900 ds-text-neutral-100 ds-text-xs ds-font-mono ds-overflow-x-auto">
                    <code>{`<input type="text" className="form-input" />`}</code>
                  </pre>
                  <p className="ds-text-sm ds-text-text-secondary ds-mb-2 ds-mt-3">After:</p>
                  <pre className="ds-p-3 ds-rounded ds-bg-neutral-900 ds-text-neutral-100 ds-text-xs ds-font-mono ds-overflow-x-auto">
                    <code>{`import { TextField } from '@/design-system'
<TextField label="Name" placeholder="Enter name" />`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="ds-flex ds-items-start ds-gap-3">
              <AlertCircle className="ds-w-6 ds-h-6 ds-text-warning-600 ds-flex-shrink-0 ds-mt-1" />
              <div>
                <CardTitle className="ds-text-2xl">Need Help?</CardTitle>
                <CardDescription>
                  If you encounter issues during migration, check the component documentation or reach out to the team.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="ds-space-y-2">
              <Link href="/design-system" className="ds-block ds-p-3 ds-rounded-lg ds-bg-background-secondary hover:ds-bg-background-tertiary ds-transition-colors">
                <div className="ds-font-semibold ds-text-text">Browse Components</div>
                <div className="ds-text-sm ds-text-text-secondary">View all available components and their APIs</div>
              </Link>
              <Link href="/design-system/docs/guidelines" className="ds-block ds-p-3 ds-rounded-lg ds-bg-background-secondary hover:ds-bg-background-tertiary ds-transition-colors">
                <div className="ds-font-semibold ds-text-text">Component Guidelines</div>
                <div className="ds-text-sm ds-text-text-secondary">Best practices and patterns</div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

