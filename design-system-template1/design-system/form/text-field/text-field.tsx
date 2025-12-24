import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import { Input } from '../../primitives/input'

export interface TextFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, hint, error, required, id, ...props }, ref) => {
    const inputId = id || React.useId()
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="ds-space-y-2">
        {label && (
          <LabelPrimitive.Root
            htmlFor={inputId}
            className="ds-text-sm ds-font-medium ds-leading-none ds-peer-disabled:ds-cursor-not-allowed ds-peer-disabled:ds-opacity-70"
          >
            {label}
            {required && <span className="ds-text-error ds-ml-1">*</span>}
          </LabelPrimitive.Root>
        )}
        <Input
          id={inputId}
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
TextField.displayName = 'TextField'

export { TextField }

