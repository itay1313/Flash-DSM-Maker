'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import FlowCanvas, { FlowCanvasRef } from './FlowCanvas'
import SidePanel from './SidePanel'
import LeftSidebar from './LeftSidebar'
import ComponentsPage from './pages/ComponentsPage'
import TokensPage from './pages/TokensPage'
import ModulesPage from './pages/ModulesPage'
import ExportPage from './pages/ExportPage'
import SettingsPage from './pages/SettingsPage'
import VersionHistoryPage from './pages/VersionHistoryPage'
import SyncPage from './pages/SyncPage'
import ProjectAIModal from './ProjectAIModal'
import { Node } from 'reactflow'
import { SavedDesignSystem } from './Dashboard'
import SystemComponents from './SystemComponents'

interface DesignSystemWizardProps {
  designSystem?: SavedDesignSystem
  onSave: (system: SavedDesignSystem) => void
  onClose: () => void
  initialView?: string
}

const NODE_TYPES = [
  { id: 'projectDetails', label: 'Project details' },
  { id: 'figmaSetup', label: 'Design & Style' },
  { id: 'codeStack', label: 'Code stack' },
]

export default function DesignSystemWizard({ designSystem, onSave, onClose, initialView }: DesignSystemWizardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeView, setActiveView] = useState(initialView || 'flow')
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  // Sync activeView with URL
  useEffect(() => {
    if (initialView && initialView !== activeView) {
      setActiveView(initialView)
    }
  }, [initialView])

  // Update URL when view changes
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view)
    const systemId = designSystem?.id || 'new'
    router.push(`/ds/${systemId}/${view}`)
  }, [designSystem?.id, router])

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if target is not an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return
      }

      if ((e.metaKey || e.ctrlKey) && /^[1-7]$/.test(e.key)) {
        e.preventDefault()
        const viewMap: Record<string, string> = {
          '1': 'flow',
          '2': 'tokens',
          '3': 'components',
          '4': 'versions',
          '5': 'sync',
          '6': 'export',
          '7': 'settings'
        }
        const targetView = viewMap[e.key]
        if (targetView) {
          handleViewChange(targetView)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleViewChange])

  const [isCreating, setIsCreating] = useState(false)
  const [nextNodeType, setNextNodeType] = useState<string | null>(null)
  const [isFlowComplete, setIsFlowComplete] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedSystems, setSavedSystems] = useState<SavedDesignSystem[]>([])
  const [currentSystemId, setCurrentSystemId] = useState<string | null>(designSystem?.id || null)
  const flowCanvasRef = useRef<FlowCanvasRef>(null)

  // Load design system data if editing
  useEffect(() => {
    if (designSystem && flowCanvasRef.current) {
      // Load nodes and edges from saved system
      const nodes = designSystem.nodes || []
      const edges = designSystem.edges || []
      if (nodes.length > 0) {
        // Small delay to ensure FlowCanvas is ready
        setTimeout(() => {
          if (flowCanvasRef.current) {
            flowCanvasRef.current.loadNodes(nodes, edges)
          }
        }, 100)
      }
      setCurrentSystemId(designSystem.id)
    }
  }, [designSystem])

  // Restore selected node on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNodeId = localStorage.getItem('dsm-selected-node-id')
      if (savedNodeId && flowCanvasRef.current) {
        let attempts = 0
        const maxAttempts = 10
        const restoreSelection = () => {
          attempts++
          const nodes = flowCanvasRef.current?.getNodes()
          const nodeToSelect = nodes?.find(n => n.id === savedNodeId)
          if (nodeToSelect) {
            setSelectedNode(nodeToSelect)
          } else if (attempts < maxAttempts) {
            setTimeout(restoreSelection, 200)
          }
        }
        setTimeout(restoreSelection, 100)
      }
    }
  }, [])

  // Persist selected node ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedNode?.id) {
        localStorage.setItem('dsm-selected-node-id', selectedNode.id)
      } else {
        localStorage.removeItem('dsm-selected-node-id')
      }
    }
  }, [selectedNode])

  // Update next node type when nodes change
  const updateNextNodeType = useCallback(() => {
    if (flowCanvasRef.current) {
      const next = flowCanvasRef.current.getNextNodeType()
      setNextNodeType(next)
    }
  }, [])

  // Generate prompt from all node data
  const generatePrompt = useCallback(() => {
    if (!flowCanvasRef.current) return

    const allNodes = flowCanvasRef.current.getNodes()
    const nodesByType: Record<string, Node> = {}
    allNodes.forEach((node) => {
      if (node.type) {
        nodesByType[node.type] = node
      }
    })

    const projectDetails = nodesByType.projectDetails?.data || {}
    const figmaSetup = nodesByType.figmaSetup?.data || {}
    const codeStack = nodesByType.codeStack?.data || {}

    // Determine tech stack - use modern defaults
    const projectTypes = codeStack.projectTypes || ['Next.js']
    const designSystemBases = codeStack.designSystemBases || ['shadcn/ui']
    
    let techStack = 'Next.js'
    if (projectTypes.includes('Next.js')) {
      techStack = 'Next.js'
    } else if (projectTypes.includes('React')) {
      techStack = 'React'
    } else if (projectTypes.includes('Vue')) {
      techStack = 'Vue'
    } else if (projectTypes.includes('Svelte')) {
      techStack = 'Svelte'
    } else if (projectTypes.includes('Remix')) {
      techStack = 'Remix'
    }

    let stylingApproach = 'shadcn/ui with Tailwind CSS'
    if (designSystemBases.includes('shadcn') || designSystemBases.includes('shadcn/ui')) {
      stylingApproach = 'shadcn/ui with Tailwind CSS'
    } else if (designSystemBases.includes('From scratch')) {
      stylingApproach = 'from scratch using CSS modules'
    } else if (designSystemBases.includes('MUI')) {
      stylingApproach = 'Material-UI (MUI)'
    } else if (designSystemBases.includes('Ant Design')) {
      stylingApproach = 'Ant Design'
    } else if (designSystemBases.includes('Tailwind CSS')) {
      stylingApproach = 'Tailwind CSS'
    }

    // Build the prompt
    let prompt = `Create a ${techStack} application using ${stylingApproach}.\n\n`

    if (projectDetails.projectName) {
      prompt += `## Project: ${projectDetails.projectName}\n\n`
    }
    if (projectDetails.shortDescription) {
      prompt += `**Description:** ${projectDetails.shortDescription}\n\n`
    }
    if (projectDetails.goals) {
      prompt += `**Goals:**\n${projectDetails.goals}\n\n`
    }
    if (projectDetails.targetAudience) {
      prompt += `**Target Audience:** ${projectDetails.targetAudience}\n\n`
    }

    prompt += `## Design System Setup\n\n`
    if (figmaSetup.option === 'website' && figmaSetup.websiteUrl) {
      prompt += `- Scan website: ${figmaSetup.websiteUrl}\n`
      if (figmaSetup.scannedComponents && figmaSetup.scannedComponents.length > 0) {
        prompt += `- Found ${figmaSetup.scannedComponents.length} components from website\n`
      }
    } else if (figmaSetup.option === 'ai') {
      if (figmaSetup.inspirationUrl) {
        prompt += `- Inspiration website: ${figmaSetup.inspirationUrl}\n`
      }
      if (figmaSetup.inspirationImages && figmaSetup.inspirationImages.length > 0) {
        prompt += `- ${figmaSetup.inspirationImages.length} inspiration images uploaded\n`
      }
      if (figmaSetup.aiDescription) {
        prompt += `- Additional description: ${figmaSetup.aiDescription}\n`
      }
    }
    prompt += '\n'

    prompt += `## Technical Stack\n\n`
    prompt += `- **Framework:** ${techStack}\n`
    prompt += `- **Styling:** ${stylingApproach}\n`
    if (projectTypes.length > 0) {
      prompt += `- **Project Types:** ${projectTypes.join(', ')}\n`
    }
    prompt += '\n'

    prompt += `## Implementation Requirements\n\n`
    prompt += `1. Set up a ${techStack} project with TypeScript\n`
    prompt += `2. Configure ${stylingApproach} for styling\n`
    prompt += `3. Create reusable components based on the design system\n`
    prompt += `4. Use design tokens for colors, typography, and spacing\n`
    prompt += `5. Ensure responsive design and accessibility\n`
    prompt += `6. Follow modern React best practices and component architecture\n\n`

    prompt += `Please provide a complete, production-ready implementation with all necessary configuration files, components, and utilities.`

    setGeneratedPrompt(prompt)
  }, [])

  const handleCreateNode = async (type: string) => {
    setIsCreating(true)
    try {
      if (flowCanvasRef.current) {
        await flowCanvasRef.current.createNode(type)
        setTimeout(updateNextNodeType, 100)
      }
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateNextNode = async () => {
    if (!nextNodeType || !flowCanvasRef.current) return
    await handleCreateNode(nextNodeType)
  }

  const handleSwitchSystem = (id: string) => {
    const system = savedSystems.find((s) => s.id === id)
    if (system) {
      setCurrentSystemId(system.id)
      // Optionally load nodes/edges for preview
      if (flowCanvasRef.current) {
        flowCanvasRef.current.loadNodes(system.nodes || [], system.edges || [])
      }
    }
  }

  const getNextNodeLabel = () => {
    if (!nextNodeType) return null
    const nodeType = NODE_TYPES.find((nt) => nt.id === nextNodeType)
    return nodeType?.label || null
  }

  // Save design system
  const handleSave = useCallback(() => {
    setIsSaving(true)
    
    try {
      const nodes = flowCanvasRef.current?.getNodes() || []
      const edges = flowCanvasRef.current?.getEdges() || []
      const projectDetailsNode = nodes.find(n => n.type === 'projectDetails')
      const projectName = projectDetailsNode?.data?.projectName || designSystem?.projectName || 'Untitled Design System'

      const systemToSave: SavedDesignSystem & { edges?: any[] } = {
        id: designSystem?.id || `ds-${Date.now()}`,
        projectName,
        shortDescription: projectDetailsNode?.data?.shortDescription || designSystem?.shortDescription,
        createdAt: designSystem?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accent: designSystem?.accent || 'bg-indigo-500',
        nodes: nodes,
        edges: edges,
        components: designSystem?.components || [],
        tokens: designSystem?.tokens || [],
      }

      console.log('Saving design system:', systemToSave)
      onSave(systemToSave)
      setCurrentSystemId(systemToSave.id)
      // Navigate to components view after saving
      router.push(`/ds/${systemToSave.id}/components`)
      // refresh saved systems
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('dsm-design-systems')
        if (saved) {
          try {
            const systems = JSON.parse(saved)
            setSavedSystems(systems)
          } catch (e) {
            console.error('Failed to parse saved systems:', e)
          }
        }
      }
      
      // Show success feedback
      setTimeout(() => {
        setIsSaving(false)
      }, 500)
    } catch (error) {
      console.error('Error saving design system:', error)
      setIsSaving(false)
    }
  }, [designSystem, onSave])

  const handleNodeUpdate = useCallback((nodeId: string, data: any) => {
    if (flowCanvasRef.current) {
      flowCanvasRef.current.updateNodeData(nodeId, data)
      if (isFlowComplete) {
        generatePrompt()
      }
    }
  }, [isFlowComplete, generatePrompt])

  // Check if flow is complete
  const checkFlowComplete = useCallback(() => {
    if (flowCanvasRef.current) {
      const complete = flowCanvasRef.current.isFlowComplete()
      setIsFlowComplete(complete)
      if (complete && !showPrompt && !generatedPrompt) {
        generatePrompt()
      }
    }
  }, [showPrompt, generatedPrompt, generatePrompt])

  // Initialize next node type on mount and when nodes change
  useEffect(() => {
    const interval = setInterval(() => {
      updateNextNodeType()
      checkFlowComplete()
    }, 500)
    
    updateNextNodeType()
    checkFlowComplete()
    
    return () => clearInterval(interval)
  }, [updateNextNodeType, checkFlowComplete])

  // Load saved systems list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-design-systems')
      if (saved) {
        try {
          const systems = JSON.parse(saved)
          setSavedSystems(systems)
        } catch (e) {
          console.error('Failed to parse saved systems:', e)
        }
      }
    }
  }, [])

  // Get project name from nodes
  const getProjectName = () => {
    if (!flowCanvasRef.current) return designSystem?.projectName || 'Untitled Design System'
    const nodes = flowCanvasRef.current.getNodes()
    const projectDetailsNode = nodes.find(n => n.type === 'projectDetails')
    return projectDetailsNode?.data?.projectName || designSystem?.projectName || 'Untitled Design System'
  }

  // Initialize title value
  useEffect(() => {
    if (!titleValue && designSystem) {
      setTitleValue(designSystem.projectName || 'Untitled Design System')
    } else if (!titleValue) {
      setTitleValue('Untitled Design System')
    }
  }, [designSystem])

  // Update title when project name changes from nodes
  useEffect(() => {
    if (!isEditingTitle && flowCanvasRef.current) {
      const currentName = getProjectName()
      if (currentName !== titleValue) {
        setTitleValue(currentName)
      }
    }
  }, [selectedNode, isEditingTitle])

  const handleTitleClick = () => {
    setIsEditingTitle(true)
    setTitleValue(getProjectName())
  }

  const handleTitleChange = (value: string) => {
    setTitleValue(value)
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    const trimmedValue = titleValue.trim() || 'Untitled Design System'
    setTitleValue(trimmedValue)
    
    // Update the project name in the node
    if (flowCanvasRef.current) {
      const nodes = flowCanvasRef.current.getNodes()
      const projectDetailsNode = nodes.find(n => n.type === 'projectDetails')
      if (projectDetailsNode) {
        flowCanvasRef.current.updateNodeData(projectDetailsNode.id, {
          ...projectDetailsNode.data,
          projectName: trimmedValue
        })
      }
    }
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleTitleBlur()
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false)
      setTitleValue(getProjectName())
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradients - Global */}
      <div className="absolute right-0 top-0 w-1/2 h-1/2 pointer-events-none z-0 opacity-30">
        <img alt="Background gradient effect" className="block w-full h-full object-cover" src="https://www.figma.com/api/mcp/asset/956cf506-0262-4c9f-aa8c-3a55857c5093" />
      </div>
      <div className="absolute right-0 top-1/4 w-1/3 h-1/3 pointer-events-none z-0 opacity-20">
        <img alt="Background gradient effect" className="block w-full h-full object-cover" src="https://www.figma.com/api/mcp/asset/fcb858a2-0b01-403e-94de-a6774e3d3ea9" />
      </div>

      {/* Top Bar */}
      <div className="flex h-[74px] items-center justify-between px-6 py-2 z-20">
        <div className="flex gap-2.5 items-end">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors mr-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="font-['EightiesComeback_VAR',serif] text-[28px] text-[#d0d0d0] tracking-[1.4px] font-light leading-none">
            Flash DS
          </h1>
          <span className="font-['Inter',sans-serif] font-bold text-[16px] text-[#d0d0d0]">/</span>
          {isEditingTitle ? (
            <input
              type="text"
              value={titleValue}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className="text-[#d0d0d0] text-[16px] font-normal bg-transparent border-b border-accent-magenta focus:outline-none px-1 py-0 min-w-[150px]"
            />
          ) : (
            <span 
              onClick={handleTitleClick}
              className="font-['Inter',sans-serif] text-[16px] text-[#d0d0d0] cursor-text hover:text-white transition-colors"
            >
              {titleValue || getProjectName()}
            </span>
          )}
          <button className="w-[16px] h-[16px] flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
            <img alt="Dropdown" className="block max-w-none size-full" src="/assets/design-system/keyboard_arrow_down.svg" />
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[12px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.35)] hover:opacity-90 transition-opacity"
            style={{ 
              backgroundImage: "radial-gradient(ellipse 65px 40px at 50% 0%, rgba(37,86,104,1) 0%, rgba(31,68,81,1) 25%, rgba(25,50,59,1) 50%, rgba(19,31,36,1) 75%, rgba(13,13,13,1) 100%)"
            }}
          >
            <div className="relative size-[24px]">
              <img alt="Figma icon" className="block max-w-none size-full" src="/assets/design-system/figma.svg" />
            </div>
            <span className="font-sans font-normal text-[16px] text-gray-100">
              {isSaving ? 'Saving...' : 'Export'}
            </span>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3),inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]" />
          </button>
          <button
            onClick={() => generatePrompt()}
            className="flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[12px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.35)] hover:opacity-90 transition-opacity"
            style={{ 
              backgroundImage: "radial-gradient(ellipse 65px 40px at 50% 0%, rgba(37,86,104,1) 0%, rgba(31,68,81,1) 25%, rgba(25,50,59,1) 50%, rgba(19,31,36,1) 75%, rgba(13,13,13,1) 100%)"
            }}
          >
            <div className="relative size-[24px]">
              <img alt="Publish icon" className="block max-w-none size-full" src="/assets/design-system/publish.svg" />
            </div>
            <span className="font-sans font-normal text-[16px] text-gray-100">
              Publish
            </span>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3),inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden z-10">
        {/* Left Sidebar */}
        <LeftSidebar 
          activeView={activeView} 
          onViewChange={handleViewChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onShowPrompt={() => {
            if (!generatedPrompt) {
              generatePrompt()
            }
            setShowPrompt(true)
          }}
          hasGeneratedPrompt={!!generatedPrompt}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden flex">
          <div className="flex-1 overflow-y-auto">
            {activeView === 'flow' && (
              <FlowCanvas 
                ref={flowCanvasRef}
                onNodeSelect={(node) => {
                  setSelectedNode(node)
                  if (node?.id && typeof window !== 'undefined') {
                    localStorage.setItem('dsm-selected-node-id', node.id)
                  } else if (typeof window !== 'undefined') {
                    localStorage.removeItem('dsm-selected-node-id')
                  }
                  setTimeout(updateNextNodeType, 100)
                }} 
                selectedNodeId={selectedNode?.id}
                onNodeUpdate={handleNodeUpdate}
              />
            )}
            {activeView === 'components' && (
              <ComponentsPage />
            )}
            {activeView === 'tokens' && <TokensPage />}
            {activeView === 'templates' && <TemplatesPage />}
            {activeView === 'versions' && <VersionHistoryPage />}
            {activeView === 'sync' && <SyncPage />}
            {activeView === 'export' && <ExportPage />}
            {activeView === 'settings' && <SettingsPage />}
          </div>

          {/* Side Panel - only show on flow view when a node is selected */}
          {activeView === 'flow' && selectedNode && (
            <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto z-20">
              <SidePanel 
                selectedNode={selectedNode} 
                onNodeUpdate={handleNodeUpdate}
                onShowAIModal={() => setShowAIModal(true)}
                onCreateNextNode={nextNodeType ? handleCreateNextNode : undefined}
                nextNodeLabel={getNextNodeLabel()}
              />
            </div>
          )}
          {activeView === 'tokens' && <TokensPage />}
          {activeView === 'modules' && <ModulesPage />}
          {activeView === 'versions' && <VersionHistoryPage />}
          {activeView === 'sync' && <SyncPage />}
          {activeView === 'export' && <ExportPage />}
          {activeView === 'settings' && <SettingsPage />}
        </div>
      </div>

      {/* Project AI Modal */}
      <ProjectAIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={(aiData) => {
          if (selectedNode && selectedNode.type === 'projectDetails') {
            handleNodeUpdate(selectedNode.id, {
              ...selectedNode.data,
              projectName: aiData.projectName,
              shortDescription: aiData.shortDescription,
              goals: aiData.goals,
              targetAudience: aiData.targetAudience,
              mode: 'ai',
            })
          }
          setShowAIModal(false)
        }}
      />

      {/* Generated Prompt Modal */}
      {showPrompt && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowPrompt(false)}
          />
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">Generated Prompt</h2>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {generatedPrompt ? (
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-gray-950 p-4 rounded-lg border border-gray-700">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-2 border-gray-700 border-t-palette-slate rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Generating prompt...</p>
                  </div>
                )}
              </div>
              {/* Footer */}
              {generatedPrompt && (
                <div className="p-6 border-t border-gray-800 flex space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPrompt)
                      // Show toast or feedback
                    }}
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Prompt</span>
                  </button>
                  <button
                    onClick={() => setShowPrompt(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

