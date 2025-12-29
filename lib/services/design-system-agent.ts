/**
 * Design System Improvement Agent
 * Analyzes design systems and provides intelligent recommendations for improvements
 */

import {
  DesignSystem,
  DesignToken,
  Component,
  ImpactAnalysis,
} from '../types/design-system'

export interface ImprovementRecommendation {
  id: string
  type: 'token' | 'component' | 'consistency' | 'accessibility' | 'performance' | 'best-practice'
  priority: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  category: string
  currentState?: any
  suggestedChange?: any
  impact?: ImpactAnalysis
  rationale: string
  examples?: string[]
  estimatedEffort?: 'low' | 'medium' | 'high'
}

export interface AgentAnalysis {
  designSystemId: string
  analyzedAt: string
  overallScore: number // 0-100
  recommendations: ImprovementRecommendation[]
  summary: {
    tokenIssues: number
    componentIssues: number
    consistencyIssues: number
    accessibilityIssues: number
    performanceIssues: number
  }
  strengths: string[]
  weaknesses: string[]
}

export class DesignSystemAgent {
  /**
   * Analyze a design system and generate improvement recommendations
   */
  static analyze(designSystem: DesignSystem): AgentAnalysis {
    const recommendations: ImprovementRecommendation[] = []
    
    // Analyze tokens
    const tokenRecommendations = this.analyzeTokens(designSystem)
    recommendations.push(...tokenRecommendations)
    
    // Analyze components
    const componentRecommendations = this.analyzeComponents(designSystem)
    recommendations.push(...componentRecommendations)
    
    // Analyze consistency
    const consistencyRecommendations = this.analyzeConsistency(designSystem)
    recommendations.push(...consistencyRecommendations)
    
    // Analyze accessibility
    const accessibilityRecommendations = this.analyzeAccessibility(designSystem)
    recommendations.push(...accessibilityRecommendations)
    
    // Analyze performance
    const performanceRecommendations = this.analyzePerformance(designSystem)
    recommendations.push(...performanceRecommendations)
    
    // Calculate overall score
    const overallScore = this.calculateScore(designSystem, recommendations)
    
    // Generate summary
    const summary = {
      tokenIssues: tokenRecommendations.length,
      componentIssues: componentRecommendations.length,
      consistencyIssues: consistencyRecommendations.length,
      accessibilityIssues: accessibilityRecommendations.length,
      performanceIssues: performanceRecommendations.length,
    }
    
    // Identify strengths and weaknesses
    const strengths = this.identifyStrengths(designSystem, recommendations)
    const weaknesses = this.identifyWeaknesses(designSystem, recommendations)
    
    return {
      designSystemId: designSystem.id,
      analyzedAt: new Date().toISOString(),
      overallScore,
      recommendations,
      summary,
      strengths,
      weaknesses,
    }
  }

