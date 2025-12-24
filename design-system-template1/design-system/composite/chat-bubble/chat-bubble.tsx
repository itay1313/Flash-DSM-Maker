import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { AvatarWithStatus } from '../avatar-with-status'

const chatBubbleVariants = cva('ds-flex ds-items-start ds-space-x-3 ds-p-4', {
  variants: {
    variant: {
      sent: 'ds-flex-row-reverse ds-space-x-reverse',
      received: '',
    },
  },
  defaultVariants: {
    variant: 'received',
  },
})

const messageVariants = cva('ds-rounded-lg ds-px-4 ds-py-2 ds-max-w-[80%]', {
  variants: {
    variant: {
      sent: 'ds-bg-primary ds-text-text-inverse',
      received: 'ds-bg-background-secondary ds-text-text',
    },
  },
})

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  message: string
  avatar?: {
    name?: string
    src?: string
    status?: 'online' | 'offline' | 'away' | 'busy'
  }
  timestamp?: string
  sender?: string
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, message, avatar, timestamp, sender, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(chatBubbleVariants({ variant }), className)} {...props}>
        {avatar && (
          <AvatarWithStatus
            name={avatar.name}
            src={avatar.src}
            status={avatar.status}
            size="sm"
          />
        )}
        <div className="ds-flex ds-flex-col ds-space-y-1">
          {sender && (
            <span className="ds-text-xs ds-font-medium ds-text-text-secondary">
              {sender}
            </span>
          )}
          <div className={cn(messageVariants({ variant }))}>
            <p className="ds-text-sm ds-whitespace-pre-wrap">{message}</p>
          </div>
          {timestamp && (
            <span className={cn('ds-text-xs ds-text-text-tertiary', variant === 'sent' && 'ds-text-right')}>
              {timestamp}
            </span>
          )}
        </div>
      </div>
    )
  }
)
ChatBubble.displayName = 'ChatBubble'

export { ChatBubble, chatBubbleVariants }

