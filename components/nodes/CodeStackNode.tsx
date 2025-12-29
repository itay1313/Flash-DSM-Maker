'use client'

import { useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { FlowNodeCard, FlowNodeHeader, FlowNodeBody } from '../ui/FlowNodeCard'
import { FlowNodeField } from '../ui/FlowNodeField'
import { FlowNodeCheckbox } from '../ui/FlowNodeCheckbox'
import { FlowNodeButtonGroup } from '../ui/FlowNodeButtonGroup'

interface CodeStackNodeData {
  projectTypes: string[]
  designSystemBases: string[]
}

// Modern tech stack recommendation
const MODERN_STACK = {
  projectType: 'Next.js',
  designSystemBase: 'shadcn/ui',
  description: 'Next.js 14+ with App Router and shadcn/ui for the most modern, performant, and maintainable stack.',
  reasons: [
    'Server Components & RSC for optimal performance',
    'Built-in TypeScript support',
    'Excellent developer experience',
    'Production-ready component library',
    'Accessible by default',
  ],
}

const PROJECT_TYPES = ['Next.js', 'React', 'Vue', 'Angular', 'Svelte', 'Remix']
const DESIGN_SYSTEM_BASES = ['From scratch', 'Tailwind CSS', 'MUI', 'Ant Design', 'shadcn/ui', 'Angular Material']

export default function CodeStackNode({ data, selected, id }: NodeProps<CodeStackNodeData>) {
  const [localData, setLocalData] = useState<CodeStackNodeData>({
    projectTypes: data.projectTypes?.length > 0 ? data.projectTypes : [MODERN_STACK.projectType],
    designSystemBases: data.designSystemBases?.length > 0 ? data.designSystemBases : [MODERN_STACK.designSystemBase],
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Initialize with modern stack if empty
    if (!data.projectTypes || data.projectTypes.length === 0) {
      const defaultData = {
        projectTypes: [MODERN_STACK.projectType],
        designSystemBases: [MODERN_STACK.designSystemBase],
      }
      setLocalData(defaultData)
      const event = new CustomEvent('nodeUpdate', { 
        detail: { nodeId: id, data: defaultData } 
      })
      window.dispatchEvent(event)
    } else {
      setLocalData({
        projectTypes: data.projectTypes,
        designSystemBases: data.designSystemBases || [MODERN_STACK.designSystemBase],
      })
    }
  }, [data, id])

  const updateField = (field: 'projectTypes' | 'designSystemBases', value: string[]) => {
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    const event = new CustomEvent('nodeUpdate', { 
      detail: { nodeId: id, data: newData } 
    })
    window.dispatchEvent(event)
  }

  const toggleProjectType = (type: string) => {
    if (!selected) return
    const current = localData.projectTypes || []
    const updated = current.includes(type)
      ? current.filter((t: string) => t !== type)
      : [...current, type]
    updateField('projectTypes', updated)
  }

  const toggleDesignSystemBase = (base: string) => {
    if (!selected) return
    const current = localData.designSystemBases || []
    const updated = current.includes(base)
      ? current.filter((b: string) => b !== base)
      : [...current, base]
    updateField('designSystemBases', updated)
  }

  const getSelectedProjectType = () => {
    return localData.projectTypes?.[0] || MODERN_STACK.projectType
  }

  const getSelectedDesignSystemBase = () => {
    return localData.designSystemBases?.[0] || MODERN_STACK.designSystemBase
  }

  const isUsingDefaultStack = () => {
    return getSelectedProjectType() === MODERN_STACK.projectType && 
           getSelectedDesignSystemBase() === MODERN_STACK.designSystemBase
  }

  return (
    <FlowNodeCard selected={selected}>
      <FlowNodeHeader title="Code stack" />
      <FlowNodeBody className="space-y-4">
        {!isEditing ? (
          <>
            {/* Selected Technology Display */}
            <div className="space-y-3">
              <FlowNodeField label="Selected Technology">
                <div className="px-3 py-3 rounded-[8px] bg-white/10 border border-white/0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isUsingDefaultStack() && (
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      )}
                      <span className="text-sm font-medium text-white">{getSelectedProjectType()}</span>
                      <span className="text-xs text-white/60">+</span>
                      <span className="text-sm font-medium text-white">{getSelectedDesignSystemBase()}</span>
                    </div>
                    {selected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsEditing(true)
                        }}
                        className="px-2 py-1 text-xs text-palette-cornflower hover:text-palette-slate transition-colors"
                      >
                        Change
                      </button>
                    )}
                  </div>
                  {isUsingDefaultStack() ? (
                    <p className="text-xs text-white/60 leading-relaxed">
                      {MODERN_STACK.description}
                    </p>
                  ) : (
                    <p className="text-xs text-white/60 leading-relaxed">
                      Custom technology stack selected
                    </p>
                  )}
                </div>
              </FlowNodeField>

              {/* Why this stack - only show for default */}
              {isUsingDefaultStack() && (
                <FlowNodeField label="Why this stack?">
                  <div className="px-3 py-3 rounded-[8px] bg-white/10 border border-white/0">
                    <ul className="space-y-1.5">
                      {MODERN_STACK.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-3 h-3 text-palette-slate mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-white/80">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FlowNodeField>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Edit Mode */}
            <FlowNodeField label="Project type">
              <FlowNodeButtonGroup>
                {PROJECT_TYPES.map((type) => (
                  <FlowNodeCheckbox
                    key={type}
                    label={type}
                    checked={(localData.projectTypes || []).includes(type)}
                    onChange={() => toggleProjectType(type)}
                    selected={selected}
                  />
                ))}
              </FlowNodeButtonGroup>
            </FlowNodeField>
            <FlowNodeField label="Design system base">
              <FlowNodeButtonGroup>
                {DESIGN_SYSTEM_BASES.map((base) => (
                  <FlowNodeCheckbox
                    key={base}
                    label={base}
                    checked={(localData.designSystemBases || []).includes(base)}
                    onChange={() => toggleDesignSystemBase(base)}
                    selected={selected}
                  />
                ))}
              </FlowNodeButtonGroup>
            </FlowNodeField>
            {selected && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(false)
                }}
                className="w-full px-3 py-2 bg-palette-slate hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Done
              </button>
            )}
          </>
        )}
      </FlowNodeBody>
      <Handle
        type="source"
        position={Position.Right}
        onMouseDown={(e) => {
          e.stopPropagation()
          window.dispatchEvent(new Event('createNextNode'))
        }}
      />
      <Handle type="target" position={Position.Left} />
    </FlowNodeCard>
  )
}