  /**
   * Analyze design tokens for improvements
   */
  private static analyzeTokens(designSystem: DesignSystem): ImprovementRecommendation[] {
    const recommendations: ImprovementRecommendation[] = []
    const tokens = designSystem.tokens || []
    
    // Check for missing essential token categories
    const tokenTypes = tokens.map(t => t.type)
    const hasColors = tokenTypes.includes('color')
    const hasSpacing = tokenTypes.includes('spacing')
    const hasTypography = tokenTypes.includes('typography')
    
    if (!hasColors) {
      recommendations.push({
        id: `rec-${Date.now()}-1`,
        type: 'token',
        priority: 'critical',
        title: 'Missing Color Tokens',
        description: 'No color tokens found. Color tokens are essential for maintaining visual consistency.',
        category: 'Tokens',
        rationale: 'Color tokens ensure consistent theming and make it easier to maintain and update colors across the system.',
        suggestedChange: {
          tokens: [
            { name: 'color-primary', type: 'color', value: '#0066CC', description: 'Primary brand color' },
            { name: 'color-text-primary', type: 'color', value: '#1A1A1A', description: 'Primary text color' },
            { name: 'color-text-secondary', type: 'color', value: '#666666', description: 'Secondary text color' },
            { name: 'color-bg-primary', type: 'color', value: '#FFFFFF', description: 'Primary background color' },
            { name: 'color-border', type: 'color', value: '#E0E0E0', description: 'Border color' },
          ],
        },
        estimatedEffort: 'low',
      })
    }
    
    if (!hasSpacing) {
      recommendations.push({
        id: `rec-${Date.now()}-2`,
        type: 'token',
        priority: 'high',
        title: 'Missing Spacing Tokens',
        description: 'No spacing tokens found. Spacing tokens create visual rhythm and consistency.',
        category: 'Tokens',
        rationale: 'A consistent spacing scale (typically based on 4px or 8px) ensures uniform spacing throughout the design system.',
        suggestedChange: {
          tokens: [
            { name: 'space-1', type: 'spacing', value: 4, description: '4px spacing unit' },
            { name: 'space-2', type: 'spacing', value: 8, description: '8px spacing unit' },
            { name: 'space-3', type: 'spacing', value: 12, description: '12px spacing unit' },
            { name: 'space-4', type: 'spacing', value: 16, description: '16px spacing unit' },
            { name: 'space-5', type: 'spacing', value: 24, description: '24px spacing unit' },
            { name: 'space-6', type: 'spacing', value: 32, description: '32px spacing unit' },
          ],
        },
        estimatedEffort: 'low',
      })
    }
    
    if (!hasTypography) {
      recommendations.push({
        id: `rec-${Date.now()}-3`,
        type: 'token',
        priority: 'high',
        title: 'Missing Typography Tokens',
        description: 'No typography tokens found. Typography tokens ensure consistent text styling.',
        category: 'Tokens',
        rationale: 'Typography tokens standardize font sizes, weights, line heights, and font families across the system.',
        suggestedChange: {
          tokens: [
            { name: 'font-size-xs', type: 'typography', value: '0.75rem', description: 'Extra small text' },
            { name: 'font-size-sm', type: 'typography', value: '0.875rem', description: 'Small text' },
            { name: 'font-size-base', type: 'typography', value: '1rem', description: 'Base text size' },
            { name: 'font-size-lg', type: 'typography', value: '1.125rem', description: 'Large text' },
            { name: 'font-size-xl', type: 'typography', value: '1.25rem', description: 'Extra large text' },
          ],
        },
        estimatedEffort: 'low',
      })
    }
    
    // Check for semantic token naming
    const colorTokens = tokens.filter(t => t.type === 'color')
    const hasSemanticColors = colorTokens.some(t => 
      t.name.includes('primary') || 
      t.name.includes('secondary') || 
      t.name.includes('text') ||
      t.name.includes('bg')
    )
    
    if (colorTokens.length > 0 && !hasSemanticColors) {
      recommendations.push({
        id: `rec-${Date.now()}-4`,
        type: 'token',
        priority: 'medium',
        title: 'Consider Semantic Token Naming',
        description: 'Color tokens appear to use non-semantic names. Semantic naming improves maintainability.',
        category: 'Tokens',
        currentState: {
          exampleTokens: colorTokens.slice(0, 3).map(t => t.name),
        },
        rationale: 'Semantic token names (e.g., "color-text-primary" instead of "blue-500") make it easier to update themes and maintain consistency.',
        examples: [
          'Instead of "blue-500", use "color-primary"',
          'Instead of "gray-700", use "color-text-primary"',
          'Instead of "white", use "color-bg-primary"',
        ],
        estimatedEffort: 'medium',
      })
    }
    
    // Check for token organization
    const uncategorizedTokens = tokens.filter(t => !t.category)
    if (uncategorizedTokens.length > 0 && tokens.length > 5) {
      recommendations.push({
        id: `rec-${Date.now()}-5`,
        type: 'token',
        priority: 'low',
        title: 'Organize Tokens with Categories',
        description: `${uncategorizedTokens.length} tokens are missing category assignments. Categories help organize and discover tokens.`,
        category: 'Tokens',
        rationale: 'Categorizing tokens makes them easier to find, manage, and maintain as the design system grows.',
        estimatedEffort: 'low',
      })
    }
    
    return recommendations
  }

