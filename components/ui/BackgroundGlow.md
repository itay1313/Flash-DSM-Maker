# BackgroundGlow Component

A reusable atmospheric background component featuring multiple layered ellipse glows, decorative shapes, and a subtle grid pattern.

## Overview

The `BackgroundGlow` component creates a visually rich background effect using:
- **Multiple color-blended ellipse layers** with different blend modes
- **Decorative rounded rectangle borders** for structural interest
- **Subtle grid overlay** for depth
- **Optimized positioning** for centered, dramatic effect

## Features

### Glow Layers

1. **Ellipse 1 (Pink/Magenta - #FF37E4)**
   - Blend mode: `color-dodge`
   - Position: Center top (35%)
   - Creates the primary atmospheric glow

2. **Ellipse 2 (Orange/Peach - #FFCEA3)**
   - Blend mode: `color-dodge`
   - Position: Center bottom (20%)
   - Adds warmth to the lower section

3. **Ellipse 3 (Cyan - #A3E7FF)**
   - Blend mode: `hard-light`
   - Position: Center
   - Provides accent and contrast

4. **Additional depth layers**
   - Rotated and scaled variations
   - Lower opacity for subtle enhancement

### Decorative Elements

- **Rounded rectangles**: White borders at 10% opacity positioned throughout the viewport
- **Background grid**: 40px × 40px grid at 3% opacity

## Usage

### Basic Implementation

```tsx
import { BackgroundGlow } from '@/components/ui/BackgroundGlow'

function MyPage() {
  return (
    <div className="relative h-screen bg-[#0d0d0d]">
      <BackgroundGlow />
      
      {/* Your content here - must have relative/absolute positioning with z-index */}
      <div className="relative z-10">
        <h1>Your Content</h1>
      </div>
    </div>
  )
}
```

### With Custom Classes

```tsx
<div className="relative h-screen bg-[#0d0d0d]">
  <BackgroundGlow className="opacity-80" />
  <div className="relative z-10">Content</div>
</div>
```

## Important Notes

### Parent Container Requirements

The parent container **must** have:
- `relative` positioning
- Dark background color (recommended: `bg-[#0d0d0d]`)
- `overflow-hidden` to prevent glow spillover

### Content Layering

Content placed after `<BackgroundGlow />` should:
- Have `relative` or `absolute` positioning
- Include `z-10` or higher z-index to appear above the background
- Use the `pointer-events-none` class on the BackgroundGlow ensures no interaction blocking

### Performance Considerations

- All images are loaded from `/public/assets/design-system/`
- Images use native browser blend modes (no runtime processing)
- Component is pointer-events-none for performance

## Customization

### Adjusting Opacity

```tsx
<BackgroundGlow className="opacity-70" />
```

### Hiding on Mobile

```tsx
<BackgroundGlow className="hidden md:block" />
```

### Different Blend Intensity

Modify the component's internal opacity values:
- Main glows: `opacity-50`, `opacity-35`, `opacity-40`
- Accent layers: `opacity-20`, `opacity-25`

## Examples in the App

### HomePage

```tsx
// components/HomePage.tsx
<div className="bg-[#0d0d0d] relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
  <BackgroundGlow />
  {/* Steps content */}
</div>
```

### Dashboard (if needed)

```tsx
// components/Dashboard.tsx
<div className="h-screen bg-[#0d0d0d] relative overflow-hidden flex flex-col">
  <BackgroundGlow className="opacity-60" />
  {/* Dashboard content */}
</div>
```

## Design Assets

The component uses these SVG files from Figma:
- `Ellipse 1.svg` - Pink/magenta glow (#FF37E4)
- `Ellipse 2.svg` - Orange/peach glow (#FFCEA3)
- `Ellipse 3.svg` - Cyan glow (#A3E7FF)

All assets are located in: `/public/assets/design-system/`

## Browser Compatibility

Mix blend modes are supported in all modern browsers:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- IE11: ❌ (fallback to normal rendering)

## Accessibility

- All decorative images use empty `alt=""` attributes
- Component is `pointer-events-none` so it doesn't interfere with interactive elements
- No ARIA labels needed as it's purely decorative
