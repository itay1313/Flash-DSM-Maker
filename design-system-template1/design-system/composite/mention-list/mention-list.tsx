import * as React from 'react'
import { cn } from '../../utils/cn'
import { AvatarWithStatus } from '../avatar-with-status'

export interface MentionItem {
  id: string
  name: string
  avatar?: string
  email?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
}

export interface MentionListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: MentionItem[]
  onSelect?: (item: MentionItem) => void
  highlightedIndex?: number
}

const MentionList = React.forwardRef<HTMLDivElement, MentionListProps>(
  ({ className, items, onSelect, highlightedIndex = -1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'ds-max-h-60 ds-w-full ds-overflow-auto ds-rounded-md ds-border ds-border-border ds-bg-background ds-shadow-lg',
          className
        )}
        {...props}
      >
        {items.length === 0 ? (
          <div className="ds-p-4 ds-text-center ds-text-sm ds-text-text-secondary">
            No results found
          </div>
        ) : (
          <ul className="ds-py-1">
            {items.map((item, index) => (
              <li
                key={item.id}
                onClick={() => onSelect?.(item)}
                className={cn(
                  'ds-flex ds-cursor-pointer ds-items-center ds-space-x-3 ds-px-4 ds-py-2 hover:ds-bg-background-secondary',
                  highlightedIndex === index && 'ds-bg-background-secondary'
                )}
              >
                <AvatarWithStatus
                  name={item.name}
                  src={item.avatar}
                  status={item.status}
                  size="sm"
                />
                <div className="ds-flex-1">
                  <div className="ds-text-sm ds-font-medium ds-text-text">{item.name}</div>
                  {item.email && (
                    <div className="ds-text-xs ds-text-text-secondary">{item.email}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
MentionList.displayName = 'MentionList'

export { MentionList }

