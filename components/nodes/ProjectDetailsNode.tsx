'use client'

import { useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import ProjectAIModal from '../ProjectAIModal'
import UploadSourceModal from '../UploadSourceModal'
import { FlowNodeCard, FlowNodeHeader, FlowNodeBody } from '../ui/FlowNodeCard'
import { FlowNodeField, FlowNodeInput } from '../ui/FlowNodeField'
import { FlowNodeButton } from '../ui/FlowNodeButton'

interface ProjectDetailsNodeData {
  projectName: string
  shortDescription: string
  goals: string
  targetAudience: string
  mode?: 'manual' | 'ai'
}

export default function ProjectDetailsNode({ data, selected, id }: NodeProps<ProjectDetailsNodeData>) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [localData, setLocalData] = useState(data)
  const [showAIModal, setShowAIModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAIGuide, setShowAIGuide] = useState(false)
  const [mode, setMode] = useState<'manual' | 'ai'>(data.mode || 'manual')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  useEffect(() => {
    setLocalData(data)
    setMode(data.mode || 'manual')
  }, [data])

  const updateField = (field: string, value: string) => {
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    // Trigger update via custom event
    const event = new CustomEvent('nodeUpdate', { 
      detail: { nodeId: id, data: newData } 
    })
    window.dispatchEvent(event)
  }

  const handleFieldClick = (field: string) => {
    if (selected) {
      setEditingField(field)
    }
  }

  const handleBlur = () => {
    setEditingField(null)
  }

  const aiButton = (
    <button
      onClick={(e) => {
        e.stopPropagation()
        setShowAIGuide(true)
      }}
      className="p-1.5 rounded-[6px] bg-white/10 hover:bg-white/15 transition-colors"
      title="Use AI to generate description"
    >
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    </button>
  )

  const uploadIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  )

  return (
    <FlowNodeCard selected={selected}>
      <FlowNodeHeader title="Project details" />
      <FlowNodeBody>
        <FlowNodeField label="Project name">
          <FlowNodeInput
            value={localData.projectName || ''}
            onChange={(value) => updateField('projectName', value)}
            placeholder="Project name"
            selected={selected}
            editing={editingField === 'projectName' && selected}
            onClick={() => handleFieldClick('projectName')}
            onFocus={() => handleFieldClick('projectName')}
            onBlur={handleBlur}
            type="text"
          />
        </FlowNodeField>

        <FlowNodeField label="Description">
          <FlowNodeInput
            value={localData.shortDescription || ''}
            onChange={(value) => updateField('shortDescription', value)}
            placeholder="Description"
            selected={selected}
            editing={editingField === 'shortDescription' && selected}
            onClick={() => handleFieldClick('shortDescription')}
            onFocus={() => handleFieldClick('shortDescription')}
            onBlur={handleBlur}
            type="textarea"
            rows={4}
            rightAction={aiButton}
          />
        </FlowNodeField>

        <FlowNodeButton
          onClick={(e) => {
            e.stopPropagation()
            if (selected) {
              setShowUploadModal(true)
            }
          }}
          selected={selected}
          icon={uploadIcon}
        >
          Upload spec
        </FlowNodeButton>
      </FlowNodeBody>

      {/* AI Modal */}
      <ProjectAIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={(aiData) => {
          updateField('projectName', aiData.projectName)
          updateField('shortDescription', aiData.shortDescription)
          updateField('goals', aiData.goals)
          updateField('targetAudience', aiData.targetAudience)
          setMode('ai')
          updateField('mode', 'ai')
        }}
      />

      {/* AI Guide Modal */}
      {showAIGuide && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center"
          onClick={() => setShowAIGuide(false)}
        >
          <div
            className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 w-full max-w-md mx-4 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Need help with description?</h3>
              <button
                onClick={() => setShowAIGuide(false)}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                <p>Provide a short description of your project and goals.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                <p>Optionally upload a spec to enrich the context.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                <p>Use AI to auto-fill description, goals, and audience.</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowAIGuide(false)
                  setShowAIModal(true)
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Use AI now
              </button>
              <button
                onClick={() => setShowAIGuide(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Source Modal */}
      <UploadSourceModal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false)
          setUploadedFile(null)
        }}
        onSelectSource={(source, file) => {
          if (file) {
            setUploadedFile(file)
            // TODO: Process the uploaded file and extract project details
            console.log('Uploaded file:', file.name, 'from source:', source)
            // You can add file processing logic here
            // For example, read file content and populate project details
          }
        }}
      />

      <Handle type="source" position={Position.Right} />
      <Handle
        type="source"
        position={Position.Right}
        onMouseDown={(e) => {
          e.stopPropagation()
          window.dispatchEvent(new Event('createNextNode'))
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
      />
    </FlowNodeCard>
  )
}

