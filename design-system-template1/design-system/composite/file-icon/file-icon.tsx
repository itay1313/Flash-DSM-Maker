import * as React from 'react'
import { File, FileText, Image, Video, Music, Archive, FileCode } from 'lucide-react'
import { cn } from '../../utils/cn'

const fileTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Images
  jpg: Image,
  jpeg: Image,
  png: Image,
  gif: Image,
  webp: Image,
  svg: Image,
  // Videos
  mp4: Video,
  mov: Video,
  avi: Video,
  webm: Video,
  // Audio
  mp3: Music,
  wav: Music,
  ogg: Music,
  // Archives
  zip: Archive,
  rar: Archive,
  '7z': Archive,
  tar: Archive,
  gz: Archive,
  // Code
  js: FileCode,
  ts: FileCode,
  jsx: FileCode,
  tsx: FileCode,
  json: FileCode,
  html: FileCode,
  css: FileCode,
  // Documents
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  txt: FileText,
}

export interface FileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string
  size?: 'sm' | 'md' | 'lg'
}

const FileIcon = React.forwardRef<HTMLDivElement, FileIconProps>(
  ({ className, fileName, size = 'md', ...props }, ref) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || ''
    const IconComponent = fileTypeIcons[extension] || File

    const sizeClasses = {
      sm: 'ds-h-4 ds-w-4',
      md: 'ds-h-6 ds-w-6',
      lg: 'ds-h-8 ds-w-8',
    }

    return (
      <div
        ref={ref}
        className={cn('ds-flex ds-items-center ds-justify-center', className)}
        {...props}
      >
        <IconComponent className={cn('ds-text-text-secondary', sizeClasses[size])} />
      </div>
    )
  }
)
FileIcon.displayName = 'FileIcon'

export { FileIcon }

