import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '../../utils/cn'

const toastVariants = cva(
  'ds-group ds-pointer-events-auto ds-relative ds-flex ds-w-full ds-items-center ds-justify-between ds-space-x-4 ds-overflow-hidden ds-rounded-md ds-border ds-p-6 ds-pr-8 ds-shadow-lg ds-transition-all data-[swipe=cancel]:ds-translate-x-0 data-[swipe=end]:ds-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ds-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ds-transition-none data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[swipe=end]:ds-animate-out data-[state=closed]:ds-fade-out-80 data-[state=closed]:ds-slide-out-to-right-full data-[state=open]:ds-slide-in-from-top-full data-[state=open]:ds-sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'ds-border-border ds-bg-background ds-text-text',
        success: 'ds-border-success-200 ds-bg-success-50 ds-text-success-900',
        error: 'ds-border-error-200 ds-bg-error-50 ds-text-error-900',
        warning: 'ds-border-warning-200 ds-bg-warning-50 ds-text-warning-900',
        info: 'ds-border-info-200 ds-bg-info-50 ds-text-info-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  default: null,
}

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, ...props }, ref) => {
    const Icon = variant && variant !== 'default' ? toastIcons[variant] : null

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="ds-grid ds-gap-1">
          {Icon && <Icon className="ds-h-5 ds-w-5" />}
          {title && <div className="ds-text-sm ds-font-semibold">{title}</div>}
          {description && <div className="ds-text-sm ds-opacity-90">{description}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ds-absolute ds-right-2 ds-top-2 ds-rounded-md ds-p-1 ds-text-text-secondary ds-opacity-0 ds-transition-opacity hover:ds-text-text focus:ds-opacity-100 focus:ds-outline-none focus:ds-ring-2 group-hover:ds-opacity-100"
          >
            <X className="ds-h-4 ds-w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = 'Toast'

export { Toast, toastVariants }

