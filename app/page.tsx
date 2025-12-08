'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import FlowCanvas, { FlowCanvasRef } from '@/components/FlowCanvas'
import SidePanel from '@/components/SidePanel'
import LeftSidebar from '@/components/LeftSidebar'
import ComponentsPage from '@/components/pages/ComponentsPage'
import TokensPage from '@/components/pages/TokensPage'
import TemplatesPage from '@/components/pages/TemplatesPage'
import ExportPage from '@/components/pages/ExportPage'
import SettingsPage from '@/components/pages/SettingsPage'
import ProjectAIModal from '@/components/ProjectAIModal'
import { Node } from 'reactflow'

const NODE_TYPES = [
  { id: 'projectDetails', label: 'Project details' },
  { id: 'figmaSetup', label: 'Design & Style' },
  { id: 'codeStack', label: 'Code stack' },
]

export default function Home() {
  // Load initial state from localStorage
  const loadInitialSelectedNodeId = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-selected-node-id')
      return saved || null
    }
    return null
  }

  const [activeView, setActiveView] = useState('flow')
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [nextNodeType, setNextNodeType] = useState<string | null>(null)
  const [isFlowComplete, setIsFlowComplete] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const flowCanvasRef = useRef<FlowCanvasRef>(null)

  // Restore selected node on mount
  useEffect(() => {
    const savedNodeId = loadInitialSelectedNodeId()
    if (savedNodeId && flowCanvasRef.current) {
      // Wait for nodes to load, then restore selection
      let attempts = 0
      const maxAttempts = 10
      const restoreSelection = () => {
        attempts++
        const nodes = flowCanvasRef.current?.getNodes()
        const nodeToSelect = nodes?.find(n => n.id === savedNodeId)
        if (nodeToSelect) {
          setSelectedNode(nodeToSelect)
        } else if (attempts < maxAttempts) {
          // If node not found immediately, try again after a short delay
          setTimeout(restoreSelection, 200)
        }
      }
      setTimeout(restoreSelection, 100)
    }
  }, [])

  // Persist selected node ID to localStorage
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

  const handleNodeUpdate = (nodeId: string, data: any) => {
    if (flowCanvasRef.current) {
      flowCanvasRef.current.updateNodeData(nodeId, data)
    }
  }

  const handleCreateNode = async (type: string) => {
    setIsCreating(true)
    try {
      if (flowCanvasRef.current) {
        await flowCanvasRef.current.createNode(type)
        // Update next node type after a short delay to allow state to update
        setTimeout(updateNextNodeType, 100)
      }
    } finally {
      setIsCreating(false)
    }
  }

  // Get the label for the next node type
  const getNextNodeLabel = () => {
    if (!nextNodeType) return null
    const nodeType = NODE_TYPES.find((nt) => nt.id === nextNodeType)
    return nodeType?.label || null
  }

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

    // Determine tech stack
    const projectTypes = codeStack.projectTypes || []
    const designSystemBases = codeStack.designSystemBases || []
    
    let techStack = 'Next.js'
    if (projectTypes.includes('WordPress')) {
      techStack = 'WordPress'
    } else if (projectTypes.includes('Next.js')) {
      techStack = 'Next.js'
    }

    let stylingApproach = 'Tailwind CSS'
    if (designSystemBases.includes('From scratch')) {
      stylingApproach = 'from scratch using CSS modules'
    } else if (designSystemBases.includes('MUI')) {
      stylingApproach = 'Material-UI (MUI)'
    } else if (designSystemBases.includes('Ant Design')) {
      stylingApproach = 'Ant Design'
    } else if (designSystemBases.includes('shadcn')) {
      stylingApproach = 'shadcn/ui with Tailwind CSS'
    } else if (designSystemBases.includes('Tailwind CSS')) {
      stylingApproach = 'Tailwind CSS'
    }

    // Build the prompt
    let prompt = `Create a ${techStack} application using ${stylingApproach}.\n\n`

    // Project Details
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

    // Figma Setup
    prompt += `## Design System Setup\n\n`
    if (figmaSetup.option === 'template' && figmaSetup.template) {
      prompt += `- Use Figma template: ${figmaSetup.template}\n`
    } else if (figmaSetup.option === 'ai' && figmaSetup.aiDescription) {
      prompt += `- AI-generated design system style: ${figmaSetup.aiDescription}\n`
    }
    prompt += '\n'

    // Code Stack
    prompt += `## Technical Stack\n\n`
    prompt += `- **Framework:** ${techStack}\n`
    prompt += `- **Styling:** ${stylingApproach}\n`
    if (projectTypes.length > 0) {
      prompt += `- **Project Types:** ${projectTypes.join(', ')}\n`
    }
    prompt += '\n'

    // Implementation Requirements
    prompt += `## Implementation Requirements\n\n`
    prompt += `1. Set up a ${techStack} project with TypeScript\n`
    prompt += `2. Configure ${stylingApproach} for styling\n`
    prompt += `3. Create reusable components based on the design system\n`
    prompt += `4. Use design tokens for colors, typography, and spacing\n`
    prompt += `5. Ensure responsive design and accessibility\n`
    prompt += `6. Follow modern React best practices and component architecture\n\n`

    prompt += `Please provide a complete, production-ready implementation with all necessary configuration files, components, and utilities.`

    setGeneratedPrompt(prompt)
    setShowPrompt(true)
  }, [])

  // Check if flow is complete and auto-generate
  const checkFlowComplete = useCallback(() => {
    if (flowCanvasRef.current) {
      const complete = flowCanvasRef.current.isFlowComplete()
      setIsFlowComplete(complete)
      // Auto-generate when flow becomes complete (after 3 steps)
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
    }, 500) // Check every 500ms
    
    updateNextNodeType() // Initial check
    checkFlowComplete()
    
    return () => clearInterval(interval)
  }, [updateNextNodeType, checkFlowComplete])

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
            <span className="text-white font-bold text-sm tracking-tight">DSM</span>
          </div>
          <div>
            <h1 className="text-white/90 text-[28px] font-normal italic font-serif">
              Design System AI
            </h1>
            <p className="text-xs text-gray-500">Build your design system with AI</p>
          </div>
        </div>
        <div className="relative">
          {nextNodeType ? (
            <button
              onClick={() => handleCreateNode(nextNodeType)}
              disabled={isCreating}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add {getNextNodeLabel()}</span>
                </>
              )}
            </button>
          ) : (
            <div className="px-4 py-2 bg-gray-700 text-gray-400 rounded-lg text-sm font-medium flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Flow Complete</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar activeView={activeView} onViewChange={setActiveView} />
        
        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {activeView === 'flow' && (
            <>
              <FlowCanvas 
                ref={flowCanvasRef}
                onNodeSelect={(node) => {
                  setSelectedNode(node)
                  // Persist selection
                  if (node?.id && typeof window !== 'undefined') {
                    localStorage.setItem('dsm-selected-node-id', node.id)
                  } else if (typeof window !== 'undefined') {
                    localStorage.removeItem('dsm-selected-node-id')
                  }
                  // Update next node type when selection changes
                  setTimeout(updateNextNodeType, 100)
                }} 
                selectedNodeId={selectedNode?.id}
                onNodeUpdate={handleNodeUpdate}
              />
            </>
          )}
          {activeView === 'components' && <ComponentsPage />}
          {activeView === 'tokens' && <TokensPage />}
          {activeView === 'templates' && <TemplatesPage />}
          {activeView === 'export' && <ExportPage />}
          {activeView === 'settings' && <SettingsPage />}
        </div>

        {/* Side Panel - only show on flow view */}
        {activeView === 'flow' && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
          {showPrompt && generatedPrompt ? (
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Generated Prompt</h2>
                <button
                  onClick={() => {
                    setShowPrompt(false)
                    setSelectedNode(null)
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-gray-900 p-4 rounded-lg border border-gray-700">
                  {generatedPrompt}
                </pre>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPrompt)
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Prompt</span>
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false)
                    setSelectedNode(null)
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <SidePanel 
              selectedNode={selectedNode} 
              onNodeUpdate={handleNodeUpdate}
              onShowAIModal={() => setShowAIModal(true)}
            />
            )}
          </div>
        )}
      </div>

      {/* Project AI Modal - rendered at page level for full width */}
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
    </div>
  )
}

