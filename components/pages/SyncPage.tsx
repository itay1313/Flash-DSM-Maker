'use client'

import { useState, useEffect } from 'react'
import { SyncStatus, Conflict, DesignSystem } from '@/lib/types/design-system'

export default function SyncPage() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({})
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    // Load sync status from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dsm-sync-status')
      if (saved) {
        try {
          const status = JSON.parse(saved)
          setSyncStatus(status)
        } catch (e) {
          console.error('Failed to load sync status:', e)
        }
      }

      const savedConflicts = localStorage.getItem('dsm-sync-conflicts')
      if (savedConflicts) {
        try {
          const conflictsData = JSON.parse(savedConflicts)
          setConflicts(conflictsData)
        } catch (e) {
          console.error('Failed to load conflicts:', e)
        }
      }
    }
  }, [])

  const handleSync = async (type: 'figma' | 'code' | 'all') => {
    setIsSyncing(true)
    try {
      // TODO: Call actual sync service
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock update
      if (type === 'figma' || type === 'all') {
        setSyncStatus(prev => ({
          ...prev,
          figma: {
            status: 'synced',
            lastSyncedAt: new Date().toISOString(),
          },
        }))
      }
      if (type === 'code' || type === 'all') {
        setSyncStatus(prev => ({
          ...prev,
          code: {
            status: 'synced',
            lastSyncedAt: new Date().toISOString(),
          },
        }))
      }
    } finally {
      setIsSyncing(false)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'synced':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'conflict':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'synced':
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'conflict':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  return (
    <div className="min-h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Sync & Integration</h1>
              <p className="text-gray-400">Manage 2-way sync with Figma and code repositories</p>
            </div>
            <button
              onClick={() => handleSync('all')}
              disabled={isSyncing}
              className="px-4 py-2 bg-palette-slate hover:bg-primary-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSyncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sync All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sync Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Figma Sync */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-palette-periwinkle to-palette-slate rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.852 8.981h-4.588v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm-4.589 0H6.148v-1.506c0-.944.653-1.506 1.6-1.506.876 0 1.575.441 1.575 1.506v1.506zm4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm-4.589 0v1.505c0 .944-.653 1.506-1.6 1.506-.876 0-1.575-.441-1.575-1.506V8.981zm8.486-2.459v9.836c0 .944-.743 1.506-1.6 1.506H3.6c-.857 0-1.6-.562-1.6-1.506V6.522c0-.944.743-1.506 1.6-1.506h1.6v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h3.2v-.877c0-1.506 1.2-2.459 2.4-2.459 1.2 0 2.4.953 2.4 2.459v.877h1.6c.857 0 1.6.562 1.6 1.506z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Figma</h3>
                  <p className="text-sm text-gray-400">2-way sync enabled</p>
                </div>
              </div>
              {getStatusIcon(syncStatus.figma?.status)}
            </div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded text-sm border ${getStatusColor(syncStatus.figma?.status)}`}>
                {syncStatus.figma?.status || 'not configured'}
              </span>
            </div>
            {syncStatus.figma?.lastSyncedAt && (
              <div className="text-sm text-gray-400 mb-4">
                Last synced: {new Date(syncStatus.figma.lastSyncedAt).toLocaleString()}
              </div>
            )}
            <button
              onClick={() => handleSync('figma')}
              disabled={isSyncing}
              className="w-full px-4 py-2 bg-palette-periwinkle hover:bg-palette-slate disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Sync Now
            </button>
          </div>

          {/* Code Sync */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-palette-slate to-palette-cornflower rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Code Repository</h3>
                  <p className="text-sm text-gray-400">2-way sync enabled</p>
                </div>
              </div>
              {getStatusIcon(syncStatus.code?.status)}
            </div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded text-sm border ${getStatusColor(syncStatus.code?.status)}`}>
                {syncStatus.code?.status || 'not configured'}
              </span>
            </div>
            {syncStatus.code?.lastSyncedAt && (
              <div className="text-sm text-gray-400 mb-4">
                Last synced: {new Date(syncStatus.code.lastSyncedAt).toLocaleString()}
              </div>
            )}
            <button
              onClick={() => handleSync('code')}
              disabled={isSyncing}
              className="w-full px-4 py-2 bg-palette-slate hover:bg-primary-600 disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Sync Now
            </button>
          </div>
        </div>

        {/* Conflicts */}
        {conflicts.length > 0 && (
          <div className="bg-gray-900 border border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Sync Conflicts</h2>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                {conflicts.length} conflict{conflicts.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3">
              {conflicts.map((conflict) => (
                <div key={conflict.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-medium">{conflict.resourceId}</div>
                      <div className="text-sm text-gray-400">{conflict.resourceType}</div>
                    </div>
                    {!conflict.resolution && (
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                          Use Local
                        </button>
                        <button className="px-3 py-1 bg-palette-slate hover:bg-primary-600 text-white rounded text-sm">
                          Use Remote
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Local Value</div>
                      <div className="text-sm text-gray-300 bg-gray-900 rounded p-2">
                        {JSON.stringify(conflict.localValue, null, 2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Remote Value</div>
                      <div className="text-sm text-gray-300 bg-gray-900 rounded p-2">
                        {JSON.stringify(conflict.remoteValue, null, 2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

