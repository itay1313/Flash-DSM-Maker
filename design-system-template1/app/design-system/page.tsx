import Link from 'next/link'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { 
  Box, 
  Palette, 
  MousePointer, 
  Layout, 
  Navigation, 
  FormInput,
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react'

const categories = [
  {
    name: 'Primitives',
    description: 'Basic building blocks for all UI components',
    icon: Box,
    href: '/design-system/primitives',
    color: 'primary',
    components: ['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Badge', 'Tag']
  },
  {
    name: 'Form Controls',
    description: 'Complete form fields with labels, hints, and validation',
    icon: FormInput,
    href: '/design-system/forms',
    color: 'secondary',
    components: ['TextField', 'SelectField', 'CheckboxField', 'SwitchField', 'TextareaField']
  },
  {
    name: 'Layout',
    description: 'Structure and container components',
    icon: Layout,
    href: '/design-system/layout',
    color: 'info',
    components: ['Card', 'Grid', 'Container', 'Stack', 'DashboardWidget']
  },
  {
    name: 'Navigation',
    description: 'Navigation and wayfinding components',
    icon: Navigation,
    href: '/design-system/navigation',
    color: 'success',
    components: ['Navbar', 'Sidebar', 'Breadcrumb', 'Tabs', 'DropdownMenu']
  },
  {
    name: 'Feedback',
    description: 'Loading states, alerts, and user feedback',
    icon: AlertCircle,
    href: '/design-system/feedback',
    color: 'warning',
    components: ['Spinner', 'Skeleton', 'Toast', 'Alert', 'ProgressBar']
  },
  {
    name: 'Overlays',
    description: 'Modals, dialogs, and popover components',
    icon: Layers,
    href: '/design-system/overlays',
    color: 'error',
    components: ['Dialog', 'Modal', 'Tooltip', 'Popover', 'Dropdown']
  },
  {
    name: 'Data Display',
    description: 'Tables, lists, and data visualization',
    icon: Sparkles,
    href: '/design-system/data-display',
    color: 'secondary',
    components: ['Table', 'DataCard', 'Avatar', 'Pagination']
  },
  {
    name: 'Design Tokens',
    description: 'Colors, spacing, typography, and theming',
    icon: Palette,
    href: '/design-system/tokens',
    color: 'primary',
    components: ['Colors', 'Typography', 'Spacing', 'Shadows', 'Radius']
  }
]

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-12">
        {/* Header */}
        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">
            Design System
          </h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            A comprehensive component library built for modern SaaS applications. 
            Explore components, view examples, and copy code snippets.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6 ds-mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="ds-h-full ds-transition-all hover:ds-shadow-lg hover:ds-border-primary-200 ds-cursor-pointer">
                  <CardHeader>
                    <div className={`ds-w-12 ds-h-12 ds-rounded-lg ds-bg-${category.color}-100 ds-flex ds-items-center ds-justify-center ds-mb-4`}>
                      <Icon className={`ds-h-6 ds-w-6 ds-text-${category.color}`} />
                    </div>
                    <CardTitle className="ds-text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="ds-flex ds-flex-wrap ds-gap-2">
                      {category.components.slice(0, 4).map((component) => (
                        <span
                          key={component}
                          className="ds-px-2 ds-py-1 ds-text-xs ds-font-medium ds-rounded ds-bg-background-secondary ds-text-text-secondary"
                        >
                          {component}
                        </span>
                      ))}
                      {category.components.length > 4 && (
                        <span className="ds-px-2 ds-py-1 ds-text-xs ds-font-medium ds-rounded ds-bg-background-secondary ds-text-text-secondary">
                          +{category.components.length - 4}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Links */}
        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 ds-gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Learn how to use the design system, understand design tokens, and follow best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ds-space-y-2">
                <Link href="/design-system/docs/getting-started">
                  <Button variant="ghost" className="ds-w-full ds-justify-start">
                    Getting Started
                  </Button>
                </Link>
                <Link href="/design-system/docs/tokens">
                  <Button variant="ghost" className="ds-w-full ds-justify-start">
                    Design Tokens
                  </Button>
                </Link>
                <Link href="/design-system/docs/guidelines">
                  <Button variant="ghost" className="ds-w-full ds-justify-start">
                    Component Guidelines
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                Additional resources and tools to help you build with the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ds-space-y-2">
                <Link href="/design-system/examples">
                  <Button variant="ghost" className="ds-w-full ds-justify-start">
                    Code Examples
                  </Button>
                </Link>
                <Link href="/design-system/migration">
                  <Button variant="ghost" className="ds-w-full ds-justify-start">
                    Migration Guide
                  </Button>
                </Link>
                <Link href="/design-system/accessibility">
                  <Button variant="ghost" className="ds-w-full ds-justify-start">
                    Accessibility
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

