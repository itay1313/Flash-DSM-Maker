import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { MousePointer, Type, CheckSquare, ToggleLeft, Circle, Tag, Badge as BadgeIcon, Sparkles, Minus } from 'lucide-react'

const components = [
  {
    name: 'Button',
    description: 'Primary action component with multiple variants and sizes',
    href: '/design-system/components/button',
    icon: MousePointer,
    variants: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
  },
  {
    name: 'Input',
    description: 'Text input field with focus states and validation',
    href: '/design-system/components/input',
    icon: Type,
  },
  {
    name: 'Textarea',
    description: 'Multi-line text input with auto-resize support',
    href: '/design-system/components/textarea',
    icon: Type,
  },
  {
    name: 'Select',
    description: 'Dropdown select with search and multi-select support',
    href: '/design-system/components/select',
    icon: Circle,
  },
  {
    name: 'Checkbox',
    description: 'Checkbox input with indeterminate state support',
    href: '/design-system/components/checkbox',
    icon: CheckSquare,
  },
  {
    name: 'Radio',
    description: 'Radio button group for single selection',
    href: '/design-system/components/radio',
    icon: Circle,
  },
  {
    name: 'Switch',
    description: 'Toggle switch for boolean values',
    href: '/design-system/components/switch',
    icon: ToggleLeft,
  },
  {
    name: 'Badge',
    description: 'Status indicator with multiple variants',
    href: '/design-system/components/badge',
    icon: BadgeIcon,
  },
  {
    name: 'Tag',
    description: 'Removable tag component for labels and filters',
    href: '/design-system/components/tag',
    icon: Tag,
  },
  {
    name: 'Icon',
    description: 'Icon component from lucide-react library',
    href: '/design-system/components/icon',
    icon: Sparkles,
  },
  {
    name: 'Separator',
    description: 'Visual divider for content sections',
    href: '/design-system/components/separator',
    icon: Minus,
  },
]

export default function ComponentsPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Components</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Basic building blocks for all UI components. These are the smallest, most fundamental elements 
            that cannot be broken down further without losing their meaning.
          </p>
        </div>

        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6">
          {components.map((component) => {
            const Icon = component.icon
            return (
              <Link key={component.name} href={component.href}>
                <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
                  <CardHeader>
                    <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-primary-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                      <Icon className="ds-w-6 ds-h-6 ds-text-primary-600" />
                    </div>
                    <CardTitle>{component.name}</CardTitle>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                  {component.variants && (
                    <CardContent>
                      <div className="ds-flex ds-flex-wrap ds-gap-2">
                        {component.variants.map((variant) => (
                          <span
                            key={variant}
                            className="ds-px-2 ds-py-1 ds-text-xs ds-font-medium ds-rounded-md ds-bg-background-secondary ds-text-text-secondary ds-border ds-border-border"
                          >
                            {variant}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
