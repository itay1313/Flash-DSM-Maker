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

export default function CodeStackNode({ data, selected, id }: NodeProps<CodeStackNodeData>) {
  const [localData, setLocalData] = useState(data)

  useEffect(() => {
    setLocalData(data)
  }, [data])

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

  return (
    <FlowNodeCard selected={selected}>
      <FlowNodeHeader title="Code stack" />
      <FlowNodeBody className="space-y-4">
        <FlowNodeField label="Project type">
          <FlowNodeButtonGroup>
            {['Next.js', 'React', 'Vue', 'Svelte', 'Remix'].map((type) => (
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
            {['From scratch', 'Tailwind CSS', 'MUI', 'Ant Design', 'shadcn'].map((base) => (
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

