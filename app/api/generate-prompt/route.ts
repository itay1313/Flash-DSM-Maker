import { NextRequest, NextResponse } from 'next/server'
import { generateSystemPrompt } from '@/lib/promptGenerator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { projectDetails, figmaSetup, tokens } = body

    const prompt = generateSystemPrompt({
      projectDetails,
      figmaSetup,
      tokens,
    })

    return NextResponse.json({ prompt }, { status: 200 })
  } catch (error) {
    console.error('Error generating prompt:', error)
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    )
  }
}
