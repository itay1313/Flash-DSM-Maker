# Flash DSM - Design System Documentation

## Overview

This document outlines the professional design system tokens and guidelines for the Flash DSM (Design System Maker) application. Our design system follows industry best practices with a **4px base spacing unit** and semantic color tokens.

## Design Principles

1. **Consistency**: Use design tokens instead of arbitrary values
2. **4px Base Unit**: All spacing follows a 4px increment (4, 8, 12, 16, 20, etc.)
3. **Semantic Naming**: Colors and tokens have meaningful names
4. **Professional Standards**: No arbitrary values like `top-[-37px]` or `bg-[#0d0d0d]`

## Color System

### Background Colors

```javascript
background: {
  primary: '#0d0d0d',      // Main dark background
  secondary: '#252525',     // Secondary surfaces
  card: '#191919',          // Card backgrounds
}
```

**Usage:**
```jsx
<div className="bg-background-primary">
<div className="bg-background-secondary">
<div className="bg-background-card">
```

### Accent Colors

```javascript
accent: {
  magenta: '#ff20dd',
  orange: '#ff6b35',
  cyan: '#00d4ff',
}
```

**Usage:**
```jsx
<div className="border-accent-magenta">
<div className="bg-accent-orange/20">
<div className="text-accent-cyan">
```

### Glow Colors

```javascript
glow: {
  pink: '#FF37E4',
  peach: '#FFCEA3',
  cyan: '#A3E7FF',
}
```

Used for atmospheric background effects in the BackgroundGlow component.

### Gray Scale

Complete gray scale from 50 (lightest) to 950 (darkest):

- `gray-50`: #fafafa
- `gray-100`: #ddd
- `gray-150`: #d0d0d0
- `gray-200`: #c4c4c4
- `gray-300`: #acacac
- `gray-400`: #939393
- `gray-500`: #7a7a7a
- `gray-600`: #626262
- `gray-700`: #4a4a4a
- `gray-800`: #313131
- `gray-850`: #252525
- `gray-900`: #191919
- `gray-950`: #0d0d0d

## Typography

### Font Families

- **Headings**: Instrument Serif (`font-serif`)
- **Body Text**: Inter (`font-sans`)
- **Alternative**: Plus Jakarta Sans (`font-jakarta`)

### Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 10px | Extra small text, labels |
| `text-sm` | 12px | Small text, captions |
| `text-base` | 14px | Default body text |
| `text-lg` | 16px | Large body text |
| `text-xl` | 18px | Subheadings |
| `text-2xl` | 20px | Small headings |
| `text-3xl` | 24px | Medium headings |
| `text-4xl` | 28px | Large headings |
| `text-5xl` | 48px | Extra large headings |
| `text-6xl` | 96px | Display headings |

