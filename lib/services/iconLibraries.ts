export type IconLibrary = 'material' | 'tabler' | 'lucide' | 'custom'

export interface IconData {
  name: string
  svg?: string
  library: IconLibrary
  category?: string
  url?: string // For CDN-based icons
}

// Cache for icon lists
const iconCache: Record<string, IconData[]> = {}

// Material Icons - Using a curated list of common icons
// In production, you'd fetch from Google Fonts API
const MATERIAL_ICONS: IconData[] = [
  { name: 'home', library: 'material', category: 'navigation' },
  { name: 'menu', library: 'material', category: 'navigation' },
  { name: 'search', library: 'material', category: 'action' },
  { name: 'close', library: 'material', category: 'action' },
  { name: 'add', library: 'material', category: 'content' },
  { name: 'delete', library: 'material', category: 'action' },
  { name: 'edit', library: 'material', category: 'editor' },
  { name: 'save', library: 'material', category: 'action' },
  { name: 'settings', library: 'material', category: 'action' },
  { name: 'favorite', library: 'material', category: 'action' },
  { name: 'star', library: 'material', category: 'toggle' },
  { name: 'check', library: 'material', category: 'action' },
  { name: 'arrow_back', library: 'material', category: 'navigation' },
  { name: 'arrow_forward', library: 'material', category: 'navigation' },
  { name: 'chevron_left', library: 'material', category: 'navigation' },
  { name: 'chevron_right', library: 'material', category: 'navigation' },
  { name: 'more_vert', library: 'material', category: 'navigation' },
  { name: 'more_horiz', library: 'material', category: 'navigation' },
  { name: 'person', library: 'material', category: 'social' },
  { name: 'email', library: 'material', category: 'communication' },
  { name: 'phone', library: 'material', category: 'communication' },
  { name: 'notifications', library: 'material', category: 'social' },
  { name: 'info', library: 'material', category: 'action' },
  { name: 'warning', library: 'material', category: 'alert' },
  { name: 'error', library: 'material', category: 'alert' },
  { name: 'warning_amber', library: 'material', category: 'alert' },
  { name: 'check_circle', library: 'material', category: 'action' },
  { name: 'cancel', library: 'material', category: 'action' },
  { name: 'refresh', library: 'material', category: 'navigation' },
  { name: 'download', library: 'material', category: 'file' },
  { name: 'upload', library: 'material', category: 'file' },
  { name: 'folder', library: 'material', category: 'file' },
  { name: 'file', library: 'material', category: 'file' },
  { name: 'image', library: 'material', category: 'image' },
  { name: 'video', library: 'material', category: 'av' },
  { name: 'music_note', library: 'material', category: 'av' },
  { name: 'play_arrow', library: 'material', category: 'av' },
  { name: 'pause', library: 'material', category: 'av' },
  { name: 'stop', library: 'material', category: 'av' },
  { name: 'skip_next', library: 'material', category: 'av' },
  { name: 'skip_previous', library: 'material', category: 'av' },
  { name: 'shopping_cart', library: 'material', category: 'action' },
  { name: 'payment', library: 'material', category: 'action' },
  { name: 'credit_card', library: 'material', category: 'action' },
  { name: 'lock', library: 'material', category: 'action' },
  { name: 'lock_open', library: 'material', category: 'action' },
  { name: 'visibility', library: 'material', category: 'action' },
  { name: 'visibility_off', library: 'material', category: 'action' },
  { name: 'calendar_today', library: 'material', category: 'action' },
  { name: 'schedule', library: 'material', category: 'action' },
  { name: 'location_on', library: 'material', category: 'maps' },
  { name: 'map', library: 'material', category: 'maps' },
  { name: 'language', library: 'material', category: 'action' },
  { name: 'dark_mode', library: 'material', category: 'toggle' },
  { name: 'light_mode', library: 'material', category: 'toggle' },
]

