'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { H1 } from './ui/Typography'
import { BackgroundGlow } from './ui/BackgroundGlow'

interface HomePageProps {
  onLogin: () => void
}

// Local assets from public/assets/design-system/
const imgArrowRight = "/assets/design-system/keyboard_arrow_right.svg"
const imgArrowDown = "/assets/design-system/keyboard_arrow_down.svg"
const imgSearch = "/assets/design-system/search.svg"
const imgFigma = "/assets/design-system/figma_logo.svg"
const imgStorybook = "/assets/design-system/storybook_logo.svg"
const imgAdd = "/assets/design-system/add.svg"
const imgEllipse4 = "/assets/design-system/Ellipse 4.svg"

const presetPatterns = [
  { id: 'tailwind', name: 'Tailwind 4', count: 22, icon: '🎨' },
  { id: 'untitled-ui', name: 'Untitled UI', count: 30, icon: '✨' },
  { id: 'radix-light', name: 'Radix UI Light', count: 31, icon: '☀️' },
  { id: 'radix-dark', name: 'Radix UI Dark', count: 31, icon: '🌙' },
  { id: 'adobe-spectrum', name: 'Adobe Spectrum', count: 14, icon: '🎭' },
  { id: 'ant-design', name: 'Ant Design', count: 13, icon: '🐜' },
  { id: 'bootstrap', name: 'Bootstrap', count: 11, icon: '🅱️' },
  { id: 'chakra-ui', name: 'Chakra UI', count: 10, icon: '⚡' },
  { id: 'frames-x', name: 'Frames X', count: 20, icon: '🖼️' },
  { id: 'material-ui', name: 'Material UI', count: 19, icon: '🎯' },
  { id: 'css-modules', name: 'CSS Modules', count: 0, icon: '📦' },
  { id: 'styled-components', name: 'Styled Components', count: 0, icon: '💅' },
]

