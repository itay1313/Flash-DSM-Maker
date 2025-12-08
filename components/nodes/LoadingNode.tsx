'use client'

import { Handle, Position, NodeProps } from 'reactflow'

interface LoadingNodeData {
  type: string
}

export default function LoadingNode({ data }: NodeProps<LoadingNodeData>) {
  const getNodeTitle = (type: string) => {
    switch (type) {
      case 'projectDetails':
        return 'Project details'
      case 'figmaSetup':
        return 'Design & Style'
      case 'codeStack':
        return 'Code stack'
      default:
        return 'Loading...'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border-2 border-gray-800 min-w-[280px] opacity-75">
      <div className="px-4 py-2.5 text-white font-semibold text-sm">{getNodeTitle(data.type)}</div>
      <div className="p-4 flex items-center justify-center min-h-[120px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-indigo-300 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <p className="text-sm text-gray-400">Creating node...</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
}

