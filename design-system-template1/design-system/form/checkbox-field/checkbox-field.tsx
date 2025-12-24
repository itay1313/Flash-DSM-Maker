import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import { Checkbox } from '../../primitives/checkbox'

export interface CheckboxFieldProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  label?: string
  hint?: string
  error?: string
}

const CheckboxField = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxFieldProps
>(({ className, label, hint, error, id, ...props }, ref) => {
  const checkboxId = id || React.useId()
  const hintId = hint ? `${checkboxId}-hint` : undefined
  const errorId = error ? `${checkboxId}-error` : undefined

  return (
    <div className="ds-space-y-2">
      <div className="ds-flex ds-items-start ds-space-x-2">
        <Checkbox
          id={checkboxId}
          ref={ref}
          className={cn(error && 'ds-border-error', className)}
          aria-describedby={hintId || errorId}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {label && (
          <LabelPrimitive.Root
            htmlFor={checkboxId}
            className="ds-text-sm ds-font-medium ds-leading-none ds-peer-disabled:ds-cursor-not-allowed ds-peer-disabled:ds-opacity-70 ds-cursor-pointer"
          >
            {label}
          </LabelPrimitive.Root>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="ds-text-sm ds-text-text-secondary ds-ml-6">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="ds-text-sm ds-text-error ds-ml-6" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})
CheckboxField.displayName = 'CheckboxField'

export { CheckboxField }

