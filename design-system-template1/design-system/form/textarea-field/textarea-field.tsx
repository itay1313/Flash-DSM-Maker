import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import { Textarea } from '../../primitives/textarea'

export interface TextareaFieldProps extends React.ComponentPropsWithoutRef<typeof Textarea> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, label, hint, error, required, id, ...props }, ref) => {
    const textareaId = id || React.useId()
    const hintId = hint ? `${textareaId}-hint` : undefined
    const errorId = error ? `${textareaId}-error` : undefined

    return (
      <div className="ds-space-y-2">
        {label && (
          <LabelPrimitive.Root
            htmlFor={textareaId}
            className="ds-text-sm ds-font-medium ds-leading-none ds-peer-disabled:ds-cursor-not-allowed ds-peer-disabled:ds-opacity-70"
          >
            {label}
            {required && <span className="ds-text-error ds-ml-1">*</span>}
          </LabelPrimitive.Root>
        )}
        <Textarea
          id={textareaId}
          ref={ref}
          className={cn(error && 'ds-border-error focus-visible:ds-ring-error', className)}
          aria-describedby={hintId || errorId}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="ds-text-sm ds-text-text-secondary">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="ds-text-sm ds-text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
TextareaField.displayName = 'TextareaField'

export { TextareaField }

