/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        srp: {
          available: '#22c55e',
          reserved: '#eab308',
          occupied: '#ef4444',
          cleaning: '#3b82f6',
          out: '#9ca3af',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};