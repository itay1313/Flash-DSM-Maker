import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { getIcon, type IconName } from './icon-registry'

const iconVariants = cva('ds-inline-flex ds-shrink-0', {
  variants: {
    size: {
      xs: 'ds-h-3 ds-w-3',
      sm: 'ds-h-4 ds-w-4',
      md: 'ds-h-5 ds-w-5',
      lg: 'ds-h-6 ds-w-6',
      xl: 'ds-h-8 ds-w-8',
      '2xl': 'ds-h-10 ds-w-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'ref'>,
    VariantProps<typeof iconVariants> {
  name: IconName
  className?: string
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, className, ...props }, ref) => {
    const IconComponent = getIcon(name)

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry`)
      return null
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        {...props}
      />
    )
  }
)
Icon.displayName = 'Icon'

export { Icon, iconVariants }