  /**
   * Analyze components for improvements
   */
  private static analyzeComponents(designSystem: DesignSystem): ImprovementRecommendation[] {
    const recommendations: ImprovementRecommendation[] = []
    const components = designSystem.components || []
    
    if (components.length === 0) {
      recommendations.push({
        id: `rec-${Date.now()}-6`,
        type: 'component',
        priority: 'high',
        title: 'No Components Defined',
        description: 'No components found in the design system. Components are essential for building consistent UIs.',
        category: 'Components',
        rationale: 'Components encapsulate reusable UI patterns and ensure consistency across the application.',
        estimatedEffort: 'high',
      })
      return recommendations
    }
    
    // Check for components without variants
    const componentsWithoutVariants = components.filter(c => !c.variants || c.variants.length === 0)
    if (componentsWithoutVariants.length > 0) {
      recommendations.push({
        id: `rec-${Date.now()}-7`,
        type: 'component',
        priority: 'medium',
        title: 'Components Missing Variants',
        description: `${componentsWithoutVariants.length} components don't have variants defined. Variants increase component flexibility.`,
        category: 'Components',
        currentState: {
          componentCount: componentsWithoutVariants.length,
          exampleComponents: componentsWithoutVariants.slice(0, 3).map(c => c.name),
        },
        rationale: 'Variants allow components to adapt to different contexts (sizes, states, styles) while maintaining consistency.',
        estimatedEffort: 'medium',
      })
    }
    
    // Check for components without props
    const componentsWithoutProps = components.filter(c => !c.props || c.props.length === 0)
    if (componentsWithoutProps.length > 0 && components.length > 3) {
      recommendations.push({
        id: `rec-${Date.now()}-8`,
        type: 'component',
        priority: 'low',
        title: 'Consider Adding Component Props',
        description: `${componentsWithoutProps.length} components don't have props defined. Props make components more flexible and reusable.`,
        category: 'Components',
        rationale: 'Well-defined props enable component customization and improve developer experience.',
        estimatedEffort: 'medium',
      })
    }
    
    // Check for components without code
    const componentsWithoutCode = components.filter(c => !c.code || c.code.trim().length === 0)
    if (componentsWithoutCode.length > 0) {
      recommendations.push({
        id: `rec-${Date.now()}-9`,
        type: 'component',
        priority: 'high',
        title: 'Components Missing Implementation Code',
        description: `${componentsWithoutCode.length} components don't have code implementations. Code is essential for using components.`,
        category: 'Components',
        currentState: {
          componentCount: componentsWithoutCode.length,
        },
        rationale: 'Component code enables developers to actually use the components in their applications.',
        estimatedEffort: 'high',
      })
    }
    
    // Check for component organization
    const uncategorizedComponents = components.filter(c => !c.category)
    if (uncategorizedComponents.length > 0 && components.length > 5) {
      recommendations.push({
        id: `rec-${Date.now()}-10`,
        type: 'component',
        priority: 'low',
        title: 'Organize Components with Categories',
        description: `${uncategorizedComponents.length} components are missing category assignments.`,
        category: 'Components',
        rationale: 'Categorizing components (e.g., "forms", "navigation", "feedback") improves discoverability.',
        estimatedEffort: 'low',
      })
    }
    
    // Check for component status
    const draftComponents = components.filter(c => c.status === 'draft')
    if (draftComponents.length > components.length * 0.5) {
      recommendations.push({
        id: `rec-${Date.now()}-11`,
        type: 'component',
        priority: 'medium',
        title: 'Many Components in Draft Status',
        description: `${draftComponents.length} components (${Math.round(draftComponents.length / components.length * 100)}%) are still in draft status.`,
        category: 'Components',
        rationale: 'Moving components through the review and approval process ensures quality and consistency.',
        estimatedEffort: 'medium',
      })
    }
    
    return recommendations
  }

