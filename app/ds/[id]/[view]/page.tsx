'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DesignSystemWizard from '@/components/DesignSystemWizard'
import { SavedDesignSystem } from '@/components/Dashboard'

export default function DesignSystemViewPage() {
  const params = useParams()
  const router = useRouter()
  const [designSystem, setDesignSystem] = useState<SavedDesignSystem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const systemId = params.id as string
  const viewParam = params.view as string
  
  // Valid views
  const validViews = ['flow', 'components', 'tokens', 'templates', 'versions', 'sync', 'export', 'settings']
  const view = validViews.includes(viewParam) ? viewParam : 'flow'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // PROTOTYPE MODE: Skip authentication check
      // In production, uncomment:
      // const authStatus = localStorage.getItem('dsm-authenticated')
      // if (authStatus !== 'true') {
      //   router.push('/')
      //   return
      // }

      // Load design system
      const saved = localStorage.getItem('dsm-design-systems')
      if (saved) {
        try {
          const systems: SavedDesignSystem[] = JSON.parse(saved)
          const system = systems.find(s => s.id === systemId)
          if (system) {
            setDesignSystem(system)
          } else if (systemId === 'new') {
            // Creating new system
            setDesignSystem(null)
          } else {
            // System not found, redirect to dashboard
            router.push('/')
            return
          }
        } catch (e) {
          console.error('Failed to load design system:', e)
          router.push('/')
          return
        }
      } else if (systemId !== 'new') {
        // No systems saved and not creating new, redirect to dashboard
        router.push('/')
        return
      }
      setIsLoading(false)
    }
  }, [systemId, router])

  const handleSave = (system: SavedDesignSystem) => {
    // Load existing systems
    const existing = localStorage.getItem('dsm-design-systems')
    let systems: SavedDesignSystem[] = []
    
    if (existing) {
      try {
        systems = JSON.parse(existing)
      } catch (e) {
        console.error('Failed to parse saved systems:', e)
      }
    }

    // Update or add the system
    const index = systems.findIndex(s => s.id === system.id)
    if (index >= 0) {
      systems[index] = system
    } else {
      systems.push(system)
    }

    // Save back to localStorage
    localStorage.setItem('dsm-design-systems', JSON.stringify(systems))
    
    // Navigate to the current view
    router.push(`/ds/${system.id}/${view}`)
  }

  const handleClose = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <DesignSystemWizard
      designSystem={designSystem || undefined}
      onSave={handleSave}
      onClose={handleClose}
      initialView={view}
    />
  )
}

