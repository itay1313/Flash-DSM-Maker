'use client'

import { useState } from 'react'

interface NewComponentModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateComponent: (description: string) => void
}

export default function NewComponentModal({ isOpen, onClose, onCreateComponent }: NewComponentModalProps) {
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  if (!isOpen) return null

  const handleGenerate = async () => {
    if (!description.trim()) {
      alert('Please describe the component you want to create')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onCreateComponent(description)
      
      // Reset and close
      setDescription('')
      onClose()
    } catch (error) {
      alert('Failed to generate component. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const examplePrompts = [
    'Create a toast notification component',
    'Build a custom dropdown select',
    'Design a progress bar with steps',
    'Make a card with image and text',
  ]

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-[32px] shadow-2xl border border-gray-800 w-full max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-gray-100 mb-1" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              Create Component with AI
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">
              Describe what you want to build
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Component Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your component in detail..."
              rows={6}
              className="w-full bg-gray-950 border border-gray-800 p-4 rounded-[20px] text-gray-200 text-sm focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-700 resize-none"
            />
            <p className="text-xs text-gray-600 italic">Be specific about functionality, variants, and styling</p>
          </div>

          {/* Example Prompts */}
          <div className="space-y-3">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Example Prompts</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setDescription(prompt)}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-[16px] text-left text-xs text-gray-400 hover:text-gray-200 hover:border-accent-magenta/30 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* AI Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-[20px] p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div className="text-xs text-blue-300 leading-relaxed">
                <p className="font-bold mb-1">AI will generate:</p>
                <ul className="text-blue-400/80 space-y-1 list-disc list-inside">
                  <li>Component code optimized for your design system</li>
                  <li>Multiple variants and states</li>
                  <li>TypeScript types and props</li>
                  <li>Usage examples</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!description.trim() || isGenerating}
            className="flex-1 px-6 py-3 bg-accent-magenta hover:bg-accent-magenta/90 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors shadow-lg shadow-accent-magenta/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Generate Component
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