  /**
   * Analyze design system consistency
   */
  private static analyzeConsistency(designSystem: DesignSystem): ImprovementRecommendation[] {
    const recommendations: ImprovementRecommendation[] = []
    const tokens = designSystem.tokens || []
    const components = designSystem.components || []
    
    // Check token naming consistency
    const colorTokens = tokens.filter(t => t.type === 'color')
    if (colorTokens.length > 3) {
      const namingPatterns = colorTokens.map(t => {
        const parts = t.name.split('-')
        return parts.length
      })
      const inconsistentNaming = new Set(namingPatterns).size > 2
      
      if (inconsistentNaming) {
        recommendations.push({
          id: `rec-${Date.now()}-12`,
          type: 'consistency',
          priority: 'medium',
          title: 'Inconsistent Token Naming Patterns',
          description: 'Token names follow different naming patterns, which can cause confusion.',
          category: 'Consistency',
          rationale: 'Consistent naming patterns (e.g., kebab-case with semantic structure) improve discoverability and maintainability.',
          examples: [
            'Use consistent structure: "category-type-variant"',
            'Example: "color-text-primary", "color-bg-secondary"',
          ],
          estimatedEffort: 'medium',
        })
      }
    }
    
    // Check for duplicate token values
    const tokenValueMap = new Map<string, string[]>()
    tokens.forEach(token => {
      const key = `${token.type}-${token.value}`
      if (!tokenValueMap.has(key)) {
        tokenValueMap.set(key, [])
      }
      tokenValueMap.get(key)!.push(token.name)
    })
    
    const duplicates = Array.from(tokenValueMap.entries())
      .filter(([_, names]) => names.length > 1)
    
    if (duplicates.length > 0) {
      recommendations.push({
        id: `rec-${Date.now()}-13`,
        type: 'consistency',
        priority: 'low',
        title: 'Potential Token Duplicates',
        description: `Found ${duplicates.length} sets of tokens with identical values. Consider consolidating.`,
        category: 'Consistency',
        currentState: {
          duplicates: duplicates.slice(0, 3).map(([key, names]) => ({
            value: key.split('-').slice(1).join('-'),
            tokens: names,
          })),
        },
        rationale: 'Consolidating duplicate tokens reduces complexity and ensures single source of truth.',
        estimatedEffort: 'low',
      })
    }
    
    // Check component naming consistency
    if (components.length > 3) {
      const componentNames = components.map(c => c.name)
      const hasConsistentCasing = componentNames.every(name => 
        name[0] === name[0].toUpperCase() || name.includes('-')
      )
      
      if (!hasConsistentCasing) {
        recommendations.push({
          id: `rec-${Date.now()}-14`,
          type: 'consistency',
          priority: 'low',
          title: 'Inconsistent Component Naming',
          description: 'Component names use inconsistent casing conventions.',
          category: 'Consistency',
          rationale: 'Consistent naming (e.g., PascalCase for components) improves code readability and follows common conventions.',
          estimatedEffort: 'low',
        })
      }
    }
    
    return recommendations
  }

  /**
   * Analyze accessibility aspects
   */
  private static analyzeAccessibility(designSystem: DesignSystem): ImprovementRecommendation[] {
    const recommendations: ImprovementRecommendation[] = []
    const tokens = designSystem.tokens || []
    
    // Check for contrast-related tokens
    const hasContrastTokens = tokens.some(t => 
      t.name.toLowerCase().includes('contrast') ||
      t.description?.toLowerCase().includes('contrast')
    )
    
    if (!hasContrastTokens && tokens.filter(t => t.type === 'color').length > 0) {
      recommendations.push({
        id: `rec-${Date.now()}-15`,
        type: 'accessibility',
        priority: 'high',
        title: 'Missing Accessibility Considerations',
        description: 'No contrast tokens or accessibility guidelines found. Ensure color combinations meet WCAG standards.',
        category: 'Accessibility',
        rationale: 'Accessibility tokens and guidelines ensure the design system is usable by everyone, including those with visual impairments.',
        examples: [
          'Define minimum contrast ratios for text',
          'Provide accessible color combinations',
          'Document focus states and keyboard navigation',
        ],
        estimatedEffort: 'medium',
      })
    }
    
    return recommendations
  }

