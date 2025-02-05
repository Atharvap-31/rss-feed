/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
      },
    },
  },
  plugins: [],
};
