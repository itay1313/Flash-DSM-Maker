'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard, { SavedDesignSystem } from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('dsm-authenticated')
      if (authStatus !== 'true') {
        router.push('/')
        return
      }
    }
  }, [router])

  const handleCreateNew = () => {
    // Start clean: remove any previously stored flow data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dsm-flow-nodes')
      localStorage.removeItem('dsm-flow-edges')
    }
    // Navigate to new design system flow page
    router.push('/ds/new/flow')
  }

  const handleSelectDesignSystem = (system: SavedDesignSystem) => {
    // Navigate to design system flow page
    router.push(`/ds/${system.id}/flow`)
  }

  return (
    <Dashboard
      onSelectDesignSystem={handleSelectDesignSystem}
      onCreateNew={handleCreateNew}
    />
  )
}

