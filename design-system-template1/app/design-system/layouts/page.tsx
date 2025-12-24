import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { Navigation, Layout, MessageSquare, User, Table } from 'lucide-react'

const layouts = [
  {
    name: 'Navbar',
    description: 'Top navigation bar with logo, links, and actions',
    href: '/design-system/layouts/navbar',
    icon: Navigation,
  },
  {
    name: 'Sidebar',
    description: 'Side navigation with collapsible sections',
    href: '/design-system/layouts/sidebar',
    icon: Navigation,
  },
  {
    name: 'Table',
    description: 'Data table with sorting, filtering, and pagination',
    href: '/design-system/layouts/table',
    icon: Table,
  },
  {
    name: 'DataCard',
    description: 'Card component for displaying data with actions',
    href: '/design-system/layouts/data-card',
    icon: Layout,
  },
  {
    name: 'ChatInput',
    description: 'Chat input with mentions and file upload',
    href: '/design-system/layouts/chat-input',
    icon: MessageSquare,
  },
  {
    name: 'ChatBubble',
    description: 'Chat message bubble with avatar and metadata',
    href: '/design-system/layouts/chat-bubble',
    icon: MessageSquare,
  },
  {
    name: 'AvatarWithStatus',
    description: 'User avatar with online/offline status indicator',
    href: '/design-system/layouts/avatar-with-status',
    icon: User,
  },
]

export default function LayoutsPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-12">
        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Layouts</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            Complex layout components made of patterns and basic components. These are substantial interface sections 
            that form distinct parts of the user interface.
          </p>
        </div>

        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6">
          {layouts.map((layout) => {
            const Icon = layout.icon
            return (
              <Link key={layout.name} href={layout.href}>
                <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-info-200 hover:ds--translate-y-1 ds-cursor-pointer">
                  <CardHeader>
                    <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-info-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                      <Icon className="ds-w-6 ds-h-6 ds-text-info-600" />
                    </div>
                    <CardTitle>{layout.name}</CardTitle>
                    <CardDescription>{layout.description}</CardDescription>
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

