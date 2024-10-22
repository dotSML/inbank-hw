/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        beige: '#D9D4A7',
        neutral: '#FBFBF9',
        neutralDark: '#F0F0EA',
        grey: '#E9E9E9',
        violet: '#E3D2FF',
        violetDark: '#AA93FF',
        accentDark: '#21093A',
        text: '#21093A',
        textDark: '#60378B',
        gray: '#E9E9E9',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        bitter: ['Bitter', 'serif'],
      },
      fontSize: {
        subheading: '4.25rem',
      },
    },
  },
  plugins: [],
}
