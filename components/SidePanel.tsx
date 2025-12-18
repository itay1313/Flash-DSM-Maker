'use client'

import { Node } from 'reactflow'
import { useState, useEffect } from 'react'
import UploadSourceModal from './UploadSourceModal'

interface SidePanelProps {
  selectedNode: Node | null
  onNodeUpdate: (nodeId: string, data: any) => void
  onShowAIModal: () => void
  onCreateNextNode?: () => void
  nextNodeLabel?: string | null
}

export default function SidePanel({ selectedNode, onNodeUpdate, onShowAIModal, onCreateNextNode, nextNodeLabel }: SidePanelProps) {
  const [localData, setLocalData] = useState<any>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    if (selectedNode) {
      // Ensure data exists, use empty object if undefined
      setLocalData(selectedNode.data || {})
    } else {
      setLocalData(null)
    }
  }, [selectedNode])

  const updateField = (field: string, value: any) => {
    if (!selectedNode) return
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    onNodeUpdate(selectedNode.id, newData)
  }

  if (!selectedNode) {
    return (
      <div className="p-6 text-gray-500 text-sm">
        Select a node to edit its properties
      </div>
    )
  }

  // Ensure localData is initialized even if selectedNode.data is undefined
  if (!localData) {
    return (
      <div className="p-6 text-gray-500 text-sm">
        Loading node data...
      </div>
    )
  }

  const renderNodeEditor = () => {
    switch (selectedNode.type) {
      case 'projectDetails':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project name
              </label>
              <input
                type="text"
                value={localData.projectName || ''}
                onChange={(e) => updateField('projectName', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={localData.shortDescription || ''}
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  rows={16}
                  className="w-full px-3 py-2 pr-12 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-palette-slate resize-none"
                  placeholder="Enter project description or use AI to generate one"
                />
                <button
                  onClick={onShowAIModal}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-palette-slate/20 hover:bg-palette-slate/30 border border-palette-slate/30 transition-colors z-10"
                  title="Use AI to generate description"
                >
                  <svg className="w-4 h-4 text-palette-cornflower" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="w-full px-3 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/0 hover:border-white/20 transition-colors flex items-center justify-center gap-2 text-white/90 text-sm font-normal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload spec</span>
              </button>
            </div>
          </div>
        )

      case 'figmaSetup':
        // Main website scanning view
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Option
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="website"
                    checked={localData.option === 'website'}
                    onChange={(e) => updateField('option', e.target.value)}
                    className="w-4 h-4 text-palette-slate focus:ring-palette-slate"
                  />
                  <span className="text-sm text-gray-300">Scan existing website</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="ai"
                    checked={localData.option === 'ai'}
                    onChange={(e) => updateField('option', e.target.value)}
                    className="w-4 h-4 text-palette-slate focus:ring-palette-slate"
                  />
                  <span className="text-sm text-gray-300">Inspiration</span>
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={localData.option === 'website' ? (localData.websiteUrl || '') : (localData.inspirationUrl || '')}
                  onChange={(e) => updateField(localData.option === 'website' ? 'websiteUrl' : 'inspirationUrl', e.target.value)}
                  placeholder={localData.option === 'website' ? 'https://example.com' : 'apple.com'}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-palette-slate"
                />
                {localData.scannedComponents && localData.scannedComponents.length > 0 && (
                  <p className="mt-2 text-xs text-green-400">
                    ✓ Found {localData.scannedComponents.length} components
                  </p>
                )}
              </div>
            </div>
            {localData.option === 'ai' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload images for inspiration
                  </label>
                  <label className="relative inline-flex items-center justify-center w-full px-3 py-3 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        if (files.length > 0) {
                          updateField('inspirationImages', [...(localData.inspirationImages || []), ...files])
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-300">Choose images</span>
                    </div>
                  </label>
                  {localData.inspirationImages && localData.inspirationImages.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {localData.inspirationImages.map((file: File, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-800">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-300 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <button
                            onClick={() => {
                              const newImages = [...(localData.inspirationImages || [])]
                              newImages.splice(index, 1)
                              updateField('inspirationImages', newImages)
                            }}
                            className="p-1 rounded hover:bg-gray-700 transition-colors"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )

      case 'codeStack':
        const projectTypes = ['Next.js', 'React', 'Vue', 'Svelte', 'Remix']
        const designSystemBases = ['From scratch', 'Tailwind CSS', 'MUI', 'Ant Design', 'shadcn']

        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Project type
              </label>
              <div className="space-y-2">
                {projectTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(localData.projectTypes || []).includes(type)}
                      onChange={(e) => {
                        const current = localData.projectTypes || []
                        const updated = e.target.checked
                          ? [...current, type]
                          : current.filter((t: string) => t !== type)
                        updateField('projectTypes', updated)
                      }}
                      className="w-4 h-4 text-indigo-500 rounded focus:ring-palette-slate"
                    />
                    <span className="text-sm text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Design system base
              </label>
              <div className="space-y-2">
                {designSystemBases.map((base) => (
                  <label key={base} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(localData.designSystemBases || []).includes(base)}
                      onChange={(e) => {
                        const current = localData.designSystemBases || []
                        const updated = e.target.checked
                          ? [...current, base]
                          : current.filter((b: string) => b !== base)
                        updateField('designSystemBases', updated)
                      }}
                      className="w-4 h-4 text-indigo-500 rounded focus:ring-palette-slate"
                    />
                    <span className="text-sm text-gray-300">{base}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div className="text-gray-400 text-sm">Unknown node type</div>
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-white mb-2">
        {selectedNode.type === 'projectDetails' && 'Project details'}
        {selectedNode.type === 'figmaSetup' && 'Design & Style'}
        {selectedNode.type === 'codeStack' && 'Code stack'}
      </h2>
      <div className="mt-6">{renderNodeEditor()}</div>

      {onCreateNextNode && nextNodeLabel && (
        <div className="mt-6">
          <button
            onClick={onCreateNextNode}
            className="w-full px-3 py-2 bg-palette-slate hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Next: {nextNodeLabel}
          </button>
        </div>
      )}
      

      {/* Upload Source Modal */}
      {selectedNode?.type === 'projectDetails' && (
        <UploadSourceModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSelectSource={(source, file) => {
            if (file) {
              // TODO: Process the uploaded file and extract project details
              console.log('Uploaded file:', file.name, 'from source:', source)
              // You can add file processing logic here
              // For example, read file content and populate project details
            }
            setShowUploadModal(false)
          }}
        />
      )}

    </div>
  )
}