### Semantic Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `text-display` | 96px + 4.8px tracking | Hero/display text |
| `text-heading` | 24px + 0.96px tracking | Section headings |
| `text-body-lg` | 18px | Large body text |
| `text-body` | 16px | Standard body text |
| `text-body-sm` | 14px | Small body text |
| `text-input` | 28px | Input fields |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tracking-display` | 4.8px | Display headings |
| `tracking-heading` | 0.96px | Section headings |
| `tracking-label` | 0.3em | Labels, small text |
| `tracking-tight-label` | 0.2em | Tight labels |
| `tracking-wide-label` | 0.4em | Wide labels |

## Spacing Scale

Based on **4px** increments:

| Token | Size | Usage Example |
|-------|------|---------------|
| `1` | 4px | Minimal spacing |
| `2` | 8px | Tight spacing |
| `3` | 12px | Small spacing |
| `4` | 16px | Default spacing |
| `5` | 20px | Medium spacing |
| `6` | 24px | Large spacing |
| `8` | 32px | Extra large spacing |
| `10` | 40px | Section spacing |
| `12` | 48px | Major section spacing |
| `16` | 64px | Hero spacing |
| `20` | 80px | Extra hero spacing |
| `24` | 96px | Maximum spacing |

### Custom Spacing Values

For exact design preservation:

| Token | Size | Usage |
|-------|------|-------|
| `13` | 13px | Icon dimensions |
| `18` | 18px | Icon/button sizes |
| `37` | 37px | Specific heights |
| `89` | 89px | Positioning offsets |
| `138` | 138px | Card heights |
| `206` / `card` | 824px | Card width |
| `350` | 350px | Background elements |
| `562` | 562px | Background elements |
| `595` | 595px | Background heights |

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| `rounded-sm` | 4px | Small elements |
| `rounded` (DEFAULT) | 8px | Default rounding |
| `rounded-md` | 12px | Medium elements |
| `rounded-lg` | 16px | Large elements |
| `rounded-xl` | 20px | Extra large |
| `rounded-2xl` | 24px | Cards |
| `rounded-3xl` | 32px | Large cards |
| `rounded-4xl` | 40px | Dashboard cards |
| `rounded-5xl` | 46px | Special elements |
| `rounded-6xl` | 48px | Large containers |
| `rounded-7xl` | 52px | Extra large containers |
| `rounded-full` | 9999px | Circles/pills |

### Semantic Aliases

| Token | Size | Usage |
|-------|------|-------|
| `rounded-button` | 12px | Buttons |
| `rounded-card` | 20px | Cards |
| `rounded-input` | 12px | Input fields |
| `rounded-decorative` | 50px | Decorative elements |

## Shadows

### Standard Shadows

| Token | Usage |
|-------|-------|
| `shadow-sm` | Subtle elevation |
| `shadow` (DEFAULT) | Default elevation |
| `shadow-md` | Medium elevation |
| `shadow-lg` | Large elevation |
| `shadow-xl` | Extra large elevation |
| `shadow-2xl` | Maximum elevation |
| `shadow-inner` | Inset shadow |

### Custom Shadows

| Token | Usage |
|-------|-------|
| `shadow-card` | Flow node cards |
| `shadow-card-hover` | Hovered cards |
| `shadow-button` | Buttons |
| `shadow-button-inset` | Button insets |
| `shadow-glow-magenta` | Magenta glow effect |
| `shadow-glow-blue` | Blue glow effect |
| `shadow-glow-blue-strong` | Strong blue glow |
| `shadow-brutalist` | Brutalist design style |
| `shadow-neon` | Neon effect |
| `shadow-component-soft` | Soft component shadow |
| `shadow-component-glow` | Component glow |
| `shadow-component-inset` | Component inset |
| `shadow-wizard` | Wizard/modal shadow |

## CSS Custom Properties

All colors are available as CSS variables in `:root`:

```css
:root {
  /* Background Colors */
  --color-background-primary: #0d0d0d;
  --color-background-secondary: #252525;
  --color-background-card: #191919;
  
  /* Accent Colors */
  --color-accent-magenta: #ff20dd;
  --color-accent-orange: #ff6b35;
  --color-accent-cyan: #00d4ff;
  
  /* Glow Colors */
  --color-glow-pink: #FF37E4;
  --color-glow-peach: #FFCEA3;
  --color-glow-cyan: #A3E7FF;
  
  /* Spacing */
  --spacing-base: 4px;
  
  /* Gradients */
  --gradient-border: linear-gradient(135deg, #ff20dd 0%, #ff6b35 50%, #00d4ff 100%);
  --gradient-border-alt: linear-gradient(135deg, #FF20DD 0%, #B90000 100%);
}
```

## Component Patterns

### Background Glow

```jsx
import { BackgroundGlow } from '@/components/ui/BackgroundGlow'

<div className="relative h-screen bg-background-primary">
  <BackgroundGlow />
  <div className="relative z-10">Content</div>
</div>
```

### Typography Components

```jsx
import { H1, H2, H3, Body, Label } from '@/components/ui/Typography'

<H1 className="text-gray-150">Flash DS</H1>
<H2>Section Title</H2>
<Body className="text-gray-400">Body text</Body>
<Label>Form label</Label>
```

### Cards

```jsx
<div className="bg-background-card border border-gray-800 rounded-4xl p-6 shadow-card">
  <H3>Card Title</H3>
  <Body>Card content</Body>
</div>
```

### Buttons

```jsx
<button className="px-6 py-3 rounded-button bg-accent-magenta text-white shadow-button">
  Click Me
</button>
```

## Migration Guide

### From Arbitrary Values to Tokens

| Before | After | Token Type |
|--------|-------|------------|
| `bg-[#0d0d0d]` | `bg-background-primary` | Color |
| `text-[96px]` | `text-6xl` or `text-display` | Font Size |
| `rounded-[40px]` | `rounded-4xl` | Border Radius |
| `border-[#FF20DD]` | `border-accent-magenta` | Color |
| `shadow-[0_16px_20px...]` | `shadow-card` | Shadow |
| `tracking-[4.8px]` | `tracking-display` | Letter Spacing |
| `w-[824px]` | `w-card` | Spacing |
| `top-[-37px]` | `-top-37` | Spacing (negative) |
| `text-[10px]` | `text-xs` | Font Size |
| `gap-[8px]` | `gap-2` | Spacing |

## Best Practices

### DO

- Use semantic color tokens: `bg-background-primary`
- Use spacing scale: `gap-4`, `p-6`, `m-8`
- Use semantic font sizes: `text-body`, `text-heading`
- Use design tokens for consistency: `rounded-card`, `shadow-button`

### DON'T

- Use arbitrary values: `bg-[#0d0d0d]`, `text-[10px]`
- Use non-4px increments: `gap-[5px]`, `p-[13px]`
- Mix arbitrary and tokens: `bg-background-primary text-[14px]`
- Use inline hex colors: `style={{ color: '#ff20dd' }}`

## File Structure

```
app/
  globals.css           # CSS variables and base styles
components/
  ui/
    BackgroundGlow.tsx  # Background component
    Typography.tsx      # Typography components
    typographyClasses.ts # Typography utility classes
    FlowNode*.tsx       # Flow node UI components
tailwind.config.js      # Tailwind configuration
DESIGN_SYSTEM.md        # This file
```

## Updates and Maintenance

When adding new design tokens:

1. Add to `tailwind.config.js` in the appropriate section
2. Add CSS variable to `app/globals.css` if needed
3. Document in this file
4. Use semantic naming conventions
5. Follow 4px spacing increments

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Instrument Serif Font](https://fonts.google.com/specimen/Instrument+Serif)
- [Inter Font](https://fonts.google.com/specimen/Inter)

---

**Version**: 1.0.0
**Last Updated**: 2024
**Maintained by**: Flash DSM Team
