'use client'

import { useState, useEffect } from 'react'
import { VersionHistory, Change, ImpactAnalysis } from '@/lib/types/design-system'

export default function VersionHistoryPage() {
  const [versions, setVersions] = useState<VersionHistory[]>([])
  const [selectedVersion, setSelectedVersion] = useState<VersionHistory | null>(null)

  useEffect(() => {
    // Load version history from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-version-history')
      if (saved) {
        try {
          const history = JSON.parse(saved)
          setVersions(history)
        } catch (e) {
          console.error('Failed to load version history:', e)
        }
      }
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'merged':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical':
        return 'text-red-400'
      case 'high':
        return 'text-orange-400'
      case 'medium':
        return 'text-yellow-400'
      default:
        return 'text-green-400'
    }
  }

  return (
    <div className="min-h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Version History</h1>
          <p className="text-gray-400">Track changes, review diffs, and manage approvals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Version List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Versions</h2>
                <button className="px-3 py-1.5 bg-palette-slate hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors">
                  New Version
                </button>
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {versions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No versions yet</p>
                    <p className="text-sm mt-2">Create your first version to get started</p>
                  </div>
                ) : (
                  versions.map((version) => (
                    <button
                      key={version.id}
                      onClick={() => setSelectedVersion(version)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedVersion?.id === version.id
                          ? 'border-palette-slate bg-palette-slate/10'
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">v{version.version}</span>
                        <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(version.status)}`}>
                          {version.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(version.createdAt).toLocaleDateString()}
                      </div>
                      {version.impactAnalysis && (
                        <div className={`text-xs mt-1 ${getImpactColor(version.impactAnalysis.estimatedImpact)}`}>
                          {version.impactAnalysis.estimatedImpact.toUpperCase()} impact
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Version Details */}
          <div className="lg:col-span-2">
            {selectedVersion ? (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Version {selectedVersion.version}
                    </h2>
                    <p className="text-sm text-gray-400">
                      Created {new Date(selectedVersion.createdAt).toLocaleString()} by {selectedVersion.createdBy}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded text-sm border ${getStatusColor(selectedVersion.status)}`}>
                      {selectedVersion.status}
                    </span>
                    {selectedVersion.status === 'pending' && (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Approve
                      </button>
                    )}
                  </div>
                </div>

                {/* Changes Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Changes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Tokens</div>
                      <div className="text-2xl font-bold text-white">
                        {selectedVersion.changes.filter(c => c.type === 'token').length}
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Components</div>
                      <div className="text-2xl font-bold text-white">
                        {selectedVersion.changes.filter(c => c.type === 'component').length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Analysis */}
                {selectedVersion.impactAnalysis && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Impact Analysis</h3>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-300">Estimated Impact</span>
                        <span className={`font-semibold ${getImpactColor(selectedVersion.impactAnalysis.estimatedImpact)}`}>
                          {selectedVersion.impactAnalysis.estimatedImpact.toUpperCase()}
                        </span>
                      </div>
                      {selectedVersion.impactAnalysis.breakingChanges.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <div className="text-sm text-red-400 font-medium mb-2">
                            Breaking Changes ({selectedVersion.impactAnalysis.breakingChanges.length})
                          </div>
                          <ul className="space-y-1">
                            {selectedVersion.impactAnalysis.breakingChanges.map((change, idx) => (
                              <li key={idx} className="text-sm text-gray-300">
                                • {change.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedVersion.impactAnalysis.affectedComponents.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <div className="text-sm text-gray-300">
                            Affected Components: {selectedVersion.impactAnalysis.affectedComponents.length}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Changes List */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Change Details</h3>
                  <div className="space-y-2">
                    {selectedVersion.changes.map((change, idx) => (
                      <div key={idx} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              change.action === 'created' ? 'bg-green-500/20 text-green-400' :
                              change.action === 'updated' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {change.action}
                            </span>
                            <span className="text-white font-medium">{change.resourceName}</span>
                          </div>
                          <span className="text-xs text-gray-400">{change.type}</span>
                        </div>
                        {change.before && change.after && (
                          <div className="mt-2 text-xs text-gray-400">
                            Changed: {Object.keys(change.after).filter(k => change.before?.[k] !== change.after?.[k]).join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Select a Version</h3>
                <p className="text-gray-400">Choose a version from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

