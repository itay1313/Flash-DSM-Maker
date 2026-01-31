# Typography Component System

A comprehensive typography component system for the Flash DS application using **Instrument Serif** for headings and **Inter** for body text.

## Font Family Usage

- **Headings (h1-h6, Display)**: Instrument Serif
- **Body text & UI elements**: Inter

## Components

### Headings (H1-H6)

```tsx
import { H1, H2, H3, H4, H5, H6 } from '@/components/ui/Typography'

<H1>Flash DS</H1>
<H2>Section Heading</H2>
<H3>Subsection Heading</H3>
<H4>Card Title</H4>
<H5>Small Heading</H5>
<H6>Smallest Heading</H6>
```

**Font Family:** Instrument Serif (all headings)

**Sizes:**
- H1: 96px (Display size - for hero headings)
- H2: 3xl (48px)
- H3: 2xl (36px)
- H4: xl (30px)
- H5: lg (24px)
- H6: base (20px)

### Subtitle

```tsx
import { Subtitle } from '@/components/ui/Typography'

<Subtitle className="text-gray-300">
  Design system at the speed of business
</Subtitle>
```

**Default styles:**
- Font: Inter
- Size: 18px
- Weight: Medium (500)
- Style: Uppercase with wider tracking

### Body Text

```tsx
import { Body, BodyLarge, BodySmall } from '@/components/ui/Typography'

<BodyLarge>Larger body text for emphasis</BodyLarge>
<Body>Regular body text</Body>
<BodySmall>Smaller body text</BodySmall>
```

**Font Family:** Inter (all body variants)

**Sizes:**
- BodyLarge: 18px
- Body: 16px
- BodySmall: 14px

### Caption & Label

```tsx
import { Caption, Label } from '@/components/ui/Typography'

<Caption>Small supplementary text</Caption>
<Label>Form Label</Label>
```

**Font Family:** Inter

**Sizes:**
- Caption: 12px
- Label: 14px (uppercase, wide tracking)

## Generic Typography Component

For more flexibility, use the generic `Typography` component with the `variant` prop:

```tsx
import { Typography } from '@/components/ui/Typography'

<Typography variant="h1">Custom Heading</Typography>
<Typography variant="body">Custom Body Text</Typography>
<Typography variant="caption" as="span">Custom Caption</Typography>
```

### Available Variants

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6` - Heading hierarchy (H1 is the largest at 96px)
- `subtitle` - Subheading text
- `body-lg`, `body`, `body-sm` - Body text sizes
- `caption` - Small text
- `label` - Form labels

### Custom Element

Use the `as` prop to render as a different HTML element:

```tsx
<Typography variant="h1" as="div">
  This renders as a div but looks like an h1
</Typography>
```

## Customization with Tailwind

All components accept a `className` prop for custom styling:

```tsx
<Display className="text-gradient bg-clip-text">
  Gradient Text
</Display>

<H2 className="text-blue-500 italic">
  Custom Styled Heading
</H2>

<Body className="text-gray-400 opacity-60">
  Muted body text
</Body>
```

## Typography Utility Classes

For cases where you need direct class names (e.g., in legacy components), use the `typography` object:

```tsx
import { typography } from '@/components/ui/typography'

<div className={typography.h1}>Direct class usage</div>
```

### Available utility classes:

```typescript
typography.display    // Alternative large display style (96px)
typography.h1         // H1 heading (96px)
typography.h2         // H2 heading
typography.h3         // H3 heading
typography.h4         // H4 heading
typography.h5         // H5 heading
typography.h6         // H6 heading
typography.title      // Italic title
typography.subtitle   // Subtitle text
typography.bodyLg     // Large body
typography.body       // Regular body
typography.bodySm     // Small body
typography.small      // Small text
typography.caption    // Caption text
typography.label      // Label text
typography.button     // Button text
```

## Best Practices

1. **Semantic HTML**: Use the appropriate heading level (H1-H6) for proper document structure
2. **Consistency**: Use the same component for the same purpose across your app
3. **Accessibility**: Maintain proper heading hierarchy for screen readers
4. **Customization**: Use `className` for one-off customizations instead of creating new variants

## Examples

### Hero Section

```tsx
<div className="text-center">
  <H1 className="text-gray-150 mb-4">
    Flash DS
  </H1>
  <Subtitle className="text-gray-300 opacity-60">
    Design system at the speed of business
  </Subtitle>
</div>
```

### Card with Heading

```tsx
<div className="card">
  <H3 className="mb-2">Card Title</H3>
  <Body className="text-gray-400">
    Card description goes here with regular body text.
  </Body>
</div>
```

### Form Field

```tsx
<div className="field">
  <Label className="mb-2">Email Address</Label>
  <input type="email" className="input" />
  <Caption className="text-gray-500 mt-1">
    We'll never share your email
  </Caption>
</div>
```
