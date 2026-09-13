/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
        },
        risk: {
          low: '#16a34a',
          'low-bg': '#f0fdf4',
          'low-border': '#bbf7d0',
          medium: '#d97706',
          'medium-bg': '#fffbeb',
          'medium-border': '#fde68a',
          high: '#ea580c',
          'high-bg': '#fff7ed',
          'high-border': '#fed7aa',
          critical: '#dc2626',
          'critical-bg': '#fef2f2',
          'critical-border': '#fecaca',
          info: '#2563eb',
          'info-bg': '#eff6ff',
          'info-border': '#bfdbfe',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
