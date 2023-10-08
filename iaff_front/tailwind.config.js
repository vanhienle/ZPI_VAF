/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/***/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      // Blue
      primary: {
        500: "#4446EF",
        700: "#0000AE",
        900: "#000072",
      },
      // Beige
      secondary: {
        500: "#FFEED1",
        900: "#E8D5B5",
      },
      // Grey
      accent: {
        500: "#F1F1F1",
        900: "#D9D9D9",
      },
      // Black
      "text-color": "#000000",
      // White
      "background-color": "#ffffff",
      "footer-background": "#FFE6D9",
    },
    keyframes: {
      "slide-right-to-left": {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0)" },
      },
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
    animation: {
      "slide-right-to-left": "slide-right-to-left 0.5s ease-in-out forwards",
      "fade-in": "fade-in 0.5s ease-in-out forwards",
    },
    extend: {},
  },
  plugins: [],
};
