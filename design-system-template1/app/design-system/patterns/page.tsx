import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { FormInput, Layout, AlertCircle, Loader, FileText } from 'lucide-react'

const patterns = [
  {
    name: 'TextField',
    description: 'Complete text input with label, hint, and error states',
    href: '/design-system/patterns/text-field',
    icon: FormInput,
  },
  {
    name: 'SelectField',
    description: 'Select dropdown with label and validation',
    href: '/design-system/patterns/select-field',
    icon: FormInput,
  },
  {
    name: 'CheckboxField',
    description: 'Checkbox with label and helper text',
    href: '/design-system/patterns/checkbox-field',
    icon: FormInput,
  },
  {
    name: 'SwitchField',
    description: 'Toggle switch with label and description',
    href: '/design-system/patterns/switch-field',
    icon: FormInput,
  },
  {
    name: 'TextareaField',
    description: 'Textarea with label, hint, and character count',
    href: '/design-system/patterns/textarea-field',
    icon: FormInput,
  },
  {
    name: 'Card',
    description: 'Container component with header, content, and footer',
    href: '/design-system/patterns/card',
    icon: Layout,
  },
  {
    name: 'Alert',
    description: 'Alert message with icon, title, and description',
    href: '/design-system/patterns/alert',
    icon: AlertCircle,
  },
  {
    name: 'Toast',
    description: 'Notification toast with variants and actions',
    href: '/design-system/patterns/toast',
    icon: AlertCircle,
  },
  {
    name: 'Spinner',
    description: 'Loading spinner with multiple sizes',
    href: '/design-system/patterns/spinner',
    icon: Loader,
  },
  {
    name: 'Skeleton',
    description: 'Loading placeholder with shimmer effect',
    href: '/design-system/patterns/skeleton',
    icon: FileText,
  },
]

export default function PatternsPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Patterns</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Simple combinations of components that form relatively simple UI patterns. 
            These patterns serve as the foundation for more complex interfaces.
          </p>
        </div>

        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6">
          {patterns.map((pattern) => {
            const Icon = pattern.icon
            return (
              <Link key={pattern.name} href={pattern.href}>
                <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-secondary-200 hover:ds--translate-y-1 ds-cursor-pointer">
                  <CardHeader>
                    <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-secondary-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                      <Icon className="ds-w-6 ds-h-6 ds-text-secondary-600" />
                    </div>
                    <CardTitle>{pattern.name}</CardTitle>
                    <CardDescription>{pattern.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

