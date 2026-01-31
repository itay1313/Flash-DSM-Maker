/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors from Figma
        gray: {
          50: '#fafafa',
          100: '#ddd',
          150: '#d0d0d0',
          200: '#c4c4c4',
          300: '#acacac',
          400: '#939393',
          500: '#7a7a7a',
          600: '#626262',
          700: '#4a4a4a',
          800: '#313131',
          850: '#252525',
          900: '#191919',
          950: '#0d0d0d',
        },
        accent: {
          magenta: '#ff20dd',
          orange: '#ff6b35',
          cyan: '#00d4ff',
        },
        primary: {
          50: '#f0edff',
          100: '#e0dbff',
          200: '#c1b7ff',
          300: '#a293ff',
          400: '#836fff',
          500: '#715AFF',
          600: '#5a47cc',
          700: '#443599',
          800: '#2d2466',
          900: '#171233',
        },
        palette: {
          periwinkle: '#A682FF',
          slate: '#715AFF',
          cornflower: '#5887FF',
          maya: '#55C1FF',
          space: '#102E4A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'display': ['96px', { lineHeight: 'normal', letterSpacing: '4.8px' }],
        'heading': ['24px', { lineHeight: 'normal', letterSpacing: '0.96px' }],
        'body-lg': ['18px', { lineHeight: 'normal' }],
        'body': ['16px', { lineHeight: 'normal' }],
        'body-sm': ['14px', { lineHeight: 'normal' }],
        'input': ['28px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'card': '20px',
        'input': '12px',
        'button': '12px',
        'decorative': '50px',
      },
      spacing: {
        'card': '824px',
      },
      backgroundImage: {
        'gradient-border': 'linear-gradient(135deg, #ff20dd 0%, #ff6b35 50%, #00d4ff 100%)',
      },
      boxShadow: {
        'button': '0px 2px 2px 0px rgba(0,0,0,0.25)',
        'button-inset': 'inset 0px 1px 0px 0px rgba(255,255,255,0.3), inset 0px -1px 0px 0px rgba(255,255,255,0.18)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        slideInFromTop: 'slideInFromTop 0.2s ease-out',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.gradient-border': {
          'background': 'linear-gradient(135deg, #ff20dd 0%, #ff6b35 50%, #00d4ff 100%)',
          'padding': '1px',
        },
        '.gradient-border-content': {
          'background': '#252525',
          'border-radius': '20px',
          'width': '100%',
        },
      })
    },
  ],
}

