'use client'

import { useState, useEffect } from 'react'
import HomePage from '@/components/HomePage'
import Dashboard, { SavedDesignSystem } from '@/components/Dashboard'
import DesignSystemWizard from '@/components/DesignSystemWizard'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentDesignSystem, setCurrentDesignSystem] = useState<SavedDesignSystem | null>(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [dashboardKey, setDashboardKey] = useState(0) // Force Dashboard reload

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('dsm-authenticated')
      setIsAuthenticated(authStatus === 'true')
    }
  }, [])

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dsm-authenticated', 'true')
      setIsAuthenticated(true)
    }
  }

  const handleCreateNew = () => {
    // Start clean: remove any previously stored flow data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dsm-flow-nodes')
      localStorage.removeItem('dsm-flow-edges')
    }
    setIsCreatingNew(true)
    setCurrentDesignSystem(null)
  }

  const handleSelectDesignSystem = (system: SavedDesignSystem) => {
    setCurrentDesignSystem(system)
    setIsCreatingNew(false)
  }

  const handleSaveDesignSystem = (system: SavedDesignSystem) => {
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
    
    // Update current system
    setCurrentDesignSystem(system)
    setIsCreatingNew(false)
    
    // Force Dashboard to reload
    setDashboardKey(prev => prev + 1)
  }

  const handleCloseWizard = () => {
    setCurrentDesignSystem(null)
    setIsCreatingNew(false)
    // Force Dashboard to reload when closing wizard
    setDashboardKey(prev => prev + 1)
  }

  // Show homepage if not authenticated
  if (!isAuthenticated) {
    return <HomePage onLogin={handleLogin} />
  }

  // Show wizard if creating new or editing existing
  if (isCreatingNew || currentDesignSystem) {
    return (
      <DesignSystemWizard
        designSystem={currentDesignSystem || undefined}
        onSave={handleSaveDesignSystem}
        onClose={handleCloseWizard}
      />
    )
  }

  // Show dashboard
  return (
    <Dashboard
      key={dashboardKey}
      onSelectDesignSystem={handleSelectDesignSystem}
      onCreateNew={handleCreateNew}
    />
  )
}

