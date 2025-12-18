'use client'

import { useState, useEffect } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { FlowNodeCard, FlowNodeHeader, FlowNodeBody } from '../ui/FlowNodeCard'
import { FlowNodeField, FlowNodeInput } from '../ui/FlowNodeField'

interface FigmaSetupNodeData {
  option: 'website' | 'ai'
  websiteUrl?: string
  inspirationUrl?: string
  inspirationImages?: File[]
  isScanning?: boolean
  scannedComponents?: any[]
  aiDescription: string
}

export default function FigmaSetupNode({ data, selected, id }: NodeProps<FigmaSetupNodeData>) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [localData, setLocalData] = useState(data)
  const [isScanning, setIsScanning] = useState(false)

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

  const handleOptionClick = (option: 'website' | 'ai') => {
    if (selected) {
      updateField('option', option)
    }
  }

  const handleScanWebsite = async () => {
    const urlToScan = localData.option === 'website' ? localData.websiteUrl : localData.inspirationUrl
    if (!urlToScan) {
      alert('Please enter a website URL')
      return
    }

    // Ensure URL has protocol
    let validUrl = urlToScan
    if (!urlToScan.startsWith('http://') && !urlToScan.startsWith('https://')) {
      validUrl = `https://${urlToScan}`
    }

    setIsScanning(true)
    updateField('isScanning', true)

    try {
      const response = await fetch('/api/scan-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: validUrl,
          isInspiration: localData.option === 'ai',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to scan website')
      }

      const { components, designSystem } = await response.json()
      updateField('scannedComponents', components)
      
      // Store scanned data for use in Components page
      if (typeof window !== 'undefined') {
        localStorage.setItem('dsm-scanned-components', JSON.stringify(components))
        if (designSystem) {
          localStorage.setItem('dsm-scanned-design-system', JSON.stringify(designSystem))
        }
      }
    } catch (error) {
      console.error('Error scanning website:', error)
      alert('Failed to scan website. Please check the URL and try again.')
    } finally {
      setIsScanning(false)
      updateField('isScanning', false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      updateField('inspirationImages', [...(localData.inspirationImages || []), ...files])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...(localData.inspirationImages || [])]
    newImages.splice(index, 1)
    updateField('inspirationImages', newImages)
  }

  const handleFieldClick = (field: string) => {
    if (selected) {
      setEditingField(field)
    }
  }

  const handleBlur = () => {
    setEditingField(null)
  }

  const websiteIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )

  const scanButton = (
    <button
      onClick={(e) => {
        e.stopPropagation()
        const urlToScan = localData.option === 'website' ? localData.websiteUrl : localData.inspirationUrl
        if (selected && !isScanning && urlToScan) {
          handleScanWebsite()
        }
      }}
      disabled={isScanning || !(localData.option === 'website' ? localData.websiteUrl : localData.inspirationUrl)}
      className="p-1.5 rounded-[6px] bg-white/10 hover:bg-white/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Scan website"
    >
      {isScanning ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}
    </button>
  )

  return (
    <FlowNodeCard selected={selected}>
      <FlowNodeHeader title="Design & Style" />
      <FlowNodeBody>
        <div className="space-y-2">
          <FlowNodeField label="Scan existing website">
            <FlowNodeInput
              value={localData.websiteUrl || ""}
              onChange={(value) => updateField("websiteUrl", value)}
              placeholder="https://example.com"
              selected={selected}
              editing={editingField === "websiteUrl" && selected}
              onClick={() => handleFieldClick("websiteUrl")}
              onFocus={() => handleFieldClick("websiteUrl")}
              onBlur={handleBlur}
              type="text"
              rightAction={scanButton}
            />
          </FlowNodeField>
          {localData.scannedComponents && localData.scannedComponents.length > 0 && (
            <div className="text-xs text-white/60 mt-2">
              ✓ Found {localData.scannedComponents.length} components
            </div>
          )}
        </div>

        <div className="space-y-2">
          <FlowNodeField label="Inspiration">
            <FlowNodeInput
              value={localData.inspirationUrl || ""}
              onChange={(value) => updateField("inspirationUrl", value)}
              placeholder="apple.com"
              selected={selected}
              editing={editingField === "inspirationUrl" && selected}
              onClick={() => handleFieldClick("inspirationUrl")}
              onFocus={() => handleFieldClick("inspirationUrl")}
              onBlur={handleBlur}
              type="text"
              rightAction={scanButton}
            />
          </FlowNodeField>
          <FlowNodeField label="Upload images for inspiration">
            <div className="space-y-2">
              <label className="relative inline-flex items-center justify-center w-full px-3 py-3 rounded-[8px] bg-white/10 border border-white/0 cursor-pointer hover:bg-white/15 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-white/90">Choose images</span>
                </div>
              </label>
              {localData.inspirationImages && localData.inspirationImages.length > 0 && (
                <div className="space-y-2">
                  {localData.inspirationImages.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-[6px] bg-white/5">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/90 truncate">{file.name}</p>
                        <p className="text-xs text-white/60">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveImage(index)
                        }}
                        className="p-1 rounded hover:bg-white/10 transition-colors"
                      >
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FlowNodeField>
          {localData.scannedComponents && localData.scannedComponents.length > 0 && localData.option === "ai" && (
            <div className="text-xs text-white/60 mt-2">
              ✓ Scanned {localData.scannedComponents.length} components for inspiration
            </div>
          )}
        </div>
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

