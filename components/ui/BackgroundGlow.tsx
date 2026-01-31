import React from 'react'

interface BackgroundGlowProps {
  className?: string
}

/**
 * BackgroundGlow Component
 * 
 * Creates an atmospheric background with multiple layered ellipse glows,
 * decorative shapes, and a subtle grid pattern.
 * 
 * Features:
 * - Multiple color-blended ellipse layers (pink/magenta, orange/peach, cyan)
 * - Decorative rounded rectangle borders
 * - Subtle grid overlay
 * - Optimized for dark backgrounds (#0d0d0d)
 * 
 * @param className - Optional additional CSS classes
 * 
 * @example
 * ```tsx
 * <div className="relative h-screen bg-background-primary">
 *   <BackgroundGlow />
 *   <div className="relative z-10">Your content here</div>
 * </div>
 * ```
 */
export function BackgroundGlow({ className = '' }: BackgroundGlowProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Decorative rounded rectangles */}
      <div className="absolute border border-white/10 h-595 left-1070 rounded-decorative -top-103 w-562" />
      <div className="absolute border border-white/10 h-595 left-226 rounded-decorative -top-103 w-350" />
      <div className="absolute border border-white/10 h-338 left-1196 rounded-decorative top-520 w-436" />
      <div className="absolute border border-white/10 h-338 -left-20 rounded-decorative top-520 w-643" />
      <div className="absolute border border-white/10 h-596 left-605 rounded-decorative top-64 w-436" />
      
      {/* Ellipse 1 - Pink/Magenta glow - Center top */}
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 w-900 h-400 opacity-50">
        <img 
          src="/assets/design-system/Ellipse 1.svg" 
          alt="" 
          className="w-full h-full scale-150" 
          style={{ mixBlendMode: 'color-dodge' }}
        />
      </div>
      
      {/* Ellipse 2 - Orange/Peach glow - Center bottom */}
      <div className="absolute left-1/2 bottom-[20%] -translate-x-1/2 w-1000 h-450 opacity-35">
        <img 
          src="/assets/design-system/Ellipse 2.svg" 
          alt="" 
          className="w-full h-full scale-125" 
          style={{ mixBlendMode: 'color-dodge' }}
        />
      </div>
      
      {/* Ellipse 3 - Cyan glow - Center accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-450 opacity-40">
        <img 
          src="/assets/design-system/Ellipse 3.svg" 
          alt="" 
          className="w-full h-full" 
          style={{ mixBlendMode: 'hard-light' }}
        />
      </div>
      
      {/* Additional glow layers for depth */}
      <div className="absolute left-[30%] top-[25%] w-600 h-350 opacity-20">
        <img 
          src="/assets/design-system/Ellipse 1.svg" 
          alt="" 
          className="w-full h-full scale-90 rotate-45" 
          style={{ mixBlendMode: 'color-dodge' }}
        />
      </div>
      
      <div className="absolute right-[25%] bottom-[30%] w-550 h-320 opacity-25">
        <img 
          src="/assets/design-system/Ellipse 2.svg" 
          alt="" 
          className="w-full h-full scale-75 -rotate-12" 
          style={{ mixBlendMode: 'color-dodge' }}
        />
      </div>

      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  )
}
