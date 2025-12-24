import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const badgeVariants = cva(
  'ds-inline-flex ds-items-center ds-rounded-full ds-border ds-px-2.5 ds-py-0.5 ds-text-xs ds-font-semibold ds-transition-colors focus:ds-outline-none focus:ds-ring-2 focus:ds-ring-border-focus focus:ds-ring-offset-2',
  {
    variants: {
      variant: {
        default: 'ds-border-transparent ds-bg-primary ds-text-text-inverse',
        secondary: 'ds-border-transparent ds-bg-secondary ds-text-text-inverse',
        outline: 'ds-text-text ds-border-border',
        success: 'ds-border-transparent ds-bg-success ds-text-white',
        warning: 'ds-border-transparent ds-bg-warning ds-text-white',
        error: 'ds-border-transparent ds-bg-error ds-text-white',
        info: 'ds-border-transparent ds-bg-info ds-text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

