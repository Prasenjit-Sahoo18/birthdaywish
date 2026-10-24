/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FDF7F9',
          100: '#FBF0F4',
          200: '#F7DCE5', // Main blush pink
          300: '#EEBFD0',
          400: '#E29EB7',
          500: '#D989A6', // Muted rose
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FFFDFB',
          200: '#FFF9F4', // Warm ivory
          300: '#F9F1EA',
          400: '#F0E5DC',
        },
        burgundy: {
          500: '#9B3F5E',
          600: '#84344F',
          700: '#722F46', // Deep burgundy
          800: '#542032',
          900: '#3A1422',
          950: '#250B16',
        },
        rose: {
          accent: '#D989A6',
          deep: '#B85D7F',
        },
        gold: {
          light: '#F5E6CC',
          DEFAULT: '#D6B77A', // Champagne gold
          hover: '#C4A263',
          dark: '#9E7E45',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Alex Brush"', '"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'soft-glow': '0 0 35px -5px rgba(214, 183, 122, 0.25)',
        'rose-glow': '0 10px 40px -10px rgba(217, 137, 166, 0.35)',
        'card-soft': '0 20px 40px -15px rgba(114, 47, 70, 0.08)',
        'envelope': '0 25px 50px -12px rgba(114, 47, 70, 0.18)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
