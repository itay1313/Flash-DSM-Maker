'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../utils/cn'
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
  BookOpen,
  FileText,
  Code,
  Settings,
  ChevronRight,
  Home
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Design System',
    href: '/design-system',
    icon: Sparkles,
  },
  {
    title: 'Foundation',
    href: '/design-system/foundation',
    icon: Palette,
    children: [
      { title: 'Tokens', href: '/design-system/foundation/tokens', icon: Palette },
      { title: 'Typography', href: '/design-system/foundation/typography', icon: FileText },
      { title: 'Spacing', href: '/design-system/foundation/spacing', icon: Layout },
      { title: 'Icons', href: '/design-system/foundation/icons', icon: Sparkles },
    ],
  },
  {
    title: 'Components',
    href: '/design-system/components',
    icon: Box,
    children: [
      { title: 'Button', href: '/design-system/components/button', icon: MousePointer },
      { title: 'Input', href: '/design-system/components/input', icon: FormInput },
      { title: 'Select', href: '/design-system/components/select', icon: FormInput },
      { title: 'Checkbox', href: '/design-system/components/checkbox', icon: FormInput },
      { title: 'Radio', href: '/design-system/components/radio', icon: FormInput },
      { title: 'Switch', href: '/design-system/components/switch', icon: FormInput },
      { title: 'Badge', href: '/design-system/components/badge', icon: Box },
      { title: 'Tag', href: '/design-system/components/tag', icon: Box },
      { title: 'Icon', href: '/design-system/components/icon', icon: Sparkles },
    ],
  },
  {
    title: 'Patterns',
    href: '/design-system/patterns',
    icon: Layers,
    children: [
      { title: 'TextField', href: '/design-system/patterns/text-field', icon: FormInput },
      { title: 'SelectField', href: '/design-system/patterns/select-field', icon: FormInput },
      { title: 'CheckboxField', href: '/design-system/patterns/checkbox-field', icon: FormInput },
      { title: 'SwitchField', href: '/design-system/patterns/switch-field', icon: FormInput },
      { title: 'TextareaField', href: '/design-system/patterns/textarea-field', icon: FormInput },
      { title: 'Card', href: '/design-system/patterns/card', icon: Layout },
      { title: 'Alert', href: '/design-system/patterns/alert', icon: AlertCircle },
      { title: 'Toast', href: '/design-system/patterns/toast', icon: AlertCircle },
    ],
  },
  {
    title: 'Layouts',
    href: '/design-system/layouts',
    icon: Navigation,
    children: [
      { title: 'Navbar', href: '/design-system/layouts/navbar', icon: Navigation },
      { title: 'Sidebar', href: '/design-system/layouts/sidebar', icon: Navigation },
      { title: 'Table', href: '/design-system/layouts/table', icon: Layout },
      { title: 'DataCard', href: '/design-system/layouts/data-card', icon: Layout },
      { title: 'ChatInput', href: '/design-system/layouts/chat-input', icon: FormInput },
      { title: 'ChatBubble', href: '/design-system/layouts/chat-bubble', icon: FormInput },
    ],
  },
  {
    title: 'Documentation',
    href: '/design-system/docs',
    icon: BookOpen,
    children: [
      { title: 'Getting Started', href: '/design-system/docs/getting-started', icon: FileText },
      { title: 'Design Tokens', href: '/design-system/docs/tokens', icon: Palette },
      { title: 'Component Guidelines', href: '/design-system/docs/guidelines', icon: Code },
      { title: 'Migration Guide', href: '/design-system/docs/migration', icon: Settings },
    ],
  },
]

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = React.useState<Set<string>>(
    new Set(navigation.map((item) => item.href))
  )

  const toggleSection = (href: string) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(href)) {
      newOpenSections.delete(href)
    } else {
      newOpenSections.add(href)
    }
    setOpenSections(newOpenSections)
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  const isSectionOpen = (href: string) => {
    return openSections.has(href) || navigation.some(
      (item) => item.href === href && item.children?.some((child) => isActive(child.href))
    )
  }

  return (
    <aside
      className={cn(
        'ds-fixed ds-left-0 ds-top-16 ds-bottom-0 ds-w-64 ds-bg-background ds-border-r ds-border-border ds-overflow-y-auto ds-z-40 ds-shadow-sm',
        className
      )}
    >
      <div className="ds-px-4 ds-pt-6 ds-pb-4 ds-border-b ds-border-border">
        <div className="ds-flex ds-items-center ds-gap-2">
          <Sparkles className="ds-w-5 ds-h-5 ds-text-primary-600" />
          <h2 className="ds-text-lg ds-font-bold ds-text-text">Design System</h2>
        </div>
        <p className="ds-text-xs ds-text-text-tertiary ds-mt-1">Component Library</p>
      </div>
      <nav className="ds-p-4 ds-space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const hasChildren = item.children && item.children.length > 0
          const isOpen = isSectionOpen(item.href)
          const active = isActive(item.href)

          return (
            <div key={item.href}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleSection(item.href)}
                    className={cn(
                      'ds-w-full ds-flex ds-items-center ds-gap-3 ds-px-3 ds-py-2 ds-rounded-lg ds-text-sm ds-font-medium ds-transition-colors',
                      active
                        ? 'ds-bg-primary-100 ds-text-primary-700'
                        : 'ds-text-text-secondary hover:ds-bg-background-secondary hover:ds-text-text'
                    )}
                  >
                    <Icon className="ds-w-4 ds-h-4" />
                    <span className="ds-flex-1 ds-text-left">{item.title}</span>
                    <ChevronRight
                      className={cn(
                        'ds-w-4 ds-h-4 ds-transition-transform',
                        isOpen && 'ds-rotate-90'
                      )}
                    />
                  </button>
                  {isOpen && item.children && (
                    <div className="ds-ml-4 ds-mt-1 ds-space-y-1 ds-border-l ds-border-border ds-pl-4">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon
                        const childActive = isActive(child.href)
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'ds-flex ds-items-center ds-gap-2 ds-px-3 ds-py-1.5 ds-rounded-md ds-text-sm ds-transition-colors',
                              childActive
                                ? 'ds-bg-primary-100 ds-text-primary-700 ds-font-medium'
                                : 'ds-text-text-secondary hover:ds-bg-background-secondary hover:ds-text-text'
                            )}
                          >
                            <ChildIcon className="ds-w-3.5 ds-h-3.5" />
                            <span>{child.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'ds-flex ds-items-center ds-gap-3 ds-px-3 ds-py-2 ds-rounded-lg ds-text-sm ds-font-medium ds-transition-colors',
                    active
                      ? 'ds-bg-primary-100 ds-text-primary-700'
                      : 'ds-text-text-secondary hover:ds-bg-background-secondary hover:ds-text-text'
                  )}
                >
                  <Icon className="ds-w-4 ds-h-4" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