export default function HomePage({ onLogin }: HomePageProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isGenerating, setIsCreating] = useState(false)

  const [stylingApproach, setStylingApproach] = useState('tailwind')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setIsCreating(true)
      // Simulate AI Generation
      setTimeout(() => {
        onLogin()
        router.push('/dashboard')
      }, 3000)
    }
  }

  const renderStep1 = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 z-20 animate-fadeIn">
      {/* Title Container */}
      <div className="flex flex-col gap-4 items-center text-center mb-12">
        <H1 className="text-gray-150">
          Flash DS
        </H1>
        <p className="text-body-lg text-gray-300 font-sans tracking-widest uppercase opacity-60">
          Design system at the speed of business
        </p>
      </div>
      
      {/* Main Prompt Card */}
      <div className="w-card gradient-border shadow-2xl relative overflow-hidden group z-20">
        <div className="gradient-border-content flex flex-col gap-7 items-center justify-center pb-4 pt-7 px-4">
          <p className="text-2xl text-gray-400 font-light italic leading-none text-center">
            How should you call your design system?
          </p>
          
          <div className="w-full px-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Untitled Design System"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-8 py-6 text-xl text-gray-100 font-sans focus:outline-none focus:border-accent-magenta transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-end justify-between w-full mt-4">
            <p className="text-sm text-gray-500 font-sans pl-2">1 / 3</p>
            
            <button
              onClick={handleNextStep}
              disabled={!prompt.trim()}
              style={{
                borderRadius: '12px',
                background: '#0D0D0D',
                boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.25), 0 1px 0 0 rgba(255, 255, 255, 0.30) inset, 0 -1px 0 0 rgba(255, 255, 255, 0.18) inset',
                padding: '8px 8px 8px 16px',
                gap: '8px'
              }}
              className="flex justify-center items-center hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
            >
              <span className="text-sm font-bold text-gray-100 uppercase tracking-widest">
                Select style
              </span>
              <div className="rounded-lg p-1 group-hover/btn:translate-x-1 transition-transform">
                <img alt="Arrow right" className="w-5 h-5 invert" src={imgArrowRight} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl px-4 z-20 animate-fadeIn">
      <div className="flex flex-col gap-4 items-center text-center mb-12">
        <H1 className="text-gray-150">
          Flash DS
        </H1>
        <p className="text-body-lg text-gray-300 font-sans tracking-widest uppercase opacity-60">
          Design system at the speed of business
        </p>
      </div>

      <div className="w-card gradient-border shadow-2xl relative overflow-hidden z-20">
        <div className="gradient-border-content flex flex-col gap-7 items-center justify-center pb-4 pt-7 px-4">
          <p className="text-3xl text-gray-400 tracking-heading text-center" style={{ fontFamily: "'EightiesComeback_VAR:Semi_Condensed', sans-serif" }}>
            Select style
          </p>

          <div className="grid grid-cols-3 gap-7 w-full">
            {/* Crawl Card */}
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-4 items-center self-stretch border border-transparent hover:border-accent-magenta/30 transition-all">
              <p className="text-sm text-gray-400 text-center font-sans uppercase tracking-widest font-bold">Paste reference URL</p>
              <div className="w-full flex-1 bg-gray-850 rounded-xl relative overflow-hidden min-h-20">
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="nike.com"
                  className="w-full h-full bg-transparent border-none outline-none px-4 py-2 text-gray-150 text-sm italic"
                />
                <div className="absolute left-18 top-21 w-13 h-37 pointer-events-none opacity-40">
                  <img src="/assets/design-system/Option Icon.svg" alt="" className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Photos Card */}
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-4 items-center h-138 border border-transparent hover:border-accent-magenta/30 transition-all">
              <p className="text-sm text-gray-400 text-center font-sans uppercase tracking-widest font-bold">Add photos</p>
              <div className="flex gap-2 w-full flex-1">
                <div className="flex-1 bg-gray-850 border border-gray-600 border-dashed rounded-xl flex items-center justify-center relative cursor-pointer hover:bg-white/5 transition-colors">
                  <img src={imgAdd} alt="Add photo" className="w-4 h-4 relative z-10 opacity-20" />
                </div>
                <div className="flex-1 bg-gray-850 border border-gray-600 border-dashed rounded-xl flex items-center justify-center relative cursor-pointer hover:bg-white/5 transition-colors">
                  <img src={imgAdd} alt="Add photo" className="w-4 h-4 relative z-10 opacity-20" />
                </div>
              </div>
            </div>

            {/* Platforms Card */}
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-4 items-center h-138 border border-transparent hover:border-accent-magenta/30 transition-all">
              <p className="text-sm text-gray-400 text-center font-sans uppercase tracking-widest font-bold">Connect</p>
              <div className="flex gap-3 items-center flex-1">
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-850 hover:bg-gray-800 transition-colors border border-white/5">
                  <img src="/assets/design-system/Option Icon-1.svg" alt="Figma" className="w-6 h-6 opacity-60" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-850 hover:bg-gray-800 transition-colors border border-white/5">
                  <img src="/assets/design-system/storybook-icon-svgrepo-com 1.svg" alt="Storybook" className="w-8 h-8 opacity-60" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between w-full mt-4">
            <button onClick={() => setStep(1)} className="bg-white/5 hover:bg-white/10 flex gap-2 items-center px-4 py-2 rounded-xl relative group transition-all active:scale-95">
              <div className="rotate-180 w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity">
                <img src={imgArrowRight} alt="Back arrow" className="w-full h-full" />
              </div>
              <span className="text-sm font-bold text-gray-100 uppercase tracking-widest">Back</span>
            </button>

            <p className="text-sm text-gray-500 font-sans text-center">2 / 3</p>
            
            <button
              onClick={handleNextStep}
              style={{
                borderRadius: '12px',
                background: '#0D0D0D',
                boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.25), 0 1px 0 0 rgba(255, 255, 255, 0.30) inset, 0 -1px 0 0 rgba(255, 255, 255, 0.18) inset',
                padding: '8px 8px 8px 16px',
                gap: '8px'
              }}
              className="flex justify-center items-center transition-all group/btn relative"
            >
              <span className="text-sm font-bold text-gray-100 uppercase tracking-widest z-10">
                Select styling approach
              </span>
              <div className="rounded-lg p-1 group-hover/btn:translate-x-1 transition-transform z-10">
                <img alt="Arrow right" className="w-5 h-5 invert" src={imgArrowRight} />
              </div>
              <div className="absolute left-89 -top-37 w-86 h-47 mix-blend-hard-light pointer-events-none opacity-40">
                <img src={imgEllipse4} alt="Glow effect" className="w-full h-full" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => {
    const selectedPreset = presetPatterns.find(p => p.id === stylingApproach)
    
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-5xl px-4 z-20 animate-fadeIn">
        <div className="flex flex-col gap-4 items-center text-center mb-12">
          <H1 className="text-gray-150">
            Flash DS
          </H1>
          <p className="text-body-lg text-gray-300 font-sans tracking-widest uppercase opacity-60">
            Design system at the speed of business
          </p>
        </div>

        <div className="w-card gradient-border shadow-2xl relative overflow-hidden z-20">
          <div className="gradient-border-content flex flex-col gap-7 items-center justify-center pb-4 pt-7 px-4">
            <p className="text-3xl text-gray-400 tracking-heading text-center" style={{ fontFamily: "'EightiesComeback_VAR:Semi_Condensed', sans-serif" }}>
              Select preset pattern
            </p>

            {/* Dropdown Selector */}
            <div className="w-full max-w-2xl px-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-6 py-5 text-left text-gray-100 font-sans focus:outline-none focus:border-accent-magenta transition-all hover:bg-gray-850 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{selectedPreset?.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{selectedPreset?.name}</span>
                      {selectedPreset && selectedPreset.count > 0 && (
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-black">
                          {selectedPreset.count} components
                        </span>
                      )}
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="py-2">
                      <div className="px-4 py-2">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Preset Patterns</p>
                      </div>
                      {presetPatterns.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setStylingApproach(preset.id)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full px-6 py-4 text-left hover:bg-gray-850 transition-all flex items-center justify-between group ${
                            stylingApproach === preset.id ? 'bg-gray-850 border-l-4 border-accent-magenta' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-2xl">{preset.icon}</span>
                            <div className="flex flex-col">
                              <span className="text-base font-bold text-gray-100">{preset.name}</span>
                              {preset.count > 0 && (
                                <span className="text-xs text-gray-500 uppercase tracking-widest font-black">
                                  {preset.count} components
                                </span>
                              )}
                            </div>
                          </div>
                          {stylingApproach === preset.id && (
                            <svg className="w-5 h-5 text-accent-magenta" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Pattern Preview */}
              <div className="mt-6 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{selectedPreset?.icon}</span>
                  <h3 className="text-xl font-bold text-gray-100">{selectedPreset?.name}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {selectedPreset?.count && selectedPreset.count > 0 
                    ? `This preset includes ${selectedPreset.count} pre-built components ready to use in your design system.`
                    : 'Build your design system from scratch with this styling approach.'}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between w-full mt-4">
              <button onClick={() => setStep(2)} className="bg-white/5 hover:bg-white/10 flex gap-2 items-center px-4 py-2 rounded-xl relative group transition-all active:scale-95">
                <div className="rotate-180 w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <img src={imgArrowRight} alt="Back arrow" className="w-full h-full" />
                </div>
                <span className="text-sm font-bold text-gray-100 uppercase tracking-widest">Back</span>
              </button>

              <p className="text-sm text-gray-500 font-sans text-center">3 / 3</p>
              
              <button
                onClick={handleNextStep}
                style={{
                  borderRadius: '12px',
                  background: '#0D0D0D',
                  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.25), 0 1px 0 0 rgba(255, 255, 255, 0.30) inset, 0 -1px 0 0 rgba(255, 255, 255, 0.18) inset',
                  padding: '8px 8px 8px 16px',
                  gap: '8px'
                }}
                className="flex justify-center items-center transition-all group/btn relative"
              >
                <span className="text-sm font-bold text-gray-100 uppercase tracking-widest z-10">
                  Analyze
                </span>
                <div className="rounded-lg p-1 group-hover/btn:translate-x-1 transition-transform z-10">
                  <img alt="Arrow right" className="w-5 h-5 invert" src={imgArrowRight} />
                </div>
                <div className="absolute left-89 -top-37 w-86 h-47 mix-blend-hard-light pointer-events-none opacity-40">
                  <img src={imgEllipse4} alt="Glow effect" className="w-full h-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderGenerating = () => (
    <div className="flex flex-col items-center justify-center z-20 animate-pulse">
      <div className="w-24 h-24 border-4 border-accent-magenta border-t-transparent rounded-full animate-spin mb-8" />
      <h2 className="text-3xl text-gray-150 italic mb-2 text-center" style={{ fontFamily: "'EightiesComeback_VAR:Medium_Condensed', sans-serif" }}>
        Analyzing vision & extracting DNA...
      </h2>
      <p className="text-gray-500 font-sans uppercase tracking-label text-xs font-black opacity-60">
        {websiteUrl ? `Crawling ${websiteUrl}...` : 'Assembling Futuristic Components...'}
      </p>
    </div>
  )

  return (
    <div className="bg-background-primary relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glow Component */}
      <BackgroundGlow />

      {isGenerating ? renderGenerating() : (
        step === 1 ? renderStep1() : (step === 2 ? renderStep2() : renderStep3())
      )}
    </div>
  )
}
