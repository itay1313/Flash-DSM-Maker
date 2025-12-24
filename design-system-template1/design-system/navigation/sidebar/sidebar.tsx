import * as React from 'react'
import { cn } from '../../utils/cn'

export interface SidebarItem {
  label: string
  href?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  active?: boolean
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[]
  logo?: React.ReactNode
  footer?: React.ReactNode
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, items, logo, footer, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          'ds-flex ds-h-screen ds-w-64 ds-flex-col ds-border-r ds-border-border ds-bg-background-secondary',
          className
        )}
        {...props}
      >
        {logo && (
          <div className="ds-flex ds-h-16 ds-items-center ds-border-b ds-border-border ds-px-4">
            {logo}
          </div>
        )}
        <nav className="ds-flex-1 ds-space-y-1 ds-p-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                'ds-group ds-flex ds-items-center ds-space-x-3 ds-rounded-md ds-px-3 ds-py-2 ds-text-sm ds-font-medium ds-transition-colors hover:ds-bg-background hover:ds-text-text',
                item.active && 'ds-bg-background ds-text-text'
              )}
            >
              {item.icon && <span className="ds-text-text-secondary group-hover:ds-text-text">{item.icon}</span>}
              <span className="ds-flex-1">{item.label}</span>
              {item.badge && <span>{item.badge}</span>}
            </a>
          ))}
        </nav>
        {footer && <div className="ds-border-t ds-border-border ds-p-4">{footer}</div>}
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export { Sidebar }

