import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

const tagVariants = cva(
  'ds-inline-flex ds-items-center ds-gap-1.5 ds-rounded-md ds-border ds-px-2 ds-py-1 ds-text-sm ds-font-medium ds-transition-colors',
  {
    variants: {
      variant: {
        default: 'ds-border-border ds-bg-background-secondary ds-text-text',
        primary: 'ds-border-primary-200 ds-bg-primary-50 ds-text-primary-700',
        secondary: 'ds-border-secondary-200 ds-bg-secondary-50 ds-text-secondary-700',
        success: 'ds-border-success-200 ds-bg-success-50 ds-text-success-700',
        warning: 'ds-border-warning-200 ds-bg-warning-50 ds-text-warning-700',
        error: 'ds-border-error-200 ds-bg-error-50 ds-text-error-700',
      },
      size: {
        sm: 'ds-px-1.5 ds-py-0.5 ds-text-xs',
        md: 'ds-px-2 ds-py-1 ds-text-sm',
        lg: 'ds-px-3 ds-py-1.5 ds-text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  removable?: boolean
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, children, onRemove, removable, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(tagVariants({ variant, size }), className)} {...props}>
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ds-ml-1 ds-inline-flex ds-items-center ds-justify-center ds-rounded-sm ds-opacity-70 ds-ring-offset-background ds-transition-opacity hover:ds-opacity-100 focus:ds-outline-none focus:ds-ring-2 focus:ds-ring-border-focus focus:ds-ring-offset-2"
          >
            <X className="ds-h-3 ds-w-3" />
            <span className="ds-sr-only">Remove</span>
          </button>
        )}
      </div>
    )
  }
)
Tag.displayName = 'Tag'

export { Tag, tagVariants }

