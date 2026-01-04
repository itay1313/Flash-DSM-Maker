'use client'

import { useState, useRef } from 'react'

interface IconUploadProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, svgContent: string, file: File) => void
}

export default function IconUpload({ isOpen, onClose, onSave }: IconUploadProps) {
  const [iconName, setIconName] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.includes('svg') && !file.type.includes('image')) {
      setError('Please upload an SVG or image file')
      return
    }

    setError('')
    setUploadedFile(file)

    // Read file for preview
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        if (file.type.includes('svg')) {
          // For SVG, read as text to get the SVG content
          const textReader = new FileReader()
          textReader.onload = (e) => {
            const svgContent = e.target?.result
            if (typeof svgContent === 'string') {
              setPreview(svgContent)
            }
          }
          textReader.readAsText(file)
        } else {
          // For images, use data URL
          setPreview(`<img src="${result}" alt="Preview" class="w-full h-full object-contain" />`)
        }
      }
    }
    reader.readAsDataURL(file)

    // Auto-generate name from filename if not set
    if (!iconName) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
      setIconName(nameWithoutExt.replace(/[^a-z0-9]/gi, '-').toLowerCase())
    }
  }

  const handleSave = async () => {
    if (!uploadedFile || !iconName.trim()) {
      setError('Please provide both a file and icon name')
      return
    }

    try {
      // Read SVG content
      const text = await uploadedFile.text()
      onSave(iconName.trim(), text, uploadedFile)
      
      // Reset form
      setIconName('')
      setUploadedFile(null)
      setPreview('')
      setError('')
      onClose()
    } catch (err) {
      setError('Failed to read file. Please try again.')
      console.error(err)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as any
      handleFileSelect(fakeEvent)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900 flex-shrink-0">
            <h2 className="text-xl font-semibold text-white">Upload Icon</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div 
                      className="w-24 h-24 flex items-center justify-center bg-gray-800 rounded-lg"
                      dangerouslySetInnerHTML={{ __html: preview }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">{uploadedFile?.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setUploadedFile(null)
                      setPreview('')
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg className="w-12 h-12 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG or image files</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Icon Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon Name
              </label>
              <input
                type="text"
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                placeholder="my-icon"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-900">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!uploadedFile || !iconName.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              Save Icon
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