// Tabler Icons - Common icons list
const TABLER_ICONS: IconData[] = [
  { name: 'home', library: 'tabler', category: 'navigation' },
  { name: 'menu-2', library: 'tabler', category: 'navigation' },
  { name: 'search', library: 'tabler', category: 'action' },
  { name: 'x', library: 'tabler', category: 'action' },
  { name: 'plus', library: 'tabler', category: 'content' },
  { name: 'trash', library: 'tabler', category: 'action' },
  { name: 'pencil', library: 'tabler', category: 'editor' },
  { name: 'device-floppy', library: 'tabler', category: 'action' },
  { name: 'settings', library: 'tabler', category: 'action' },
  { name: 'heart', library: 'tabler', category: 'action' },
  { name: 'star', library: 'tabler', category: 'toggle' },
  { name: 'check', library: 'tabler', category: 'action' },
  { name: 'arrow-left', library: 'tabler', category: 'navigation' },
  { name: 'arrow-right', library: 'tabler', category: 'navigation' },
  { name: 'chevron-left', library: 'tabler', category: 'navigation' },
  { name: 'chevron-right', library: 'tabler', category: 'navigation' },
  { name: 'dots-vertical', library: 'tabler', category: 'navigation' },
  { name: 'dots', library: 'tabler', category: 'navigation' },
  { name: 'user', library: 'tabler', category: 'social' },
  { name: 'mail', library: 'tabler', category: 'communication' },
  { name: 'phone', library: 'tabler', category: 'communication' },
  { name: 'bell', library: 'tabler', category: 'social' },
  { name: 'info-circle', library: 'tabler', category: 'action' },
  { name: 'alert-triangle', library: 'tabler', category: 'alert' },
  { name: 'alert-circle', library: 'tabler', category: 'alert' },
  { name: 'circle-check', library: 'tabler', category: 'action' },
  { name: 'circle-x', library: 'tabler', category: 'action' },
  { name: 'refresh', library: 'tabler', category: 'navigation' },
  { name: 'download', library: 'tabler', category: 'file' },
  { name: 'upload', library: 'tabler', category: 'file' },
  { name: 'folder', library: 'tabler', category: 'file' },
  { name: 'file', library: 'tabler', category: 'file' },
  { name: 'photo', library: 'tabler', category: 'image' },
  { name: 'video', library: 'tabler', category: 'av' },
  { name: 'music', library: 'tabler', category: 'av' },
  { name: 'player-play', library: 'tabler', category: 'av' },
  { name: 'player-pause', library: 'tabler', category: 'av' },
  { name: 'player-stop', library: 'tabler', category: 'av' },
  { name: 'player-skip-forward', library: 'tabler', category: 'av' },
  { name: 'player-skip-back', library: 'tabler', category: 'av' },
  { name: 'shopping-cart', library: 'tabler', category: 'action' },
  { name: 'credit-card', library: 'tabler', category: 'action' },
  { name: 'lock', library: 'tabler', category: 'action' },
  { name: 'lock-open', library: 'tabler', category: 'action' },
  { name: 'eye', library: 'tabler', category: 'action' },
  { name: 'eye-off', library: 'tabler', category: 'action' },
  { name: 'calendar', library: 'tabler', category: 'action' },
  { name: 'clock', library: 'tabler', category: 'action' },
  { name: 'map-pin', library: 'tabler', category: 'maps' },
  { name: 'map', library: 'tabler', category: 'maps' },
  { name: 'world', library: 'tabler', category: 'action' },
  { name: 'moon', library: 'tabler', category: 'toggle' },
  { name: 'sun', library: 'tabler', category: 'toggle' },
]

