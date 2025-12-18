'use client'

import { useRouter } from 'next/navigation'

interface HomePageProps {
  onLogin: () => void
}

export default function HomePage({ onLogin }: HomePageProps) {
  const router = useRouter()
  
  const handleLogin = () => {
    onLogin()
    // Navigate to dashboard after login
    router.push('/dashboard')
  }
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-palette-slate rounded-[8px] shadow-2xl shadow-palette-slate/50">
            <span className="text-white font-bold text-2xl tracking-tight">DSM</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-cyan-100 via-blue-100 to-violet-100 bg-clip-text text-transparent">
          Design System Manager
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Build, manage, and scale your design systems with AI-powered tools
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group relative p-6 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-palette-periwinkle/50 hover:shadow-[0_0_30px_rgba(166,130,255,0.3)] hover:shadow-palette-periwinkle/20 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-palette-periwinkle/0 to-palette-slate/0 group-hover:from-palette-periwinkle/10 group-hover:to-palette-slate/10 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-palette-periwinkle/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:bg-palette-periwinkle/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-palette-periwinkle/50">
                <svg className="w-6 h-6 text-palette-periwinkle transition-all duration-300 group-hover:text-palette-periwinkle/80 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-palette-periwinkle">AI-Powered</h3>
              <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Generate design systems with AI assistance</p>
            </div>
          </div>

          <div className="group relative p-6 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-palette-slate/50 hover:shadow-[0_0_30px_rgba(113,90,255,0.3)] hover:shadow-palette-slate/20 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-palette-slate/0 to-palette-cornflower/0 group-hover:from-palette-slate/10 group-hover:to-palette-cornflower/10 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-palette-slate/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:bg-palette-slate/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-palette-slate/50">
                <svg className="w-6 h-6 text-palette-cornflower transition-all duration-300 group-hover:text-palette-slate group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-palette-cornflower">Visual Builder</h3>
              <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Create flows with an intuitive interface</p>
            </div>
          </div>

          <div className="group relative p-6 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-palette-maya/50 hover:shadow-[0_0_30px_rgba(85,193,255,0.3)] hover:shadow-palette-maya/20 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-palette-maya/0 to-palette-cornflower/0 group-hover:from-palette-maya/10 group-hover:to-palette-cornflower/10 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-palette-maya/20 rounded-lg flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:bg-palette-maya/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-palette-maya/50">
                <svg className="w-6 h-6 text-palette-maya transition-all duration-300 group-hover:text-palette-maya/80 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-palette-maya">Design Tokens</h3>
              <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Manage colors, typography, and spacing</p>
            </div>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Google Sign In Button */}
          <button
            onClick={() => {
              // PROTOTYPE: Placeholder for Google authentication
              // In production, integrate with Google OAuth
              console.log('Google Sign In - To be implemented')
              handleLogin() // For now, just proceed with login
            }}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-[8px] font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
          
          {/* Continue as Guest / Prototype Button */}
          <button
            onClick={handleLogin}
            className="px-8 py-4 bg-palette-slate hover:bg-primary-600 text-white rounded-[8px] font-semibold text-lg transition-all shadow-2xl shadow-palette-slate/30 hover:shadow-palette-slate/50 hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Continue (Prototype)
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  )
}

