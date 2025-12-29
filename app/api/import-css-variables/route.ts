import { NextRequest, NextResponse } from 'next/server'

interface CSSVariable {
  name: string
  value: string
  type: 'color' | 'font' | 'size'
}

interface TokenCategory {
  name: string
  tokens: {
    name: string
    value: string
    type: 'color' | 'font' | 'size'
  }[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cssVariables, existingTokens } = body

    if (!cssVariables || !Array.isArray(cssVariables)) {
      return NextResponse.json(
        { error: 'CSS variables array is required' },
        { status: 400 }
      )
    }

    // Categorize variables
    const colors: CSSVariable[] = []
    const typography: CSSVariable[] = []
    const spacing: CSSVariable[] = []
    const other: CSSVariable[] = []

    cssVariables.forEach((variable: CSSVariable) => {
      const name = variable.name.toLowerCase()
      
      if (variable.type === 'color' || name.includes('color') || name.includes('bg') || name.includes('background')) {
        colors.push(variable)
      } else if (variable.type === 'font' || name.includes('font') || name.includes('text') || name.includes('typography')) {
        typography.push(variable)
      } else if (name.includes('spacing') || name.includes('gap') || name.includes('padding') || name.includes('margin') || name.includes('size')) {
        spacing.push(variable)
      } else {
        other.push(variable)
      }
    })

    // Normalize names (remove -- prefix, convert to kebab-case, improve naming)
    const normalizeName = (name: string, type: string): string => {
      // Remove -- prefix if present
      let normalized = name.replace(/^--/, '')
      
      // Convert to kebab-case if needed
      normalized = normalized.replace(/_/g, '-').toLowerCase()
      
      // Improve naming based on type
      if (type === 'color') {
        // Map common color names
        if (normalized.includes('primary')) return 'primary'
        if (normalized.includes('secondary')) return 'secondary'
        if (normalized.includes('success')) return 'success'
        if (normalized.includes('error') || normalized.includes('danger')) return 'error'
        if (normalized.includes('warning')) return 'warning'
        if (normalized.includes('info')) return 'info'
        if (normalized.includes('text')) return normalized.replace('color-', 'text-')
        if (normalized.includes('bg') || normalized.includes('background')) return normalized.replace('color-', 'bg-')
        if (normalized.includes('border')) return 'border'
      }
      
      return normalized
    }

    // Build validated token categories
    const validatedTokens: TokenCategory[] = []

    if (colors.length > 0) {
      validatedTokens.push({
        name: 'Colors',
        tokens: colors.map(v => ({
          name: normalizeName(v.name, 'color'),
          value: v.value,
          type: 'color' as const,
        })),
      })
    }

    if (typography.length > 0) {
      validatedTokens.push({
        name: 'Typography',
        tokens: typography.map(v => ({
          name: normalizeName(v.name, 'font'),
          value: v.value,
          type: v.value.match(/['"]/) ? 'font' as const : 'size' as const,
        })),
      })
    }

    if (spacing.length > 0) {
      validatedTokens.push({
        name: 'Spacing',
        tokens: spacing.map(v => ({
          name: normalizeName(v.name, 'size'),
          value: v.value,
          type: 'size' as const,
        })),
      })
    }

    if (other.length > 0) {
      validatedTokens.push({
        name: 'Other',
        tokens: other.map(v => ({
          name: normalizeName(v.name, 'size'),
          value: v.value,
          type: 'size' as const,
        })),
      })
    }

    // Generate AI improvements suggestions
    const improvements: string[] = []
    
    // Check for missing essential tokens
    const colorNames = colors.map(c => c.name.toLowerCase())
    if (!colorNames.some(n => n.includes('primary'))) {
      improvements.push('Consider adding a primary color token')
    }
    if (!colorNames.some(n => n.includes('text'))) {
      improvements.push('Consider adding text color tokens for better contrast')
    }
    
    // Check for consistent naming
    const hasInconsistentNaming = cssVariables.some(v => v.name.includes('_') && cssVariables.some(v2 => v2.name.includes('-')))
    if (hasInconsistentNaming) {
      improvements.push('Standardized variable naming to kebab-case for consistency')
    }
    
    // Check for semantic naming
    const hasNonSemanticNames = cssVariables.some(v => /^\d+/.test(v.name) || v.name.length < 3)
    if (hasNonSemanticNames) {
      improvements.push('Improved variable names to be more semantic and descriptive')
    }

    // Merge with existing tokens (avoid duplicates)
    const mergedTokens = [...existingTokens]
    validatedTokens.forEach(newCategory => {
      const existingCategoryIndex = mergedTokens.findIndex(c => c.name === newCategory.name)
      if (existingCategoryIndex >= 0) {
        // Merge tokens, avoiding duplicates
        const existingTokens = mergedTokens[existingCategoryIndex].tokens
        newCategory.tokens.forEach(newToken => {
          if (!existingTokens.find((t: { name: string; value: string; type: 'color' | 'font' | 'size' }) => t.name === newToken.name)) {
            existingTokens.push(newToken)
          }
        })
      } else {
        mergedTokens.push(newCategory)
      }
    })

    return NextResponse.json(
      {
        validatedTokens: mergedTokens,
        improvements,
        importedCount: cssVariables.length,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error importing CSS variables:', error)
    return NextResponse.json(
      { error: 'Failed to import CSS variables', details: error.message },
      { status: 500 }
    )
  }
}


