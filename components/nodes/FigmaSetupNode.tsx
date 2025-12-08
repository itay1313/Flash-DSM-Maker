'use client'

import { useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import FigmaConnectionModal from '../FigmaConnectionModal'
import { FlowNodeCard, FlowNodeHeader, FlowNodeBody } from '../ui/FlowNodeCard'
import { FlowNodeField, FlowNodeInput } from '../ui/FlowNodeField'
import { FlowNodeRadio } from '../ui/FlowNodeRadio'
import { FlowNodeButton } from '../ui/FlowNodeButton'
import { FlowNodeFileCard } from '../ui/FlowNodeFileCard'
import { FlowNodeCollapsible } from '../ui/FlowNodeCollapsible'
import { FlowNodeTemplateGrid, Template } from '../ui/FlowNodeTemplateGrid'

interface FigmaSetupNodeData {
  option: 'template' | 'ai'
  template: string
  figmaFile?: {
    key: string
    name: string
    projectName: string
  }
  aiDescription: string
}

export default function FigmaSetupNode({ data, selected, id }: NodeProps<FigmaSetupNodeData>) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [localData, setLocalData] = useState(data)
  const [showFigmaModal, setShowFigmaModal] = useState(false)
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)

  useEffect(() => {
    setLocalData(data)
  }, [data])

  const updateField = (field: string, value: any) => {
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    const event = new CustomEvent('nodeUpdate', { 
      detail: { nodeId: id, data: newData } 
    })
    window.dispatchEvent(event)
  }

  const handleOptionClick = (option: 'template' | 'ai') => {
    if (selected) {
      updateField('option', option)
    }
  }

  const handleFieldClick = (field: string) => {
    if (selected) {
      setEditingField(field)
    }
  }

  const handleBlur = () => {
    setEditingField(null)
  }

  const figmaIcon = (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z" />
    </svg>
  )

  const templates: Template[] = [
    { name: "Base", accent: "bg-gray-500" },
    { name: "Mono", accent: "bg-slate-500" },
    { name: "Cosmic Night", accent: "bg-purple-500" },
    { name: "Soft Pop", accent: "bg-green-400" },
    { name: "Neo Brutalism", accent: "bg-red-500" },
    { name: "Vintage", accent: "bg-amber-600" },
  ]

  return (
    <FlowNodeCard selected={selected}>
      <FlowNodeHeader title="Design & Style" />
      <FlowNodeBody className="space-y-3">
        <div className="space-y-2">
          <FlowNodeRadio
            label="Use Figma template"
            checked={localData.option === "template"}
            onChange={() => handleOptionClick("template")}
            selected={selected}
          />
          {localData.option === "template" && (
            <div className="ml-5 space-y-2">
              {localData.figmaFile ? (
                <FlowNodeFileCard
                  name={localData.figmaFile.name}
                  subtitle={localData.figmaFile.projectName}
                  icon={figmaIcon}
                  onChange={() => setShowFigmaModal(true)}
                  selected={selected}
                />
              ) : (
                <FlowNodeButton
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selected) {
                      setShowFigmaModal(true)
                    }
                  }}
                  selected={selected}
                  icon={<span className="text-purple-400">{figmaIcon}</span>}
                >
                  Connect to Figma
                </FlowNodeButton>
              )}
              {!localData.figmaFile && (
                <FlowNodeCollapsible
                  label="Or select a template"
                  isOpen={isTemplateDropdownOpen}
                  onToggle={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                  selected={selected}
                >
                  <div className="space-y-2">
                    <FlowNodeTemplateGrid
                      templates={templates}
                      selectedTemplate={localData.template}
                      onSelectTemplate={(name) => {
                        updateField("template", name)
                        setIsTemplateDropdownOpen(false)
                      }}
                    />
                    <FlowNodeButton
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("Create new design system")
                      }}
                      selected={selected}
                      size="small"
                      icon={
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      }
                      className="w-full"
                    >
                      Create new design system
                    </FlowNodeButton>
                  </div>
                </FlowNodeCollapsible>
              )}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <FlowNodeRadio
            label="Use AI model to build a design system in Figma"
            checked={localData.option === "ai"}
            onChange={() => handleOptionClick("ai")}
            selected={selected}
          />
          {localData.option === "ai" && (
            <div className="ml-5">
              <FlowNodeInput
                value={localData.aiDescription || ""}
                onChange={(value) => updateField("aiDescription", value)}
                placeholder="Describe your design system style"
                selected={selected}
                editing={editingField === "aiDescription" && selected}
                onClick={() => handleFieldClick("aiDescription")}
                onFocus={() => handleFieldClick("aiDescription")}
                onBlur={handleBlur}
                type="textarea"
                rows={2}
              />
            </div>
          )}
        </div>
      </FlowNodeBody>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />

      {/* Figma Connection Modal */}
      <FigmaConnectionModal
        isOpen={showFigmaModal}
        onClose={() => setShowFigmaModal(false)}
        onSelectFile={(file) => {
          updateField("figmaFile", {
            key: file.key,
            name: file.name,
            projectName: file.projectName,
          })
          updateField("template", file.name)
        }}
        currentSelection={localData.figmaFile?.key}
      />
    </FlowNodeCard>
  )
}

