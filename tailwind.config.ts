import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: '#060816',
        panel: '#111827',
        accent: '#7c3aed',
        mint: '#22c55e'
      }
    }
  },
  plugins: []
} satisfies Config;
