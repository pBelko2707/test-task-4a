/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
        gilroy: ['var(--font-gilroy)', 'sans-serif'],
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
};
