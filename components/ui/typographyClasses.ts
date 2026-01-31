/**
 * Typography System
 * Centralized typography classes for consistent styling across components
 * Headings: Instrument Serif
 * Body text: Inter
 */

export const typography = {
  // Display & Headings - Instrument Serif
  display: 'text-white/90 text-display font-light leading-none tracking-display font-serif',
  h1: 'text-white/90 text-6xl font-normal leading-tight tracking-tight font-serif',
  h2: 'text-white/90 text-5xl font-normal leading-tight tracking-tight font-serif',
  h3: 'text-white/90 text-4xl font-normal leading-snug tracking-normal font-serif',
  h4: 'text-white/90 text-3xl font-normal leading-snug tracking-normal font-serif',
  h5: 'text-white/90 text-2xl font-normal leading-normal tracking-normal font-serif',
  h6: 'text-white/90 text-xl font-normal leading-normal tracking-normal font-serif',
  
  // Titles (italic variant)
  title: 'text-white/90 text-4xl font-normal italic font-serif',
  
  // Subtitles - Inter
  subtitle: 'text-white/90 text-xl font-medium leading-relaxed tracking-wider uppercase font-sans',
  
  // Labels - Inter
  label: 'text-white/90 text-sm font-normal font-sans',
  labelBold: 'text-white/90 text-sm font-medium leading-tight uppercase tracking-widest font-sans',
  
  // Body text - Inter
  bodyLg: 'text-white/90 text-body-lg font-normal leading-relaxed font-sans',
  body: 'text-white/90 text-body font-normal leading-normal font-sans',
  bodySm: 'text-white/90 text-body-sm font-normal leading-normal font-sans',
  
  // Body text muted/placeholder
  bodyMuted: 'text-white/40 text-base font-normal font-sans',
  
  // Small text
  small: 'text-white/90 text-sm font-normal font-sans',
  
  // Small text muted
  smallMuted: 'text-white/40 text-sm font-normal font-sans',
  
  // Extra small text (for templates, etc)
  xs: 'text-white text-xs font-medium font-sans',
  caption: 'text-white/90 text-xs font-normal leading-tight font-sans',
  
  // Button text
  button: 'text-white/90 text-base font-normal font-sans',
  
  // Button text small
  buttonSmall: 'text-white/90 text-sm font-normal font-sans',
  
  // Input text
  input: 'text-white text-base font-sans',
  
  // Input placeholder
  inputPlaceholder: 'text-white/40 text-base font-sans',
} as const