  /**
   * Analyze performance aspects
   */
  private static analyzePerformance(designSystem: DesignSystem): ImprovementRecommendation[] {
    const recommendations: ImprovementRecommendation[] = []
    const components = designSystem.components || []
    
    // Check for large components
    const largeComponents = components.filter(c => {
      if (!c.code) return false
      const lines = c.code.split('\n').length
      return lines > 200
    })
    
    if (largeComponents.length > 0) {
      recommendations.push({
        id: `rec-${Date.now()}-16`,
        type: 'performance',
        priority: 'medium',
        title: 'Large Components Detected',
        description: `${largeComponents.length} components have large code implementations. Consider breaking them into smaller, composable pieces.`,
        category: 'Performance',
        rationale: 'Smaller, focused components are easier to maintain, test, and optimize.',
        estimatedEffort: 'medium',
      })
    }
    
    return recommendations
  }

  /**
   * Calculate overall design system score
   */
  private static calculateScore(
    designSystem: DesignSystem,
    recommendations: ImprovementRecommendation[]
  ): number {
    let score = 100
    
    // Deduct points based on recommendation priority
    recommendations.forEach(rec => {
      switch (rec.priority) {
        case 'critical':
          score -= 10
          break
        case 'high':
          score -= 5
          break
        case 'medium':
          score -= 3
          break
        case 'low':
          score -= 1
          break
      }
    })
    
    // Bonus points for having essential elements
    const tokens = designSystem.tokens || []
    const components = designSystem.components || []
    
    if (tokens.length > 10) score += 5
    if (components.length > 5) score += 5
    if (designSystem.metadata?.projectName) score += 2
    if (designSystem.metadata?.goals) score += 2
    
    return Math.max(0, Math.min(100, score))
  }

  /**
   * Identify design system strengths
   */
  private static identifyStrengths(
    designSystem: DesignSystem,
    recommendations: ImprovementRecommendation[]
  ): string[] {
    const strengths: string[] = []
    const tokens = designSystem.tokens || []
    const components = designSystem.components || []
    
    if (tokens.length >= 20) {
      strengths.push('Comprehensive token system')
    }
    
    if (components.length >= 10) {
      strengths.push('Well-developed component library')
    }
    
    const criticalIssues = recommendations.filter(r => r.priority === 'critical').length
    if (criticalIssues === 0) {
      strengths.push('No critical issues found')
    }
    
    const hasMetadata = designSystem.metadata && 
      (designSystem.metadata.projectName || designSystem.metadata.goals)
    if (hasMetadata) {
      strengths.push('Well-documented metadata')
    }
    
    const publishedComponents = components.filter(c => c.status === 'published').length
    if (publishedComponents > components.length * 0.5) {
      strengths.push('Most components are published and ready to use')
    }
    
    return strengths.length > 0 ? strengths : ['Design system foundation is in place']
  }

  /**
   * Identify design system weaknesses
   */
  private static identifyWeaknesses(
    designSystem: DesignSystem,
    recommendations: ImprovementRecommendation[]
  ): string[] {
    const weaknesses: string[] = []
    const tokens = designSystem.tokens || []
    const components = designSystem.components || []
    
    const criticalIssues = recommendations.filter(r => r.priority === 'critical')
    if (criticalIssues.length > 0) {
      weaknesses.push(`${criticalIssues.length} critical issue(s) need immediate attention`)
    }
    
    if (tokens.length === 0) {
      weaknesses.push('No design tokens defined')
    }
    
    if (components.length === 0) {
      weaknesses.push('No components defined')
    }
    
    const componentsWithoutCode = components.filter(c => !c.code || c.code.trim().length === 0).length
    if (componentsWithoutCode > 0) {
      weaknesses.push(`${componentsWithoutCode} component(s) missing implementation code`)
    }
    
    const highPriorityIssues = recommendations.filter(r => r.priority === 'high').length
    if (highPriorityIssues > 3) {
      weaknesses.push('Multiple high-priority improvements needed')
    }
    
    return weaknesses.length > 0 ? weaknesses : ['Minor improvements could enhance the design system']
  }

