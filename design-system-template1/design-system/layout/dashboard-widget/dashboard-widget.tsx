import * as React from 'react'
import { cn } from '../../utils/cn'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

export interface DashboardWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  headerAction?: React.ReactNode
  footer?: React.ReactNode
  loading?: boolean
}

const DashboardWidget = React.forwardRef<HTMLDivElement, DashboardWidgetProps>(
  ({ className, title, description, headerAction, footer, loading, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn(className)} {...props}>
        <CardHeader>
          <div className="ds-flex ds-items-start ds-justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="ds-flex ds-items-center ds-justify-center ds-py-8">
              <div className="ds-h-8 ds-w-8 ds-animate-spin ds-rounded-full ds-border-4 ds-border-primary ds-border-t-transparent" />
            </div>
          ) : (
            children
          )}
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }
)
DashboardWidget.displayName = 'DashboardWidget'

export { DashboardWidget }

