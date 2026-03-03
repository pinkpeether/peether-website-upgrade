/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: '#ff4fa3',
        brandGreen: '#0fb38a',
        brandBlack: '#000000',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        'section': '80px',
      },
      zIndex: {
        'content': '10',
      },
    },
  },
  plugins: [],
}
