import * as React from 'react'
import { cn } from '../../utils/cn'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, gap = 'md', ...props }, ref) => {
    const gapClasses = {
      sm: 'ds-gap-2',
      md: 'ds-gap-4',
      lg: 'ds-gap-6',
      xl: 'ds-gap-8',
    }

    const colsClasses = {
      1: 'ds-grid-cols-1',
      2: 'ds-grid-cols-2',
      3: 'ds-grid-cols-3',
      4: 'ds-grid-cols-4',
      5: 'ds-grid-cols-5',
      6: 'ds-grid-cols-6',
      12: 'ds-grid-cols-12',
    }

    return (
      <div
        ref={ref}
        className={cn('ds-grid', colsClasses[cols], gapClasses[gap], className)}
        {...props}
      />
    )
  }
)
Grid.displayName = 'Grid'

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, ...props }, ref) => {
    const spanClasses = span
      ? {
          1: 'ds-col-span-1',
          2: 'ds-col-span-2',
          3: 'ds-col-span-3',
          4: 'ds-col-span-4',
          5: 'ds-col-span-5',
          6: 'ds-col-span-6',
          7: 'ds-col-span-7',
          8: 'ds-col-span-8',
          9: 'ds-col-span-9',
          10: 'ds-col-span-10',
          11: 'ds-col-span-11',
          12: 'ds-col-span-12',
        }[span]
      : ''

    return <div ref={ref} className={cn(spanClasses, className)} {...props} />
  }
)
GridItem.displayName = 'GridItem'

export { Grid, GridItem }

