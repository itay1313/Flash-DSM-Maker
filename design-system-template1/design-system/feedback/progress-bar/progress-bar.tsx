import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const progressVariants = cva('ds-relative ds-h-4 ds-w-full ds-overflow-hidden ds-rounded-full ds-bg-background-secondary', {
  variants: {
    size: {
      sm: 'ds-h-2',
      md: 'ds-h-4',
      lg: 'ds-h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const progressIndicatorVariants = cva('ds-h-full ds-w-full ds-flex-1 ds-transition-all', {
  variants: {
    variant: {
      primary: 'ds-bg-primary',
      secondary: 'ds-bg-secondary',
      success: 'ds-bg-success',
      warning: 'ds-bg-warning',
      error: 'ds-bg-error',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface ProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ className, size, variant, value = 0, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(progressIndicatorVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
ProgressBar.displayName = ProgressPrimitive.Root.displayName

export { ProgressBar, progressVariants }

