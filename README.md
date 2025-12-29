# Flash — Design System Operating System

**Flash is not "design to code."**

It's **Design System Version Control + Intelligent Code Generator + Cross-Tool Sync Engine.**

A comprehensive platform for managing design systems with unified schema, 2-way sync, version control, and intelligent workflows.

## 🎯 Core Vision

Flash is the missing piece in the design system industry. Nobody else is doing this—not Figma, not Vercel, not Anima, not Locofy, not Cursor, not v0.dev.

### Key Features

- **Unified DS Schema** - Single source of truth for your entire design system
- **2-Way Sync with Figma** - Bi-directional synchronization with your Figma files
- **2-Way Sync with Code** - Keep your codebase and design system in perfect sync
- **Permissions + Approval Workflow** - Enterprise-grade access control and review processes
- **Safety with Diffing + Impact Analysis** - Understand changes before they break things

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## ✨ Features

### Visual Flow Builder

- **Interactive Canvas**: Drag and drop nodes on a full-screen canvas
- **Node Types**: Specialized node types for different stages of design system creation
- **Real-time Editing**: Edit node properties in the side panel with instant updates
- **Connection System**: Create connections between nodes by dragging from connection handles

### Version Control

- **Version History**: Track all changes to your design system
- **Diffing**: See exactly what changed between versions
- **Impact Analysis**: Understand which components and tokens are affected by changes
- **Breaking Change Detection**: Automatically identify breaking changes before they cause issues

### Sync & Integration

- **Figma Sync**: 2-way synchronization with Figma files
  - Sync design tokens as Figma variables
  - Sync components between Flash and Figma
  - Conflict resolution and merge strategies
- **Code Repository Sync**: 2-way synchronization with Git repositories
  - Generate code files from design system
  - Sync components and tokens to/from codebase
  - Support for GitHub, GitLab, Bitbucket, and local repos

### Permissions & Workflow

- **Role-Based Access Control**: Admin, Designer, Developer, Viewer roles
- **Approval Workflows**: Require approvals before publishing changes
- **Change Tracking**: See who made what changes and when

### Design System Management

- **Components**: Manage reusable UI components
- **Design Tokens**: Centralized design tokens (colors, spacing, typography, etc.)
- **Templates**: Pre-built design system templates
- **Export**: Export in multiple formats (JSON, CSS, SCSS, Figma, Code packages)

## 📁 Project Structure

```
dsm-node/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page
│   ├── globals.css             # Global styles
│   └── api/                    # API routes
│       └── generate-prompt/    # Prompt generation endpoint
├── components/
│   ├── FlowCanvas.tsx          # React Flow wrapper
│   ├── SidePanel.tsx           # Property editor panel
│   ├── Dashboard.tsx           # Design systems dashboard
│   ├── DesignSystemWizard.tsx  # Main wizard interface
│   ├── LeftSidebar.tsx         # Navigation sidebar
│   ├── nodes/                  # Node type components
│   │   ├── ProjectDetailsNode.tsx
│   │   ├── FigmaSetupNode.tsx
│   │   ├── CodeStackNode.tsx
│   │   └── LoadingNode.tsx
│   └── pages/                  # Feature pages
│       ├── ComponentsPage.tsx
│       ├── TokensPage.tsx
│       ├── TemplatesPage.tsx
│       ├── VersionHistoryPage.tsx  # Version control UI
│       ├── SyncPage.tsx            # Sync management UI
│       ├── ExportPage.tsx
│       └── SettingsPage.tsx
├── lib/
│   ├── types/
│   │   └── design-system.ts    # Unified design system schema
│   └── services/
│       ├── version-control.ts  # Version control service
│       ├── sync-service.ts     # Sync services (Figma & Code)
│       └── permissions.ts      # Permissions & approval workflow
└── package.json
```

## 🏗️ Architecture

### Unified Design System Schema

All design systems follow a unified schema defined in `lib/types/design-system.ts`:

- **Design Tokens**: Colors, spacing, typography, shadows, borders, etc.
- **Components**: Reusable UI components with props, variants, and code
- **Metadata**: Project information, tech stack, goals
- **Sync Configuration**: Figma and code repository sync settings
- **Permissions**: Role-based access control and approval workflows

### Version Control System

- **Change Detection**: Automatically detects changes to tokens, components, and metadata
- **Diff Generation**: Creates detailed diffs showing exactly what changed
- **Impact Analysis**: Analyzes which components and tokens are affected by changes
- **Breaking Change Detection**: Identifies API changes, token deletions, and other breaking changes

### Sync Services

- **FigmaSyncService**: Handles 2-way sync with Figma
  - Syncs design tokens as Figma variables
  - Syncs components between Flash and Figma
  - Detects and resolves conflicts

- **CodeSyncService**: Handles 2-way sync with code repositories
  - Generates code files from design system
  - Syncs components and tokens to/from codebase
  - Supports multiple Git providers

- **SyncOrchestrator**: Coordinates full sync across all configured integrations

### Permissions & Approval

- **Role-Based Permissions**: Define what each role can do
- **Approval Workflows**: Require approvals before publishing
- **Version Status**: Track draft, pending, approved, rejected, and merged states

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout
- **React Flow** - Node-based flow builder
- **Tailwind CSS** - Utility-first CSS framework

## 🔮 Roadmap

- [ ] Real Figma API integration
- [ ] Real Git repository integration
- [ ] Webhook support for real-time sync
- [ ] Advanced conflict resolution UI
- [ ] Component code generation from Figma
- [ ] Design token extraction from code
- [ ] Team collaboration features
- [ ] Analytics and usage tracking

## 📝 Development

The app currently uses localStorage for persistence. In production, this would be replaced with a backend API and database.

### Key Services

- `VersionControlService`: Handles versioning, diffs, and impact analysis
- `FigmaSyncService`: Manages Figma synchronization (structure ready for API integration)
- `CodeSyncService`: Manages code repository synchronization (structure ready for API integration)
- `PermissionsService`: Handles role-based access control and approval workflows

## 📄 License

MIT

---

**This is the missing piece in the industry.**
