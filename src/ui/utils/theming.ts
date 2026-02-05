import { defineConfig } from "@chakra-ui/react";

export const theme = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' },
        heading: { value: '"Space Grotesk", "Inter", sans-serif' },
        mono: { value: '"JetBrains Mono", "Fira Code", monospace' },
      },
      colors: {
        brand: {
          50: { value: '#e0f2fe' },
          100: { value: '#bae6fd' },
          200: { value: '#7dd3fc' },
          300: { value: '#38bdf8' },
          400: { value: '#0ea5e9' },
          500: { value: '#0284c7' },
          600: { value: '#0369a1' },
          700: { value: '#075985' },
          800: { value: '#0c4a6e' },
          900: { value: '#082f49' },
        },
        accent: {
          50: { value: '#fdf4ff' },
          100: { value: '#fae8ff' },
          200: { value: '#f5d0fe' },
          300: { value: '#f0abfc' },
          400: { value: '#e879f9' },
          500: { value: '#d946ef' },
          600: { value: '#c026d3' },
          700: { value: '#a21caf' },
          800: { value: '#86198f' },
          900: { value: '#701a75' },
        },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '0.75rem' },
        base: { value: '1rem' },
        md: { value: '1.5rem' },
        lg: { value: '2rem' },
        xl: { value: '2.5rem' },
        '2xl': { value: '3rem' },
        '3xl': { value: '4rem' },
        full: { value: '9999px' },
      },
      shadows: {
        sm: { value: '0 2px 8px rgba(2, 132, 199, 0.1)' },
        md: { value: '0 4px 16px rgba(2, 132, 199, 0.15)' },
        lg: { value: '0 8px 32px rgba(2, 132, 199, 0.2)' },
        xl: { value: '0 16px 48px rgba(2, 132, 199, 0.25)' },
      },
    },
  },
})