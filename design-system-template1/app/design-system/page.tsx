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
  Sparkles,
  ArrowRight,
  BookOpen,
  Shield,
  Code
} from 'lucide-react'

const categories = [
  {
    name: 'Foundation',
    description: 'Design tokens, typography, spacing, and icons',
    icon: Palette,
    href: '/design-system/foundation',
    color: 'primary',
    components: ['Tokens', 'Typography', 'Spacing', 'Icons']
  },
  {
    name: 'Components',
    description: 'Basic building blocks for all UI components',
    icon: Box,
    href: '/design-system/components',
    color: 'secondary',
    components: ['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Badge', 'Tag']
  },
  {
    name: 'Patterns',
    description: 'Simple combinations of components',
    icon: Layers,
    href: '/design-system/patterns',
    color: 'info',
    components: ['TextField', 'Card', 'Alert', 'Toast', 'Spinner']
  },
  {
    name: 'Layouts',
    description: 'Complex layout components',
    icon: Navigation,
    href: '/design-system/layouts',
    color: 'success',
    components: ['Navbar', 'Sidebar', 'Table', 'DataCard']
  }
]

export default function DesignSystemPage() {
  return (
    <main className="ds-min-h-screen ds-bg-background">
      {/* Hero Header */}
      <div className="ds-relative ds-overflow-hidden ds-border-b ds-border-border ds-bg-gradient-to-br ds-from-primary-50/30 ds-via-background ds-to-secondary-50/20">
        <div className="ds-absolute ds-inset-0 ds-bg-grid-pattern ds-opacity-5" />
        <div className="ds-relative ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-16">
          <div className="ds-max-w-3xl">
            <div className="ds-inline-flex ds-items-center ds-gap-2 ds-px-3 ds-py-1.5 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-text-sm ds-font-medium ds-mb-6 ds-border ds-border-primary-200">
              <Sparkles className="ds-w-4 ds-h-4" />
              <span>Component Library</span>
            </div>
            <h1 className="ds-text-4xl md:ds-text-5xl lg:ds-text-6xl ds-font-bold ds-mb-4 ds-text-text ds-leading-tight">
              Design System
            </h1>
            <p className="ds-text-lg md:ds-text-xl ds-text-text-secondary ds-leading-relaxed ds-mb-8">
              A comprehensive, accessible component library built for modern SaaS applications. 
              Token-driven, type-safe, and ready to scale.
            </p>
            <div className="ds-flex ds-flex-wrap ds-gap-3">
              <Link 
                href="/design-system/components"
                className="ds-inline-flex ds-items-center ds-gap-2 ds-px-4 ds-py-2 ds-bg-primary ds-text-text-inverse ds-rounded-lg ds-font-medium ds-transition-all hover:ds-bg-primary-700 hover:ds-shadow-md"
              >
                <Box className="ds-w-4 ds-h-4" />
                Explore Components
                <ArrowRight className="ds-w-4 ds-h-4" />
              </Link>
              <Link 
                href="/design-system/foundation"
                className="ds-inline-flex ds-items-center ds-gap-2 ds-px-4 ds-py-2 ds-bg-background-secondary ds-text-text ds-rounded-lg ds-font-medium ds-border ds-border-border ds-transition-all hover:ds-bg-background-tertiary hover:ds-shadow-sm"
              >
                <Palette className="ds-w-4 ds-h-4" />
                Foundation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-16">
        {/* Categories Grid */}
        <div className="ds-mb-16">
          <div className="ds-text-center ds-mb-12">
            <h2 className="ds-text-3xl md:ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">
              Explore by Category
            </h2>
            <p className="ds-text-lg ds-text-text-secondary ds-max-w-2xl ds-mx-auto">
              Browse components organized by atomic design principles
            </p>
          </div>
          <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-4 ds-gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
                  <CardHeader>
                    <div className={`ds-w-12 ds-h-12 ds-rounded-xl ds-bg-${category.color}-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300`}>
                      <Icon className={`ds-w-6 ds-h-6 ds-text-${category.color}-600`} />
                    </div>
                    <CardTitle className="ds-text-xl ds-mb-2">{category.name}</CardTitle>
                    <CardDescription className="ds-text-base ds-leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="ds-flex ds-flex-wrap ds-gap-2">
                      {category.components.slice(0, 4).map((component) => (
                        <span
                          key={component}
                          className="ds-px-2.5 ds-py-1 ds-text-xs ds-font-medium ds-rounded-md ds-bg-background-secondary ds-text-text-secondary ds-border ds-border-border"
                        >
                          {component}
                        </span>
                      ))}
                      {category.components.length > 4 && (
                        <span className="ds-px-2.5 ds-py-1 ds-text-xs ds-font-medium ds-rounded-md ds-bg-background-secondary ds-text-text-secondary ds-border ds-border-border">
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
        </div>

        {/* Quick Links */}
        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 ds-gap-6">
          <Card className="ds-border-2">
            <CardHeader>
              <CardTitle className="ds-text-2xl">Documentation</CardTitle>
              <CardDescription className="ds-text-base">
                Learn how to use the design system, understand design tokens, and follow best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ds-space-y-2">
                <Button variant="ghost" className="ds-w-full ds-justify-start ds-h-auto ds-py-3" asChild>
                  <Link href="/design-system/docs/getting-started">
                    <BookOpen className="ds-mr-2 ds-w-4 ds-h-4" />
                    Getting Started
                    <ArrowRight className="ds-ml-auto ds-w-4 ds-h-4 ds-opacity-0 ds-group-hover:ds-opacity-100 ds-transition-opacity" />
                  </Link>
                </Button>
                <Button variant="ghost" className="ds-w-full ds-justify-start ds-h-auto ds-py-3" asChild>
                  <Link href="/design-system/foundation">
                    <Palette className="ds-mr-2 ds-w-4 ds-h-4" />
                    Foundation
                    <ArrowRight className="ds-ml-auto ds-w-4 ds-h-4 ds-opacity-0 ds-group-hover:ds-opacity-100 ds-transition-opacity" />
                  </Link>
                </Button>
                <Button variant="ghost" className="ds-w-full ds-justify-start ds-h-auto ds-py-3" asChild>
                  <Link href="/design-system/docs/guidelines">
                    <Layers className="ds-mr-2 ds-w-4 ds-h-4" />
                    Component Guidelines
                    <ArrowRight className="ds-ml-auto ds-w-4 ds-h-4 ds-opacity-0 ds-group-hover:ds-opacity-100 ds-transition-opacity" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="ds-border-2">
            <CardHeader>
              <CardTitle className="ds-text-2xl">Resources</CardTitle>
              <CardDescription className="ds-text-base">
                Additional resources and tools to help you build with the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ds-space-y-2">
                <Button variant="ghost" className="ds-w-full ds-justify-start ds-h-auto ds-py-3" asChild>
                  <Link href="/design-system/examples">
                    <Code className="ds-mr-2 ds-w-4 ds-h-4" />
                    Code Examples
                    <ArrowRight className="ds-ml-auto ds-w-4 ds-h-4 ds-opacity-0 ds-group-hover:ds-opacity-100 ds-transition-opacity" />
                  </Link>
                </Button>
                <Button variant="ghost" className="ds-w-full ds-justify-start ds-h-auto ds-py-3" asChild>
                  <Link href="/design-system/migration">
                    <ArrowRight className="ds-mr-2 ds-w-4 ds-h-4" />
                    Migration Guide
                    <ArrowRight className="ds-ml-auto ds-w-4 ds-h-4 ds-opacity-0 ds-group-hover:ds-opacity-100 ds-transition-opacity" />
                  </Link>
                </Button>
                <Button variant="ghost" className="ds-w-full ds-justify-start ds-h-auto ds-py-3" asChild>
                  <Link href="/design-system/accessibility">
                    <Shield className="ds-mr-2 ds-w-4 ds-h-4" />
                    Accessibility
                    <ArrowRight className="ds-ml-auto ds-w-4 ds-h-4 ds-opacity-0 ds-group-hover:ds-opacity-100 ds-transition-opacity" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
