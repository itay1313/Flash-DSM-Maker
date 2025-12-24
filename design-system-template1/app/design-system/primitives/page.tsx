import Link from 'next/link'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { 
  MousePointer, 
  Type, 
  CheckSquare, 
  ToggleLeft, 
  Circle, 
  Tag,
  Badge as BadgeIcon,
  MessageSquare,
  Info
} from 'lucide-react'

const components = [
  {
    name: 'Button',
    description: 'Primary action component with multiple variants and sizes',
    href: '/design-system/primitives/button',
    icon: MousePointer,
    variants: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    sizes: ['sm', 'md', 'lg']
  },
  {
    name: 'Input',
    description: 'Text input field with focus states and validation',
    href: '/design-system/primitives/input',
    icon: Type,
    variants: ['text', 'email', 'password', 'number'],
  },
  {
    name: 'Textarea',
    description: 'Multi-line text input with auto-resize support',
    href: '/design-system/primitives/textarea',
    icon: MessageSquare,
  },
  {
    name: 'Select',
    description: 'Dropdown select with search and multi-select support',
    href: '/design-system/primitives/select',
    icon: Circle,
  },
  {
    name: 'Checkbox',
    description: 'Checkbox input with indeterminate state support',
    href: '/design-system/primitives/checkbox',
    icon: CheckSquare,
  },
  {
    name: 'Radio',
    description: 'Radio button group for single selection',
    href: '/design-system/primitives/radio',
    icon: Circle,
  },
  {
    name: 'Switch',
    description: 'Toggle switch for boolean values',
    href: '/design-system/primitives/switch',
    icon: ToggleLeft,
  },
  {
    name: 'Badge',
    description: 'Status indicator with multiple variants',
    href: '/design-system/primitives/badge',
    icon: BadgeIcon,
    variants: ['default', 'secondary', 'outline', 'success', 'warning', 'error']
  },
  {
    name: 'Tag',
    description: 'Removable tag component for labels and filters',
    href: '/design-system/primitives/tag',
    icon: Tag,
    variants: ['default', 'primary', 'secondary', 'success', 'warning', 'error']
  },
]

export default function PrimitivesPage() {
  return (
    <main className="min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-12">
        <div className="ds-mb-8">
          <Link href="/design-system" className="ds-text-text-secondary hover:ds-text-text ds-transition-colors">
            ← Back to Design System
          </Link>
        </div>

        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">
            Primitives
          </h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Basic building blocks for all UI components. These are the foundational elements 
            that other components are built upon.
          </p>
        </div>

        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6">
          {components.map((component) => {
            const Icon = component.icon
            return (
              <Link key={component.name} href={component.href}>
                <Card className="ds-h-full ds-transition-all hover:ds-shadow-lg hover:ds-border-primary-200 ds-cursor-pointer">
                  <CardHeader>
                    <div className="ds-w-12 ds-h-12 ds-rounded-lg ds-bg-primary-100 ds-flex ds-items-center ds-justify-center ds-mb-4">
                      <Icon className="ds-h-6 ds-w-6 ds-text-primary" />
                    </div>
                    <CardTitle>{component.name}</CardTitle>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {component.variants && (
                      <div className="ds-mb-3">
                        <p className="ds-text-xs ds-font-medium ds-text-text-secondary ds-mb-2">Variants:</p>
                        <div className="ds-flex ds-flex-wrap ds-gap-1">
                          {component.variants.map((variant) => (
                            <span
                              key={variant}
                              className="ds-px-2 ds-py-0.5 ds-text-xs ds-font-medium ds-rounded ds-bg-background-secondary ds-text-text-secondary"
                            >
                              {variant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {component.sizes && (
                      <div>
                        <p className="ds-text-xs ds-font-medium ds-text-text-secondary ds-mb-2">Sizes:</p>
                        <div className="ds-flex ds-flex-wrap ds-gap-1">
                          {component.sizes.map((size) => (
                            <span
                              key={size}
                              className="ds-px-2 ds-py-0.5 ds-text-xs ds-font-medium ds-rounded ds-bg-background-secondary ds-text-text-secondary"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

