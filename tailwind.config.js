/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: 'rgb(229 231 235)', // gray-200
          dark: 'rgb(31 41 55)', // gray-800
        },
        primary: {
          50: 'rgb(239 246 255)', // blue-50
          100: 'rgb(219 234 254)', // blue-100
          200: 'rgb(191 219 254)', // blue-200
          300: 'rgb(147 197 253)', // blue-300
          400: 'rgb(96 165 250)', // blue-400
          500: 'rgb(59 130 246)', // blue-500
          600: 'rgb(37 99 235)', // blue-600
          700: 'rgb(29 78 216)', // blue-700
          800: 'rgb(30 64 175)', // blue-800
          900: 'rgb(30 58 138)', // blue-900
        },
        secondary: {
          50: 'rgb(249 250 251)', // gray-50
          100: 'rgb(243 244 246)', // gray-100
          200: 'rgb(229 231 235)', // gray-200
          300: 'rgb(209 213 219)', // gray-300
          400: 'rgb(156 163 175)', // gray-400
          500: 'rgb(107 114 128)', // gray-500
          600: 'rgb(75 85 99)', // gray-600
          700: 'rgb(55 65 81)', // gray-700
          800: 'rgb(31 41 55)', // gray-800
          900: 'rgb(17 24 39)', // gray-900
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}