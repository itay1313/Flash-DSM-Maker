import * as React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHome?: boolean
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator, showHome = true, ...props }, ref) => {
    const Separator = separator || <ChevronRight className="ds-h-4 ds-w-4 ds-text-text-tertiary" />

    const allItems = showHome
      ? [{ label: 'Home', href: '/', icon: <Home className="ds-h-4 ds-w-4" /> }, ...items]
      : items

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('ds-flex ds-items-center ds-space-x-2', className)}
        {...props}
      >
        <ol className="ds-flex ds-items-center ds-space-x-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1

            return (
              <li key={index} className="ds-flex ds-items-center">
                {index > 0 && <span className="ds-mx-2">{Separator}</span>}
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="ds-inline-flex ds-items-center ds-text-sm ds-text-text-secondary hover:ds-text-text"
                  >
                    {item.icon && <span className="ds-mr-1">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      'ds-inline-flex ds-items-center ds-text-sm',
                      isLast ? 'ds-text-text ds-font-medium' : 'ds-text-text-secondary'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && <span className="ds-mr-1">{item.icon}</span>}
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = 'Breadcrumb'

export { Breadcrumb }

