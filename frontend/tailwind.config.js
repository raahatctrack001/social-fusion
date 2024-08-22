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
        dark: {
          primary: '#1e1e1e',
          secondary: '#2d2d2d',
          accent: '#ff6f61', // Danger color
        },
        light: {
          primary: '#ffffff',
          secondary: '#f0f0f0',
          accent: '#007acc', // Trust color
          danger: '#ff6f61',
        },
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