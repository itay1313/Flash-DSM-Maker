import * as React from 'react'
import { Send } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../../primitives/button'
import { Textarea } from '../../primitives/textarea'

export interface ChatInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Textarea>, 'onSubmit'> {
  onSubmit?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, onSubmit, placeholder = 'Type a message...', disabled, maxLength, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!)

    const handleSubmit = () => {
      if (value.trim() && !disabled && onSubmit) {
        onSubmit(value.trim())
        setValue('')
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (!maxLength || newValue.length <= maxLength) {
        setValue(newValue)
        // Auto-resize textarea
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
      }
    }

    return (
      <div className="ds-flex ds-items-end ds-space-x-2 ds-rounded-lg ds-border ds-border-border ds-bg-background ds-p-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn('ds-min-h-[60px] ds-max-h-[200px] ds-resize-none ds-border-0 ds-shadow-none focus-visible:ds-ring-0', className)}
          rows={1}
          {...props}
        />
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          size="icon"
          className="ds-shrink-0"
        >
          <Send className="ds-h-4 ds-w-4" />
          <span className="ds-sr-only">Send message</span>
        </Button>
      </div>
    )
  }
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }

