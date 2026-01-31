'use client'

import { useState } from 'react'

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (framework: string, method: 'download' | 'github') => void
}

const FRAMEWORKS = [
  { id: 'react', name: 'React', icon: '⚛️', description: 'React 18+ with TypeScript' },
  { id: 'nextjs', name: 'Next.js', icon: '▲', description: 'Next.js 14+ with App Router' },
  { id: 'angular', name: 'Angular', icon: '🅰️', description: 'Angular 17+ with standalone components' },
  { id: 'vue', name: 'Vue', icon: '🟢', description: 'Vue 3 with Composition API' },
  { id: 'swiftui', name: 'SwiftUI', icon: '🍎', description: 'SwiftUI for iOS/macOS' },
  { id: 'flutter', name: 'Flutter', icon: '🐦', description: 'Flutter for cross-platform' },
]

export default function PublishModal({ isOpen, onClose, onPublish }: PublishModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedFramework, setSelectedFramework] = useState('nextjs')
  const [selectedMethod, setSelectedMethod] = useState<'download' | 'github'>('download')

  if (!isOpen) return null

  const handlePublish = () => {
    onPublish(selectedFramework, selectedMethod)
    // Reset and close
    setStep(1)
    setSelectedFramework('nextjs')
    setSelectedMethod('download')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-[32px] shadow-2xl border border-gray-800 w-full max-w-3xl mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-gray-100 mb-1" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
              Publish Design System
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">
              Step {step} of 2
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
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-400 font-black uppercase tracking-widest mb-4">Select Target Framework</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FRAMEWORKS.map((framework) => (
                    <button
                      key={framework.id}
                      onClick={() => setSelectedFramework(framework.id)}
                      className={`p-5 rounded-[20px] border text-left transition-all hover:scale-[1.02] ${
                        selectedFramework === framework.id
                          ? 'border-accent-magenta bg-accent-magenta/5 shadow-glow-magenta'
                          : 'border-gray-800 bg-gray-900/40 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{framework.icon}</span>
                        <h4 className="text-base font-bold text-gray-100">{framework.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500">{framework.description}</p>
                      {selectedFramework === framework.id && (
                        <div className="mt-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-accent-magenta" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-accent-magenta font-bold uppercase tracking-widest">Selected</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 bg-accent-magenta hover:bg-accent-magenta/90 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors shadow-lg shadow-accent-magenta/20"
                >
                  Next: Choose Publishing Method
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-400 font-black uppercase tracking-widest mb-2">Publishing to: {FRAMEWORKS.find(f => f.id === selectedFramework)?.name}</h3>
                <p className="text-xs text-gray-500 mb-6">Select how you want to publish your design system</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Download ZIP */}
                  <button
                    onClick={() => setSelectedMethod('download')}
                    className={`p-6 rounded-[20px] border text-left transition-all hover:scale-[1.02] ${
                      selectedMethod === 'download'
                        ? 'border-accent-magenta bg-accent-magenta/5 shadow-glow-magenta'
                        : 'border-gray-800 bg-gray-900/40 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </div>
                      <h4 className="text-base font-bold text-gray-100">Download ZIP</h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Download a complete package with all components, tokens, and configuration files ready to integrate into your project.
                    </p>
                    {selectedMethod === 'download' && (
                      <div className="mt-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent-magenta" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-accent-magenta font-bold uppercase tracking-widest">Selected</span>
                      </div>
                    )}
                  </button>

                  {/* Sync to GitHub */}
                  <button
                    onClick={() => setSelectedMethod('github')}
                    className={`p-6 rounded-[20px] border text-left transition-all hover:scale-[1.02] ${
                      selectedMethod === 'github'
                        ? 'border-accent-magenta bg-accent-magenta/5 shadow-glow-magenta'
                        : 'border-gray-800 bg-gray-900/40 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <h4 className="text-base font-bold text-gray-100">Sync to GitHub</h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Push your design system directly to a GitHub repository with automated versioning and deployment workflows.
                    </p>
                    {selectedMethod === 'github' && (
                      <div className="mt-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent-magenta" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-accent-magenta font-bold uppercase tracking-widest">Selected</span>
                      </div>
                    )}
                  </button>
                </div>

                {selectedMethod === 'github' && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-[20px] p-4 mt-4">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-xs text-blue-300 leading-relaxed">
                        <p className="font-bold mb-1">GitHub Authentication Required</p>
                        <p className="text-blue-400/80">You'll be prompted to connect your GitHub account and select a repository in the next step.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  className="flex-1 px-6 py-3 bg-accent-magenta hover:bg-accent-magenta/90 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-colors shadow-lg shadow-accent-magenta/20 flex items-center justify-center gap-2"
                >
                  {selectedMethod === 'download' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Generate & Download
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Publish to GitHub
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="border-t border-gray-800 px-6 py-4 bg-gray-950/50">
          <div className="flex gap-2">
            <div className={`flex-1 h-1 rounded-full transition-all ${step >= 1 ? 'bg-accent-magenta' : 'bg-gray-800'}`} />
            <div className={`flex-1 h-1 rounded-full transition-all ${step >= 2 ? 'bg-accent-magenta' : 'bg-gray-800'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
