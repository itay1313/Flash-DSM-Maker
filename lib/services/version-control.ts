/**
 * Version Control Service
 * Handles versioning, diffs, and impact analysis for design systems
 */

import { 
  DesignSystem, 
  VersionHistory, 
  Change, 
  Diff, 
  ImpactAnalysis,
  Component,
  DesignToken
} from '../types/design-system'

export class VersionControlService {
  /**
   * Create a new version from current design system state
   */
  static createVersion(
    designSystem: DesignSystem,
    type: 'major' | 'minor' | 'patch' | 'hotfix',
    createdBy: string,
    previousVersion?: VersionHistory
  ): VersionHistory {
    const changes = this.detectChanges(designSystem, previousVersion)
    const diff = this.generateDiff(designSystem, previousVersion)
    const impactAnalysis = this.analyzeImpact(changes, designSystem)

    const versionNumber = this.incrementVersion(
      previousVersion?.version || designSystem.version,
      type
    )

    return {
      id: `v-${Date.now()}`,
      designSystemId: designSystem.id,
      version: versionNumber,
      type,
      changes,
      diff,
      impactAnalysis,
      status: 'draft',
      createdBy,
      createdAt: new Date().toISOString(),
    }
  }

  /**
   * Detect changes between current state and previous version
   */
  static detectChanges(
    current: DesignSystem,
    previous?: VersionHistory
  ): Change[] {
    const changes: Change[] = []

    if (!previous) {
      // Initial version - all items are new
      current.tokens.forEach(token => {
        changes.push({
          type: 'token',
          action: 'created',
          resourceId: token.id,
          resourceName: token.name,
          after: token,
        })
      })

      current.components.forEach(component => {
        changes.push({
          type: 'component',
          action: 'created',
          resourceId: component.id,
          resourceName: component.name,
          after: component,
        })
      })
      return changes
    }

    // Compare tokens
    const previousTokens = previous.diff?.tokens || []
    const currentTokenMap = new Map(current.tokens.map(t => [t.id, t]))
    const previousTokenMap = new Map(
      previousTokens
        .filter(t => t.type !== 'deleted')
        .map(t => [t.id, t])
    )

    // Find new tokens
    current.tokens.forEach(token => {
      if (!previousTokenMap.has(token.id)) {
        changes.push({
          type: 'token',
          action: 'created',
          resourceId: token.id,
          resourceName: token.name,
          after: token,
        })
      }
    })

    // Find modified tokens
    current.tokens.forEach(token => {
      const prev = previousTokenMap.get(token.id)
      if (prev && JSON.stringify(token) !== JSON.stringify(prev)) {
        changes.push({
          type: 'token',
          action: 'updated',
          resourceId: token.id,
          resourceName: token.name,
          before: prev,
          after: token,
        })
      }
    })

    // Find deleted tokens
    previousTokenMap.forEach((prev, id) => {
      if (!currentTokenMap.has(id)) {
        changes.push({
          type: 'token',
          action: 'deleted',
          resourceId: id,
          resourceName: prev.name,
          before: prev,
        })
      }
    })

    // Similar logic for components
    const previousComponents = previous.diff?.components || []
    const currentComponentMap = new Map(current.components.map(c => [c.id, c]))
    const previousComponentMap = new Map(
      previousComponents
        .filter(c => c.type !== 'deleted')
        .map(c => [c.id, c])
    )

    current.components.forEach(component => {
      if (!previousComponentMap.has(component.id)) {
        changes.push({
          type: 'component',
          action: 'created',
          resourceId: component.id,
          resourceName: component.name,
          after: component,
        })
      }
    })

    current.components.forEach(component => {
      const prev = previousComponentMap.get(component.id)
      if (prev && JSON.stringify(component) !== JSON.stringify(prev)) {
        changes.push({
          type: 'component',
          action: 'updated',
          resourceId: component.id,
          resourceName: component.name,
          before: prev,
          after: component,
        })
      }
    })

    previousComponentMap.forEach((prev, id) => {
      if (!currentComponentMap.has(id)) {
        changes.push({
          type: 'component',
          action: 'deleted',
          resourceId: id,
          resourceName: prev.name,
          before: prev,
        })
      }
    })

    return changes
  }

