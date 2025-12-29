import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import { Switch } from '../../primitives/switch'

export interface SwitchFieldProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label?: string
  hint?: string
  error?: string
}

const SwitchField = React.forwardRef<
  React.ElementRef<typeof Switch>,
  SwitchFieldProps
>(({ className, label, hint, error, id, ...props }, ref) => {
  const switchId = id || React.useId()
  const hintId = hint ? `${switchId}-hint` : undefined
  const errorId = error ? `${switchId}-error` : undefined

  return (
    <div className="ds-space-y-2">
      <div className="ds-flex ds-items-center ds-space-x-2">
        <Switch
          id={switchId}
          ref={ref}
          className={cn(error && 'data-[state=checked]:ds-bg-error', className)}
          aria-describedby={hintId || errorId}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
        {label && (
          <LabelPrimitive.Root
            htmlFor={switchId}
            className="ds-text-sm ds-font-medium ds-leading-none ds-peer-disabled:ds-cursor-not-allowed ds-peer-disabled:ds-opacity-70 ds-cursor-pointer"
          >
            {label}
          </LabelPrimitive.Root>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="ds-text-sm ds-text-text-secondary ds-ml-12">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="ds-text-sm ds-text-error ds-ml-12" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})
SwitchField.displayName = 'SwitchField'

export { SwitchField }

