import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg: { DEFAULT: '#09090f', 2: '#0f0f1a', 3: '#14141f', 4: '#1a1a28' },
        accent: { DEFAULT: '#7c6fff', 2: '#a78fff', 3: '#5544dd' },
        border: { DEFAULT: '#ffffff12', 2: '#ffffff20', 3: '#ffffff35' },
        text: { DEFAULT: '#f0f0ff', 2: '#a8a8c8', 3: '#6868a0' },
        success: '#00e5a0',
        danger: '#ff4d6a',
        warn: '#ffb444',
        info: '#00d4ff',
        pink: '#ff6eb4',
      },
    },
  },
  plugins: [],
} satisfies Config