'use client'

import { useState, useRef } from 'react'

interface UploadSourceModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectSource: (source: string, file?: File) => void
}

const uploadSources = [
  {
    id: 'word',
    name: 'Word',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703T6.996 1.5h16.008zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H7.036l-.474 2.113-1.527-2.113H3.382l1.538 2.113zm5.688 0l.802 3.932.604-3.932h1.838l-1.33 5.446h-1.64l-.76-3.932-.604 3.932H8.76l1.33-5.446zm8.598 3.023h1.834l-.24-1.28q.24-.16.494-.462t.254-.605q0-.32-.187-.534t-.534-.214q-.293 0-.534.187t-.427.454l-1.494-.694q.32-.587.907-.907t1.187-.32q.907 0 1.427.427t.52 1.227q0 .48-.187.907t-.587.907l.694 1.28h-2.013z"/>
      </svg>
    ),
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.17 5L19 9.83V19H5V5h9.17m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59zM7 15h10v2H7v-2zm0-4h10v2H7v-2zm0-4h7v2H7V7z"/>
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.459 4.208c.746.606 1.026.56 2.122.56l13.58.002c.528 0 .906-.43.893-.998C21.106 2.461 20.54 2 19.16 2L4.71 2.002c-.89 0-1.33.358-1.251.206zm.264 3.24l16.156.002c.834 0 1.121.534 1.121.998v13.58c0 .528-.43.906-.998.893-1.748-.106-2.461-.672-2.998-2.052L3.46 7.448c-.89 0-1.33-.358-1.251-.206zm1.748 3.69c0 .832.43 1.33 1.33 1.33l9.58.002c.89 0 1.33-.498 1.33-1.33v-1.33c0-.832-.43-1.33-1.33-1.33l-9.58-.002c-.89 0-1.33.498-1.33 1.33zm0 5.33c0 .832.43 1.33 1.33 1.33l9.58.002c.89 0 1.33-.498 1.33-1.33v-1.33c0-.832-.43-1.33-1.33-1.33l-9.58-.002c-.89 0-1.33.498-1.33 1.33z"/>
      </svg>
    ),
  },
  {
    id: 'jira',
    name: 'Jira',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.218 5.215h2.174v2.174a5.218 5.218 0 0 0 5.215 5.214h2.174v2.174a5.218 5.218 0 0 0 5.215 5.214h2.174V24h-2.174a5.218 5.218 0 0 0-5.215-5.214h-2.174v-2.174a5.218 5.218 0 0 0-5.214-5.214H5.214a5.218 5.218 0 0 0-5.215-5.215h2.174V9.34h2.174a5.218 5.218 0 0 0 5.215 5.214h2.174v2.174H11.57zm11.165-4.65a5.218 5.218 0 0 1-5.215 5.215H15.35V9.34h2.174a5.218 5.218 0 0 0 5.214-5.215h-2.174V0h2.174a5.218 5.218 0 0 1 5.215 5.214v2.174H22.736z"/>
      </svg>
    ),
  },
  {
    id: 'asana',
    name: 'Asana',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.78 12.653a2.936 2.936 0 1 1 4.163-4.144 2.933 2.933 0 0 1-4.164 4.144zm-6.974 5.308a2.933 2.933 0 1 1-4.165-4.142 2.933 2.933 0 0 1 4.165 4.142zM5.22 12.653a2.936 2.936 0 1 1-4.163-4.144 2.933 2.933 0 0 1 4.164 4.144zm6.975-5.308a2.933 2.933 0 1 1 4.165-4.142 2.933 2.933 0 0 1-4.165 4.142zM12 13.306a2.934 2.934 0 1 1 0-5.868 2.934 2.934 0 0 1 0 5.868z"/>
      </svg>
    ),
  },
  {
    id: 'other',
    name: 'Something else',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
]

export default function UploadSourceModal({ isOpen, onClose, onSelectSource }: UploadSourceModalProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && selectedSource) {
      onSelectSource(selectedSource, file)
      onClose()
      setSelectedSource(null)
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleBack = () => {
    setSelectedSource(null)
  }

  const getAcceptedFileTypes = () => {
    switch (selectedSource) {
      case 'word':
        return '.doc,.docx'
      case 'google-docs':
        return '.doc,.docx,.pdf'
      case 'notion':
        return '.md,.txt'
      case 'jira':
        return '.json,.csv'
      case 'asana':
        return '.csv,.json'
      default:
        return '*'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-800 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          {selectedSource ? (
            <>
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-white">
                Upload {uploadSources.find(s => s.id === selectedSource)?.name}
              </h2>
              <div className="w-5" /> {/* Spacer for centering */}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">Upload from</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!selectedSource ? (
            <div className="grid grid-cols-2 gap-3">
              {uploadSources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => handleSourceSelect(source.id)}
                  className="flex flex-col items-center justify-center p-4 rounded-[8px] bg-white/5 hover:bg-white/10 border border-white/0 hover:border-white/20 transition-all group"
                >
                  <div className="text-white/60 group-hover:text-white transition-colors mb-2">
                    {source.icon}
                  </div>
                  <span className="text-sm text-white/90 font-medium">{source.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 rounded-[8px] bg-white/5 border border-white/10">
                <div className="text-white/60 mb-4">
                  {uploadSources.find(s => s.id === selectedSource)?.icon}
                </div>
                <p className="text-sm text-white/90 text-center mb-4">
                  Choose a file to upload from {uploadSources.find(s => s.id === selectedSource)?.name}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={getAcceptedFileTypes()}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  onClick={handleChooseFile}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors cursor-pointer inline-block"
                >
                  Choose File
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

