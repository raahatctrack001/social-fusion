const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        'editor-bg-light': 'var(--editor-bg-light)',
        'editor-text-light': 'var(--editor-text-light)',
        'editor-bg-dark': 'var(--editor-bg-dark)',
        'editor-text-dark': 'var(--editor-text-dark)',
      },
      fontFamily: {
        technical: ['Roboto Mono', 'monospace'],
        serene: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}