import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // PROTOTYPE: Fetch Figma files
  // In production, this would:
  // 1. Get access token from session/cookies
  // 2. Call Figma API: GET https://api.figma.com/v1/files
  // 3. Parse response and return files
  
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get('token') // In production, get from secure session
  
  // Mock response for prototype
  const mockFiles = [
    {
      key: 'figma-1',
      name: 'Dashboard Design System',
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      projectName: 'Design Systems',
      thumbnailUrl: undefined,
    },
    {
      key: 'figma-2',
      name: 'Marketing Website Components',
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      projectName: 'Marketing',
      thumbnailUrl: undefined,
    },
    {
      key: 'figma-3',
      name: 'Design System Starter',
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      projectName: 'Templates',
      thumbnailUrl: undefined,
    },
    {
      key: 'figma-4',
      name: 'E-commerce UI Kit',
      lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      projectName: 'E-commerce',
      thumbnailUrl: undefined,
    },
    {
      key: 'figma-5',
      name: 'Mobile App Components',
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      projectName: 'Mobile',
      thumbnailUrl: undefined,
    },
  ]
  
  // In production, make actual API call:
  // const response = await fetch('https://api.figma.com/v1/files', {
  //   headers: {
  //     'X-Figma-Token': accessToken,
  //   },
  // })
  // const data = await response.json()
  
  return NextResponse.json({ files: mockFiles })
}

