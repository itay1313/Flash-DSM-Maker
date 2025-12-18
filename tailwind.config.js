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
        primary: {
          50: '#f0edff',
          100: '#e0dbff',
          200: '#c1b7ff',
          300: '#a293ff',
          400: '#836fff',
          500: '#715AFF', // Primary color - Medium Slate Blue
          600: '#5a47cc',
          700: '#443599',
          800: '#2d2466',
          900: '#171233',
        },
        palette: {
          periwinkle: '#A682FF', // Soft Periwinkle
          slate: '#715AFF', // Medium Slate Blue (primary)
          cornflower: '#5887FF', // Cornflower Blue
          maya: '#55C1FF', // Maya Blue
          space: '#102E4A', // Deep Space Blue
        },
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'serif': ['Instrument Serif', 'serif'],
      },
      fontSize: {
        '28': '28px',
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
  plugins: [],
}

