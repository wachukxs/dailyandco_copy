import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        wine: {
          50: '#fdf2f2',
          100: '#fce6e6',
          200: '#f9d1d1',
          300: '#f4b0b0',
          400: '#ed8282',
          500: '#e05d5d',
          600: '#cc3d3d',
          700: '#ab2e2e',
          800: '#8f2828',
          900: '#722F37',
          950: '#6B2C3E',
        },
      },
    },
  },
  plugins: [],
}
export default config

