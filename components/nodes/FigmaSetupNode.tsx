'use client'

import { useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import FigmaConnectionModal from '../FigmaConnectionModal'
import DesignSystemSelectionModal from '../DesignSystemSelectionModal'
import { FlowNodeCard, FlowNodeHeader, FlowNodeBody } from '../ui/FlowNodeCard'
import { FlowNodeField, FlowNodeInput } from '../ui/FlowNodeField'
import { FlowNodeRadio } from '../ui/FlowNodeRadio'
import { FlowNodeButton } from '../ui/FlowNodeButton'
import { FlowNodeFileCard } from '../ui/FlowNodeFileCard'

interface FigmaSetupNodeData {
  option: 'template' | 'ai'
  template: string
  figmaFile?: {
    key: string
    name: string
    projectName: string
  }
  aiDescription: string
  generatedPrompt?: string
}

export default function FigmaSetupNode({ data, selected, id }: NodeProps<FigmaSetupNodeData>) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [localData, setLocalData] = useState(data)
  const [showFigmaModal, setShowFigmaModal] = useState(false)
  const [showDesignSystemModal, setShowDesignSystemModal] = useState(false)
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false)

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

  const generateFigmaPrompt = async () => {
    setIsGeneratingPrompt(true)
    try {
      // Get tokens from localStorage
      let tokens = []
      if (typeof window !== 'undefined') {
        const savedTokens = localStorage.getItem('dsm-tokens')
        if (savedTokens) {
          try {
            tokens = JSON.parse(savedTokens)
          } catch (e) {
            console.error('Failed to parse tokens:', e)
          }
        }
      }

      // Get project details from localStorage (saved by FlowCanvas)
      let projectDetails = {}
      if (typeof window !== 'undefined') {
        const savedNodes = localStorage.getItem('dsm-flow-nodes')
        if (savedNodes) {
          try {
            const nodes = JSON.parse(savedNodes)
            const projectNode = nodes.find((n: any) => n.type === 'projectDetails')
            if (projectNode) {
              projectDetails = projectNode.data || {}
            }
          } catch (e) {
            console.error('Failed to parse nodes:', e)
          }
        }
      }

      // Call API to generate prompt
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectDetails,
          figmaSetup: localData,
          tokens,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate prompt')
      }

      const { prompt } = await response.json()
      updateField('generatedPrompt', prompt)
    } catch (error) {
      console.error('Error generating prompt:', error)
      alert('Failed to generate prompt. Please try again.')
    } finally {
      setIsGeneratingPrompt(false)
    }
  }

  const figmaIcon = (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z" />
    </svg>
  )


  const generatePromptButton = (
    <button
      onClick={(e) => {
        e.stopPropagation()
        if (selected && !isGeneratingPrompt) {
          generateFigmaPrompt()
        }
      }}
      disabled={isGeneratingPrompt}
      className="p-1.5 rounded-[6px] bg-white/10 hover:bg-white/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Generate prompt"
    >
      {isGeneratingPrompt ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )}
    </button>
  )

  return (
    <FlowNodeCard selected={selected}>
      <FlowNodeHeader title="Design & Style" />
      <FlowNodeBody>
        <div className="space-y-2">
          <FlowNodeRadio
            label="Upload a Figma file"
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
                <>
                  <FlowNodeButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowFigmaModal(true)
                    }}
                    selected={selected}
                    icon={<span className="text-palette-periwinkle">{figmaIcon}</span>}
                  >
                    Connect to Figma
                  </FlowNodeButton>
                  <FlowNodeButton
                    onClick={(e) => {
                      e.stopPropagation()
                      if (selected) {
                        setShowDesignSystemModal(true)
                      }
                    }}
                    selected={selected}
                    variant="ghost"
                    size="small"
                  >
                    Or select a template
                  </FlowNodeButton>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <FlowNodeRadio
            label="Use AI model"
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

        <FlowNodeField label="Generated Prompt">
          <FlowNodeInput
            value={localData.generatedPrompt || ""}
            onChange={(value) => updateField("generatedPrompt", value)}
            placeholder="Generated prompt will appear here"
            selected={selected}
            editing={editingField === "generatedPrompt" && selected}
            onClick={() => handleFieldClick("generatedPrompt")}
            onFocus={() => handleFieldClick("generatedPrompt")}
            onBlur={handleBlur}
            type="textarea"
            rows={4}
            rightAction={generatePromptButton}
          />
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

      {/* Design System Selection Modal */}
      <DesignSystemSelectionModal
        isOpen={showDesignSystemModal}
        onClose={() => setShowDesignSystemModal(false)}
        onSelectSystem={(systemName) => {
          updateField("template", systemName)
        }}
        selectedSystem={localData.template}
      />

    </FlowNodeCard>
  )
}

