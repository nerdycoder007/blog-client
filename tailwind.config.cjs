/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        text: ["Noto Sans", "sans-serif"],
        content: ["Merriweather", "serif"],
        source: ["Source serif pro", "serif"],
      },
      animation: {
        blob: "blob 9s  infinite ease-in-out",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: " translate(30px,-30px) scale(1.1)",
          },
          "66%": {
            transform: " translate(-30px, 30px) scale(0.9)",
          },
          "100%": {
            transform: " translate(0px, 0px) scale(1)",
          },
        },
      },
    },

    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/forms"),
  ],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
