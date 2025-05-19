/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f9',
          100: '#d0eced',
          200: '#a5dbe0',
          300: '#7cb4b8',
          400: '#5a969e',
          500: '#2d3e40',
          600: '#243335',
          700: '#1c2729',
          800: '#131b1d',
          900: '#0a0d0e',
        },
        secondary: {
          50: '#f3f8f6',
          100: '#ddeae6',
          200: '#bdd7cd',
          300: '#96beb0',
          400: '#5e8b7e',
          500: '#436f63',
          600: '#345a4f',
          700: '#27443c',
          800: '#1a2e28',
          900: '#0d1714',
        },
        accent: {
          50: '#fbf7f2',
          100: '#f4e9dc',
          200: '#e6cdb2',
          300: '#d5b28c',
          400: '#a67f5d',
          500: '#8d6645',
          600: '#734e32',
          700: '#593c25',
          800: '#3e2919',
          900: '#24170d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};