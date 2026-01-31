'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
const imgGlowTop = "/assets/design-system/Ellipse 3.svg"
const imgGlowBottom = "/assets/design-system/Ellipse 3-1.svg"
const imgEllipse4 = "/assets/design-system/Ellipse 4.svg"

export default function HomePage({ onLogin }: HomePageProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isGenerating, setIsCreating] = useState(false)

  const [stylingApproach, setStylingApproach] = useState<'css' | 'tailwind' | 'styled'>('tailwind')

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
        <h1 className="text-[96px] text-gray-150 tracking-[4.8px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
          Flash DS
        </h1>
        <p className="text-body-lg text-gray-300 font-sans tracking-widest uppercase opacity-60">
          Design system at the speed of business
        </p>
      </div>
      
      {/* Main Prompt Card */}
      <div className="w-[824px] gradient-border shadow-2xl relative overflow-hidden group z-20">
        <div className="gradient-border-content flex flex-col gap-7 items-center justify-center pb-4 pt-7 px-4">
          <p className="text-[20px] text-gray-400 font-light italic leading-none text-center">
            How should you call your design system?
          </p>
          
          <div className="w-full px-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Untitled Design System"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-8 py-6 text-xl text-gray-100 font-sans focus:outline-none focus:border-[#FF20DD] transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-end justify-between w-full mt-4">
            <p className="text-sm text-gray-500 font-sans pl-2">1 / 3</p>
            
            <button
              onClick={handleNextStep}
              disabled={!prompt.trim()}
              className="bg-gray-950 hover:bg-black flex gap-3 items-center pl-6 pr-3 py-3 rounded-xl shadow-button border border-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
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
        <h1 className="text-[96px] text-gray-150 tracking-[4.8px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
          Flash DS
        </h1>
        <p className="text-body-lg text-gray-300 font-sans tracking-widest uppercase opacity-60">
          Design system at the speed of business
        </p>
      </div>

      <div className="w-[824px] gradient-border shadow-2xl relative overflow-hidden z-20">
        <div className="gradient-border-content flex flex-col gap-7 items-center justify-center pb-4 pt-7 px-4">
          <p className="text-[24px] text-gray-400 tracking-[0.96px] text-center" style={{ fontFamily: "'EightiesComeback_VAR:Semi_Condensed', sans-serif" }}>
            Select style
          </p>

          <div className="grid grid-cols-3 gap-7 w-full">
            {/* Crawl Card */}
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-4 items-center self-stretch border border-transparent hover:border-[#FF20DD]/30 transition-all">
              <p className="text-sm text-gray-400 text-center font-sans uppercase tracking-widest font-bold">Paste reference URL</p>
              <div className="w-full flex-1 bg-gray-850 rounded-xl relative overflow-hidden min-h-[80px]">
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="nike.com"
                  className="w-full h-full bg-transparent border-none outline-none px-4 py-2 text-gray-150 text-sm italic"
                />
                <div className="absolute left-[18px] top-[21px] w-[13px] h-[37px] pointer-events-none opacity-40">
                  <img src="/assets/design-system/Option Icon.svg" alt="" className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Photos Card */}
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-4 items-center h-[138px] border border-transparent hover:border-[#FF20DD]/30 transition-all">
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
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-4 items-center h-[138px] border border-transparent hover:border-[#FF20DD]/30 transition-all">
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
              className="bg-gray-950 flex gap-3 items-center pl-6 pr-3 py-3 rounded-xl shadow-button border border-white/5 transition-all group/btn"
            >
              <span className="text-sm font-bold text-gray-100 uppercase tracking-widest z-10">
                Select styling approach
              </span>
              <div className="rounded-lg p-1 group-hover/btn:translate-x-1 transition-transform z-10">
                <img alt="Arrow right" className="w-5 h-5 invert" src={imgArrowRight} />
              </div>
              <div className="absolute left-[89px] top-[-37px] w-[86px] h-[47px] mix-blend-hard-light pointer-events-none opacity-40">
                <img src={imgEllipse4} alt="Glow effect" className="w-full h-full" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl px-4 z-20 animate-fadeIn">
      <div className="flex flex-col gap-4 items-center text-center mb-12">
        <h1 className="text-[96px] text-gray-150 tracking-[4.8px] font-light leading-none" style={{ fontFamily: "'EightiesComeback_VAR:Light_Condensed', sans-serif" }}>
          Flash DS
        </h1>
        <p className="text-body-lg text-gray-300 font-sans tracking-widest uppercase opacity-60">
          Design system at the speed of business
        </p>
      </div>

      <div className="w-[824px] gradient-border shadow-2xl relative overflow-hidden z-20">
        <div className="gradient-border-content flex flex-col gap-7 items-center justify-center pb-4 pt-7 px-4">
          <p className="text-[24px] text-gray-400 tracking-[0.96px] text-center" style={{ fontFamily: "'EightiesComeback_VAR:Semi_Condensed', sans-serif" }}>
            Select styling approach
          </p>

          <div className="grid grid-cols-3 gap-7 w-full px-2">
            {/* CSS Modules */}
            <div 
              onClick={() => setStylingApproach('css')}
              className={`bg-gray-900 rounded-xl p-4 flex flex-col gap-4 items-center h-[138px] cursor-pointer border transition-all ${stylingApproach === 'css' ? 'border-[#FF20DD] shadow-[0px_0px_17px_0px_rgba(237,0,150,0.35)] scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <p className="text-xs text-gray-400 text-center font-black uppercase tracking-widest">CSS modules</p>
              <div className="flex gap-2 w-full flex-1">
                <div className="flex-1 bg-gray-850 border border-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="w-4 h-4 border-2 border-gray-700 rounded-sm opacity-20" />
                </div>
                <div className="flex-1 bg-gray-850 border border-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="w-4 h-4 border-2 border-gray-700 rounded-sm opacity-20" />
                </div>
              </div>
            </div>

            {/* Tailwind */}
            <div 
              onClick={() => setStylingApproach('tailwind')}
              className={`bg-gray-900 rounded-xl p-4 flex flex-col gap-4 items-center self-stretch cursor-pointer border transition-all ${stylingApproach === 'tailwind' ? 'border-[#FF20DD] shadow-[0px_0px_17px_0px_rgba(237,0,150,0.35)] scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <p className="text-xs text-gray-400 text-center font-black uppercase tracking-widest">Tailwind CSS</p>
              <div className="w-full flex-1 bg-gray-850 rounded-xl overflow-hidden flex items-center justify-center border border-gray-800">
                <div className="w-12 h-4 bg-gray-800 rounded-full opacity-20" />
              </div>
            </div>

            {/* Styled Components */}
            <div 
              onClick={() => setStylingApproach('styled')}
              className={`bg-gray-900 rounded-xl p-4 flex flex-col gap-4 items-center h-[138px] cursor-pointer border transition-all ${stylingApproach === 'styled' ? 'border-[#FF20DD] shadow-[0px_0px_17px_0px_rgba(237,0,150,0.35)] scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <p className="text-xs text-gray-400 text-center font-black uppercase tracking-widest">Styled components</p>
              <div className="flex gap-3 items-center justify-center flex-1">
                <div className="w-8 h-8 bg-gray-850 border border-gray-800 rounded-lg flex items-center justify-center">
                  <img src="/assets/design-system/figma_logo.svg" alt="Figma" className="w-4 h-4 opacity-40" />
                </div>
                <div className="w-8 h-8 bg-gray-850 border border-gray-800 rounded-lg flex items-center justify-center">
                  <img src="/assets/design-system/storybook_logo.svg" alt="Storybook" className="w-5 h-5 opacity-40" />
                </div>
              </div>
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
              className="bg-gray-950 flex gap-3 items-center pl-6 pr-3 py-3 rounded-xl shadow-button border border-white/5 transition-all group/btn"
            >
              <span className="text-sm font-bold text-gray-100 uppercase tracking-widest z-10">
                Analyze
              </span>
              <div className="rounded-lg p-1 group-hover/btn:translate-x-1 transition-transform z-10">
                <img alt="Arrow right" className="w-5 h-5 invert" src={imgArrowRight} />
              </div>
              <div className="absolute left-[89px] top-[-37px] w-[86px] h-[47px] mix-blend-hard-light pointer-events-none opacity-40">
                <img src={imgEllipse4} alt="Glow effect" className="w-full h-full" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGenerating = () => (
    <div className="flex flex-col items-center justify-center z-20 animate-pulse">
      <div className="w-24 h-24 border-4 border-[#FF20DD] border-t-transparent rounded-full animate-spin mb-8" />
      <h2 className="text-3xl text-gray-150 italic mb-2 text-center" style={{ fontFamily: "'EightiesComeback_VAR:Medium_Condensed', sans-serif" }}>
        Analyzing vision & extracting DNA...
      </h2>
      <p className="text-gray-500 font-sans uppercase tracking-[0.3em] text-[10px] font-black opacity-60">
        {websiteUrl ? `Crawling ${websiteUrl}...` : 'Assembling Futuristic Components...'}
      </p>
    </div>
  )

  return (
    <div className="bg-[#0d0d0d] relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Shapes from Figma */}
      <div className="absolute border border-white/10 h-[595px] left-[1070px] rounded-[50px] top-[-103px] w-[562px] pointer-events-none" />
      <div className="absolute border border-white/10 h-[595px] left-[226px] rounded-[50px] top-[-103px] w-[350px] pointer-events-none" />
      <div className="absolute border border-white/10 h-[338px] left-[1196px] rounded-[50px] top-[520px] w-[436px] pointer-events-none" />
      <div className="absolute border border-white/10 h-[338px] left-[-81px] rounded-[50px] top-[520px] w-[643px] pointer-events-none" />
      <div className="absolute border border-white/10 h-[596px] left-[605px] rounded-[50px] top-[262px] w-[436px] pointer-events-none" />
      
      {/* Glow Effects using local assets */}
      <div className="absolute h-[46px] left-[618px] mix-blend-color-dodge top-[423px] w-[430px] pointer-events-none">
        <img src={imgGlowTop} alt="Background glow effect" className="w-full h-full opacity-40" />
      </div>
      <div className="absolute h-[64px] left-[339px] mix-blend-color-dodge top-[497px] w-[481px] pointer-events-none">
        <img src={imgGlowBottom} alt="Background glow effect" className="w-full h-full opacity-20" />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {isGenerating ? renderGenerating() : (
        step === 1 ? renderStep1() : (step === 2 ? renderStep2() : renderStep3())
      )}
    </div>
  )
}
