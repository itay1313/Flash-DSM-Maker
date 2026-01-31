import { Token } from '../types/tokens'

interface ComponentData {
  name: string
  code: string
  [key: string]: any
}

export function detectTokenUsage(token: Token, components: ComponentData[]): string[] {
  return components
    .filter(c => {
      // Check if component code contains the token value or name
      const codeStr = c.code.toLowerCase()
      const tokenValue = token.value.toLowerCase()
      const tokenName = token.name.toLowerCase()
      
      return codeStr.includes(tokenValue) || codeStr.includes(tokenName)
    })
    .map(c => c.name)
}

export function calculateTokenUsageStats(tokens: Token[], components: ComponentData[]): Map<string, number> {
  const usageMap = new Map<string, number>()
  
  tokens.forEach(token => {
    const usage = detectTokenUsage(token, components)
    usageMap.set(token.name, usage.length)
  })
  
  return usageMap
}

export function findOrphanedTokens(tokens: Token[], components: ComponentData[]): Token[] {
  return tokens.filter(token => {
    const usage = detectTokenUsage(token, components)
    return usage.length === 0
  })
}
