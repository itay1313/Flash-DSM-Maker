import React from 'react'
import { cn } from '@/lib/utils'

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6'
  | 'subtitle'
  | 'body'
  | 'body-lg'
  | 'body-sm'
  | 'caption'
  | 'label'

interface TypographyProps {
  variant?: TypographyVariant
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const variantStyles: Record<TypographyVariant, string> = {
  // Headings - Instrument Serif
  'h1': 'font-serif text-[96px] font-light leading-none tracking-[4.8px]',
  'h2': 'font-serif text-5xl font-normal leading-tight tracking-tight',
  'h3': 'font-serif text-4xl font-normal leading-snug tracking-normal',
  'h4': 'font-serif text-3xl font-normal leading-snug tracking-normal',
  'h5': 'font-serif text-2xl font-normal leading-normal tracking-normal',
  'h6': 'font-serif text-xl font-normal leading-normal tracking-normal',
  
  // Body - Inter
  'subtitle': 'font-sans text-lg font-medium leading-relaxed tracking-wider uppercase',
  'body-lg': 'font-sans text-lg font-normal leading-relaxed',
  'body': 'font-sans text-base font-normal leading-normal',
  'body-sm': 'font-sans text-sm font-normal leading-normal',
  'caption': 'font-sans text-xs font-normal leading-tight',
  'label': 'font-sans text-sm font-medium leading-tight uppercase tracking-widest',
}

const defaultElements: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'subtitle': 'p',
  'body-lg': 'p',
  'body': 'p',
  'body-sm': 'p',
  'caption': 'span',
  'label': 'label',
}

export function Typography({
  variant = 'body',
  children,
  className,
  as,
}: TypographyProps) {
  const Component = as || defaultElements[variant]
  
  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  )
}

// Convenience components for common use cases
export const H1 = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" className={className} {...props}>
    {children}
  </Typography>
)

export const H2 = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" className={className} {...props}>
    {children}
  </Typography>
)

export const H3 = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" className={className} {...props}>
    {children}
  </Typography>
)

export const H4 = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" className={className} {...props}>
    {children}
  </Typography>
)

export const H5 = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" className={className} {...props}>
    {children}
  </Typography>
)

export const H6 = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" className={className} {...props}>
    {children}
  </Typography>
)

export const Subtitle = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle" className={className} {...props}>
    {children}
  </Typography>
)

export const Body = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" className={className} {...props}>
    {children}
  </Typography>
)

export const BodyLarge = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body-lg" className={className} {...props}>
    {children}
  </Typography>
)

export const BodySmall = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body-sm" className={className} {...props}>
    {children}
  </Typography>
)

export const Caption = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" className={className} {...props}>
    {children}
  </Typography>
)

export const Label = ({ children, className, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="label" className={className} {...props}>
    {children}
  </Typography>
)
