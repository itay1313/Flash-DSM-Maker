# Design System Flow Builder

A node-based visual builder for design system flows, built with Next.js 14, React Flow, TypeScript, and Tailwind CSS.

## Features

- **Interactive Canvas**: Drag and drop nodes on a full-screen canvas
- **Node Types**: 5 specialized node types for different stages of design system creation
- **Real-time Editing**: Edit node properties in the side panel with instant updates
- **Connection System**: Create connections between nodes by dragging from connection handles
- **Dark Theme**: Modern dark UI with subtle grid background

## Getting Started

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

## Node Types

### 1. Project Details Node
- Project name
- Short description
- Goals
- Target audience

### 2. Figma Setup Node
- Option: Use Figma template or AI model
- Template selection (if template chosen)
- AI description (if AI model chosen)

### 3. Code Stack Node
- Project type checkboxes (Next.js, WordPress)
- Design system base checkboxes (From scratch, Tailwind CSS, MUI, Ant Design, shadcn)

### 4. AI Design System Node
- Components list
- Design tokens
- Light mode toggle
- Dark mode toggle

### 5. Extra Blocks Node
- Description field for additional flows

## Usage

1. **Select a Node**: Click on any node to select it
2. **Edit Properties**: Use the right side panel to edit the selected node's properties
3. **Drag Nodes**: Click and drag nodes to reposition them
4. **Create Connections**: Drag from the connection handles (circles on node edges) to create new connections
5. **View Flow**: Use the minimap in the bottom-left corner to navigate large flows

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **React Flow** - Node-based flow builder
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
dsm-node/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── FlowCanvas.tsx   # React Flow wrapper
│   ├── SidePanel.tsx    # Property editor panel
│   └── nodes/           # Node type components
│       ├── ProjectDetailsNode.tsx
│       ├── FigmaSetupNode.tsx
│       ├── CodeStackNode.tsx
│       ├── AIDesignSystemNode.tsx
│       └── ExtraBlocksNode.tsx
└── package.json
```

## Development

The app is a frontend-only prototype with no backend required. All state is managed in React using React Flow's hooks.

## License

MIT

