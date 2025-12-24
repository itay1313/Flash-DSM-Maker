# Design System Template

Production-ready Design System for modern SaaS startups built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Radix UI.

## Features

- 🎨 **Token-driven design** - CSS variables for all design tokens
- ♿ **Accessible by default** - WCAG 2.1 AA compliant components built on Radix UI
- 📚 **Comprehensive documentation** - Live component showcase and examples
- 🎯 **Type-safe** - Full TypeScript support with IntelliSense
- 🧩 **Composable** - Build complex UIs from simple primitives
- 🚀 **Production-ready** - Battle-tested patterns and best practices

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
design-system-template/
├── design-system/          # Design system components
│   ├── primitives/         # Base components (Button, Input, etc.)
│   ├── form/              # Form field components
│   ├── feedback/          # Loading, error states
│   ├── navigation/        # Navigation components
│   ├── composite/         # Complex components
│   └── layout/            # Layout components
├── app/                   # Next.js app directory
│   └── design-system/     # Component showcase pages
└── docs/                  # MDX documentation
```

## Usage

### Import Components

```tsx
import { Button, TextField, Card } from '@/design-system'

function MyComponent() {
  return (
    <Card>
      <TextField label="Email" />
      <Button>Submit</Button>
    </Card>
  )
}
```

### Design Tokens

All design tokens are defined as CSS variables in `app/globals.css`:

```css
:root {
  --color-primary: #0ea5e9;
  --spacing-4: 1rem;
  --radius-lg: 0.5rem;
}
```

Use tokens via Tailwind classes:

```tsx
<div className="ds-bg-primary ds-p-4 ds-rounded-lg">
  Content
</div>
```

## Components

### Primitives
- Button, Input, Textarea, Select
- Checkbox, Radio, Switch
- Tooltip, Dialog
- Badge, Tag, Icon

### Form Controls
- TextField, SelectField
- CheckboxField, SwitchField
- TextareaField

### Feedback
- Spinner, Skeleton
- Toast, ProgressBar

### Navigation
- Breadcrumb, Navbar, Sidebar
- Tabs, DropdownMenu

### Composite
- ChatInput, ChatBubble
- MentionList, AvatarWithStatus
- DataCard, FileIcon
- Table, Pagination

### Layout
- Grid, Card
- DashboardWidget

## Component Showcase

View all components and examples:

```bash
npm run dev
```

Then navigate to:
- `/design-system` - Main design system hub
- `/design-system/primitives` - All primitive components
- `/design-system/tokens` - Design tokens reference
- `/design-system/[category]` - Component category pages

## Documentation

- [Getting Started](./docs/getting-started.mdx)
- [Design Tokens](./docs/design-tokens.mdx)
- [Component Guidelines](./docs/component-guidelines.mdx)
- [Migration Guide](./docs/migration-guide.mdx)

## Principles

1. **One source of truth** - Tokens defined as CSS variables
2. **One canonical component** - One Button, one Input, etc.
3. **Accessibility by default** - WCAG 2.1 AA compliant
4. **No context coupling** - Components are self-contained
5. **Progressive migration** - Migrate incrementally, not all at once

## Development

### Adding a New Component

1. Create component in appropriate directory:
   ```
   design-system/primitives/my-component/
   ├── my-component.tsx
   ├── index.ts
   └── my-component.stories.tsx
   ```

2. Export from parent index:
   ```tsx
   // design-system/primitives/index.ts
   export * from './my-component'
   ```

3. Create stories with variants, states, and accessibility checks

### Styling Guidelines

- Use Tailwind utilities with `ds-` prefix
- Consume design tokens via CSS variables
- No inline styles
- No global CSS except reset + tokens

## License

MIT

