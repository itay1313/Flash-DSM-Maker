import React from 'react'
import { typography } from './typographyClasses'

export interface Template {
  name: string
  accent: string
}

interface FlowNodeTemplateGridProps {
  templates: Template[]
  selectedTemplate?: string
  onSelectTemplate: (templateName: string) => void
  className?: string
}

export function FlowNodeTemplateGrid({ templates, selectedTemplate, onSelectTemplate, className = '' }: FlowNodeTemplateGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto ${className}`}>
      {templates.map((template) => (
        <button
          key={template.name}
          onClick={(e) => {
            e.stopPropagation()
            onSelectTemplate(template.name)
          }}
          className={`relative p-1.5 rounded border transition-all ${
            selectedTemplate === template.name
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
          }`}
        >
          <div className="aspect-[4/3] bg-gray-900 rounded mb-1 p-1 flex flex-col">
            <div className="flex-1 bg-white rounded p-1 space-y-0.5">
              <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              <div className="h-0.5 bg-gray-200 rounded w-1/2"></div>
              <div className="flex-1 flex items-end space-x-0.5">
                <div className={`h-4 flex-1 rounded ${template.accent} opacity-60`}></div>
                <div className={`h-3 w-2 rounded ${template.accent} opacity-40`}></div>
                <div className={`h-5 w-1.5 rounded ${template.accent} opacity-50`}></div>
              </div>
            </div>
          </div>
          <p className={`${typography.xs} text-center truncate`}>
            {template.name}
          </p>
          {selectedTemplate === template.name && (
            <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-indigo-500 rounded-full flex items-center justify-center">
              <svg
                className="w-1 h-1 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

