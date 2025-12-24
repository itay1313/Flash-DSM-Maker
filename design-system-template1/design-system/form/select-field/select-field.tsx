import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../primitives/select'

export interface SelectFieldOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectTrigger>, 'children'> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  placeholder?: string
  options: SelectFieldOption[]
  value?: string
  onValueChange?: (value: string) => void
}

const SelectField = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  SelectFieldProps
>(({ className, label, hint, error, required, placeholder, options, value, onValueChange, id, ...props }, ref) => {
  const selectId = id || React.useId()
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined

  return (
    <div className="ds-space-y-2">
      {label && (
        <LabelPrimitive.Root
          htmlFor={selectId}
          className="ds-text-sm ds-font-medium ds-leading-none ds-peer-disabled:ds-cursor-not-allowed ds-peer-disabled:ds-opacity-70"
        >
          {label}
          {required && <span className="ds-text-error ds-ml-1">*</span>}
        </LabelPrimitive.Root>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={selectId}
          ref={ref}
          className={cn(error && 'ds-border-error focus:ds-ring-error', className)}
          aria-describedby={hintId || errorId}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
})
SelectField.displayName = 'SelectField'

export { SelectField }

