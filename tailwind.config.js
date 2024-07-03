/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik", 'sans-serif']
      },
      colors: {
        VeryDarkGray: 'var(--VeryDarkGray)',
        DarkGray: 'var(--DarkGray)',
      },
      screens: {
        'sm': {'max':'375px'},
        'md': {'max':'768px'}
      },
      backgroundImage: {
        'desktop': "url('../src/assets/images/pattern-bg-desktop.png')",
        'mobile': "url('../src/assets/images/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
}