// Lucide Icons - Common icons list
const LUCIDE_ICONS: IconData[] = [
  { name: 'home', library: 'lucide', category: 'navigation' },
  { name: 'menu', library: 'lucide', category: 'navigation' },
  { name: 'search', library: 'lucide', category: 'action' },
  { name: 'x', library: 'lucide', category: 'action' },
  { name: 'plus', library: 'lucide', category: 'content' },
  { name: 'trash-2', library: 'lucide', category: 'action' },
  { name: 'pencil', library: 'lucide', category: 'editor' },
  { name: 'save', library: 'lucide', category: 'action' },
  { name: 'settings', library: 'lucide', category: 'action' },
  { name: 'heart', library: 'lucide', category: 'action' },
  { name: 'star', library: 'lucide', category: 'toggle' },
  { name: 'check', library: 'lucide', category: 'action' },
  { name: 'arrow-left', library: 'lucide', category: 'navigation' },
  { name: 'arrow-right', library: 'lucide', category: 'navigation' },
  { name: 'chevron-left', library: 'lucide', category: 'navigation' },
  { name: 'chevron-right', library: 'lucide', category: 'navigation' },
  { name: 'more-vertical', library: 'lucide', category: 'navigation' },
  { name: 'more-horizontal', library: 'lucide', category: 'navigation' },
  { name: 'user', library: 'lucide', category: 'social' },
  { name: 'mail', library: 'lucide', category: 'communication' },
  { name: 'phone', library: 'lucide', category: 'communication' },
  { name: 'bell', library: 'lucide', category: 'social' },
  { name: 'info', library: 'lucide', category: 'action' },
  { name: 'alert-triangle', library: 'lucide', category: 'alert' },
  { name: 'alert-circle', library: 'lucide', category: 'alert' },
  { name: 'check-circle-2', library: 'lucide', category: 'action' },
  { name: 'x-circle', library: 'lucide', category: 'action' },
  { name: 'refresh-cw', library: 'lucide', category: 'navigation' },
  { name: 'download', library: 'lucide', category: 'file' },
  { name: 'upload', library: 'lucide', category: 'file' },
  { name: 'folder', library: 'lucide', category: 'file' },
  { name: 'file', library: 'lucide', category: 'file' },
  { name: 'image', library: 'lucide', category: 'image' },
  { name: 'video', library: 'lucide', category: 'av' },
  { name: 'music', library: 'lucide', category: 'av' },
  { name: 'play', library: 'lucide', category: 'av' },
  { name: 'pause', library: 'lucide', category: 'av' },
  { name: 'square', library: 'lucide', category: 'av' },
  { name: 'skip-forward', library: 'lucide', category: 'av' },
  { name: 'skip-back', library: 'lucide', category: 'av' },
  { name: 'shopping-cart', library: 'lucide', category: 'action' },
  { name: 'credit-card', library: 'lucide', category: 'action' },
  { name: 'lock', library: 'lucide', category: 'action' },
  { name: 'unlock', library: 'lucide', category: 'action' },
  { name: 'eye', library: 'lucide', category: 'action' },
  { name: 'eye-off', library: 'lucide', category: 'action' },
  { name: 'calendar', library: 'lucide', category: 'action' },
  { name: 'clock', library: 'lucide', category: 'action' },
  { name: 'map-pin', library: 'lucide', category: 'maps' },
  { name: 'map', library: 'lucide', category: 'maps' },
  { name: 'globe', library: 'lucide', category: 'action' },
  { name: 'moon', library: 'lucide', category: 'toggle' },
  { name: 'sun', library: 'lucide', category: 'toggle' },
]

export async function fetchMaterialIcons(): Promise<IconData[]> {
  if (iconCache.material) {
    return iconCache.material
  }

  // In production, fetch from Google Fonts API
  // For now, return curated list
  const icons = MATERIAL_ICONS.map(icon => ({
    ...icon,
    url: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon.name}/default/24px.svg`
  }))
  
  iconCache.material = icons
  return icons
}

export async function fetchTablerIcons(): Promise<IconData[]> {
  if (iconCache.tabler) {
    return iconCache.tabler
  }

  // In production, fetch from Tabler Icons API or npm package
  // For now, return curated list
  const icons = TABLER_ICONS.map(icon => ({
    ...icon,
    url: `https://tabler.io/icons/icon/${icon.name}.svg`
  }))
  
  iconCache.tabler = icons
  return icons
}

export async function fetchLucideIcons(): Promise<IconData[]> {
  if (iconCache.lucide) {
    return iconCache.lucide
  }

  // In production, fetch from Lucide API or use lucide-react package
  // For now, return curated list
  const icons = LUCIDE_ICONS.map(icon => ({
    ...icon,
    url: `https://lucide.dev/icons/${icon.name}`
  }))
  
  iconCache.lucide = icons
  return icons
}

export async function fetchCustomIcons(url: string): Promise<IconData[]> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch icons: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Try to parse common formats
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        name: item.name || item.id || 'unknown',
        svg: item.svg || item.content,
        library: 'custom' as IconLibrary,
        category: item.category,
        url: item.url || url,
      }))
    }
    
    if (data.icons && Array.isArray(data.icons)) {
      return data.icons.map((item: any) => ({
        name: item.name || item.id || 'unknown',
        svg: item.svg || item.content,
        library: 'custom' as IconLibrary,
        category: item.category,
        url: item.url || url,
      }))
    }
    
    throw new Error('Invalid icon data format')
  } catch (error) {
    console.error('Error fetching custom icons:', error)
    throw error
  }
}

export function getIconUrl(icon: IconData, size: number = 24): string {
  if (icon.url) return icon.url
  
  switch (icon.library) {
    case 'material':
      return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${icon.name}/default/${size}px.svg`
    case 'tabler':
      return `https://tabler.io/icons/icon/${icon.name}.svg`
    case 'lucide':
      // Lucide icons are typically used via npm package, but we can use a CDN
      return `https://unpkg.com/lucide@latest/icons/${icon.name}.svg`
    default:
      return ''
  }
}

export function clearIconCache(library?: IconLibrary) {
  if (library) {
    delete iconCache[library]
  } else {
    Object.keys(iconCache).forEach(key => delete iconCache[key])
  }
}

