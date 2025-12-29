'use client'

import { useState } from 'react'

export default function ExportPage() {
  const [exportFormat, setExportFormat] = useState('json')

  const exportOptions = [
    { id: 'json', label: 'JSON', description: 'Export as JSON format' },
    { id: 'css', label: 'CSS Variables', description: 'Export as CSS custom properties' },
    { id: 'scss', label: 'SCSS', description: 'Export as SCSS variables' },
    { id: 'figma', label: 'Figma', description: 'Export to Figma' },
    { id: 'code', label: 'Code Package', description: 'Download complete code package' },
  ]

  return (
    <div className="min-h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Export Design System</h1>
          <p className="text-gray-400">Export your design system in various formats</p>
        </div>

        <div className="max-w-2xl">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Export Format</h2>
            <div className="space-y-3">
              {exportOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                    exportFormat === option.id
                      ? 'border-palette-slate bg-palette-slate/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="exportFormat"
                    value={option.id}
                    checked={exportFormat === option.id}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{option.label}</div>
                    <div className="text-sm text-gray-400">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Export Options</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Include all components</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Include design tokens</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300">Include documentation</span>
              </label>
            </div>
          </div>

          <button className="w-full px-6 py-3 bg-palette-slate hover:bg-primary-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-palette-slate/20">
            Export Design System
          </button>
        </div>
      </div>
    </div>
  )
}

