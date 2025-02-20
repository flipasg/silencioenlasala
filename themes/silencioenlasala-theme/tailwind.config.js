/** @type {import('tailwindcss').Config} */
module.exports = {
  enabled: process.env.HUGO_ENVIRONMENT === "production",
  content: ["content/**/*.md", "layouts/**/*.html"],
  theme: {
    extend: {
      color: {
        'brand': '#ffeee5',
        'primary': '#678d72',
        'secondary': '#18231b',
      },
      fontFamily: {
        'old-standard': ["Amatic SC", 'serif'],
      },

    fontSize: {
      base: '18px',
      md: '32px',
      l: '60px',
    },
    },
  },
  plugins: [],
};