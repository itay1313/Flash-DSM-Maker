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
        // Semantic Background Colors
        background: {
          primary: '#0d0d0d',
          secondary: '#252525',
          card: '#191919',
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
        // Glow Effect Colors
        glow: {
          pink: '#FF37E4',
          peach: '#FFCEA3',
          cyan: '#A3E7FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': ['10px', { lineHeight: '1.5' }],
        'sm': ['12px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: 'normal' }],
        'lg': ['16px', { lineHeight: 'normal' }],
        'xl': ['18px', { lineHeight: 'normal' }],
        '2xl': ['20px', { lineHeight: '1.3' }],
        '3xl': ['24px', { lineHeight: 'normal', letterSpacing: '0.96px' }],
        '4xl': ['28px', { lineHeight: '1.4' }],
        '5xl': ['48px', { lineHeight: '1.2' }],
        '6xl': ['96px', { lineHeight: 'none', letterSpacing: '4.8px' }],
        // Semantic aliases
        'display': ['96px', { lineHeight: 'none', letterSpacing: '4.8px' }],
        'heading': ['24px', { lineHeight: 'normal', letterSpacing: '0.96px' }],
        'body-lg': ['18px', { lineHeight: 'normal' }],
        'body': ['16px', { lineHeight: 'normal' }],
        'body-sm': ['14px', { lineHeight: 'normal' }],
        'input': ['28px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '46px',
        '6xl': '48px',
        '7xl': '52px',
        'full': '9999px',
        // Semantic aliases
        'button': '12px',
        'card': '20px',
        'input': '12px',
        'decorative': '50px',
      },
      spacing: {
        // Base 4px scale (0-24 = 0-96px in 4px increments)
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
        // Custom values for exact preservation
        '13': '13px',    // w-[13px]
        '17': '17px',    // width values
        '18': '18px',    // h-[18px]
        '21': '21px',    // top-[21px]
        '23': '23px',
        '37': '37px',    // h-[37px]
        '46': '46px',    // h-[46px]
        '47': '47px',    // h-[47px]
        '86': '86px',    // w-[86px]
        '89': '89px',    // left-[89px]
        '103': '103px',  // top values
        '138': '138px',  // h-[138px]
        '206': '824px',  // w-[824px] card width
        '226': '226px',  // left-[226px]
        '242': '242px',  // w-[242px]
        '254': '254px',  // h-[254px]
        '268': '268px',  // calculated positioning
        '272': '272px',  // h-[272px]
        '300': '300px',  // w-[300px]
        '320': '320px',  // h-[320px]
        '338': '338px',  // h-[338px]
        '346': '346px',  // h-[346px]
        '350': '350px',  // w-[350px]
        '400': '400px',  // w-[400px]
        '436': '436px',  // w-[436px]
        '450': '450px',  // h-[450px]
        '500': '500px',  // w-[500px]
        '520': '520px',  // top-[520px]
        '550': '550px',  // w-[550px]
        '562': '562px',  // w-[562px]
        '595': '595px',  // h-[595px]
        '596': '596px',  // h-[596px]
        '600': '600px',  // w-[600px]
        '605': '605px',  // left-[605px]
        '638': '638px',  // w-[638px]
        '643': '643px',  // w-[643px]
        '689': '689px',  // w-[689px]
        '900': '900px',  // w-[900px]
        '1000': '1000px', // w-[1000px]
        '1070': '1070px', // left-[1070px]
        '1196': '1196px', // left-[1196px]
        // Semantic alias
        'card': '824px',
        // Viewport-based
        'screen': '100vh',
        'full': '100%',
      },
      backgroundImage: {
        'gradient-border': 'linear-gradient(135deg, #ff20dd 0%, #ff6b35 50%, #00d4ff 100%)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Custom shadows (preserve exact values)
        'card': '0 16px 20px -8px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 16px 20px -8px rgba(99, 102, 241, 0.35)',
        'button': '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
        'button-inset': 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3), inset 0px -1px 0px 0px rgba(255, 255, 255, 0.18)',
        'glow-magenta': '0px 0px 17px 0px rgba(237, 0, 150, 0.35)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-blue-strong': '0 0 60px rgba(59, 130, 246, 0.4)',
        'brutalist': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'neon': '0 0 15px rgba(113, 90, 255, 0.5)',
        'neon-strong': '0 0 10px rgba(99, 102, 241, 0.5)',
        'component-soft': '0px 15px 14px 0px rgba(0, 0, 0, 0.08)',
        'component-glow': '0px -1.5px 5px 0.5px rgba(57, 202, 254, 0.4)',
        'component-inset': 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)',
        'wizard': '0px 2px 3px 0px rgba(0, 0, 0, 0.35)',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        // Custom values
        'display': '4.8px',
        'heading': '0.96px',
        'label': '0.3em',
        'tight-label': '0.2em',
        'wide-label': '0.4em',
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