  /**
   * Get recommendations filtered by type or priority
   */
  static filterRecommendations(
    analysis: AgentAnalysis,
    filters?: {
      type?: ImprovementRecommendation['type']
      priority?: ImprovementRecommendation['priority']
      category?: string
    }
  ): ImprovementRecommendation[] {
    let filtered = analysis.recommendations
    
    if (filters?.type) {
      filtered = filtered.filter(r => r.type === filters.type)
    }
    
    if (filters?.priority) {
      filtered = filtered.filter(r => r.priority === filters.priority)
    }
    
    if (filters?.category) {
      filtered = filtered.filter(r => r.category === filters.category)
    }
    
    return filtered
  }

  /**
   * Generate improvement plan based on recommendations
   */
  static generateImprovementPlan(
    analysis: AgentAnalysis,
    focusAreas?: string[]
  ): {
    plan: {
      phase: string
      recommendations: ImprovementRecommendation[]
      estimatedEffort: string
    }[]
    totalEstimatedEffort: string
  } {
    let recommendations = analysis.recommendations
    
    // Filter by focus areas if provided
    if (focusAreas && focusAreas.length > 0) {
      recommendations = recommendations.filter(r => focusAreas.includes(r.type))
    }
    
    // Group by priority
    const critical = recommendations.filter(r => r.priority === 'critical')
    const high = recommendations.filter(r => r.priority === 'high')
    const medium = recommendations.filter(r => r.priority === 'medium')
    const low = recommendations.filter(r => r.priority === 'low')
    
    const plan = []
    
    if (critical.length > 0) {
      plan.push({
        phase: 'Phase 1: Critical Fixes',
        recommendations: critical,
        estimatedEffort: this.calculateTotalEffort(critical),
      })
    }
    
    if (high.length > 0) {
      plan.push({
        phase: 'Phase 2: High Priority Improvements',
        recommendations: high,
        estimatedEffort: this.calculateTotalEffort(high),
      })
    }
    
    if (medium.length > 0) {
      plan.push({
        phase: 'Phase 3: Medium Priority Enhancements',
        recommendations: medium,
        estimatedEffort: this.calculateTotalEffort(medium),
      })
    }
    
    if (low.length > 0) {
      plan.push({
        phase: 'Phase 4: Low Priority Optimizations',
        recommendations: low,
        estimatedEffort: this.calculateTotalEffort(low),
      })
    }
    
    return {
      plan,
      totalEstimatedEffort: this.calculateTotalEffort(recommendations),
    }
  }

  /**
   * Calculate total effort for a set of recommendations
   */
  private static calculateTotalEffort(
    recommendations: ImprovementRecommendation[]
  ): string {
    const effortCounts = {
      low: 0,
      medium: 0,
      high: 0,
    }
    
    recommendations.forEach(rec => {
      if (rec.estimatedEffort) {
        effortCounts[rec.estimatedEffort]++
      }
    })
    
    const total = recommendations.length
    if (total === 0) return 'No effort'
    
    const highEffortRatio = effortCounts.high / total
    const mediumEffortRatio = effortCounts.medium / total
    
    if (highEffortRatio > 0.5) return 'High effort'
    if (mediumEffortRatio > 0.5) return 'Medium effort'
    if (effortCounts.high > 0) return 'Medium-High effort'
    if (effortCounts.medium > 0) return 'Low-Medium effort'
    return 'Low effort'
  }
}

