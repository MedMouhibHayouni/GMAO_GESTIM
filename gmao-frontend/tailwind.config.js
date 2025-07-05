/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#1e293b',
          light: '#334155',
          dark: '#0f172a',
          accent: '#3b82f6',
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1'
          }
        }
      }
    }
  },
  plugins: [],
}
