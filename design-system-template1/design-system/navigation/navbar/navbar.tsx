import * as React from 'react'
import Link from 'next/link'
import { Button } from '../../primitives/button'
import { cn } from '../../utils/cn'
import { Sparkles, Github } from 'lucide-react'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, leftContent, rightContent, ...props }, ref) => {
    const defaultLogo = (
      <Link href="/" className="ds-flex ds-items-center ds-gap-2 ds-font-semibold ds-text-lg ds-text-text hover:ds-opacity-80 ds-transition-opacity">
        <div className="ds-flex ds-items-center ds-justify-center ds-w-8 ds-h-8 ds-rounded-lg ds-bg-primary ds-text-text-inverse">
          <Sparkles className="ds-w-4 ds-h-4" />
        </div>
        <span>Design System</span>
      </Link>
    )

    const defaultLeftContent = (
      <>
        <Link href="/design-system" className="ds-text-sm ds-font-medium ds-text-text-secondary hover:ds-text-text ds-transition-colors">
          Components
        </Link>
        <Link href="/design-system/tokens" className="ds-text-sm ds-font-medium ds-text-text-secondary hover:ds-text-text ds-transition-colors">
          Tokens
        </Link>
        <Link href="/design-system/docs" className="ds-text-sm ds-font-medium ds-text-text-secondary hover:ds-text-text ds-transition-colors">
          Docs
        </Link>
      </>
    )

    const defaultRightContent = (
      <>
        <Button variant="ghost" size="sm" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="ds-w-4 ds-h-4" />
          </a>
        </Button>
        <Button size="sm" asChild>
          <Link href="/design-system">Get Started</Link>
        </Button>
      </>
    )

    return (
      <nav
        ref={ref}
        className={cn(
          'ds-sticky ds-top-0 ds-z-50 ds-flex ds-h-16 ds-items-center ds-justify-between ds-border-b ds-border-border ds-bg-background/80 ds-backdrop-blur-sm ds-px-6',
          className
        )}
        {...props}
      >
        <div className="ds-flex ds-items-center ds-gap-8">
          {logo || defaultLogo}
          {leftContent || defaultLeftContent}
        </div>
        <div className="ds-flex ds-items-center ds-gap-3">
          {rightContent || defaultRightContent}
        </div>
      </nav>
    )
  }
)
Navbar.displayName = 'Navbar'

export { Navbar }
