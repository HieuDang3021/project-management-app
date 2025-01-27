import type { Config } from "tailwindcss";

export default {
  mode: 'jit',
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        white: '#ffffff',
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          700: '#374151',
          800: '#1f2937',
        },
        blue: {
          200: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
        },
        'dark-bg': '#111827',
        'dark-bg-2': '#1f2937',
        'dark-bg-3': '#374151',
        'blue-primary': '#3b82f6',
        'stroke-dark': '#1f2937',
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
