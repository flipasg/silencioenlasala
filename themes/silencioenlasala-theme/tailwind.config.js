/** @type {import('tailwindcss').Config} */
module.exports = {
  enabled: process.env.HUGO_ENVIRONMENT === "production",
  content: ["content/**/*.md", "layouts/**/*.html"],
  theme: {
    extend: {
      color: {
        'brand': '#2a2e44',
        'primary': '#bc8381',
        'secondary': '#dca780',
      },
      fontFamily: {
        'old-standard': ["Old Standard TT", 'serif'],
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