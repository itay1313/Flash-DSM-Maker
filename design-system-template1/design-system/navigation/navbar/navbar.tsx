import * as React from 'react'
import { cn } from '../../utils/cn'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, leftContent, rightContent, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'ds-sticky ds-top-0 ds-z-50 ds-flex ds-h-16 ds-items-center ds-justify-between ds-border-b ds-border-border ds-bg-background ds-px-4',
          className
        )}
        {...props}
      >
        <div className="ds-flex ds-items-center ds-space-x-4">
          {logo && <div className="ds-flex ds-items-center">{logo}</div>}
          {leftContent && <div className="ds-flex ds-items-center ds-space-x-2">{leftContent}</div>}
        </div>
        {rightContent && <div className="ds-flex ds-items-center ds-space-x-2">{rightContent}</div>}
      </nav>
    )
  }
)
Navbar.displayName = 'Navbar'

export { Navbar }

