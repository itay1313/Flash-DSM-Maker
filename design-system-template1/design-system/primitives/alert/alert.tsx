import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react'

const alertVariants = cva(
  'ds-relative ds-w-full ds-rounded-lg ds-border ds-p-4 ds-pr-8 [&>svg+div]:ds-translate-y-[-3px] [&>svg]:ds-absolute [&>svg]:ds-left-4 [&>svg]:ds-top-4 [&>svg]:ds-text-foreground [&>svg~*]:ds-pl-7',
  {
    variants: {
      variant: {
        default: 'ds-bg-background ds-text-text ds-border-border',
        success: 'ds-border-success-200 ds-bg-success-50 ds-text-success-900 [&>svg]:ds-text-success',
        warning: 'ds-border-warning-200 ds-bg-warning-50 ds-text-warning-900 [&>svg]:ds-text-warning',
        error: 'ds-border-error-200 ds-bg-error-50 ds-text-error-900 [&>svg]:ds-text-error',
        info: 'ds-border-info-200 ds-bg-info-50 ds-text-info-900 [&>svg]:ds-text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('ds-mb-1 ds-font-medium ds-leading-none ds-tracking-tight', className)}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('ds-text-sm [&_p]:ds-leading-relaxed', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

const AlertIcon = ({ variant }: { variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | null }) => {
  switch (variant) {
    case 'success':
      return <CheckCircle2 className="ds-h-4 ds-w-4" />
    case 'warning':
      return <AlertCircle className="ds-h-4 ds-w-4" />
    case 'error':
      return <XCircle className="ds-h-4 ds-w-4" />
    case 'info':
      return <Info className="ds-h-4 ds-w-4" />
    default:
      return <AlertCircle className="ds-h-4 ds-w-4" />
  }
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const AlertWithContent = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, description, dismissible, onDismiss, children, ...props }, ref) => {
    return (
      <Alert ref={ref} variant={variant} className={className} {...props}>
        <AlertIcon variant={variant} />
        {dismissible && (
          <button
            onClick={onDismiss}
            className="ds-absolute ds-right-4 ds-top-4 ds-rounded-sm ds-opacity-70 ds-transition-opacity hover:ds-opacity-100 focus:ds-outline-none focus:ds-ring-2 focus:ds-ring-border-focus"
          >
            <X className="ds-h-4 ds-w-4" />
            <span className="ds-sr-only">Close</span>
          </button>
        )}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {children}
      </Alert>
    )
  }
)
AlertWithContent.displayName = 'AlertWithContent'

export { Alert, AlertTitle, AlertDescription, AlertWithContent, alertVariants }

