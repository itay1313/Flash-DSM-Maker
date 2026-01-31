# ⚡ Flash DS — Design System at the Speed of Business

<div align="center">

**The missing piece in the design system industry**

Build, manage, and publish production-ready design systems with AI-powered generation, live token editing, and multi-framework export.

[Getting Started](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Roadmap](#-roadmap)

</div>

---

## 🎯 What is Flash DS?

Flash DS is **not another design-to-code tool**. It's a complete **Design System Operating System** that bridges the gap between design and development.

### The Problem We Solve

- Designers work in Figma. Developers work in code. They're always out of sync.
- Design tokens are scattered across tools with no single source of truth.
- Generating components for different frameworks (React, Vue, Angular, SwiftUI) requires manual work.
- No intelligent system understands your design DNA and applies it consistently.

### Our Solution

Flash DS provides:
- **🎨 Visual Token Management** - Edit colors, spacing, typography with live preview
- **🤖 AI Component Generation** - Describe components, get production-ready code
- **🔄 Multi-Framework Export** - Generate for React, Next.js, Angular, Vue, SwiftUI, Flutter
- **💾 Persistent State** - All changes auto-save, never lose your work
- **🎭 Theme Support** - Built-in light/dark mode with separate token sets
- **📦 Professional Token System** - 100+ semantic tokens out of the box

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Flash-DSM-Maker

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start building your design system!

### First Steps

1. **Create Your First Design System** - Click "Create New System" on the homepage
2. **Build the Flow** - Fill in project details, design style, and tech stack
3. **Customize Tokens** - Navigate to Design Tokens and adjust colors, spacing, typography
4. **Generate Components** - Use AI to create custom components
5. **Publish** - Export to React, Next.js, Vue, Angular, SwiftUI, or Flutter

## ✨ Features

### 🎨 Design Tokens (Professional System)

**67 Color Tokens** organized semantically:
- Primary colors (default, hover, active, disabled, contrast)
- Secondary colors with full state variants
- Background (main, subtle, muted, inverted)
- Surface (elevation and interaction states)
- Text (primary, muted, subtle, inverted, disabled)
- Border (default, subtle, strong)
- State (success, warning, error, info + contrasts)
- Focus and interaction (focus, ring, overlay)
- Utility (link, link-hover, selection)

**Plus**: Spacing (11 tokens), Typography (18 tokens), Radius (7 tokens), Motion (8 tokens), Shadow (8 tokens)

**Features**:
- ✅ Live color picker with instant preview
- ✅ Edit any token value and see components update in real-time
- ✅ Light/Dark theme with separate token sets
- ✅ Multi-format export (CSS, JSON, Swift, Sass)
- ✅ Usage tracking - see which components use each token
- ✅ Auto-save to localStorage
- ✅ Search and filter tokens

### 🧩 Component Library

**Built-in Components**:
- Button (3 variants, 6 states)
- Icon Button (2 variants, 5 states)
- Split Button (3 variants, 6 states)
- Chip/Badge (3 variants, 6 states)
- Input (3 variants, 6 states)

**Features**:
- ✅ Live preview with state control (default, hover, active, loading)
- ✅ Component search and filtering
- ✅ Grid/List view toggle
- ✅ AI component generation - describe what you want, get code
- ✅ Copy component code
- ✅ Framework-specific code generation

### 🤖 AI-Powered Generation

**AI Component Creator**:
- Describe any component in plain English
- Example: "Create a toast notification component"
- Generates: Component code, TypeScript types, variants, usage examples

**Preset Patterns** (12 included):
- Tailwind 4 (22 components)
- Untitled UI (30 components)
- Radix UI Light/Dark (31 components each)
- Adobe Spectrum (14 components)
- Ant Design (13 components)
- Bootstrap (11 components)
- Chakra UI (10 components)
- Frames X (20 components)
- Material UI (19 components)
- CSS Modules
- Styled Components

### 📦 Multi-Framework Publishing

**Export to Any Framework**:
- ⚛️ React (React 18+ with TypeScript)
- ▲ Next.js (Next.js 14+ with App Router)
- 🅰️ Angular (Angular 17+ with standalone components)
- 🟢 Vue (Vue 3 with Composition API)
- 🍎 SwiftUI (SwiftUI for iOS/macOS)
- 🐦 Flutter (Flutter for cross-platform)

**Publishing Methods**:
- 📥 Download ZIP - Complete package ready to integrate
- 🐙 Sync to GitHub - Direct push with versioning

### 🎯 Visual Flow Builder

- **Interactive Canvas**: React Flow-powered visual builder
- **Node Types**: Project Details, Design & Style, Code Stack
- **Auto-Connect**: Nodes automatically link in sequence
- **Smart Defaults**: Pre-filled with modern best practices
- **Side Panel Editor**: Edit node properties with instant updates

### 📱 Responsive Design

- **Mobile-First**: Works beautifully on phones, tablets, and desktops
- **Adaptive Layouts**: Components resize intelligently
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Progressive Enhancement**: Full features on desktop, optimized on mobile

## 📁 Project Structure

```
Flash-DSM-Maker/
├── app/
│   ├── page.tsx                    # Homepage with design system selector
│   ├── ds/[id]/[view]/page.tsx    # Dynamic routing for design systems
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles + design tokens
│
├── components/
│   ├── HomePage.tsx                # Landing page with 3-step wizard
│   ├── Dashboard.tsx               # Design systems management
│   ├── DesignSystemWizard.tsx      # Main application container
│   ├── LeftSidebar.tsx             # Icon-only navigation
│   │
│   ├── nodes/                      # Flow builder nodes
│   │   ├── ProjectDetailsNode.tsx  # Project info & goals
│   │   ├── FigmaSetupNode.tsx      # Design source configuration
│   │   ├── CodeStackNode.tsx       # Tech stack selection
│   │   └── LoadingNode.tsx         # Loading state animation
│   │
│   ├── pages/                      # Feature pages
│   │   ├── ComponentsPage.tsx      # Component library with live preview
│   │   ├── TokensPage.tsx          # Design tokens editor (100+ tokens)
│   │   ├── ModulesPage.tsx         # Multi-component patterns
│   │   ├── VersionHistoryPage.tsx  # Version control
│   │   ├── SyncPage.tsx            # Figma & GitHub sync
│   │   ├── ExportPage.tsx          # Export & download
│   │   └── SettingsPage.tsx        # Project settings
│   │
│   ├── ui/                         # Reusable UI components
│   │   ├── FlowNodeCard.tsx        # Flow node container
│   │   ├── FlowNodeField.tsx       # Flow node inputs
│   │   ├── FlashButton.tsx         # Gradient button
│   │   ├── Typography.tsx          # Typography components
│   │   └── ModuleEditModal.tsx     # Module property editor
│   │
│   ├── PublishModal.tsx            # Framework selection & publishing
│   ├── NewTokenModal.tsx           # Create custom tokens
│   └── NewComponentModal.tsx       # AI component generation
│
├── lib/
│   ├── types/
│   │   ├── tokens.ts               # Token type definitions
│   │   ├── modules.ts              # Module schemas
│   │   └── design-system.ts        # Design system schema
│   │
│   └── utils/
│       ├── tokenExport.ts          # Multi-format token export
│       └── tokenUsage.ts           # Component usage tracking
│
└── public/
    └── assets/
        └── design-system/          # Icon assets (SVG)
```

## 🏗️ Core Concepts

### Design Tokens (Professional System)

Flash DS uses a **semantic token system** inspired by Material Design, Tailwind, and leading design systems:

```css
/* Primary Interactive Colors */
--color-primary              /* Default state */
--color-primary-hover        /* Hover state */
--color-primary-active       /* Active/pressed state */
--color-primary-disabled     /* Disabled state */
--color-primary-contrast     /* Text on primary background */

/* And 62 more tokens for comprehensive coverage */
```

**Token Categories**:
- 🎨 **Colors** (67 tokens) - Semantic color system
- 📏 **Spacing** (11 tokens) - Consistent spacing scale
- 🔤 **Typography** (18 tokens) - Font families, sizes, weights, headings
- ⭕ **Radius** (7 tokens) - Border radius scale
- ⚡ **Motion** (8 tokens) - Animation durations & easing
- 🌑 **Shadow** (8 tokens) - Elevation & effects

### Multi-Framework Code Generation

Flash DS generates **framework-specific** code, not generic templates:

**React/Next.js**:
```tsx
export const Button = ({ children, variant = 'primary' }: ButtonProps) => (
  <button className={styles.button} data-variant={variant}>
    {children}
  </button>
)
```

**Vue 3**:
```vue
<template>
  <button :class="buttonClass" :data-variant="variant">
    <slot />
  </button>
</template>
```

**SwiftUI**:
```swift
struct PrimaryButton: View {
    let title: String
    var body: some View {
        Text(title)
            .buttonStyle(PrimaryButtonStyle())
    }
}
```

Each framework gets **optimized code** following its best practices.

### AI Component Generation

Describe what you want in plain English:

> "Create a toast notification component"

Flash DS generates:
- ✅ Complete component code
- ✅ TypeScript types and interfaces
- ✅ Multiple variants (success, error, warning, info)
- ✅ State management (show, hide, auto-dismiss)
- ✅ Animations and transitions
- ✅ Usage examples
- ✅ Accessibility features

### Live Token Editing

Changes to design tokens update **everywhere instantly**:

1. Edit `--color-primary` from blue to purple
2. Click "Update Design Foundation"
3. See ALL components using that token change color
4. Changes persist across page navigation
5. Auto-saved to localStorage

## 🛠️ Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **React Flow** for visual flow builder
- **Tailwind CSS** for styling
- **CSS Variables** for live token updates
- **LocalStorage** for client-side persistence (backend-ready architecture)

## 🔮 Roadmap

### Phase 1: Foundation (✅ Complete)
- [x] Visual flow builder with node system
- [x] Professional design token system (100+ tokens)
- [x] Component library with live preview
- [x] Multi-framework export (6 frameworks)
- [x] AI component generation
- [x] Light/Dark theme support
- [x] Responsive design
- [x] LocalStorage persistence

### Phase 2: Intelligence (🚧 In Progress)
- [ ] Real AI integration (OpenAI/Anthropic)
- [ ] Component code generation from screenshots
- [ ] Automatic token extraction from websites
- [ ] Design system health scoring
- [ ] Accessibility audit automation
- [ ] Token conflict detection

### Phase 3: Integration (📋 Planned)
- [ ] Real Figma Plugin API integration
- [ ] GitHub/GitLab repository sync
- [ ] npm package publishing
- [ ] Storybook integration
- [ ] Vercel deployment integration
- [ ] Webhook support for CI/CD

### Phase 4: Collaboration (🎯 Future)
- [ ] Multi-user real-time editing
- [ ] Comment and review system
- [ ] Version control with branching
- [ ] Approval workflows
- [ ] Team permissions
- [ ] Activity feed and notifications
- [ ] Design system analytics

## 📝 Documentation

### Usage Guide

**Creating a Design System**:
1. Click "Create New System" on dashboard (max 3 in free version)
2. Choose preset pattern or start from scratch
3. Fill in project flow nodes (auto-created on first visit)
4. Customize design tokens in the Tokens page
5. Add components via AI generation or manually
6. Publish to your preferred framework

**Editing Design Tokens**:
1. Navigate to Design Tokens (second icon in sidebar)
2. Select a token from the list
3. Edit using color picker, hex input, or direct value
4. Click "Update Design Foundation"
5. See changes reflected immediately in all components
6. Changes auto-save to localStorage

**Generating Components**:
1. Go to Component Library (third icon in sidebar)
2. Click "New Component" button
3. Describe component: "Create a toast notification"
4. AI generates complete component code
5. Preview with state controls (default, hover, active, loading)
6. Copy code or integrate into your system

**Publishing**:
1. Click "Publish" in top bar
2. Select target framework (React, Vue, Angular, SwiftUI, Flutter)
3. Choose method (Download ZIP or Sync to GitHub)
4. Get production-ready code optimized for your framework

### Keyboard Shortcuts

- `Cmd/Ctrl + 1` - Flow Builder
- `Cmd/Ctrl + 2` - Design Tokens
- `Cmd/Ctrl + 3` - Component Library
- `Cmd/Ctrl + 4` - Modules
- `Cmd/Ctrl + 5` - Versions
- `Cmd/Ctrl + 6` - Sync
- `Cmd/Ctrl + 7` - Export
- `Cmd/Ctrl + 8` - Settings

### Data Persistence

All data is stored in browser localStorage:
- `dsm-design-systems` - List of all design systems
- `design-tokens-{theme}-colors` - Color tokens per theme
- `design-tokens-{category}` - Spacing, typography, etc.
- `dsm-flow-nodes` - Flow builder state
- `dsm-flow-edges` - Node connections

**Production Ready**: Architecture supports easy migration to backend API (PostgreSQL/MongoDB recommended)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs** - Open an issue with detailed reproduction steps
2. **Suggest Features** - Share ideas for new capabilities
3. **Submit PRs** - Fix bugs or add features
4. **Improve Docs** - Help us document better

## 💡 Use Cases

- **Startups**: Build consistent UI faster with AI-generated components
- **Design Teams**: Maintain single source of truth for design tokens
- **Agencies**: Reuse design systems across client projects
- **Open Source**: Publish design systems for community use
- **Enterprise**: Scale design consistency across multiple teams

## 📄 License

MIT License - Free for personal and commercial use

---

<div align="center">

**Flash DS - Design System at the Speed of Business** ⚡

Built with 💜 for designers and developers who want to move fast without breaking things

[Report Bug](https://github.com/your-repo/issues) • [Request Feature](https://github.com/your-repo/issues) • [Documentation](https://github.com/your-repo/docs)

</div>
