import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { Palette, Type, Layout, Sparkles } from 'lucide-react'

const foundationItems = [
  {
    name: 'Tokens',
    description: 'Design tokens for colors, shadows, radius, and more',
    href: '/design-system/foundation/tokens',
    icon: Palette,
    color: 'primary',
  },
  {
    name: 'Typography',
    description: 'Font sizes, line heights, and text styles',
    href: '/design-system/foundation/typography',
    icon: Type,
    color: 'secondary',
  },
  {
    name: 'Spacing',
    description: 'Consistent spacing scale and layout utilities',
    href: '/design-system/foundation/spacing',
    icon: Layout,
    color: 'info',
  },
  {
    name: 'Icons',
    description: 'Icon library and usage guidelines',
    href: '/design-system/foundation/icons',
    icon: Sparkles,
    color: 'success',
  },
]

export default function FoundationPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Foundation</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            The foundational elements of the design system - tokens, typography, spacing, and icons. 
            These are the building blocks that all components are built upon.
          </p>
        </div>

        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-4 ds-gap-6">
          {foundationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
                  <CardHeader>
                    <div className={`ds-w-12 ds-h-12 ds-rounded-xl ds-bg-${item.color}-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300`}>
                      <Icon className={`ds-w-6 ds-h-6 ds-text-${item.color}-600`} />
                    </div>
                    <CardTitle className="ds-text-xl">{item.name}</CardTitle>
                    <CardDescription className="ds-text-base ds-leading-relaxed">
                      {item.description}
                    </CardDescription>
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

