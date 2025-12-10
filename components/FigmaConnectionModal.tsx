'use client'

import { useState, useEffect } from 'react'

interface FigmaFile {
  key: string
  name: string
  thumbnailUrl?: string
  lastModified: string
  projectName: string
}

interface FigmaConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectFile: (file: FigmaFile) => void
  currentSelection?: string
}

const mockFigmaFiles: FigmaFile[] = [
  {
    key: 'figma-1',
    name: 'Dashboard Design System',
    lastModified: '2 days ago',
    projectName: 'Design Systems',
  },
  {
    key: 'figma-2',
    name: 'Marketing Website Components',
    lastModified: '1 week ago',
    projectName: 'Marketing',
  },
  {
    key: 'figma-3',
    name: 'Design System Starter',
    lastModified: '3 days ago',
    projectName: 'Templates',
  },
  {
    key: 'figma-4',
    name: 'E-commerce UI Kit',
    lastModified: '5 days ago',
    projectName: 'E-commerce',
  },
  {
    key: 'figma-5',
    name: 'Mobile App Components',
    lastModified: '1 day ago',
    projectName: 'Mobile',
  },
]

export default function FigmaConnectionModal({
  isOpen,
  onClose,
  onSelectFile,
  currentSelection,
}: FigmaConnectionModalProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(currentSelection || null)
  const [files, setFiles] = useState<FigmaFile[]>([])

  useEffect(() => {
    if (isOpen && isConnected) {
      // Simulate fetching files from Figma API
      setTimeout(() => {
        setFiles(mockFigmaFiles)
      }, 500)
    }
  }, [isOpen, isConnected])

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate Figma OAuth connection
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsConnected(true)
    setIsConnecting(false)
  }

  const handleSelectFile = (file: FigmaFile) => {
    setSelectedFile(file.key)
    onSelectFile(file)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Connect to Figma</h2>
                <p className="text-sm text-gray-400">Select a design file from your Figma account</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect Your Figma Account</h3>
                <p className="text-gray-400 text-center mb-6 max-w-md">
                  Connect to Figma to browse and select design files directly from your account. Your designs will be synced automatically.
                </p>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg font-semibold transition-all flex items-center space-x-3 shadow-lg shadow-purple-500/20"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                      </svg>
                      <span>Connect with Figma</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Your Figma Files</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Connected</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {files.map((file) => (
                    <button
                      key={file.key}
                      onClick={() => handleSelectFile(file)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        selectedFile === file.key
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-gray-800 hover:border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium truncate">{file.name}</div>
                            <div className="text-sm text-gray-400 truncate">{file.projectName}</div>
                            <div className="text-xs text-gray-500 mt-0.5">Updated {file.lastModified}</div>
                          </div>
                        </div>
                        {selectedFile === file.key && (
                          <div className="ml-3">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {isConnected && (
            <div className="p-6 border-t border-gray-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsConnected(false)
                  setSelectedFile(null)
                  setFiles([])
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Disconnect
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}




