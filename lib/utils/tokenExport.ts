import { Token } from '../types/tokens'

export function exportTokenAsCSS(token: Token): string {
  return `--${token.name}: ${token.value};`
}

export function exportTokenAsJSON(token: Token): string {
  return JSON.stringify({ [token.name]: token.value }, null, 2)
}

export function exportTokenAsSwift(token: Token): string {
  const swiftName = token.name.split('-').map((part, i) => 
    i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
  ).join('')
  
  if (token.type === 'color') {
    return `static let ${swiftName} = "${token.value}"`
  }
  return `static let ${swiftName} = "${token.value}"`
}

export function exportTokenAsSass(token: Token): string {
  return `$${token.name}: ${token.value};`
}

export function exportAllFormats(token: Token): {
  css: string
  json: string
  swift: string
  sass: string
} {
  return {
    css: exportTokenAsCSS(token),
    json: exportTokenAsJSON(token),
    swift: exportTokenAsSwift(token),
    sass: exportTokenAsSass(token)
  }
}
