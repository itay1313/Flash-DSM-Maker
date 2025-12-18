'use client'

import { useCallback, useMemo, useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'

import ProjectDetailsNode from './nodes/ProjectDetailsNode'
import FigmaSetupNode from './nodes/FigmaSetupNode'
import CodeStackNode from './nodes/CodeStackNode'
import LoadingNode from './nodes/LoadingNode'

const nodeTypes: NodeTypes = {
  projectDetails: ProjectDetailsNode,
  figmaSetup: FigmaSetupNode,
  codeStack: CodeStackNode,
  loading: LoadingNode,
}

interface FlowCanvasProps {
  onNodeSelect: (node: Node | null) => void
  selectedNodeId?: string
  onNodeUpdate?: (nodeId: string, data: any) => void
}

export interface FlowCanvasRef {
  updateNodeData: (nodeId: string, data: any) => void
  createNode: (type: string, position?: { x: number; y: number }) => Promise<string>
  getNextNodeType: () => string | null
  getNodes: () => Node[]
  getEdges: () => Edge[]
  isFlowComplete: () => boolean
  loadNodes: (nodesToLoad: Node[], edgesToLoad?: Edge[]) => void
}

const FlowCanvas = forwardRef<FlowCanvasRef, FlowCanvasProps>(
  ({ onNodeSelect, selectedNodeId, onNodeUpdate }, ref) => {
  // Load initial state from localStorage
  const loadInitialNodes = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-flow-nodes')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          return []
        }
      }
    }
    return []
  }

  const loadInitialEdges = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-flow-edges')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          return []
        }
      }
    }
    return []
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(loadInitialNodes())
  const [edges, setEdges, onEdgesChange] = useEdgesState(loadInitialEdges())
  const nodeIdCounter = useRef(0)

  // Calculate max node ID from loaded nodes
  useEffect(() => {
    if (nodes.length > 0) {
      const maxId = Math.max(...nodes.map(n => {
        const numId = parseInt(n.id)
        return isNaN(numId) ? 0 : numId
      }))
      nodeIdCounter.current = Math.max(nodeIdCounter.current, maxId)
    }
  }, [])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onNodeSelect(node)
    },
    [onNodeSelect]
  )

  const onPaneClick = useCallback(() => {
    onNodeSelect(null)
  }, [onNodeSelect])

  // Get default data for a node type
  const getDefaultNodeData = useCallback((type: string) => {
    switch (type) {
      case 'projectDetails':
        return {
          projectName: '',
          shortDescription: '',
          goals: '',
          targetAudience: '',
          mode: 'manual',
        }
      case 'figmaSetup':
        return {
          option: 'website',
          websiteUrl: '',
          inspirationUrl: '',
          inspirationImages: [],
          aiDescription: '',
        }
      case 'codeStack':
        return {
          projectTypes: ['Next.js'],
          designSystemBases: ['shadcn/ui'],
        }
      default:
        return {}
    }
  }, [])

  // Define the order of node types
  const nodeTypeOrder = ['projectDetails', 'figmaSetup', 'codeStack']
  
  // Get the next node type that should be created
  const getNextNodeType = useCallback((): string | null => {
    const existingTypes = nodes
      .filter((n) => n.type !== 'loading')
      .map((n) => n.type)
    
    for (const type of nodeTypeOrder) {
      if (!existingTypes.includes(type)) {
        return type
      }
    }
    return null
  }, [nodes])

  // Calculate position for next node (horizontal flow with spacing)
  const getNextNodePosition = useCallback((): { x: number; y: number } => {
    const existingNodes = nodes.filter((n) => n.type !== 'loading')
    const nodeCount = existingNodes.length
    const spacing = 400 // Horizontal spacing between nodes
    const startX = 200
    const y = 300
    
    return {
      x: startX + (nodeCount * spacing),
      y: y,
    }
  }, [nodes])

  // Create a new node with loading state
  const createNode = useCallback(async (
    type: string,
    position?: { x: number; y: number }
  ): Promise<string> => {
    nodeIdCounter.current += 1
    const nodeId = `${nodeIdCounter.current}`
    const nodePosition = position || getNextNodePosition()

    // Create loading node first
    const loadingNode: Node = {
      id: `loading-${nodeId}`,
      type: 'loading',
      position: nodePosition,
      data: { type },
    }

    setNodes((nds) => [...nds, loadingNode])

    // Simulate loading delay (1-2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Replace loading node with actual node
    const newNode: Node = {
      id: nodeId,
      type: type as any,
      position: nodePosition,
      data: getDefaultNodeData(type),
    }

    setNodes((nds) => {
      const updatedNodes = nds.map((node) =>
        node.id === `loading-${nodeId}` ? newNode : node
      )
      
      // Auto-connect to previous node if it exists
      const previousNodes = updatedNodes
        .filter((n) => n.type !== 'loading' && n.id !== nodeId)
        .sort((a, b) => {
          const aIndex = nodeTypeOrder.indexOf(a.type as string)
          const bIndex = nodeTypeOrder.indexOf(b.type as string)
          return aIndex - bIndex
        })
      
      if (previousNodes.length > 0) {
        const lastNode = previousNodes[previousNodes.length - 1]
        // Use setTimeout to ensure edge is created after node state is updated
        setTimeout(() => {
          setEdges((eds) => {
            // Check if edge already exists
            const exists = eds.some(
              (e) => e.source === lastNode.id && e.target === nodeId
            )
            if (exists) return eds
            return [...eds, {
              id: `e${lastNode.id}-${nodeId}`,
              source: lastNode.id,
              target: nodeId,
              type: 'default',
            }]
          })
        }, 0)
      }
      
      return updatedNodes
    })

    return nodeId
  }, [getDefaultNodeData, setNodes, setEdges, getNextNodePosition, nodeTypeOrder])

  // Update node data when selected node changes externally
  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = { ...node, data: { ...node.data, ...newData } }
          // Update selected node if it's the one being updated
          if (node.id === selectedNodeId) {
            onNodeSelect(updatedNode)
          }
          return updatedNode
        }
        return node
      })
    )
  }, [setNodes, selectedNodeId, onNodeSelect])

  // Persist nodes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (nodes.length > 0) {
        localStorage.setItem('dsm-flow-nodes', JSON.stringify(nodes))
      } else {
        // Clear if empty (user deleted all nodes)
        localStorage.removeItem('dsm-flow-nodes')
      }
    }
  }, [nodes])

  // Persist edges to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (edges.length > 0) {
        localStorage.setItem('dsm-flow-edges', JSON.stringify(edges))
      } else {
        // Clear if empty
        localStorage.removeItem('dsm-flow-edges')
      }
    }
  }, [edges])

  // Listen for node updates from inline editing
  useEffect(() => {
    const handleNodeUpdate = (event: CustomEvent) => {
      const { nodeId, data } = event.detail
      if (onNodeUpdate) {
        onNodeUpdate(nodeId, data)
      } else {
        updateNodeData(nodeId, data)
      }
    }

    window.addEventListener('nodeUpdate', handleNodeUpdate as EventListener)
    return () => {
      window.removeEventListener('nodeUpdate', handleNodeUpdate as EventListener)
    }
  }, [onNodeUpdate, updateNodeData])

  // Handle "create next node" requests (e.g., clicking the handle dot)
  useEffect(() => {
    const handleCreateNextNode = async () => {
      const next = getNextNodeType()
      if (next) {
        await createNode(next)
      }
    }
    window.addEventListener('createNextNode', handleCreateNextNode as EventListener)
    return () => {
      window.removeEventListener('createNextNode', handleCreateNextNode as EventListener)
    }
  }, [getNextNodeType, createNode])

  // Check if flow is complete (all 3 nodes exist)
  const isFlowComplete = useCallback((): boolean => {
    const existingTypes = nodes
      .filter((n) => n.type !== 'loading')
      .map((n) => n.type)
    return nodeTypeOrder.every((type) => existingTypes.includes(type))
  }, [nodes, nodeTypeOrder])

  // Load nodes and edges (for loading saved design systems)
  const loadNodes = useCallback((nodesToLoad: Node[], edgesToLoad: Edge[] = []) => {
    setNodes(nodesToLoad)
    setEdges(edgesToLoad)
    // Update nodeIdCounter to avoid ID conflicts
    if (nodesToLoad.length > 0) {
      const maxId = Math.max(...nodesToLoad.map(n => {
        const numId = parseInt(n.id)
        return isNaN(numId) ? 0 : numId
      }))
      nodeIdCounter.current = Math.max(nodeIdCounter.current, maxId)
    }
  }, [setNodes, setEdges])

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    updateNodeData,
    createNode,
    getNextNodeType,
    getNodes: () => nodes.filter((n) => n.type !== 'loading'),
    getEdges: () => edges,
    isFlowComplete,
    loadNodes,
  }), [updateNodeData, createNode, getNextNodeType, nodes, edges, isFlowComplete, loadNodes])

  const nodesWithSelection = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      selected: node.id === selectedNodeId,
    }))
  }, [nodes, selectedNodeId])

  return (
    <div className="w-full h-full bg-gray-950 relative overflow-hidden">
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Start Building Your Flow</h3>
            <p className="text-sm text-gray-600">Click "Add Node" in the top bar to create your first node</p>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodesWithSelection}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-950"
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
          style: { stroke: '#6366f1', strokeWidth: 2 },
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#374151" />
        <Controls className="bg-gray-800 border-gray-700" />
        <MiniMap
          className="bg-gray-800 border-gray-700"
          nodeColor="#6366f1"
          maskColor="rgba(0, 0, 0, 0.5)"
        />
      </ReactFlow>
    </div>
  )
})

FlowCanvas.displayName = 'FlowCanvas'

export default FlowCanvas

