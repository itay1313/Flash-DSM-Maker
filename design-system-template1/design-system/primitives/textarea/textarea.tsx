import * as React from 'react'
import { cn } from '../../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'ds-flex ds-min-h-[80px] ds-w-full ds-rounded-md ds-border ds-border-border ds-bg-background ds-px-3 ds-py-2 ds-text-sm ds-ring-offset-background placeholder:ds-text-text-tertiary focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-border-focus focus-visible:ds-ring-offset-2 disabled:ds-cursor-not-allowed disabled:ds-opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }

