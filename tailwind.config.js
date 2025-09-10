/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF6600',
          dark: '#E65500',
          light: '#FFA366',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
