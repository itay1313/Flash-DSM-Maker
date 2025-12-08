'use client'

import { Node } from 'reactflow'
import { useState, useEffect } from 'react'
import FigmaConnectionModal from './FigmaConnectionModal'
import UploadSourceModal from './UploadSourceModal'

interface SidePanelProps {
  selectedNode: Node | null
  onNodeUpdate: (nodeId: string, data: any) => void
  onShowAIModal: () => void
}

export default function SidePanel({ selectedNode, onNodeUpdate, onShowAIModal }: SidePanelProps) {
  const [localData, setLocalData] = useState<any>(null)
  const [showFigmaModal, setShowFigmaModal] = useState(false)
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)
  const [showTemplateSelection, setShowTemplateSelection] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    if (selectedNode) {
      // Ensure data exists, use empty object if undefined
      setLocalData(selectedNode.data || {})
      // Reset template selection view when node changes
      setShowTemplateSelection(false)
    } else {
      setLocalData(null)
      setShowTemplateSelection(false)
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
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 pr-12 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter project description or use AI to generate one"
                />
                <button
                  onClick={onShowAIModal}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 transition-colors z-10"
                  title="Use AI to generate description"
                >
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        // Template selection view
        if (showTemplateSelection) {
          return (
            <div className="space-y-4" style={{ animation: 'slideIn 0.3s ease-out' }}>
              {/* Back button header */}
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => setShowTemplateSelection(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
                >
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-white">Select a Template</h3>
              </div>

              {/* Template grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                  {[
                    { name: 'Base', color: 'gray', accent: 'bg-gray-500' },
                    { name: 'Mono', color: 'slate', accent: 'bg-slate-500' },
                    { name: 'Cosmic Night', color: 'purple', accent: 'bg-purple-500' },
                    { name: 'Soft Pop', color: 'green', accent: 'bg-green-400' },
                    { name: 'Neo Brutalism', color: 'red', accent: 'bg-red-500' },
                    { name: 'Vintage', color: 'amber', accent: 'bg-amber-600' },
                  ].map((template) => (
                    <button
                      key={template.name}
                      onClick={() => {
                        updateField('template', template.name)
                        setShowTemplateSelection(false)
                      }}
                      className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        localData.template === template.name
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      {/* Thumbnail Preview */}
                      <div className="aspect-[4/3] bg-gray-900 rounded mb-3 p-2.5 flex flex-col">
                        <div className="flex-1 bg-white rounded p-2 space-y-1.5">
                          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-1.5 bg-gray-200 rounded w-1/2"></div>
                          <div className="flex-1 flex items-end space-x-1.5">
                            <div className={`h-10 flex-1 rounded ${template.accent} opacity-60`}></div>
                            <div className={`h-8 w-5 rounded ${template.accent} opacity-40`}></div>
                            <div className={`h-12 w-4 rounded ${template.accent} opacity-50`}></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-white font-medium text-center">{template.name}</p>
                      {localData.template === template.name && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    // Handle create new design system
                    console.log('Create new design system')
                  }}
                  className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center space-x-2 mt-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create new design system</span>
                </button>
              </div>
            </div>
          )
        }

        // Main figma setup view
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
                    value="template"
                    checked={localData.option === 'template'}
                    onChange={(e) => updateField('option', e.target.value)}
                    className="w-4 h-4 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">Use Figma template</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="ai"
                    checked={localData.option === 'ai'}
                    onChange={(e) => updateField('option', e.target.value)}
                    className="w-4 h-4 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">Use AI model to build a design system in Figma</span>
                </label>
              </div>
            </div>
            {localData.option === 'template' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Connect to Figma
                  </label>
                  {localData.figmaFile ? (
                    <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate font-medium">{localData.figmaFile.name}</p>
                            <p className="text-xs text-gray-400 truncate">{localData.figmaFile.projectName}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowFigmaModal(true)}
                          className="ml-3 px-3 py-1.5 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-gray-700 rounded transition-colors"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowFigmaModal(true)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                      </svg>
                      <span>Connect to Figma</span>
                    </button>
                  )}
                </div>
                {!localData.figmaFile && (
                  <div>
                    <button
                      onClick={() => {
                        setShowTemplateSelection(true)
                        setIsTemplateDropdownOpen(false)
                      }}
                      className="w-full flex items-center justify-between text-sm font-medium text-gray-300 mb-2 hover:text-white transition-colors group"
                    >
                      <span>Or select a template</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {isTemplateDropdownOpen && (
                      <div className="mt-3 space-y-3">
                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                          {[
                            { name: 'Base', color: 'gray', accent: 'bg-gray-500' },
                            { name: 'Mono', color: 'slate', accent: 'bg-slate-500' },
                            { name: 'Cosmic Night', color: 'purple', accent: 'bg-purple-500' },
                            { name: 'Soft Pop', color: 'green', accent: 'bg-green-400' },
                            { name: 'Neo Brutalism', color: 'red', accent: 'bg-red-500' },
                            { name: 'Vintage', color: 'amber', accent: 'bg-amber-600' },
                          ].map((template) => (
                            <button
                              key={template.name}
                              onClick={() => updateField('template', template.name)}
                              className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                                localData.template === template.name
                                  ? 'border-indigo-500 bg-indigo-500/10'
                                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                              }`}
                            >
                              {/* Thumbnail Preview */}
                              <div className="aspect-[4/3] bg-gray-900 rounded mb-2 p-2 flex flex-col">
                                <div className="flex-1 bg-white rounded p-1.5 space-y-1">
                                  <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                                  <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                                  <div className="flex-1 flex items-end space-x-1">
                                    <div className={`h-8 flex-1 rounded ${template.accent} opacity-60`}></div>
                                    <div className={`h-6 w-4 rounded ${template.accent} opacity-40`}></div>
                                    <div className={`h-10 w-3 rounded ${template.accent} opacity-50`}></div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-white font-medium text-center">{template.name}</p>
                              {localData.template === template.name && (
                                <div className="absolute top-1 right-1 w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center">
                                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            // Handle create new design system
                            console.log('Create new design system')
                          }}
                          className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center space-x-2 mt-4"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Create new design system</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {localData.option === 'ai' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your design system style
                </label>
                <textarea
                  value={localData.aiDescription || ''}
                  onChange={(e) => updateField('aiDescription', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Describe your design system style"
                />
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
                      className="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"
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
                      className="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"
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
      {!showTemplateSelection && (
        <h2 className="text-lg font-semibold text-white mb-2">
        {selectedNode.type === 'projectDetails' && 'Project details'}
        {selectedNode.type === 'figmaSetup' && 'Design & Style'}
        {selectedNode.type === 'codeStack' && 'Code stack'}
        </h2>
      )}
      <div className={showTemplateSelection ? '' : 'mt-6'}>{renderNodeEditor()}</div>
      
      {/* Figma Connection Modal */}
      {selectedNode?.type === 'figmaSetup' && (
        <FigmaConnectionModal
          isOpen={showFigmaModal}
          onClose={() => setShowFigmaModal(false)}
          onSelectFile={(file) => {
            updateField('figmaFile', {
              key: file.key,
              name: file.name,
              projectName: file.projectName,
            })
            updateField('template', file.name)
          }}
          currentSelection={localData?.figmaFile?.key}
        />
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

