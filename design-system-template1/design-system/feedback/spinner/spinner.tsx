import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const spinnerVariants = cva('ds-animate-spin ds-rounded-full ds-border-solid', {
  variants: {
    size: {
      sm: 'ds-h-4 ds-w-4 ds-border-2',
      md: 'ds-h-6 ds-w-6 ds-border-2',
      lg: 'ds-h-8 ds-w-8 ds-border-[3px]',
      xl: 'ds-h-12 ds-w-12 ds-border-4',
    },
    variant: {
      primary: 'ds-border-primary ds-border-t-transparent',
      secondary: 'ds-border-secondary ds-border-t-transparent',
      neutral: 'ds-border-neutral-300 ds-border-t-transparent',
      white: 'ds-border-white ds-border-t-transparent',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className="ds-sr-only">Loading...</span>
      </div>
    )
  }
)
Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants }

