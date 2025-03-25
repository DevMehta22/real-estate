/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C8A35F', // Gold Accent
        secondary: '#1A1A1A', // Dark Background
        text: '#E5D4B7', // Light Gold Text
        highlight: '#F5E1C4', // Soft Gold Highlight
      },
    },
  },
  plugins: [],
}

