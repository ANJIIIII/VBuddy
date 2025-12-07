/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Requested Theme: 
        // Dominant (Dark Green): #2C5F2D 
        // Accent/Highlight (Moss Green): #97BC62

        // Mapping "Primary" to the Light Moss Green (#97BC62)
        // This will be used for Buttons, Active States, and Highlights to pop against the dark background.
        primary: {
          50: '#F4F9EC',
          100: '#E6F2D6',
          200: '#CDE5AB',
          300: '#B4D880',
          400: '#97BC62', // Moss Green (Highlight/Action)
          500: '#7FA34A',
          600: '#688939',
          700: '#526E2E',
          800: '#3D5323',
          900: '#283918',
          950: '#141D0C',
        },

        // Mapping "Secondary" to the Dark Hunter Green (#2C5F2D)
        // This will be the main background color scale.
        secondary: {
          50: '#EDF5EE', // Very light tint for inner text/cards
          100: '#D6E8D8',
          200: '#B0D1B5',
          300: '#8AB991',
          400: '#64A16E',
          500: '#3E894A',
          600: '#2C5F2D', // Main Brand Background
          700: '#245025',
          800: '#1C401D',
          900: '#153116', // Darkest background layers
          950: '#0B1C0C',
        },

        // Neutral/White for Text to be readable on dark green
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          900: '#111827'
        }
      }
    },
  },
  plugins: [],
}