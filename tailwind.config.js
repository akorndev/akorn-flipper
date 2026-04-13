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
        albion: { gold: '#c9a961', dark: '#1a1a2e', blue: '#16213e', accent: '#0f3460' }
      }
    },
  },
  plugins: [],
}