  /**
   * Generate detailed diff between versions
   */
  static generateDiff(
    current: DesignSystem,
    previous?: VersionHistory
  ): Diff {
    const diff: Diff = {
      tokens: [],
      components: [],
      metadata: [],
    }

    if (!previous) {
      // Initial version
      diff.tokens = current.tokens.map(token => ({
        id: token.id,
        name: token.name,
        type: 'added',
        changes: Object.entries(token).map(([field, value]) => ({
          field,
          before: undefined,
          after: value,
        })),
      }))

      diff.components = current.components.map(component => ({
        id: component.id,
        name: component.name,
        type: 'added',
        changes: Object.entries(component).map(([field, value]) => ({
          field,
          before: undefined,
          after: value,
        })),
      }))
      return diff
    }

    // Compare tokens
    const currentTokenMap = new Map(current.tokens.map(t => [t.id, t]))
    const previousTokens = previous.diff?.tokens || []

    previousTokens.forEach(prevToken => {
      const currentToken = currentTokenMap.get(prevToken.id)
      if (!currentToken) {
        diff.tokens.push({
          id: prevToken.id,
          name: prevToken.name,
          type: 'deleted',
          changes: [],
        })
      } else {
        const fieldChanges = this.compareObjects(prevToken, currentToken)
        if (fieldChanges.length > 0) {
          diff.tokens.push({
            id: currentToken.id,
            name: currentToken.name,
            type: 'modified',
            changes: fieldChanges,
          })
        }
      }
    })

    current.tokens.forEach(token => {
      if (!previousTokens.find(pt => pt.id === token.id)) {
        diff.tokens.push({
          id: token.id,
          name: token.name,
          type: 'added',
          changes: Object.entries(token).map(([field, value]) => ({
            field,
            before: undefined,
            after: value,
          })),
        })
      }
    })

    // Similar for components
    const currentComponentMap = new Map(current.components.map(c => [c.id, c]))
    const previousComponents = previous.diff?.components || []

    previousComponents.forEach(prevComponent => {
      const currentComponent = currentComponentMap.get(prevComponent.id)
      if (!currentComponent) {
        diff.components.push({
          id: prevComponent.id,
          name: prevComponent.name,
          type: 'deleted',
          changes: [],
        })
      } else {
        const fieldChanges = this.compareObjects(prevComponent, currentComponent)
        if (fieldChanges.length > 0) {
          diff.components.push({
            id: currentComponent.id,
            name: currentComponent.name,
            type: 'modified',
            changes: fieldChanges,
          })
        }
      }
    })

    current.components.forEach(component => {
      if (!previousComponents.find(pc => pc.id === component.id)) {
        diff.components.push({
          id: component.id,
          name: component.name,
          type: 'added',
          changes: Object.entries(component).map(([field, value]) => ({
            field,
            before: undefined,
            after: value,
          })),
        })
      }
    })

    return diff
  }

  /**
   * Analyze impact of changes
   */
  static analyzeImpact(
    changes: Change[],
    designSystem: DesignSystem
  ): ImpactAnalysis {
    const affectedComponents: string[] = []
    const affectedTokens: string[] = []
    const breakingChanges: any[] = []
    const warnings: string[] = []

    changes.forEach(change => {
      if (change.type === 'token') {
        affectedTokens.push(change.resourceId)

        // Check if token is used in components
        designSystem.components.forEach(component => {
          const componentCode = component.code || ''
          if (componentCode.includes(change.resourceName)) {
            affectedComponents.push(component.id)
          }
        })

        // Check for breaking changes
        if (change.action === 'deleted') {
          breakingChanges.push({
            type: 'token',
            description: `Token "${change.resourceName}" was deleted`,
            affectedResources: affectedComponents,
          })
        } else if (change.action === 'updated') {
          // Check if value type changed
          const beforeType = typeof change.before?.value
          const afterType = typeof change.after?.value
          if (beforeType !== afterType) {
            breakingChanges.push({
              type: 'token',
              description: `Token "${change.resourceName}" type changed from ${beforeType} to ${afterType}`,
              affectedResources: affectedComponents,
            })
          }
        }
      }

      if (change.type === 'component') {
        affectedComponents.push(change.resourceId)

        if (change.action === 'deleted') {
          breakingChanges.push({
            type: 'api',
            description: `Component "${change.resourceName}" was deleted`,
            affectedResources: [],
          })
        } else if (change.action === 'updated') {
          // Check for prop changes
          const beforeProps = change.before?.props || []
          const afterProps = change.after?.props || []
          const removedProps = beforeProps.filter(
            (bp: any) => !afterProps.find((ap: any) => ap.name === bp.name)
          )
          if (removedProps.length > 0) {
            breakingChanges.push({
              type: 'api',
              description: `Component "${change.resourceName}" had props removed: ${removedProps.map((p: any) => p.name).join(', ')}`,
              affectedResources: [],
            })
          }
        }
      }
    })

    // Determine impact level
    let estimatedImpact: 'low' | 'medium' | 'high' | 'critical' = 'low'
    if (breakingChanges.length > 0) {
      estimatedImpact = 'critical'
    } else if (affectedComponents.length > 5) {
      estimatedImpact = 'high'
    } else if (affectedComponents.length > 0) {
      estimatedImpact = 'medium'
    }

    return {
      affectedComponents: Array.from(new Set(affectedComponents)),
      affectedTokens: Array.from(new Set(affectedTokens)),
      breakingChanges,
      warnings,
      estimatedImpact,
    }
  }

  /**
   * Compare two objects and return field changes
   */
  private static compareObjects(before: any, after: any): any[] {
    const changes: any[] = []
    const allKeys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})])

    allKeys.forEach(key => {
      const beforeValue = before?.[key]
      const afterValue = after?.[key]

      if (JSON.stringify(beforeValue) !== JSON.stringify(afterValue)) {
        changes.push({
          field: key,
          before: beforeValue,
          after: afterValue,
        })
      }
    })

    return changes
  }

  /**
   * Increment version number
   */
  private static incrementVersion(
    currentVersion: string,
    type: 'major' | 'minor' | 'patch' | 'hotfix'
  ): string {
    const parts = currentVersion.split('.').map(Number)
    if (parts.length !== 3) {
      return '1.0.0'
    }

    let [major, minor, patch] = parts

    switch (type) {
      case 'major':
        major += 1
        minor = 0
        patch = 0
        break
      case 'minor':
        minor += 1
        patch = 0
        break
      case 'patch':
      case 'hotfix':
        patch += 1
        break
    }

    return `${major}.${minor}.${patch}`
  }
}

