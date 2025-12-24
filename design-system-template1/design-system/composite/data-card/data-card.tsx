import * as React from 'react'
import { cn } from '../../utils/cn'

export interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  value?: string | number
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  icon?: React.ReactNode
  action?: React.ReactNode
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ className, title, description, value, trend, icon, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'ds-rounded-lg ds-border ds-border-border ds-bg-background ds-p-6 ds-shadow-sm',
          className
        )}
        {...props}
      >
        <div className="ds-flex ds-items-start ds-justify-between">
          <div className="ds-flex-1">
            {title && (
              <p className="ds-text-sm ds-font-medium ds-text-text-secondary">{title}</p>
            )}
            {value !== undefined && (
              <p className="ds-mt-2 ds-text-3xl ds-font-bold ds-text-text">{value}</p>
            )}
            {description && (
              <p className="ds-mt-1 ds-text-sm ds-text-text-secondary">{description}</p>
            )}
            {trend && (
              <div className="ds-mt-2 ds-flex ds-items-center">
                <span
                  className={cn(
                    'ds-text-sm ds-font-medium',
                    trend.positive ? 'ds-text-success' : 'ds-text-error'
                  )}
                >
                  {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="ds-ml-2 ds-text-sm ds-text-text-secondary">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="ds-ml-4 ds-flex ds-shrink-0 ds-items-center ds-justify-center ds-rounded-full ds-bg-primary-50 ds-p-3">
              {icon}
            </div>
          )}
        </div>
        {action && <div className="ds-mt-4">{action}</div>}
      </div>
    )
  }
)
DataCard.displayName = 'DataCard'

export { DataCard }

