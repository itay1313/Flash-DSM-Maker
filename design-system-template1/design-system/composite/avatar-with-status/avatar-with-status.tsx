import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const avatarVariants = cva('ds-relative ds-inline-flex ds-items-center ds-justify-center ds-rounded-full ds-font-medium ds-uppercase', {
  variants: {
    size: {
      sm: 'ds-h-8 ds-w-8 ds-text-xs',
      md: 'ds-h-10 ds-w-10 ds-text-sm',
      lg: 'ds-h-12 ds-w-12 ds-text-base',
      xl: 'ds-h-16 ds-w-16 ds-text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const statusVariants = cva('ds-absolute ds-rounded-full ds-border-2 ds-border-background', {
  variants: {
    status: {
      online: 'ds-bg-success',
      offline: 'ds-bg-neutral-400',
      away: 'ds-bg-warning',
      busy: 'ds-bg-error',
    },
    size: {
      sm: 'ds-h-2 ds-w-2 ds-bottom-0 ds-right-0',
      md: 'ds-h-2.5 ds-w-2.5 ds-bottom-0 ds-right-0',
      lg: 'ds-h-3 ds-w-3 ds-bottom-0 ds-right-0',
      xl: 'ds-h-4 ds-w-4 ds-bottom-0 ds-right-0',
    },
  },
  defaultVariants: {
    status: 'online',
    size: 'md',
  },
})

export interface AvatarWithStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  name?: string
  src?: string
  alt?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
}

const AvatarWithStatus = React.forwardRef<HTMLDivElement, AvatarWithStatusProps>(
  ({ className, size, name, src, alt, status = 'online', showStatus = true, ...props }, ref) => {
    const initials = name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), 'ds-bg-primary-100 ds-text-primary-700', className)}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || name} className="ds-h-full ds-w-full ds-rounded-full ds-object-cover" />
        ) : (
          <span>{initials}</span>
        )}
        {showStatus && (
          <span
            className={cn(statusVariants({ status, size }))}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)
AvatarWithStatus.displayName = 'AvatarWithStatus'

export { AvatarWithStatus, avatarVariants, statusVariants }

