import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'ds-inline-flex ds-items-center ds-justify-center ds-whitespace-nowrap ds-rounded-md ds-text-sm ds-font-medium ds-transition-colors focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-offset-2 disabled:ds-pointer-events-none disabled:ds-opacity-50',
  {
    variants: {
      variant: {
        primary:
          'ds-bg-primary ds-text-text-inverse hover:ds-bg-primary-700 active:ds-bg-primary-800 focus-visible:ds-ring-primary',
        secondary:
          'ds-bg-secondary ds-text-text-inverse hover:ds-bg-secondary-700 active:ds-bg-secondary-800 focus-visible:ds-ring-secondary',
        tertiary:
          'ds-bg-background-secondary ds-text-text hover:ds-bg-background-tertiary active:ds-bg-neutral-200 focus-visible:ds-ring-neutral-300 ds-border ds-border-border',
        ghost:
          'ds-text-text hover:ds-bg-background-secondary active:ds-bg-background-tertiary focus-visible:ds-ring-neutral-300',
        danger:
          'ds-bg-error ds-text-text-inverse hover:ds-bg-error-700 active:ds-bg-error-800 focus-visible:ds-ring-error',
      },
      size: {
        sm: 'ds-h-8 ds-px-3 ds-text-xs',
        md: 'ds-h-10 ds-px-4 ds-text-sm',
        lg: 'ds-h-12 ds-px-6 ds-text-base',
        icon: 'ds-h-10 ds-w-10',
        'icon-sm': 'ds-h-8 ds-w-8',
        'icon-lg': 'ds-h-12 ds-w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="ds-mr-2 ds-h-4 ds-w-4 ds-animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="ds-opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="ds-opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

