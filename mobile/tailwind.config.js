/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
   theme: {
      extend: {
        colors: {
          primary: '#4b5d4b',
          secondary: '#10B981',
          danger: '#EF4444',
          primaryLight: '#f9f8f4',
        },
        spacing: {
          '18': '4.5rem',
        },
        fontSize: {
          'title': '24px',
        },
         fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
              },
              borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
      },
    },
  plugins: [],
}


