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
    // Navigate to new design system flow page
    if (typeof window !== 'undefined') {
      window.location.href = '/ds/new/flow'
    }
  }

  const handleSelectDesignSystem = (system: SavedDesignSystem) => {
    // Navigate to design system flow page
    if (typeof window !== 'undefined') {
      window.location.href = `/ds/${system.id}/flow`
    }
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

  // Always show homepage at root route
  // Dashboard is accessible via /ds routes after login
  return <HomePage onLogin={handleLogin} />
}

