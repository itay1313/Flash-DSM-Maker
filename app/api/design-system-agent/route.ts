import { NextRequest, NextResponse } from 'next/server'
import { DesignSystemAgent } from '@/lib/services/design-system-agent'
import { DesignSystem } from '@/lib/types/design-system'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { designSystem, action, filters, focusAreas } = body

    if (!designSystem) {
      return NextResponse.json(
        { error: 'Design system is required' },
        { status: 400 }
      )
    }

    // Validate design system structure
    if (!designSystem.id || !designSystem.tokens || !designSystem.components) {
      return NextResponse.json(
        { error: 'Invalid design system structure' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'analyze': {
        const analysis = DesignSystemAgent.analyze(designSystem as DesignSystem)
        return NextResponse.json({ analysis }, { status: 200 })
      }

      case 'filter': {
        if (!filters) {
          return NextResponse.json(
            { error: 'Filters are required for filter action' },
            { status: 400 }
          )
        }
        const analysis = DesignSystemAgent.analyze(designSystem as DesignSystem)
        const filtered = DesignSystemAgent.filterRecommendations(analysis, filters)
        return NextResponse.json({ recommendations: filtered }, { status: 200 })
      }

      case 'plan': {
        const analysis = DesignSystemAgent.analyze(designSystem as DesignSystem)
        const plan = DesignSystemAgent.generateImprovementPlan(analysis, focusAreas)
        return NextResponse.json({ plan, analysis }, { status: 200 })
      }

      default:
        // Default to analyze
        const defaultAnalysis = DesignSystemAgent.analyze(designSystem as DesignSystem)
        return NextResponse.json({ analysis: defaultAnalysis }, { status: 200 })
    }
  } catch (error: any) {
    console.error('Error in design system agent:', error)
    return NextResponse.json(
      { error: 'Failed to process design system analysis', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Design System Improvement Agent API',
      endpoints: {
        POST: {
          '/api/design-system-agent': {
            description: 'Analyze a design system and get improvement recommendations',
            body: {
              designSystem: 'DesignSystem object (required)',
              action: "'analyze' | 'filter' | 'plan' (optional, defaults to 'analyze')",
              filters: 'Object with type, priority, or category filters (optional)',
              focusAreas: 'Array of focus area types (optional)',
            },
            examples: {
              analyze: {
                action: 'analyze',
                designSystem: '{ id, tokens, components, ... }',
              },
              filter: {
                action: 'filter',
                designSystem: '{ id, tokens, components, ... }',
                filters: { priority: 'high', type: 'token' },
              },
              plan: {
                action: 'plan',
                designSystem: '{ id, tokens, components, ... }',
                focusAreas: ['token', 'component'],
              },
            },
          },
        },
      },
    },
    { status: 200 }
  )
}


